export const orderQuerySort = {
    PUBLIC_ID: "publicId",
    NAME: "name",
    SURNAME: "surname",
    EMAIL: "email",
    PHONE: "phone",
    AGE: "age",
    COURSE: "course",
    COURSE_FORMAT: "courseFormat",
    COURSE_TYPE: "courseType",
    ORDER_STATUS: "orderStatus",
    SUM: "sum",
    ALREADY_PAID: "alreadyPaid",
    GROUP: "group",
    CREATED_AT: "createdAt",
    MANAGER: "manager",
} as const;

export type OrderQuerySort = typeof orderQuerySort[keyof typeof orderQuerySort];

export type OrderQuerySortFull = OrderQuerySort | `-${OrderQuerySort}`;

