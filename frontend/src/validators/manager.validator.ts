import { z } from 'zod';
import {regEx} from "../constants/regEx.ts";

export const createManagerSchema = z.object({
    name: z.string().trim().min(1,"Name is required").regex(regEx.NAME, "Name must be from 2 to 20 characters"),
    surname: z.string().trim().min(1, "Surname is required").regex(regEx.NAME, "Surname must be from 2 to 20 characters"),
    email: z.string().trim().min(1, "Email address is required")
        .email("Invalid email address"),
});

export type CreateManagerData = z.infer<typeof createManagerSchema>;