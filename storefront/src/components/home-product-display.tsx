"use client"

import { AlgoliaProductsListing, ProductListing } from "@/components/sections"
import { getRegion } from "@/lib/data/regions"

interface HomeProductDisplayProps {
    locale: string
    bot: boolean
    hasAlgolia: boolean
}

export function HomeProductDisplay({ locale, bot, hasAlgolia }: HomeProductDisplayProps) {
    return (
        <div className="container">
            <h1 className="heading-xl uppercase mb-6">All Products</h1>
            {bot || !hasAlgolia ? (
                <ProductListing showSidebar={false} locale={locale} />
            ) : (
                <ProductListing showSidebar={false} locale={locale} />
            )}
        </div>
    )
}
