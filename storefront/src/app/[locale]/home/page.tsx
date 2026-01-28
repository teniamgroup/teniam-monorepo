import { listProducts } from "@/lib/data/products"
import { getCategoryByHandle, listCategories } from "@/lib/data/categories"
import { HomeProductListing } from "@/components/home-product-listing"
import { getAllCategoryIdsIncludingChildren } from "@/lib/helpers/get-all-category-ids"

export default async function Page({
    params,
    searchParams,
}: {
    params: Promise<{ locale: string }>
    searchParams: Promise<{ category?: string }>
}) {
    const { locale } = await params
    const { category: categoryHandle } = await searchParams

    // If category is specified, look up the category and filter products
    let categoryId: string | undefined
    let categoryName: string | null = null
    let categoryIds: string[] = []

    if (categoryHandle) {
        const category = await getCategoryByHandle(categoryHandle)
        if (category) {
            categoryId = category.id
            categoryName = category.name

            // Fetch all categories to check for children
            const { categories: allCategories } = await listCategories()

            // Get all category IDs including children for this category
            categoryIds = getAllCategoryIdsIncludingChildren(allCategories, category.id)
        }
    }

    // Fetch products, optionally filtered by category
    const { response } = await listProducts({
        countryCode: locale,
        queryParams: { limit: 50 },
        category_id: categoryIds.length > 0 ? categoryIds : categoryId,
    })

    return (
        <HomeProductListing
            initialProducts={response.products}
            locale={locale}
            selectedCategory={categoryName}
            categoryHandle={categoryHandle || null}
        />
    )
}
