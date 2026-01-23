"use client"

import { useEffect, useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { LayoutGrid } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { listProducts } from "@/lib/data/products"
import { ProductFilters } from "@/components/product-filters"

interface Product {
    id: string
    title: string
    category?: string
    subcategory?: string
    thumbnail?: string
    images?: Array<{ url: string }>
    variants?: Array<{
        calculated_price?: {
            calculated_amount: number
            original_amount: number
            currency_code: string
        }
        inventory_quantity?: number
    }>
    seller?: {
        store_name?: string
    }
}

const DEFAULT_COUNTRY_CODE = "us"

export function ProductCatalog() {
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
    const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(null)
    const [conditionFilter, setConditionFilter] = useState<"all" | "new" | "used">("all")
    const [priceFilter, setPriceFilter] = useState<{ min: number | null; max: number | null }>({
        min: null,
        max: null,
    })
    const [colorFilter, setColorFilter] = useState<string[]>([])
    const [brandFilter, setBrandFilter] = useState<string[]>([])
    const [ratingFilter, setRatingFilter] = useState<number | null>(null)
    const [products, setProducts] = useState<Product[]>([])
    const [loading, setLoading] = useState(true)
    const [singleCardView, setSingleCardView] = useState(false)
    const observerTarget = useRef<HTMLDivElement>(null)

    // Fetch products on component mount
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true)
                const { response } = await listProducts({
                    countryCode: DEFAULT_COUNTRY_CODE,
                    queryParams: {
                        limit: 100,
                    }
                })
                setProducts(response.products.map(product => ({
                    ...product,
                    thumbnail: product.thumbnail || undefined,
                    images: product.images ? product.images.map(img => ({ url: img.url })) : undefined,
                    variants: product.variants ? product.variants.map(variant => ({
                        calculated_price: variant.calculated_price ? {
                            calculated_amount: variant.calculated_price.calculated_amount || 0,
                            original_amount: variant.calculated_price.original_amount || 0,
                            currency_code: variant.calculated_price.currency_code || 'usd'
                        } : undefined,
                        inventory_quantity: variant.inventory_quantity || undefined
                    })) : undefined,
                    seller: product.seller ? { store_name: product.seller.name } : undefined
                })))
            } catch (error) {
                console.error("Error fetching products:", error)
                setProducts([])
            } finally {
                setLoading(false)
            }
        }

        fetchProducts()
    }, [])

    useEffect(() => {
        let filtered = products

        // Filter by category/subcategory if needed
        // Note: Real Medusa products don't have the same category structure as demo
        // This would need to be adapted based on actual category implementation

        if (conditionFilter !== "all") {
            // Note: Real Medusa products don't have condition field
            // This would need to be adapted based on actual product attributes
        }

        if (priceFilter.min !== null) {
            filtered = filtered.filter((p) => {
                const price = p.variants?.[0]?.calculated_price?.calculated_amount
                return price && price >= priceFilter.min!
            })
        }
        if (priceFilter.max !== null) {
            filtered = filtered.filter((p) => {
                const price = p.variants?.[0]?.calculated_price?.calculated_amount
                return price && price <= priceFilter.max!
            })
        }

        // Note: Color, brand, and rating filters would need to be adapted
        // based on actual Medusa product attributes/ metadata

        setProducts(filtered)
    }, [selectedCategory, selectedSubcategory, conditionFilter, priceFilter, colorFilter, brandFilter, ratingFilter])

    const handleFiltersChange = (filters: {
        minPrice: number | null
        maxPrice: number | null
        colors: string[]
        brands: string[]
        rating: number | null
        shipping: string[]
        sellerType: string[]
    }) => {
        setPriceFilter({ min: filters.minPrice, max: filters.maxPrice })
        setColorFilter(filters.colors)
        setBrandFilter(filters.brands)
        setRatingFilter(filters.rating)
    }

    const activeFiltersCount =
        (priceFilter.min !== null ? 1 : 0) +
        (priceFilter.max !== null ? 1 : 0) +
        colorFilter.length +
        brandFilter.length +
        (ratingFilter !== null ? 1 : 0)

    const handleCategorySelect = (category: string | null, subcategory: string | null) => {
        setSelectedCategory(category)
        setSelectedSubcategory(subcategory)
    }

    const getDisplayTitle = () => {
        if (selectedSubcategory) return selectedSubcategory
        if (selectedCategory) return selectedCategory
        return "All Products"
    }

    const getProductImage = (product: Product) => {
        return product.thumbnail || product.images?.[0]?.url || "/placeholder.svg"
    }

    const getProductPrice = (product: Product) => {
        const price = product.variants?.[0]?.calculated_price
        if (price) {
            return `$${(price.calculated_amount / 100).toFixed(2)}`
        }
        return "Price unavailable"
    }

    const getProductSeller = (product: Product) => {
        return product.seller?.store_name || "Unknown Seller"
    }

    return (
        <div className="bg-background flex-1">
            <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <h2 className="text-2xl font-bold tracking-tight text-foreground">{getDisplayTitle()}</h2>
                        {(selectedCategory || selectedSubcategory) && (
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleCategorySelect(null, null)}
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
                            variant={conditionFilter === "all" ? "default" : "outline"}
                            size="sm"
                            onClick={() => setConditionFilter("all")}
                        >
                            All
                        </Button>
                        <Button
                            variant={conditionFilter === "new" ? "default" : "outline"}
                            size="sm"
                            onClick={() => setConditionFilter("new")}
                        >
                            New
                        </Button>
                        <Button
                            variant={conditionFilter === "used" ? "default" : "outline"}
                            size="sm"
                            onClick={() => setConditionFilter("used")}
                        >
                            Used
                        </Button>
                    </div>
                    <ProductFilters onFiltersChange={handleFiltersChange} activeFiltersCount={activeFiltersCount} />
                </div>

                <p className="mt-4 text-sm text-muted-foreground">
                    {loading ? "Loading products..." : `${products.length} listings`}
                </p>

                <div
                    className={`mt-6 grid gap-x-6 gap-y-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:gap-x-8 ${singleCardView ? "grid-cols-1" : "grid-cols-2"
                        }`}
                >
                    {products.map((product) => (
                        <Link href={`/product/${product.id}`} key={product.id} className="group relative">
                            <img
                                alt={product.title}
                                src={getProductImage(product)}
                                className="aspect-square w-full rounded-md bg-muted object-cover group-hover:opacity-75 lg:aspect-auto lg:h-80"
                            />
                            <div className="mt-4 flex justify-between">
                                <div>
                                    <h3 className="text-sm text-foreground">
                                        <span aria-hidden="true" className="absolute inset-0" />
                                        {product.title}
                                    </h3>
                                    <p className="mt-1 text-sm text-muted-foreground">{getProductSeller(product)}</p>
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
