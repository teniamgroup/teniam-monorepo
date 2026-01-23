import { listProducts } from "@/lib/data/products"
import { HomeProductListing } from "@/components/home-product-listing"

export default async function Page({
    params,
    searchParams,
}: {
    params: Promise<{ locale: string }>
    searchParams: Promise<{ category?: string; subcategory?: string }>
}) {
    const { locale } = await params
    const { category, subcategory } = await searchParams

    const { response } = await listProducts({
        countryCode: locale,
        queryParams: { limit: 50 }
    })

    return (
        <HomeProductListing
            initialProducts={response.products}
            locale={locale}
            selectedCategory={category || null}
            selectedSubcategory={subcategory || null}
        />
    )
}
