import NextAuth, { DefaultSession } from "next-auth";
import email from "./../../node_modules/next-auth/core/lib/email/signin.d";

declare module "next-auth" {
  interface User {
    user: {
      name: string;
      email: string;
      role: string;
    };
    token: string;
  }
  interface Session {
    user: User.user;
  }
}
