"use client"

import { useState } from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { SidebarIcon, ShoppingBag, Search, X, Trash2 } from "lucide-react"

import { useAuth } from "@/contexts/auth-context"
import { SearchForm } from "@/components/search-form"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { useSidebar } from "@/components/ui/sidebar"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

const sampleCartItems = [
  {
    id: 1,
    name: "Mechanical Keyboard RGB",
    image: "/mechanical-keyboard-rgb-gaming.jpg",
    size: "Full",
    color: "Black",
    condition: "New",
    quantity: 1,
    price: 129.0,
  },
  {
    id: 2,
    name: 'Ultrawide Monitor 34"',
    image: "/ultrawide-curved-monitor-desk-setup.jpg",
    size: "34 inch",
    color: "Silver",
    condition: "New",
    quantity: 1,
    price: 449.0,
  },
  {
    id: 3,
    name: "Ergonomic Mouse",
    image: "/ergonomic-wireless-mouse-gaming.jpg",
    size: "Medium",
    color: "Black",
    condition: "New",
    quantity: 2,
    price: 79.0,
  },
  {
    id: 4,
    name: "Monitor Arm Mount",
    image: "/monitor-arm-mount-desk-clamp.jpg",
    size: "Single",
    color: "Black",
    condition: "New",
    quantity: 1,
    price: 89.0,
  },
  {
    id: 5,
    name: "LED Desk Mat",
    image: "/desk-mat-large-mousepad-minimal.jpg",
    size: "XL",
    color: "Black",
    condition: "Used",
    quantity: 1,
    price: 45.0,
  },
]

function getBreadcrumbData(pathname: string) {
  if (pathname === "/") {
    return { parent: null, current: "Home" }
  }
  if (pathname.startsWith("/product/")) {
    return { parent: { label: "Home", href: "/" }, current: "Product Details" }
  }
  if (pathname.startsWith("/seller/")) {
    return { parent: { label: "Home", href: "/" }, current: "Seller Store" }
  }
  if (pathname === "/cart") {
    return { parent: { label: "Home", href: "/" }, current: "Shopping Cart" }
  }
  if (pathname === "/checkout") {
    return { parent: { label: "Cart", href: "/cart" }, current: "Checkout" }
  }
  return { parent: { label: "Home", href: "/" }, current: "Page" }
}

