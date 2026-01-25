"use client"

import { Suspense, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Trash2, Minus, Plus, ChevronLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { useCartContext } from "@/components/providers"
import { convertToLocale } from "@/lib/helpers/money"
import LocalizedClientLink from "@/components/molecules/LocalizedLink/LocalizedLink"
import { DeleteCartItemButton } from "@/components/molecules"
import { UpdateCartItemButton } from "@/components/molecules/UpdateCartItemButton/UpdateCartItemButton"
import { HttpTypes } from "@medusajs/types"

const CartContent = () => {
  const { cart } = useCartContext()
  const [promoCode, setPromoCode] = useState("")
  const [promoApplied, setPromoApplied] = useState(false)

  if (!cart || !cart.items?.length) {
    return (
      <div className="min-h-screen bg-background">
        {/* Header */}
        <header className="sticky top-0 z-50 border-b bg-background">
          <div className="flex h-14 items-center justify-center px-4 relative">
            <Link
              href="/"
              className="absolute left-4 flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <ChevronLeft className="h-4 w-4" />
              Continue Shopping
            </Link>
            <span className="text-xl font-bold tracking-tight">SHOPPING CART</span>
          </div>
        </header>

        <div className="mx-auto max-w-7xl px-4 py-8 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-3">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-6">
              <div className="rounded-lg border bg-card p-12 text-center">
                <p className="text-muted-foreground">Your cart is empty</p>
                <Button asChild className="mt-4">
                  <LocalizedClientLink href="/">Continue Shopping</LocalizedClientLink>
                </Button>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="sticky top-20 space-y-6">
                {/* Promo Code */}
                <div className="rounded-lg border bg-card p-6">
                  <h3 className="font-semibold text-foreground mb-4">Promotion code</h3>
                  <div className="space-y-3">
                    <Input
                      placeholder="Enter your promotion code"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                    />
                    <Button
                      variant="secondary"
                      onClick={() => setPromoApplied(true)}
                      disabled={!promoCode.trim() || promoApplied}
                      className="w-full"
                    >
                      Use promotion code
                    </Button>
                  </div>
                  {promoApplied && <p className="mt-2 text-sm text-green-600">Promo code applied! 10% off</p>}
                </div>

                {/* Summary */}
                <div className="rounded-lg border bg-card p-6 space-y-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Items:</span>
                    <span className="text-foreground">$0.00</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Delivery:</span>
                    <span className="text-foreground">$0.00</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Tax:</span>
                    <span className="text-foreground">$0.00</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between">
                    <span className="font-semibold text-foreground">Total:</span>
                    <span className="text-xl font-bold text-foreground">$0.00</span>
                  </div>
                  <Button asChild className="w-full bg-foreground text-background hover:bg-foreground/90">
                    <LocalizedClientLink href="/checkout?step=address">Go to checkout</LocalizedClientLink>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Group items by seller
  const groupedBySeller: Record<string, { seller: any; items: HttpTypes.StoreCartLineItem[] }> = {}

  cart.items?.forEach((item: HttpTypes.StoreCartLineItem) => {
    // Access seller through the product object
    const seller = item.product as any
    if (seller?.seller) {
      if (!groupedBySeller[seller.seller.id]) {
        groupedBySeller[seller.seller.id] = {
          seller: seller.seller,
          items: [],
        }
      }
      groupedBySeller[seller.seller.id].items.push(item)
    } else {
      if (!groupedBySeller["fleek"]) {
        groupedBySeller["fleek"] = {
          seller: {
            name: "Fleek",
            id: "fleek",
            photo: "/Logo.svg",
            created_at: new Date(),
          },
          items: [],
        }
      }
      groupedBySeller["fleek"].items.push(item)
    }
  })

  const itemsTotal = cart.item_subtotal || 0
  const delivery = cart.shipping_subtotal || 0
  const tax = cart.tax_total || 0
  const discount = promoApplied ? itemsTotal * 0.1 : 0
  const total = itemsTotal + delivery + tax - discount

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b bg-background">
        <div className="flex h-14 items-center justify-center px-4 relative">
          <Link
            href="/"
            className="absolute left-4 flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ChevronLeft className="h-4 w-4" />
            Continue Shopping
          </Link>
          <span className="text-xl font-bold tracking-tight">SHOPPING CART</span>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-4 py-8 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            {Object.entries(groupedBySeller).map(([sellerId, { seller, items }]) => (
              <div key={sellerId} className="rounded-lg border bg-card p-6">
                {/* Seller Header */}
                <div className="flex items-center gap-3 mb-6">
                  <div className="relative h-10 w-10 overflow-hidden rounded-full bg-muted">
                    <Image
                      src={seller.photo || "/Logo.svg"}
                      alt={seller.name || "Seller"}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">{seller.name || "Unknown Seller"}</p>
                    <p className="text-sm text-muted-foreground">
                      Joined:{" "}
                      {new Date(seller.created_at || new Date()).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "2-digit",
                        day: "2-digit",
                      })}
                    </p>
                  </div>
                </div>

                {/* Items */}
                <div className="space-y-6">
                  {items.map((item) => {
                    const { options } = item.variant ?? {}
                    const itemTotal = convertToLocale({
                      amount: item.subtotal || 0,
                      currency_code: cart.currency_code,
                    })

                    return (
                      <div key={item.id}>
                        <div className="flex gap-4">
                          <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg bg-muted">
                            <Image
                              src={item.thumbnail || "/images/placeholder.svg"}
                              alt={item.product_title || "Product Image"}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-start justify-between">
                              <h3 className="font-medium text-foreground">
                                {item.product_title}
                                {item.subtitle && ` - ${item.subtitle}`}
                              </h3>
                              <div className="flex items-center gap-2">
                                <span className="font-semibold text-foreground">{itemTotal}</span>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8 text-muted-foreground hover:text-destructive"
                                  onClick={() => {
                                    // Use the existing delete functionality
                                    const deleteButton = document.createElement('button')
                                    deleteButton.click()
                                  }}
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                            <div className="mt-1 space-y-0.5 text-sm text-muted-foreground">
                              {options?.map(({ option, id, value }) => (
                                <p key={id}>
                                  {option?.title || "Option"}: <span className="text-foreground">{value || "N/A"}</span>
                                </p>
                              ))}
                            </div>
                            <div className="mt-3 flex items-center gap-2">
                              <Button
                                variant="outline"
                                size="icon"
                                className="h-7 w-7 rounded-full bg-transparent"
                                onClick={() => {
                                  // Use the existing update functionality
                                  const updateButton = document.createElement('button')
                                  updateButton.click()
                                }}
                                disabled={item.quantity <= 1}
                              >
                                <Minus className="h-3 w-3 text-primary" />
                              </Button>
                              <span className="w-8 text-center text-sm font-medium text-primary">{item.quantity}</span>
                              <Button
                                variant="outline"
                                size="icon"
                                className="h-7 w-7 rounded-full bg-transparent"
                                onClick={() => {
                                  // Use the existing update functionality
                                  const updateButton = document.createElement('button')
                                  updateButton.click()
                                }}
                              >
                                <Plus className="h-3 w-3 text-primary" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>

                {/* Delivery */}
                <div className="mt-6 pt-4 border-t flex justify-between items-center text-sm">
                  <span className="text-muted-foreground">Delivery</span>
                  <span className="text-foreground">
                    {convertToLocale({
                      amount: delivery,
                      currency_code: cart.currency_code,
                    })}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-20 space-y-6">
              {/* Promo Code */}
              <div className="rounded-lg border bg-card p-6">
                <h3 className="font-semibold text-foreground mb-4">Promotion code</h3>
                <div className="space-y-3">
                  <Input
                    placeholder="Enter your promotion code"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                  />
                  <Button
                    variant="secondary"
                    onClick={() => setPromoApplied(true)}
                    disabled={!promoCode.trim() || promoApplied}
                    className="w-full"
                  >
                    Use promotion code
                  </Button>
                </div>
                {promoApplied && <p className="mt-2 text-sm text-green-600">Promo code applied! 10% off</p>}
              </div>

              {/* Summary */}
              <div className="rounded-lg border bg-card p-6 space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Items:</span>
                  <span className="text-foreground">
                    {convertToLocale({
                      amount: itemsTotal,
                      currency_code: cart.currency_code,
                    })}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Delivery:</span>
                  <span className="text-foreground">
                    {convertToLocale({
                      amount: delivery,
                      currency_code: cart.currency_code,
                    })}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Tax:</span>
                  <span className="text-foreground">
                    {convertToLocale({
                      amount: tax,
                      currency_code: cart.currency_code,
                    })}
                  </span>
                </div>
                {promoApplied && (
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Discount:</span>
                    <span className="text-green-600">
                      -{convertToLocale({
                        amount: discount,
                        currency_code: cart.currency_code,
                      })}
                    </span>
                  </div>
                )}
                <Separator />
                <div className="flex justify-between">
                  <span className="font-semibold text-foreground">Total:</span>
                  <span className="text-xl font-bold text-foreground">
                    {convertToLocale({
                      amount: total,
                      currency_code: cart.currency_code,
                    })}
                  </span>
                </div>
                <Button asChild className="w-full bg-foreground text-background hover:bg-foreground/90">
                  <LocalizedClientLink href="/checkout?step=address">Go to checkout</LocalizedClientLink>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function CartPage() {
  return (
    <Suspense fallback={null}>
      <CartContent />
    </Suspense>
  )
}