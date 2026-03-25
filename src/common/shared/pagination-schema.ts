import * as z from "zod";
export const paginationSchema = z.object({
    page: z.coerce.number().int().min(1).optional().default(1),
    limit: z.coerce.number().int().min(1).max(10).optional().default(10),
})
export type paginationType = z.infer<typeof paginationSchema>