export function SiteHeader() {
  const { toggleSidebar } = useSidebar()
  const { isAuthenticated, openAuthModal } = useAuth()
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const pathname = usePathname()
  const breadcrumbData = getBreadcrumbData(pathname)

  const [cartItems, setCartItems] = useState(sampleCartItems)

  const removeItem = (id: number) => {
    setCartItems(cartItems.filter((item) => item.id !== id))
  }

  const itemsTotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const delivery = 0
  const tax = 0
  const total = itemsTotal + delivery + tax

  return (
    <header className="bg-background sticky top-0 z-50 flex w-full items-center border-b">
      <div className="flex h-14 w-full items-center gap-2 px-4">
        <Button className="h-8 w-8" variant="ghost" size="icon" onClick={toggleSidebar}>
          <SidebarIcon />
        </Button>
        <Separator orientation="vertical" className="mr-2 h-full" />
        <Breadcrumb className="hidden sm:block">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">
                Home
              </BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="hidden sm:flex flex-1 justify-center">
          <SearchForm className="w-full max-w-md" />
        </div>

        {isSearchOpen && (
          <div className="absolute inset-0 z-50 flex items-center gap-2 bg-background px-4 sm:hidden">
            <div className="relative flex-1">
              <Search className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input type="search" placeholder="Search products..." className="h-9 w-full pl-9 pr-4" autoFocus />
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="h-9 w-9 text-muted-foreground"
              onClick={() => setIsSearchOpen(false)}
            >
              <X className="h-5 w-5" />
              <span className="sr-only">Close search</span>
            </Button>
          </div>
        )}

        <div className="flex items-center gap-1 ml-auto">
          <Button
            variant="ghost"
            size="icon"
            className="h-9 w-9 text-muted-foreground hover:text-foreground sm:hidden"
            onClick={() => setIsSearchOpen(true)}
          >
            <Search className="h-5 w-5" />
            <span className="sr-only">Search</span>
          </Button>

          <TooltipProvider>
            {isAuthenticated ? (
              <Sheet>
                <SheetTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-9 w-9 text-muted-foreground hover:text-foreground relative"
                  >
                    <ShoppingBag className="h-5 w-5" />
                    {cartItems.length > 0 && (
                      <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-foreground text-background text-xs flex items-center justify-center">
                        {cartItems.length}
                      </span>
                    )}
                    <span className="sr-only">Shopping Cart</span>
                  </Button>
                </SheetTrigger>
                <SheetContent className="flex flex-col p-0 h-full">
                  <SheetHeader className="px-6 py-4 border-b flex-shrink-0">
                    <SheetTitle className="text-left text-lg font-bold tracking-wide">SHOPPING CART</SheetTitle>
                  </SheetHeader>

                  {cartItems.length === 0 ? (
                    <div className="flex flex-1 flex-col items-center justify-center gap-4 text-center px-6">
                      <h2 className="text-xl font-semibold text-foreground">Your cart is empty</h2>
                      <p className="text-muted-foreground">Start shopping to add items to your cart.</p>
                      <Button className="mt-4 bg-foreground text-background hover:bg-foreground/90">
                        Continue shopping
                      </Button>
                    </div>
                  ) : (
                    <div className="flex flex-col flex-1 min-h-0">
                      <ScrollArea className="flex-1 min-h-0">
                        <div className="px-6 py-4 space-y-6">
                          {cartItems.map((item) => (
                            <div key={item.id} className="flex gap-4">
                              <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-lg bg-muted">
                                <Image
                                  src={item.image || "/placeholder.svg"}
                                  alt={item.name}
                                  fill
                                  className="object-cover"
                                />
                              </div>
                              <div className="flex flex-1 flex-col">
                                <div className="flex items-start justify-between">
                                  <h3 className="font-semibold text-foreground">{item.name}</h3>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-8 w-8 text-muted-foreground hover:text-destructive"
                                    onClick={() => removeItem(item.id)}
                                  >
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                </div>
                                <div className="mt-1 space-y-0.5 text-sm text-muted-foreground">
                                  <p>Size: {item.size}</p>
                                  <p>Color: {item.color}</p>
                                  <p>Condition: {item.condition}</p>
                                  <p>Quantity: {item.quantity}</p>
                                </div>
                                <p className="mt-2 font-semibold text-foreground">${item.price.toFixed(2)}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </ScrollArea>

                      <div className="border-t px-6 py-4 space-y-3 bg-muted/30 flex-shrink-0 mt-auto">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Items</span>
                          <span className="text-foreground">${itemsTotal.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Delivery</span>
                          <span className="text-foreground">${delivery.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Tax</span>
                          <span className="text-foreground">${tax.toFixed(2)}</span>
                        </div>
                        <Separator />
                        <div className="flex justify-between">
                          <span className="font-semibold text-foreground">Total</span>
                          <span className="font-bold text-foreground">${total.toFixed(2)}</span>
                        </div>
                        <Button asChild className="w-full mt-2 bg-foreground text-background hover:bg-foreground/90">
                          <Link href="/cart">Go to cart</Link>
                        </Button>
                      </div>
                    </div>
                  )}
                </SheetContent>
              </Sheet>
            ) : (
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-9 w-9 text-muted-foreground hover:text-foreground"
                    onClick={() => openAuthModal("login")}
                  >
                    <ShoppingBag className="h-5 w-5" />
                    <span className="sr-only">Shopping Cart</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Sign in to view cart</p>
                </TooltipContent>
              </Tooltip>
            )}
          </TooltipProvider>
        </div>
      </div>
    </header>
  )
}
