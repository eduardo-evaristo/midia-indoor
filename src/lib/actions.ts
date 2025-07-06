"use server";

import { signIn, signOut } from "@/../auth";
import { z } from "zod";
import { prisma } from "@/../prisma";
import { error } from "console";
import { getUserByEmail, insertUser } from "./db/user";
import { redirect } from "next/navigation";

export async function login() {
  await signIn("github", { redirectTo: "/" });
}

export async function logout() {
  await signOut({ redirectTo: "/" });
}

const formSchema = z
  .object({
    email: z.string().email(),
    password: z.string().min(8).max(50),
    confirmPassword: z.string().min(8).max(50),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  })
  .refine(
    async (data) => {
      const user = await getUserByEmail(data.email);
      return user ? false : true;
    },
    { message: "This email is already being used", path: ["email"] }
  );

export async function createUser(
  initialState: {
    errors: {
      email?: string[] | undefined;
      password?: string[] | undefined;
      confirmPassword?: string[] | undefined;
    };
  },
  formData: FormData
) {
  // Zod the formData fields
  const validatedFields = await formSchema.safeParseAsync({
    email: formData.get("email"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
  });

  // Check for unsuccess
  if (!validatedFields.success) {
    console.log(validatedFields.error?.flatten());
    // And return if needed
    return {
      errors: validatedFields.error?.flatten().fieldErrors,
    };
  }

  // Create new user
  const user = await insertUser({
    email: formData.get("email") as string,
  });

  // Check for any errors and return if needed
  if (!user) return { errors: "Something went wrong" };

  // TODO: Enhance this
  // Upon success, redirect users to index
  redirect("/");
}
