import { getLoggedUserToken } from "@/lib/serverUtils";

export async function getWishlist() {
  const token = await getLoggedUserToken();
  try {
    const res = await fetch("https://ecommerce.routemisr.com/api/v1/wishlist", {
      headers: {
        token: token as string,
      },
    });
    if (!res.ok) throw new Error("Failed to get wishlist items");
    const data = await res.json();
    return data;
  } catch (error) {
    return { error: error as Error };
  }
}

export async function addToWishlist(productId: string) {
  const token = await getLoggedUserToken();
  try {
    const res = await fetch("https://ecommerce.routemisr.com/api/v1/wishlist", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        token: token as string,
      },
      body: JSON.stringify({ productId }),
    });

    if (!res.ok) throw new Error("Failed to add product to wishlist");
    const data = await res.json();

    return data;
  } catch (error) {
    return { error: error as Error };
  }
}
export async function removeFromWishlist(productId: string) {
  const token = await getLoggedUserToken();
  try {
    const res = await fetch(
      `https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          token: token as string,
        },
      }
    );

    if (!res.ok) throw new Error("Failed to remove product from wishlist");
    const data = await res.json();

    return data;
  } catch (error) {
    return { error: error as Error };
  }
}
