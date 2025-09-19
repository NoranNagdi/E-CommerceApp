"use server";

import { SignupFormStateType, signupSchema } from "@/Schemas/signupSchema";

export async function signUp(
  formState: SignupFormStateType,
  formData: FormData
): Promise<SignupFormStateType> {
  const actualData = {
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
    rePassword: formData.get("rePassword"),
    phone: formData.get("phone"),
  };

  const parsedData = signupSchema.safeParse(actualData);
  if (!parsedData.success) {
    return {
      success: false,
      error: parsedData.error.flatten().fieldErrors,
      message: null,
    };
  }
  try {
    const res = await fetch(
      `https://ecommerce.routemisr.com/api/v1/auth/signup`,
      {
        method: "POST",
        body: JSON.stringify(actualData),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await res.json();
    if (!res.ok) {
      return {
        success: false,
        error: {},
        message: data.message,
      };
    }
    return {
      success: true,
      error: {},
      message: data.message,
    };
  } catch (error) {
    return {
      success: false,
      error: {},
      message: error as string,
    };
  }
}
