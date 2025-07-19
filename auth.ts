import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import { prisma } from "./prisma";
import Credentials from "next-auth/providers/credentials";
import { getUserByEmail } from "@/lib/db/user";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    GitHub,
    Credentials({
      credentials: {
        email: { label: "Email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials, request) => {
        console.log("do we get here?");
        const user = await getUserByEmail(credentials.email as string);
        console.log(user);
        if (!user) return null;
        return user;
      },
    }),
  ],
  adapter: PrismaAdapter(prisma),
  pages: { signIn: "/auth/login" },
  session: {
    strategy: "jwt",
  },
});
