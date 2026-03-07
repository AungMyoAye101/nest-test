import * as z from 'zod';

export const userSchema = z
  .object({
    name: z.string(),
    email: z.email(),
    password: z.string().min(6, 'Password must be at least 6 characters.'),
  })
  .required();

export type CreateUserType = z.infer<typeof userSchema>;
