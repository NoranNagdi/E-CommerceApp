import { getLoggedUserToken } from "@/lib/serverUtils";

export async function getCart() {
  const token = await getLoggedUserToken();
  try {
    const res = await fetch("https://ecommerce.routemisr.com/api/v1/cart", {
      headers: {
        token: token as string,
      },
    });
    if (!res.ok) throw new Error("Failed to get cart items");
    const data = await res.json();
    return data;
  } catch (error) {
    return { error: error as Error };
  }
}
export async function clearCart() {
  const token = await getLoggedUserToken();
  try {
    const res = await fetch("https://ecommerce.routemisr.com/api/v1/cart", {
      method: "DELETE",
      headers: {
        token: token as string,
      },
    });
    if (!res.ok) throw new Error("Failed to clear cart");
    const data = await res.json();

    return data;
  } catch (error) {
    return { error: error as Error };
  }
}
export async function addToCart(productId: string) {
  const token = await getLoggedUserToken();
  try {
    const res = await fetch("https://ecommerce.routemisr.com/api/v1/cart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        token: token as string,
      },
      body: JSON.stringify({ productId }),
    });

    if (!res.ok) throw new Error("Failed to add product to cart");
    const data = await res.json();

    return data;
  } catch (error) {
    return { error: error as Error };
  }
}
export async function removeFromCart(productId: string) {
  const token = await getLoggedUserToken();
  try {
    const res = await fetch(
      `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          token: token as string,
        },
      }
    );

    if (!res.ok) throw new Error("Failed to remove product from cart");
    const data = await res.json();

    return data;
  } catch (error) {
    return { error: error as Error };
  }
}
export async function updateCart(productId: string, count: number) {
  const token = await getLoggedUserToken();
  try {
    const res = await fetch(
      `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          token: token as string,
        },
        body: JSON.stringify({ count }),
      }
    );

    if (!res.ok) throw new Error("Failed to update item quantity in cart");
    const data = await res.json();

    return data;
  } catch (error) {
    return { error: error as Error };
  }
}
