import { z } from 'zod';

export const commentSchema = z.object({
    text: z
        .string()
        .trim()
        .min(1, "Enter at least 1 character")
        .max(1000, "Enter maximum 1000 characters")
});

export type CommentData = z.infer<typeof commentSchema>;
