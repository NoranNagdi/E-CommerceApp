export async function getBrands(limit = 40) {
  try {
    const res = await fetch(
      `https://ecommerce.routemisr.com/api/v1/brands?limit=${limit}`
    );
    if (!res.ok) throw new Error("Failed to fetch Brands");
    const data = await res.json();
    return data;
  } catch (error) {
    return { error: error as Error };
  }
}
