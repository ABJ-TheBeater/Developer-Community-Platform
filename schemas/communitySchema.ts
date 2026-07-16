import { z } from "zod";

export const communitySchema = z.object({

    name: z
        .string()
        .trim()
        .min(3, "Community name must be at least 3 characters.")
        .max(50, "Community name cannot exceed 50 characters."),

    category: z.enum([
        "General",
        "Frontend",
        "Backend",
        "Full Stack",
        "Web Development",
        "Mobile",
        "Database",
        "DevOps",
        "AI",
    ]).default("General"),

    description: z
        .string()
        .trim()
        .min(10, "Description must be at least 10 characters.")
        .max(300, "Description cannot exceed 300 characters."),

});