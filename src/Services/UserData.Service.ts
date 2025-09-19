export async function getUserData(token: string) {
  const res = await fetch(
    "https://ecommerce.routemisr.com/api/v1/auth/verifyToken",
    {
      headers: {
        token: token as string,
      },
    }
  );

  const userData = await res.json();
  return userData;
}
