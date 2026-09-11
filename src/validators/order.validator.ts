import joi from "joi";

import { OrderCourseEnum } from "../enums/order-course.enum";
import { OrderCourseFormatEnum } from "../enums/order-course-format.enum";
import { OrderCourseTypeEnum } from "../enums/order-course-type.enum";
import { OrderStatusEnum } from "../enums/order-status.enum";
import { RegexEnum } from "../enums/regex.enum";

export class OrderValidator {
    private static name = joi.string().regex(RegexEnum.NAME).trim();
    private static surname = joi.string().regex(RegexEnum.NAME).trim();
    private static email = joi.string().email().trim();
    private static phone = joi.string().regex(RegexEnum.PHONE).trim();
    private static age = joi.number().min(2).max(100);
    private static sum = joi.number().min(0).max(1000000);
    private static alreadyPaid = joi.number().min(0).max(1000000);
    private static groupId = joi.string().hex().length(24).trim();
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

    public static edit = joi.object({
        name: this.name,
        surname: this.surname,
        email: this.email,
        phone: this.phone,
        age: this.age,
        sum: this.sum,
        alreadyPaid: this.alreadyPaid,
        orderStatus: this.orderStatus,
        course: this.course,
        courseFormat: this.courseFormat,
        courseType: this.courseType,
        groupId: this.groupId,
    });
}
