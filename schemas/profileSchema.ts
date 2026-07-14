import { z } from "zod";

export const profileSchema = z.object({

    name: z
        .string()
        .min(2),

    headline: z
        .string()
        .optional(),

    bio: z
        .string()
        .optional(),

    github: z
        .string()
        .optional(),

    linkedin: z
        .string()
        .optional(),

});