import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { Adapter } from "next-auth/adapters";
import prisma from "@/lib/prisma";
import Credentials from "next-auth/providers/credentials"



export const BASE_PATH = "/api/auth";

const authOptions = {
  adapter: PrismaAdapter(prisma) as Adapter,
  providers: [
    Credentials({})
  ],
  basePath: BASE_PATH,
  secret: process.env.AUTH_SECRET,
};

export const { handlers, auth, signIn, signOut } = NextAuth(authOptions);
