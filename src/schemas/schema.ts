import { z } from "zod";

export const signInSchema = z.object({
  email: z.email("Invalid email").min(1, { message: "Email is required" }),
  password: z
    .string()
    .min(1, { message: "Password is required" })
    .min(6, { message: "Password should have 6 characters and above" }),
});

export const signUpSchema = z
  .object({
    email: z.email("Invalid email").min(1, { message: "Email is required" }),
    password: z
      .string()
      .min(1, { message: "Password is required" })
      .min(6, { message: "Password should have 6 characters and above" }),
    confirmPassword: z.string().min(1, "Confirm password is required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords does not match",
    path: ["confirmPassword"],
  });
