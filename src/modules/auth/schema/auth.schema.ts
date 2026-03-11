import * as z from "zod"

export const createUserSchema = z.object({
    name: z.string().min(2, "2 letters"),
    email: z.email(),
    password: z.string().min(6, "Password 6 characters")
})

export const loginSchema = z.object({
    email: z.email(),
    password: z.string().min(6, "6 characters long.")
})

export type CreateUserType = z.infer<typeof createUserSchema>
export type LoginType = z.infer<typeof loginSchema>