import { z } from "zod";

export const blogSchema = z.object({

    title: z
        .string()
        .trim()
        .min(3, "Title must be at least 3 characters.")
        .max(100, "Title cannot exceed 100 characters."),

    content: z
        .string()
        .trim()
        .min(10, "Content must be at least 10 characters.")
        .max(10000, "Content is too long."),

    tags: z
        .array(
            z.string().trim().min(1)
        )
        .optional()
        .default([]),

});