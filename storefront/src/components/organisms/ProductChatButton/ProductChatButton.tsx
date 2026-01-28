"use client"

import { Chat } from "@/components/organisms/Chat/Chat"
import { HttpTypes } from "@medusajs/types"
import { SellerProps } from "@/types/seller"
import { useAuth } from "@/contexts/auth-context"

interface ProductChatButtonProps {
    seller: SellerProps | null
    product: HttpTypes.StoreProduct
    buttonClassNames?: string
    variant?: "tonal" | "filled"
    buttonSize?: "small" | "large"
}

export function ProductChatButton({
    seller,
    product,
    buttonClassNames,
    variant = "tonal",
    buttonSize = "small"
}: ProductChatButtonProps) {
    const { customer } = useAuth()

    // Don't render if we don't have the necessary data
    if (!customer || !seller) {
        return null
    }

    return (
        <Chat
            user={customer}
            seller={seller}
            product={product}
            subject={product.title}
            buttonClassNames={buttonClassNames}
            variant={variant}
            buttonSize={buttonSize}
        />
    )
}
