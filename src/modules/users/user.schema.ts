import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .min(1, "Email is required")
    .email("Invalid email"),
  password: z
    .string({ required_error: "Password is required" })
    .min(1, "Password is required")
    .min(8, "Password must be more than 8 characters")
    .max(32, "Password must be less than 32 characters"),
});

export type LoginRequest = z.infer<typeof loginSchema>;

export const signupSchema = loginSchema.extend({
  name: z
    .string({ required_error: "Name is required" })
    .min(1, "Name is required")
    .optional(),
});

export type SignupRequest = z.infer<typeof signupSchema>;

export const meSchema = z.object({
  id: z.number(),
  email: z.string(),
});

export type MeRequest = z.infer<typeof meSchema>;
