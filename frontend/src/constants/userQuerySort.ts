export const userQuerySort = {
    NAME: "name",
    CREATED_AT: "createdAt",
} as const;

export type UserQuerySort = typeof userQuerySort[keyof typeof userQuerySort];

