"use client"

import { useState, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { SlidersHorizontal, ChevronUp, ChevronDown, Star } from "lucide-react"
import { Slider } from "@/components/ui/slider"
import { HttpTypes } from "@medusajs/types"
import { SellerProps } from "@/types/seller"

type Product = HttpTypes.StoreProduct & { seller?: SellerProps }

interface ProductFiltersProps {
    onFiltersChange: (filters: {
        minPrice: number | null
        maxPrice: number | null
        colors: string[]
        sellers: string[]
        rating: number | null
        categories: string[]
        sellerType: string[]
    }) => void
    activeFiltersCount: number
    products?: Product[]
}

const availableColors = [
    { name: "Black", color: "#1a1a1a" },
    { name: "White", color: "#f5f5f5" },
    { name: "Silver", color: "#c0c0c0" },
    { name: "Space Gray", color: "#6b7280" },
    { name: "Walnut", color: "#5d4037" },
    { name: "Bamboo", color: "#d4a574" },
    { name: "Multicolor", color: "linear-gradient(135deg, #ff6b6b, #4ecdc4, #ffe66d)" },
    { name: "Matte Black", color: "#2d2d2d" },
    { name: "Dark Gray", color: "#4a4a4a" },
    { name: "Purple", color: "#8b5cf6" },
]

const sellerTypes = [
    { id: "verified", label: "Verified Sellers" },
    { id: "top-rated", label: "Top Rated (4+ Stars)" },
]

export function ProductFilters({ onFiltersChange, activeFiltersCount, products = [] }: ProductFiltersProps) {
    const [open, setOpen] = useState(false)
    const [priceOpen, setPriceOpen] = useState(true)
    const [colorOpen, setColorOpen] = useState(false)
    const [sellerOpen, setSellerOpen] = useState(true)
    const [ratingOpen, setRatingOpen] = useState(true)
    const [categoryOpen, setCategoryOpen] = useState(false)
    const [sellerTypeOpen, setSellerTypeOpen] = useState(false)

    const [minPrice, setMinPrice] = useState<string>("")
    const [maxPrice, setMaxPrice] = useState<string>("")
    const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000])
    const [selectedColors, setSelectedColors] = useState<string[]>([])
    const [selectedSellers, setSelectedSellers] = useState<string[]>([])
    const [minRating, setMinRating] = useState<number | null>(null)
    const [selectedCategories, setSelectedCategories] = useState<string[]>([])
    const [selectedSellerTypes, setSelectedSellerTypes] = useState<string[]>([])

    // Extract unique sellers from products
    const availableSellers = useMemo(() => {
        const sellerMap = new Map<string, { id: string; name: string; count: number; rating?: number }>()
        
        products.forEach(product => {
            if (product.seller?.id && product.seller?.name) {
                const existing = sellerMap.get(product.seller.id)
                if (existing) {
                    existing.count++
                } else {
                    // Calculate average rating from reviews
                    const reviews = product.seller.reviews || []
                    const avgRating = reviews.length > 0 
                        ? reviews.reduce((sum, r) => sum + (r?.rating || 0), 0) / reviews.length 
                        : undefined
                    
                    sellerMap.set(product.seller.id, {
                        id: product.seller.id,
                        name: product.seller.name,
                        count: 1,
                        rating: avgRating
                    })
                }
            }
        })
        
        return Array.from(sellerMap.values()).sort((a, b) => b.count - a.count)
    }, [products])

    // Extract unique categories from products
    const availableCategories = useMemo(() => {
        const categoryMap = new Map<string, { id: string; name: string; count: number }>()
        
        products.forEach(product => {
            product.categories?.forEach(category => {
                if (category.id && category.name) {
                    const existing = categoryMap.get(category.id)
                    if (existing) {
                        existing.count++
                    } else {
                        categoryMap.set(category.id, {
                            id: category.id,
                            name: category.name,
                            count: 1
                        })
                    }
                }
            })
        })
        
        return Array.from(categoryMap.values()).sort((a, b) => b.count - a.count)
    }, [products])

    // Calculate price range from products
    const productPriceRange = useMemo(() => {
        let min = Infinity
        let max = 0
        
        products.forEach(product => {
            const price = product.variants?.[0]?.calculated_price?.calculated_amount
            if (price) {
                const priceInDollars = price / 100
                if (priceInDollars < min) min = priceInDollars
                if (priceInDollars > max) max = priceInDollars
            }
        })
        
        return {
            min: min === Infinity ? 0 : Math.floor(min),
            max: max === 0 ? 1000 : Math.ceil(max)
        }
    }, [products])

    const handleColorToggle = (color: string) => {
        setSelectedColors((prev) => (prev.includes(color) ? prev.filter((c) => c !== color) : [...prev, color]))
    }

    const handleSellerToggle = (sellerId: string) => {
        setSelectedSellers((prev) => (prev.includes(sellerId) ? prev.filter((s) => s !== sellerId) : [...prev, sellerId]))
    }

    const handleCategoryToggle = (categoryId: string) => {
        setSelectedCategories((prev) => (prev.includes(categoryId) ? prev.filter((c) => c !== categoryId) : [...prev, categoryId]))
    }

    const handleSellerTypeToggle = (type: string) => {
        setSelectedSellerTypes((prev) => (prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]))
    }

    const handlePriceRangeChange = (value: number[]) => {
        setPriceRange([value[0], value[1]])
        setMinPrice(value[0].toString())
        setMaxPrice(value[1].toString())
    }

    const applyFilters = () => {
        onFiltersChange({
            minPrice: minPrice ? Number.parseFloat(minPrice) : null,
            maxPrice: maxPrice ? Number.parseFloat(maxPrice) : null,
            colors: selectedColors,
            sellers: selectedSellers,
            rating: minRating,
            categories: selectedCategories,
            sellerType: selectedSellerTypes,
        })
        setOpen(false)
    }

    const clearFilters = () => {
        setMinPrice("")
        setMaxPrice("")
        setPriceRange([productPriceRange.min, productPriceRange.max])
        setSelectedColors([])
        setSelectedSellers([])
        setMinRating(null)
        setSelectedCategories([])
        setSelectedSellerTypes([])
        onFiltersChange({
            minPrice: null,
            maxPrice: null,
            colors: [],
            sellers: [],
            rating: null,
            categories: [],
            sellerType: [],
        })
    }

    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
                <Button variant="outline" size="sm" className="gap-2 bg-background text-foreground border-border hover:bg-muted">
                    <SlidersHorizontal className="h-4 w-4 text-foreground" />
                    <span className="text-foreground">Filters</span>
                    {activeFiltersCount > 0 && (
                        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-foreground text-xs text-background">
                            {activeFiltersCount}
                        </span>
                    )}
                </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full sm:max-w-md overflow-y-auto bg-background text-foreground">
                <SheetHeader className="mb-6">
                    <div className="flex items-center justify-between">
                        <SheetTitle className="text-lg font-semibold text-foreground">Filters</SheetTitle>
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={clearFilters}
                            className="text-foreground/70 hover:text-foreground hover:bg-muted"
                        >
                            Reset All
                        </Button>
                    </div>
                </SheetHeader>

                <div className="space-y-4">
                    {/* Price Filter with Range Slider */}
                    <Collapsible open={priceOpen} onOpenChange={setPriceOpen}>
                        <div className="rounded-lg border border-border bg-card">
                            <CollapsibleTrigger className="flex w-full items-center justify-between p-4">
                                <span className="text-sm font-semibold uppercase tracking-wide text-foreground">Price</span>
                                {priceOpen ? (
                                    <ChevronUp className="h-4 w-4 text-foreground/70" />
                                ) : (
                                    <ChevronDown className="h-4 w-4 text-foreground/70" />
                                )}
                            </CollapsibleTrigger>
                            <CollapsibleContent>
                                <div className="px-4 pb-4 space-y-4">
                                    <Slider
                                        value={priceRange}
                                        onValueChange={handlePriceRangeChange}
                                        max={productPriceRange.max}
                                        min={productPriceRange.min}
                                        step={10}
                                        className="w-full"
                                    />
                                    <div className="flex items-center justify-between text-sm text-foreground/70">
                                        <span>${priceRange[0]}</span>
                                        <span>${priceRange[1]}</span>
                                    </div>
                                    <div className="flex gap-3">
                                        <div className="flex-1">
                                            <Input
                                                type="number"
                                                placeholder="Min"
                                                value={minPrice}
                                                onChange={(e) => {
                                                    setMinPrice(e.target.value)
                                                    if (e.target.value) {
                                                        setPriceRange([Number(e.target.value), priceRange[1]])
                                                    }
                                                }}
                                                className="bg-muted/50 text-foreground placeholder:text-foreground/50"
                                            />
                                        </div>
                                        <span className="flex items-center text-foreground/70">—</span>
                                        <div className="flex-1">
                                            <Input
                                                type="number"
                                                placeholder="Max"
                                                value={maxPrice}
                                                onChange={(e) => {
                                                    setMaxPrice(e.target.value)
                                                    if (e.target.value) {
                                                        setPriceRange([priceRange[0], Number(e.target.value)])
                                                    }
                                                }}
                                                className="bg-muted/50 text-foreground placeholder:text-foreground/50"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </CollapsibleContent>
                        </div>
                    </Collapsible>

                    {/* Seller Filter - Dynamic from Medusa */}
                    {availableSellers.length > 0 && (
                        <Collapsible open={sellerOpen} onOpenChange={setSellerOpen}>
                            <div className="rounded-lg border border-border bg-card">
                                <CollapsibleTrigger className="flex w-full items-center justify-between p-4">
                                    <span className="text-sm font-semibold uppercase tracking-wide text-foreground">Seller</span>
                                    {sellerOpen ? (
                                        <ChevronUp className="h-4 w-4 text-foreground/70" />
                                    ) : (
                                        <ChevronDown className="h-4 w-4 text-foreground/70" />
                                    )}
                                </CollapsibleTrigger>
                                <CollapsibleContent>
                                    <div className="space-y-3 px-4 pb-4 max-h-48 overflow-y-auto">
                                        {availableSellers.map((seller) => (
                                            <label key={seller.id} className="flex cursor-pointer items-center justify-between">
                                                <div className="flex items-center gap-3">
                                                    <Checkbox
                                                        checked={selectedSellers.includes(seller.id)}
                                                        onCheckedChange={() => handleSellerToggle(seller.id)}
                                                    />
                                                    <span className="text-sm text-foreground">{seller.name}</span>
                                                </div>
                                                <span className="text-xs text-foreground/60">({seller.count})</span>
                                            </label>
                                        ))}
                                    </div>
                                </CollapsibleContent>
                            </div>
                        </Collapsible>
                    )}

                    {/* Category Filter - Dynamic from Medusa */}
                    {availableCategories.length > 0 && (
                        <Collapsible open={categoryOpen} onOpenChange={setCategoryOpen}>
                            <div className="rounded-lg border border-border bg-card">
                                <CollapsibleTrigger className="flex w-full items-center justify-between p-4">
                                    <span className="text-sm font-semibold uppercase tracking-wide text-foreground">Category</span>
                                    {categoryOpen ? (
                                        <ChevronUp className="h-4 w-4 text-foreground/70" />
                                    ) : (
                                        <ChevronDown className="h-4 w-4 text-foreground/70" />
                                    )}
                                </CollapsibleTrigger>
                                <CollapsibleContent>
                                    <div className="space-y-3 px-4 pb-4 max-h-48 overflow-y-auto">
                                        {availableCategories.map((category) => (
                                            <label key={category.id} className="flex cursor-pointer items-center justify-between">
                                                <div className="flex items-center gap-3">
                                                    <Checkbox
                                                        checked={selectedCategories.includes(category.id)}
                                                        onCheckedChange={() => handleCategoryToggle(category.id)}
                                                    />
                                                    <span className="text-sm text-foreground">{category.name}</span>
                                                </div>
                                                <span className="text-xs text-foreground/60">({category.count})</span>
                                            </label>
                                        ))}
                                    </div>
                                </CollapsibleContent>
                            </div>
                        </Collapsible>
                    )}

                    {/* Rating Filter */}
                    <Collapsible open={ratingOpen} onOpenChange={setRatingOpen}>
                        <div className="rounded-lg border border-border bg-card">
                            <CollapsibleTrigger className="flex w-full items-center justify-between p-4">
                                <span className="text-sm font-semibold uppercase tracking-wide text-foreground">Seller Rating</span>
                                {ratingOpen ? (
                                    <ChevronUp className="h-4 w-4 text-foreground/70" />
                                ) : (
                                    <ChevronDown className="h-4 w-4 text-foreground/70" />
                                )}
                            </CollapsibleTrigger>
                            <CollapsibleContent>
                                <div className="space-y-2 px-4 pb-4">
                                    {[4, 3, 2, 1].map((rating) => (
                                        <button
                                            key={rating}
                                            onClick={() => setMinRating(minRating === rating ? null : rating)}
                                            className={`flex w-full items-center gap-2 rounded-md p-2 transition-colors ${minRating === rating ? "bg-foreground/10 text-foreground" : "hover:bg-muted text-foreground"
                                                }`}
                                        >
                                            <div className="flex items-center gap-0.5">
                                                {[1, 2, 3, 4, 5].map((star) => (
                                                    <Star
                                                        key={star}
                                                        className={`h-4 w-4 ${star <= rating ? "fill-yellow-400 text-yellow-400" : "text-foreground/30"
                                                            }`}
                                                    />
                                                ))}
                                            </div>
                                            <span className="text-sm text-foreground">& Up</span>
                                        </button>
                                    ))}
                                </div>
                            </CollapsibleContent>
                        </div>
                    </Collapsible>

                    {/* Color Filter */}
                    <Collapsible open={colorOpen} onOpenChange={setColorOpen}>
                        <div className="rounded-lg border border-border bg-card">
                            <CollapsibleTrigger className="flex w-full items-center justify-between p-4">
                                <span className="text-sm font-semibold uppercase tracking-wide text-foreground">Color</span>
                                {colorOpen ? (
                                    <ChevronUp className="h-4 w-4 text-foreground/70" />
                                ) : (
                                    <ChevronDown className="h-4 w-4 text-foreground/70" />
                                )}
                            </CollapsibleTrigger>
                            <CollapsibleContent>
                                <div className="px-4 pb-4">
                                    <div className="flex flex-wrap gap-2">
                                        {availableColors.map((colorOption) => (
                                            <button
                                                key={colorOption.name}
                                                onClick={() => handleColorToggle(colorOption.name)}
                                                className={`group relative flex h-10 w-10 items-center justify-center rounded-full border-2 transition-all ${selectedColors.includes(colorOption.name)
                                                    ? "border-foreground ring-2 ring-foreground/20"
                                                    : "border-transparent hover:border-foreground/30"
                                                    }`}
                                                title={colorOption.name}
                                            >
                                                <div
                                                    className="h-7 w-7 rounded-full border border-foreground/20"
                                                    style={{ background: colorOption.color }}
                                                />
                                                {selectedColors.includes(colorOption.name) && (
                                                    <div className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-foreground text-background">
                                                        <svg
                                                            className="h-2.5 w-2.5"
                                                            fill="none"
                                                            viewBox="0 0 24 24"
                                                            stroke="currentColor"
                                                            strokeWidth={3}
                                                        >
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                                        </svg>
                                                    </div>
                                                )}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </CollapsibleContent>
                        </div>
                    </Collapsible>

                    {/* Seller Type */}
                    <Collapsible open={sellerTypeOpen} onOpenChange={setSellerTypeOpen}>
                        <div className="rounded-lg border border-border bg-card">
                            <CollapsibleTrigger className="flex w-full items-center justify-between p-4">
                                <span className="text-sm font-semibold uppercase tracking-wide text-foreground">Seller Type</span>
                                {sellerTypeOpen ? (
                                    <ChevronUp className="h-4 w-4 text-foreground/70" />
                                ) : (
                                    <ChevronDown className="h-4 w-4 text-foreground/70" />
                                )}
                            </CollapsibleTrigger>
                            <CollapsibleContent>
                                <div className="space-y-3 px-4 pb-4">
                                    {sellerTypes.map((type) => (
                                        <label key={type.id} className="flex cursor-pointer items-center gap-3">
                                            <Checkbox
                                                checked={selectedSellerTypes.includes(type.id)}
                                                onCheckedChange={() => handleSellerTypeToggle(type.id)}
                                            />
                                            <span className="text-sm text-foreground">{type.label}</span>
                                        </label>
                                    ))}
                                </div>
                            </CollapsibleContent>
                        </div>
                    </Collapsible>
                </div>

                {/* Action Buttons */}
                <div className="sticky bottom-0 mt-6 flex gap-3 bg-background pt-4 pb-2 border-t">
                    <Button 
                        variant="outline" 
                        className="flex-1 bg-background text-foreground border-border hover:bg-muted" 
                        onClick={clearFilters}
                    >
                        Clear All
                    </Button>
                    <Button 
                        className="flex-1 bg-foreground text-background hover:bg-foreground/90" 
                        onClick={applyFilters}
                    >
                        Show Results
                    </Button>
                </div>
            </SheetContent>
        </Sheet>
    )
}
