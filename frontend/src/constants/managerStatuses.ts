export const managerStatuses = {
    NEW: "new",
    ACTIVE: "active",
    BANNED: "banned",
} as const;

export type ManagerStatus = typeof managerStatuses[keyof typeof managerStatuses];

