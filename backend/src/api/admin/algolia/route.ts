import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http";

/**
 * GET /admin/algolia
 * Returns Algolia status (stub since plugin is disabled)
 */
export async function GET(
  req: MedusaRequest,
  res: MedusaResponse
) {
  // Return a response indicating Algolia is not configured
  // This prevents CORS errors when the admin panel tries to fetch this endpoint
  res.json({
    configured: false,
    message: "Algolia plugin is not enabled. Please enable it in medusa-config.ts to use Algolia search.",
  });
}

/**
 * POST /admin/algolia
 * Triggers Algolia synchronization (stub since plugin is disabled)
 */
export async function POST(
  req: MedusaRequest,
  res: MedusaResponse
) {
  // Return a response indicating Algolia is not configured
  res.json({
    success: false,
    message: "Algolia plugin is not enabled. Please enable it in medusa-config.ts to use Algolia search.",
  });
}
