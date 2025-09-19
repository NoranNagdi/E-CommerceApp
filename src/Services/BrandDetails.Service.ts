export async function getBrand(id: string) {
  try {
    const res = await fetch(
      `https://ecommerce.routemisr.com/api/v1/brands/${id}`
    );
    if (!res.ok) throw new Error("Failed to fetch Brand Details");
    const data = await res.json();
    return data;
  } catch (error) {
    return { error: error as Error };
  }
}
