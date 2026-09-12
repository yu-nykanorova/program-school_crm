import joi from "joi";

import { OrderCourseEnum } from "../enums/order-course.enum";
import { OrderCourseFormatEnum } from "../enums/order-course-format.enum";
import { OrderCourseTypeEnum } from "../enums/order-course-type.enum";
import { OrderQuerySortEnum } from "../enums/order-query-sort.enum";
import { OrderStatusEnum } from "../enums/order-status.enum";
import { RegexEnum } from "../enums/regex.enum";

export class OrderValidator {
    private static name = joi.string().trim().min(2).max(50);
    private static surname = joi.string().trim().min(2).max(50);
    private static email = joi.string().email().trim();
    private static phone = joi.string().max(13).trim();
    private static age = joi.number().min(2).max(100);
    private static sum = joi.number().min(0).max(1000000);
    private static alreadyPaid = joi.number().min(0).max(1000000);
    private static groupId = joi.string().hex().length(24).trim();
    private static managerId = joi.string().hex().length(24).trim();
    private static orderStatus = joi
        .string()
        .valid(...Object.values(OrderStatusEnum));
    private static course = joi
        .string()
        .valid(...Object.values(OrderCourseEnum));
    private static courseFormat = joi
        .string()
        .valid(...Object.values(OrderCourseFormatEnum));
    private static courseType = joi
        .string()
        .valid(...Object.values(OrderCourseTypeEnum));
    private static dateFrom = joi.date().iso();
    private static dateTo = joi.date().iso();
    private static myOrders = joi.boolean();

    public static edit = joi.object({
        name: joi.string().regex(RegexEnum.NAME),
        surname: joi.string().regex(RegexEnum.NAME),
        email: this.email,
        phone: joi.string().regex(RegexEnum.PHONE),
        age: this.age,
        sum: this.sum,
        alreadyPaid: this.alreadyPaid,
        orderStatus: this.orderStatus,
        course: this.course,
        courseFormat: this.courseFormat,
        courseType: this.courseType,
        groupId: this.groupId,
        managerId: this.managerId,
    });

    public static query = joi.object({
        name: this.name,
        surname: this.surname,
        email: this.email,
        phone: this.phone,
        age: this.age,
        course: this.course,
        courseFormat: this.courseFormat,
        courseType: this.courseType,
        orderStatus: this.orderStatus,
        groupId: this.groupId,
        myOrders: this.myOrders,
        dateFrom: this.dateFrom,
        dateTo: this.dateTo,
        page: joi.number().integer().min(1).default(1),
        pageSize: joi.number().integer().min(1).max(100).default(25),
        order: joi
            .string()
            .valid(
                ...Object.values(OrderQuerySortEnum),
                ...Object.values(OrderQuerySortEnum).map((item) => `-${item}`),
            )
            .default(`-${OrderQuerySortEnum.ID}`),
    });
}
