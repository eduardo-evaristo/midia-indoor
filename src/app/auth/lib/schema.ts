import { z } from "zod";
import { getUserByEmail } from "@/lib/db/user";

export const registerSchema = z
  .object({
    email: z.string().email(),
    password: z.string().min(8).max(50),
    confirmPassword: z.string().min(8).max(50),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export type RegisterSchema = z.infer<typeof registerSchema>;

export const serverRegisterSchema = registerSchema.refine(
  async (data) => {
    const user = await getUserByEmail(data.email);
    return user ? false : true;
  },
  { message: "This email is already being used", path: ["email"] }
);

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(50),
});
