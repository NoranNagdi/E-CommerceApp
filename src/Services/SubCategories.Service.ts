export async function getSubCategoriesOnCategory(id: string) {
  try {
    const res = await fetch(
      `https://ecommerce.routemisr.com/api/v1/categories/${id}/subcategories`
    );
    if (!res.ok) throw new Error("Failed to fetch SubCategories");
    const data = await res.json();
    return data;
  } catch (error) {
    return { error: error as Error };
  }
}
