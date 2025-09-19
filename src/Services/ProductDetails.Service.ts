export async function getProduct(id: string) {
  try {
    const res = await fetch(
      `https://ecommerce.routemisr.com/api/v1/products/${id}`
    );
    if (!res.ok) throw new Error("Failed to fetch Product Details");
    const data = await res.json();
    return data;
  } catch (error) {
    return { error: error as Error };
  }
}
