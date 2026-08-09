import { z } from "zod";

export const loginSchema = z.object({
  username: z.email("Enter a valid email address or mobile number"),

  password: z
    .string()
    .min(8, "Password must be at least 8 characters"),

  rememberMe: z.boolean(),
});

export type LoginFormValues = z.infer<typeof loginSchema>;