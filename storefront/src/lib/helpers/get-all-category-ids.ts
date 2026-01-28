import { HttpTypes } from '@medusajs/types';

/**
 * Recursively collects all category IDs including the parent category and all its descendants
 * @param categories - Array of all categories from the API
 * @param categoryId - The parent category ID to get all children for
 * @returns Array of all category IDs including the parent and all children
 */
export function getAllCategoryIdsIncludingChildren(
    categories: HttpTypes.StoreProductCategory[],
    categoryId: string
): string[] {
    const result: string[] = [categoryId];

    function collectChildren(parentId: string) {
        const children = categories.filter(cat => cat.parent_category_id === parentId);
        children.forEach(child => {
            result.push(child.id);
            collectChildren(child.id);
        });
    }

    collectChildren(categoryId);
    return result;
}

/**
 * Checks if a category has any children
 * @param categories - Array of all categories from the API
 * @param categoryId - The category ID to check
 * @returns Boolean indicating if the category has children
 */
export function hasChildren(
    categories: HttpTypes.StoreProductCategory[],
    categoryId: string
): boolean {
    return categories.some(cat => cat.parent_category_id === categoryId);
}