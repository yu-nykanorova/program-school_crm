import joi from "joi";

export const queryValidator = (
    queryOrderEnum: object,
    options?: {
        pageSize?: number;
        defaultOrder?: string;
        additionalFields?: Record<string, joi.Schema>;
    },
) => {
    return joi.object({
        pageSize: joi
            .number()
            .integer()
            .min(1)
            .max(100)
            .default(options?.pageSize),
        page: joi.number().integer().min(1).default(1),
        order: joi
            .string()
            .valid(
                ...Object.values(queryOrderEnum),
                ...Object.values(queryOrderEnum).map((item) => `-${item}`),
            )
            .default(options?.defaultOrder),
        ...options?.additionalFields,
    });
};
