export const courses = {
    FS: "FS",
    QACX: "QACX",
    JCX: "JCX",
    JSCX: "JSCX",
    FE: "FE",
    PCX: "PCX",
} as const;

export type Course = typeof courses[keyof typeof courses];

