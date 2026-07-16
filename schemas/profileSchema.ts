import { z } from "zod";

export const profileSchema = z.object({

    name: z
        .string()
        .trim()
        .min(2, "Name must be at least 2 characters.")
        .max(50, "Name cannot exceed 50 characters."),

    headline: z
        .string()
        .trim()
        .max(80, "Headline cannot exceed 80 characters.")
        .optional(),

    bio: z
        .string()
        .trim()
        .max(500, "Bio cannot exceed 500 characters.")
        .optional(),

    github: z
        .string()
        .url("Please enter a valid GitHub URL.")
        .optional()
        .or(z.literal("")),

    linkedin: z
        .string()
        .url("Please enter a valid LinkedIn URL.")
        .optional()
        .or(z.literal("")),

    skills: z
        .array(
            z.string()
                .trim()
                .min(1)
                .max(30)
        )
        .max(20, "Maximum of 20 skills.")
        .optional(),

});     