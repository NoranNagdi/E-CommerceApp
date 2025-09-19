"use server";
import { decode } from "next-auth/jwt";
import { cookies } from "next/headers";

export async function getLoggedUserToken() {
  const cookieStore = await cookies();

  const encryptedToken =
    cookieStore.get("next-auth.session-token")?.value ||
    cookieStore.get("__secure-next-auth.session-token")?.value;

  const decryptedToken = await decode({
    token: encryptedToken,
    secret: process.env.AUTH_SECRET!,
  });

  return decryptedToken?.token;
}
