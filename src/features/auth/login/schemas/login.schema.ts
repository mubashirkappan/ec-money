import { z } from "zod";

export const loginSchema = z.object({
  email_or_mobile: z
    .string()
    .trim()
    .min(1, "Username is required")
    .refine(
      (value) => {
        const isEmail = z.email().safeParse(value).success;
        const isNumber = /^[+]?[0-9]{8,15}$/.test(value);

        return isEmail || isNumber;
      },
      "Enter a valid email address or mobile number"
    ),

  password: z.string().min(1, "Password is required"),

  rememberMe: z.boolean(),
});

export type LoginFormValues = z.infer<typeof loginSchema>;