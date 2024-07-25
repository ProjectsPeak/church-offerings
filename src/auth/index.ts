import NextAuth, { User } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter"
import CredentialsProvider from "next-auth/providers/credentials";

import prisma from "@/lib/prisma";
import { Adapter } from "next-auth/adapters";

export const BASE_PATH = "/api/auth";

const authOptions = {
  adapter: PrismaAdapter(prisma) as Adapter,
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req): Promise<User | null>  {
        const users = [
          {
            id: "1",
            userName: "johnDoe",
            name: "John Doe",
            email: "john.doe@example.com",
            password: "password123",
          },
          {
            id: "2",
            userName: "janeSmith",
            name: "Jane Smith",
            email: "jane.smith@example.com",
            password: "password456",
          },
        ];

        const user = users.find((user) =>
            user.userName === credentials?.username &&
            user.password === credentials?.password
        );

        return user || null;
      },
    }),
  ],
  basePath: BASE_PATH,
  secret: process.env.AUTH_SECRET,
};

export const { handlers, auth, signIn, signOut } = NextAuth(authOptions);
