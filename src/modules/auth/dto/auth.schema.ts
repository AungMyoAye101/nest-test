import * as z from "zod"

export const createUserSchema = z.object({
    name: z
        .string("Name is required.")
        .min(3, "Name at least 3 charaters."),
    email: z
        .email("Invalid email."),
    password: z
        .string("Password is required.")
        .min(6, "Password at least 6 characters.")
})

export const loginSchema = z.object({
    email: z
        .email("Invalid email."),
    password: z
        .string("Password is required.")
        .min(6, "Password at least 6 characters.")
})

export type CreateUserType = z.infer<typeof createUserSchema>;
export type LoginType = z.infer<typeof loginSchema>;