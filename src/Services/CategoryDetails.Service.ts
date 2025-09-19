export async function getCategory(id: string) {
  try {
    const res = await fetch(
      `https://ecommerce.routemisr.com/api/v1/categories/${id}`
    );
    if (!res.ok) throw new Error("Failed to fetch Category Details");
    const data = await res.json();
    return data;
  } catch (error) {
    return { error: error as Error };
  }
}
