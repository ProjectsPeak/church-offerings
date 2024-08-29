"use server";
import * as z from "zod";
import bcrypt from "bcryptjs";
import prisma from "@/lib/prisma";
import { RegisterSchema } from "../schemas";
import { getUserByEmail } from "../data/user";
import { generateVerificationToken } from "@/lib/tokens";

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  const validatedFields = RegisterSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  //Hash password
  const { name, email, password } = validatedFields.data;
  const hashedPassword = await bcrypt.hash(password, 10);

  //Check if email exist
  const existingUser = await getUserByEmail(email);

  if (existingUser) {
    return { error: "Email already in use!" };
  }

  //Create a user
  await prisma.user.create({
    data: {
      name,
      email,
      hashedPassword,
    },
  });

  //TODO: Send verification token email

  const verificationToken = await generateVerificationToken(email);

  return { success: "Confirmation email sent!" };
};
