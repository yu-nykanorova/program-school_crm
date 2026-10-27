export const courseFormats = {
    STATIC: "static",
    ONLINE: "online",
} as const;

export type CourseFormat = typeof courseFormats[keyof typeof courseFormats];

