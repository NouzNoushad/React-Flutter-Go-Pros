import { z } from "zod";

// login validation
export const LoginFormValidation = z.object({
    email: z.email({ message: "Please enter valid email" }),
    password: z.string()
        .nonempty("Password is required")
        .min(8, "Password must be at least 8 characters long")
        .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
        .regex(/[0-9]/, "Password must contain at least one number")
        .regex(/[!@#$^&*(),.?":{}|<>]/, "Password must contain at least one special character"),
})

export type LoginSchemaType = z.infer<typeof LoginFormValidation>