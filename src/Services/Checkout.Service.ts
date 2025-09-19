"use server";

import { getLoggedUserToken } from "@/lib/serverUtils";
import { AddressFormStateType, addressSchema } from "@/Schemas/addressSchema";

export async function handlePayment(
  formState: AddressFormStateType,
  formData: FormData
): Promise<AddressFormStateType> {
  const shippingAddress = {
    details: formData.get("details"),
    phone: formData.get("phone"),
    city: formData.get("city"),
  };

  const cartId = formData.get("cartId");
  const paymentMethod = formData.get("paymentMethod");

  const parsedData = addressSchema.safeParse({
    ...shippingAddress,
    cartId,
    paymentMethod,
  });
  if (!parsedData.success) {
    return {
      success: false,
      error: parsedData.error.flatten().fieldErrors,
      message: null,
      callbackURL: "/cart",
      paymentMethod: paymentMethod as string,
    };
  }
  try {
    const token = await getLoggedUserToken();
    const endPoint =
      paymentMethod === "cash"
        ? `api/v1/orders/${cartId}`
        : `api/v1/orders/checkout-session/${cartId}?url=${process.env.NEXTAUTH_URL}`;
    const res = await fetch(`https://ecommerce.routemisr.com/${endPoint}`, {
      method: "POST",
      body: JSON.stringify(shippingAddress),
      headers: {
        "Content-Type": "application/json",
        token: token as string,
      },
    });
    const data = await res.json();
    if (!res.ok) {
      return {
        success: false,
        error: {},
        message: data.message || "Failed to place order",
        callbackURL: "/cart",
        paymentMethod: paymentMethod as string,
      };
    }
    return {
      success: true,
      error: {},
      message: data.message || "Order Placed Successfully",
      callbackURL: paymentMethod === "cash" ? "/allorders" : data.session.url,
      paymentMethod: paymentMethod as string,
    };
  } catch (error) {
    return {
      success: false,
      error: {},
      message: (error as string) || "Failed to place order",
      callbackURL: "/cart",
      paymentMethod: paymentMethod as string,
    };
  }
}
