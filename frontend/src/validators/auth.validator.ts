import { z } from 'zod';
import {regEx} from "../constants/regEx.ts";

export const loginSchema = z.object({
    email: z
        .string()
        .min(1, "Enter email address")
        .email("Invalid email address"),
    password: z
        .string()
        .min(1, "Enter password"),
});

export const activateSchema = z.object({
    password: z
        .string()
        .min(8, "Password must contain at least 8 characters")
        .max(16, "Password must contain maximum 16 characters")
        .regex(regEx.PASSWORD),

    confirmPassword: z
        .string()
        .min(1, "Confirm password"),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
});

export type LoginData = z.infer<typeof loginSchema>;
export type ActivateData = z.infer<typeof activateSchema>;