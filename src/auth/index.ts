import NextAuth, { Session } from "next-auth";
import { UserRole } from "@prisma/client";
import { JWT } from "@auth/core/jwt";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { Adapter } from "next-auth/adapters";
import prisma from "@/lib/prisma";
import Credentials from "next-auth/providers/credentials";
import { LoginSchema } from "../../schemas";
import { getUserByEmail, getUserById } from "../../data/user";
import bcrypt from "bcryptjs";




const authOptions = {
  adapter: PrismaAdapter(prisma) as Adapter,
  providers: [
    Credentials({
      async authorize(credentials) {
        const validatedFields = LoginSchema.safeParse(credentials);

        if (validatedFields.success) {
          const { email, password } = validatedFields.data;

          const user = await getUserByEmail(email);

          if (!user || !user.hashedPassword) return null;

          const passwordsMatch = await bcrypt.compare(
            password,
            user.hashedPassword
          );

          if (passwordsMatch) return user;
        }

        return null;
      },
    }),
  ],
  secret: process.env.AUTH_SECRET,
  session: {
    strategy: "jwt" as "jwt",
  },
  callbacks: {
    async jwt({ token }: { token: JWT }) {
      if (!token.sub) return token;
      const existingUser = await getUserById(token.sub)

     //extend the token to add user role
      token.role = existingUser?.role;

      return token;
    },
    async session({ session, token }: { session:Session, token: JWT }) {
      //Set userId in session
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }

      //set role in session
      if (token.role && session.user) {
        session.user.role = token.role as UserRole;
      }

      return session;
    },
  },
};

export const { handlers, auth, signIn, signOut } = NextAuth(authOptions);
