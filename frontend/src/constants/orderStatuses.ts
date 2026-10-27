export const orderStatuses = {
    TOTAL: "total",
    IN_WORK: "In work",
    NEW: "New",
    AGREE: "Agree",
    DISAGREE: "Disagree",
    DUBBING: "Dubbing",
    NULL: "null"
} as const;

export type OrderStatus = typeof orderStatuses[keyof typeof orderStatuses];

export const orderStatusesFilter = {
    IN_WORK: "In work",
    NEW: "New",
    AGREE: "Agree",
    DISAGREE: "Disagree",
    DUBBING: "Dubbing",
} as const;

export type OrderStatusesFilter = typeof orderStatusesFilter[keyof typeof orderStatusesFilter];


