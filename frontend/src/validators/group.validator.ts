import { z } from 'zod';

export const groupCreateSchema = z.object({
    name: z
        .string()
        .trim()
        .min(2, "Name must be at least 2 characters")
        .max(50, "Name must not exceed 50 characters")
});

export type GroupCreateData = z.infer<typeof groupCreateSchema>;
