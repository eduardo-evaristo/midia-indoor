"use server";

import { redirect } from "next/navigation";
import bcrypt from "bcrypt";
import { signIn, signOut } from "@/../auth";
import { loginSchema, serverRegisterSchema } from "./schema";
import { insertUser } from "@/lib/db/user";

export async function login() {
  await signIn("github", { redirectTo: "/" });
}

export async function logout() {
  await signOut({ redirectTo: "/" });
}

export async function loginCredentials(state: any, formData: FormData) {
  const validatedFields = await loginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  const email = formData.get("email");
  const password = formData.get("password");

  // Check for unsuccess
  if (!validatedFields.success) {
    console.log(validatedFields.error?.flatten());
    // And return if needed
    return {
      errors: validatedFields.error?.flatten().fieldErrors,
    };
  }

  try {
    await signIn("credentials", {
      redirect: false,
      email,
      password,
    });
  } catch (error) {
    console.error("Login error:", error);
    return { errors: { general: "Login failed. Please try again." } };
  }
}

export async function createUser(state, formData: FormData) {
  // Zod the formData fields
  const validatedFields = await serverRegisterSchema.safeParseAsync({
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

  // Extracting values into variables for convenience
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  //TODO: Extract this into a function in another file
  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 15);

  // Create new user
  const user = await insertUser({
    email,
  });

  // Check for any errors and return if needed
  if (!user) return { errors: "Something went wrong" };

  // TODO: Enhance this
  // Upon success, redirect users to index
  redirect("/");
}
