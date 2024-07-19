import NextAuth, { NextAuthOptions } from "next-auth";

export const BASE_PATH = "/api/auth";

const authOptions = {
  providers:[],
  basePath: BASE_PATH,
  secret:process.env.NEXTAUTH_SECRET
}

export const {handlers, auth, signIn, signOut } = NextAuth(authOptions)