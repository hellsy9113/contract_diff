import { z } from "zod";

export const signupSchema = z.object({
  email: z
    .string()
    .email({ message: "Invalid email address" }),

  password: z
    .string()
    .min(8, {
      message:
        "Password must be at least 8 characters long",
    })
    .max(50),

  fullName: z
    .string()
    .min(2, {
      message:
        "Name must be at least 2 characters long",
    })
    .max(100),
});

export type SignupInput = z.infer<typeof signupSchema>;
