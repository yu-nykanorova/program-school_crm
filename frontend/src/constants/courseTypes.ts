export const courseTypes = {
    PRO: "pro",
    MINIMAL: "minimal",
    PREMIUM: "premium",
    INCUBATOR: "incubator",
    VIP: "vip",
} as const;

export type CourseType = typeof courseTypes[keyof typeof courseTypes];

