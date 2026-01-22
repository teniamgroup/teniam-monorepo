"use client"

import { CartProvider } from "@/components/providers"
import { AuthProvider } from "@/contexts/auth-context"
import { AuthModal } from "@/components/auth-modal"
import { Cart } from "@/types/cart"
import type React from "react"

import { PropsWithChildren } from "react"
import { HttpTypes } from "@medusajs/types"

interface ProvidersProps extends PropsWithChildren {
  cart: Cart | null
  customer: HttpTypes.StoreCustomer | null
}

export function Providers({ children, cart, customer }: ProvidersProps) {
  return (
    <AuthProvider customer={customer}>
      <CartProvider cart={cart}>
        {children}
        <AuthModal />
      </CartProvider>
    </AuthProvider>
  )
}
