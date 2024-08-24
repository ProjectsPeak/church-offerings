import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { Adapter } from "next-auth/adapters";
import prisma from "@/lib/prisma";
import Credentials from "next-auth/providers/credentials"
import { LoginSchema } from "../../schemas";
import { getUserByEmail } from "../../data/user";
import bcrypt from "bcryptjs";



const authOptions = {
  adapter: PrismaAdapter(prisma) as Adapter,
  providers: [
    Credentials({
      async authorize(credentials){
         const validatedFields = LoginSchema.safeParse(credentials);

         if (validatedFields.success) {
          const {email, password} = validatedFields.data;

          const user = await getUserByEmail(email);

          if (!user || !user.hashedPassword) return null;

          const passwordsMatch = await bcrypt.compare(password, user.hashedPassword);

          if (passwordsMatch) return user;
         }

         return null;
      }
    }),
  ],
  secret: process.env.AUTH_SECRET,
  session: {
     strategy: 'jwt' as 'jwt'
  },

};

export const { handlers, auth, signIn, signOut } = NextAuth(authOptions);
