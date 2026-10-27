export const roles = {
    ADMIN: "admin",
    MANAGER: "manager",
} as const;

export type Role = typeof roles[keyof typeof roles];