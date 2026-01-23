"use client"

import { useEffect, useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { LayoutGrid } from "lucide-react"
import { ProductFilters } from "@/components/product-filters"
import Link from "next/link"
import { HttpTypes } from "@medusajs/types"
import { SellerProps } from "@/types/seller"

type Product = HttpTypes.StoreProduct & { seller?: SellerProps }

interface HomeProductListingProps {
    initialProducts: Product[]
    locale: string
    selectedCategory?: string | null
    categoryHandle?: string | null
}

export function HomeProductListing({
    initialProducts,
    locale,
    selectedCategory = null,
    categoryHandle = null,
}: HomeProductListingProps) {
    const [conditionFilter, setConditionFilter] = useState<"all" | "new" | "used">("all")
    const [priceFilter, setPriceFilter] = useState<{ min: number | null; max: number | null }>({
        min: null,
        max: null,
    })
    const [sellerFilter, setSellerFilter] = useState<string[]>([])
    const [categoryFilter, setCategoryFilter] = useState<string[]>([])
    const [ratingFilter, setRatingFilter] = useState<number | null>(null)
    const [sellerTypeFilter, setSellerTypeFilter] = useState<string[]>([])
    const [products, setProducts] = useState<Product[]>(initialProducts)
    const [loading, setLoading] = useState(false)
    const [singleCardView, setSingleCardView] = useState(false)
    const observerTarget = useRef<HTMLDivElement>(null)

    // Apply filters when they change
    useEffect(() => {
        let filtered = initialProducts

        // Filter by price
        if (priceFilter.min !== null) {
            filtered = filtered.filter((p) => {
                const price = getProductPriceNumber(p)
                return price !== null && price >= priceFilter.min!
            })
        }
        if (priceFilter.max !== null) {
            filtered = filtered.filter((p) => {
                const price = getProductPriceNumber(p)
                return price !== null && price <= priceFilter.max!
            })
        }

        // Filter by seller
        if (sellerFilter.length > 0) {
            filtered = filtered.filter((p) => p.seller?.id && sellerFilter.includes(p.seller.id))
        }

        // Filter by category
        if (categoryFilter.length > 0) {
            filtered = filtered.filter((p) => 
                p.categories?.some(cat => categoryFilter.includes(cat.id))
            )
        }

        // Filter by seller rating
        if (ratingFilter !== null) {
            filtered = filtered.filter((p) => {
                const reviews = p.seller?.reviews || []
                if (reviews.length === 0) return false
                const avgRating = reviews.reduce((sum, r) => sum + (r?.rating || 0), 0) / reviews.length
                return avgRating >= ratingFilter
            })
        }

        // Filter by seller type
        if (sellerTypeFilter.includes("top-rated")) {
            filtered = filtered.filter((p) => {
                const reviews = p.seller?.reviews || []
                if (reviews.length === 0) return false
                const avgRating = reviews.reduce((sum, r) => sum + (r?.rating || 0), 0) / reviews.length
                return avgRating >= 4
            })
        }

        setProducts(filtered)
    }, [initialProducts, conditionFilter, priceFilter, sellerFilter, categoryFilter, ratingFilter, sellerTypeFilter])

    const handleFiltersChange = (filters: {
        minPrice: number | null
        maxPrice: number | null
        colors: string[]
        sellers: string[]
        rating: number | null
        categories: string[]
        sellerType: string[]
    }) => {
        setPriceFilter({ min: filters.minPrice, max: filters.maxPrice })
        setSellerFilter(filters.sellers)
        setCategoryFilter(filters.categories)
        setRatingFilter(filters.rating)
        setSellerTypeFilter(filters.sellerType)
    }

    const activeFiltersCount =
        (priceFilter.min !== null ? 1 : 0) +
        (priceFilter.max !== null ? 1 : 0) +
        sellerFilter.length +
        categoryFilter.length +
        (ratingFilter !== null ? 1 : 0) +
        sellerTypeFilter.length

    const getDisplayTitle = () => {
        if (selectedCategory) return selectedCategory
        return "All Products"
    }

    const getProductPriceNumber = (product: Product): number | null => {
        const price = product.variants?.[0]?.calculated_price
        if (price?.calculated_amount) {
            return price.calculated_amount / 100
        }
        return null
    }

    const getProductPrice = (product: Product): string => {
        const price = product.variants?.[0]?.calculated_price
        if (price?.calculated_amount) {
            const amount = price.calculated_amount / 100
            const currency = price.currency_code?.toUpperCase() || 'USD'
            return new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: currency,
            }).format(amount)
        }
        return "Price unavailable"
    }

    return (
        <div className="bg-background flex-1">
            <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <h2 className="text-2xl font-bold tracking-tight text-foreground">{getDisplayTitle()}</h2>
                        {categoryHandle && (
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => {
                                    window.location.href = `/${locale}/home`
                                }}
                                className="text-muted-foreground hover:text-foreground"
                            >
                                Clear
                            </Button>
                        )}
                    </div>
                    <div className="md:hidden">
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setSingleCardView(!singleCardView)}
                            aria-label="Toggle view"
                            className="text-muted-foreground hover:text-foreground"
                        >
                            <LayoutGrid className="h-5 w-5" />
                        </Button>
                    </div>
                </div>

                <div className="mt-4 flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                        <Button
                            size="sm"
                            onClick={() => setConditionFilter("all")}
                            className={conditionFilter === "all" 
                                ? "bg-foreground text-background hover:bg-foreground/90" 
                                : "bg-background text-foreground border border-border hover:bg-muted"
                            }
                        >
                            All
                        </Button>
                        <Button
                            size="sm"
                            onClick={() => setConditionFilter("new")}
                            className={conditionFilter === "new" 
                                ? "bg-foreground text-background hover:bg-foreground/90" 
                                : "bg-background text-foreground border border-border hover:bg-muted"
                            }
                        >
                            New
                        </Button>
                        <Button
                            size="sm"
                            onClick={() => setConditionFilter("used")}
                            className={conditionFilter === "used" 
                                ? "bg-foreground text-background hover:bg-foreground/90" 
                                : "bg-background text-foreground border border-border hover:bg-muted"
                            }
                        >
                            Used
                        </Button>
                    </div>
                    <ProductFilters 
                        onFiltersChange={handleFiltersChange} 
                        activeFiltersCount={activeFiltersCount}
                        products={initialProducts}
                    />
                </div>

                <p className="mt-4 text-sm text-muted-foreground">
                    {loading ? "Loading products..." : `${products.length} listings`}
                </p>

                <div
                    className={`mt-6 grid gap-x-6 gap-y-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:gap-x-8 ${
                        singleCardView ? "grid-cols-1" : "grid-cols-2"
                    }`}
                >
                    {products.map((product) => (
                        <Link
                            href={`/${locale}/products/${product.handle}`}
                            key={product.id}
                            className="group relative"
                        >
                            <img
                                alt={product.title}
                                src={product.thumbnail || "/placeholder.svg"}
                                className="aspect-square w-full rounded-md bg-muted object-cover group-hover:opacity-75 lg:aspect-auto lg:h-80"
                            />
                            <div className="mt-4 flex justify-between">
                                <div>
                                    <h3 className="text-sm text-foreground">
                                        <span aria-hidden="true" className="absolute inset-0" />
                                        {product.title}
                                    </h3>
                                    <p className="mt-1 text-sm text-muted-foreground">
                                        {product.seller?.name || "Unknown Seller"}
                                    </p>
                                </div>
                                <p className="text-sm font-medium text-foreground">{getProductPrice(product)}</p>
                            </div>
                        </Link>
                    ))}
                </div>

                {products.length === 0 && !loading && (
                    <div className="mt-8 text-center text-muted-foreground">No products found.</div>
                )}

                <div ref={observerTarget} className="mt-8 flex justify-center">
                    {loading && <div className="text-muted-foreground">Loading more products...</div>}
                </div>
            </div>
        </div>
    )
}
