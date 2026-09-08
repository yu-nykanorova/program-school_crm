import { OrderCourseEnum } from "../enums/order-course.enum";
import { OrderCourseFormatEnum } from "../enums/order-course-format.enum";
import { OrderCourseTypeEnum } from "../enums/order-course-type.enum";
import { OrderStatusEnum } from "../enums/order-status.enum";

export interface IOrderInterface {
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
    managerId: string | null;
    createdAt: Date;
    updatedAt: Date;
}
