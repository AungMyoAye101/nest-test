import { paginationSchema } from "src/common/shared/pagination-schema"
import * as z from "zod"

export const createPostSchema = z.object({
    title: z
        .string("Title is required.")
        .min(1, "Title must be at least one character contain."),
    content: z
        .string("Content is required.")
        .min(12, "Content must be at least 12 character contain."),
})
export const updatePostSchema = z.object({
    title: z
        .string("Title is required.")
        .min(1, "Title must be at least one character contain.")
        .optional(),
    content: z
        .string("Content is required.")
        .min(12, "Content must be at least 12 character contain.")
        .optional(),
})

export const postQueryschema = paginationSchema.extend({
    search: z.string().trim().min(1).optional(),
    sorting: z.enum(['desc', 'asc']).optional().default('desc')
})

export type CreatePostType = z.infer<typeof createPostSchema>
export type UpdatePostType = z.infer<typeof updatePostSchema>
export type PostQueryType = z.infer<typeof postQueryschema>