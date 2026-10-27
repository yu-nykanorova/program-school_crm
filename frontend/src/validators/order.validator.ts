import {z} from "zod";
import {regEx} from "../constants/regEx.ts";
import {type OrderStatusesFilter, orderStatusesFilter} from "../constants/orderStatuses.ts";
import {type Course, courses} from "../constants/courses.ts";
import {type CourseFormat, courseFormats} from "../constants/courseFormats.ts";
import {type CourseType, courseTypes} from "../constants/courseTypes.ts";

const coursesValues = Object.values(courses) as [
    Course,
    ...Course[],
];
const courseFormatValues = Object.values(courseFormats) as [
    CourseFormat,
    ...CourseFormat[],
];
const courseTypeValues = Object.values(courseTypes) as [
    CourseType,
    ...CourseType[],
];
const orderStatusFilterValues = Object.values(orderStatusesFilter) as [
    OrderStatusesFilter,
    ...OrderStatusesFilter[],
];

export const orderFiltersSchema = z.object({
    name: z.string().trim().max(50, "Name must not exceed 50 characters"),

    surname: z.string().trim().max(50, "Name must not exceed 50 characters"),

    email: z.string().trim(),

    phone: z.string().trim().max(13, "Phone must not exceed 13 characters"),

    age: z
        .string()
        .refine((value) =>
            value === "" || /^\d+$/.test(value), "Age must be between 2 and 100"),

    dateFrom: z.string(),

    dateTo: z.string(),

    course: z.string().refine(
        value => value === "" || Object.values(courses).includes(value as Course),
        "Invalid course",
    ),

    courseFormat: z.string().refine(
        value => value === "" || Object.values(courseFormats).includes(value as CourseFormat),
        "Invalid course format",
    ),

    courseType: z.string().refine(
        value => value === "" || Object.values(courseTypes).includes(value as CourseType),
        "Invalid course type",
    ),

    orderStatus: z.string().refine(
        value => value === "" || Object.values(orderStatusesFilter).includes(value as OrderStatusesFilter),
        "Invalid order status",
    ),
    groupId: z.union([
        z.literal(""),
        z.string().regex(
            /^[a-f\d]{24}$/i,
            "Invalid group ID",
        ),
    ]),

    myOrders: z.boolean(),
});

export const orderEditSchema = z.object({
    name: z.union([
        z.literal(""),
        z.string().trim().regex(
            regEx.NAME,
            "Name must be from 2 to 20 characters without spaces and special chars",
        ),
    ]).transform(value => value === "" ? null : value).optional(),

    surname: z.union([
        z.literal(""),
        z.string().trim().regex(
            regEx.NAME,
            "Surname must be from 2 to 20 characters without spaces and special chars",
        ),
    ]).transform(value => value === "" ? null : value).optional(),

    email: z.union([
        z.literal(""),
        z.string().trim().email("Invalid email address"),
    ]).transform(value => value === "" ? null : value).optional(),

    phone: z.union([
        z.literal(""),
        z.string().trim().regex(regEx.PHONE, "Enter a valid Ukrainian phone number, e.g. +380971234567 or 0971234567"),
    ]).transform(value => value === "" ? null : value).optional(),

    age: z.union([
        z.literal(""),
        z.coerce.number()
            .int()
            .min(2, "Age must be at least 2")
            .max(100, "Age must be at most 100"),
    ]).transform(value => value === "" ? null : value).optional(),

    sum: z.union([
        z.literal(""),
        z.coerce.number()
            .min(0, "Sum must be at least 0")
            .max(1000000, "Sum must be at most 1000000"),
    ]).transform(value => value === "" ? null : value).optional(),

    alreadyPaid: z.union([
        z.literal(""),
        z.coerce.number()
            .min(0, "Already paid must be at least 0")
            .max(1000000, "Already paid must be at most 1000000"),
    ]).transform(value => value === "" ? null : value).optional(),

    orderStatus: z.union([
        z.literal(""),
        z.enum(orderStatusFilterValues),
    ]).transform(value => value === "" ? null : value).optional(),

    course: z.union([
        z.literal(""),
        z.enum(coursesValues),
    ]).transform(value => value === "" ? null : value).optional(),

    courseFormat: z.union([
        z.literal(""),
        z.enum(courseFormatValues),
    ]).transform(value => value === "" ? null : value).optional(),

    courseType: z.union([
        z.literal(""),
        z.enum(courseTypeValues),
    ]).transform(value => value === "" ? null : value).optional(),

    groupId: z.union([
        z.literal(""),
        z.string().regex(/^[a-f\d]{24}$/i,"Invalid group ID"),
    ]).transform(value => value === "" ? null : value).optional(),
});

export type OrderFiltersData = z.infer<typeof orderFiltersSchema>;

export type OrderEditFormValues = z.input<typeof orderEditSchema>;
export type OrderEditData = z.output<typeof orderEditSchema>;



