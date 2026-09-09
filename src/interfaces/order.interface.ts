import { OrderCourseEnum } from "../enums/order-course.enum";
import { OrderCourseFormatEnum } from "../enums/order-course-format.enum";
import { OrderCourseTypeEnum } from "../enums/order-course-type.enum";
import { OrderStatusEnum } from "../enums/order-status.enum";
import { IGroup } from "./group.interface";

export interface IOrder {
    _id: string;
    name: string | null;
    surname: string | null;
    email: string | null;
    phone: string | null;
    age: number | null;
    course: OrderCourseEnum | null;
    courseFormat: OrderCourseFormatEnum | null;
    courseType: OrderCourseTypeEnum | null;
    orderStatus: OrderStatusEnum | null;
    sum: number | null;
    alreadyPaid: number | null;
    group: IGroup | null;
    msg: string | null;
    utm: string | null;
    managerId: string | null;
    comments: IComment[] | null;
    createdAt: Date | null;
    updatedAt: Date;
}

export type IOrderEditDTO = Partial<
    Pick<
        IOrder,
        | "group"
        | "orderStatus"
        | "name"
        | "surname"
        | "email"
        | "phone"
        | "age"
        | "sum"
        | "alreadyPaid"
        | "course"
        | "courseFormat"
        | "courseType"
    >
>;

export interface IComment {
    text: string;
    managerId: string;
    createdAt: Date;
}
