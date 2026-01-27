import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import { ImportProductWorkflowInputDTO } from "@medusajs/types"
import { createImportProductWorkflow } from "@medusajs/core-flows"

export const POST = async (
    req: MedusaRequest,
    res: MedusaResponse
) => {
    try {
        // Check if user is authenticated and has vendor permissions
        const userId = req.user?.id
        if (!userId) {
            return res.status(401).json({ message: "Unauthorized" })
        }

        // Verify user has vendor permissions (you may need to customize this based on your auth system)
        const userRole = req.user?.role
        if (userRole !== "vendor" && userRole !== "admin") {
            return res.status(403).json({ message: "Forbidden: Vendor access required" })
        }

        // Get the uploaded file
        const file = req.files?.[0]
        if (!file) {
            return res.status(400).json({ message: "No file uploaded" })
        }

        // Prepare the import input
        const input: ImportProductWorkflowInputDTO = {
            file: {
                filename: file.originalname,
                content: file.buffer,
                mimetype: file.mimetype,
            },
            // Add vendor-specific context
            context: {
                user_id: userId,
                vendor_id: req.user?.vendor_id || userId, // Adjust based on your user model
            }
        }

        // Create and execute the import workflow
        const workflow = createImportProductWorkflow(req.scope)
        const { result } = await workflow.run({
            input,
        })

        res.status(200).json({
            message: "Product import initiated successfully",
            transaction_id: result.transaction_id,
            summary: result.summary
        })

    } catch (error) {
        console.error("Product import error:", error)
        res.status(500).json({
            message: "Failed to process product import",
            error: error.message
        })
    }
}
