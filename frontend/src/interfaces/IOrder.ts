import type {Course} from "../constants/courses.ts";
import type {CourseFormat} from "../constants/courseFormats.ts";
import type {CourseType} from "../constants/courseTypes.ts";
import type {OrderStatus} from "../constants/orderStatuses.ts";
import type {IGroup} from "./IGroup.ts";
import type {IOrderManager} from "./IManager.ts";
import type {IComment} from "./IComment.ts";
import type {OrderQuerySortFull} from "../constants/orderQuerySort.ts";

export interface IApiOrder {
    _id: string;
    publicId: number;
    name: string | null;
    surname: string | null;
    email: string | null;
    phone: string | null;
    age: number | null;
    course: Course | null;
    courseFormat: CourseFormat | null;
    courseType: CourseType | null;
    orderStatus: OrderStatus | null;
    sum: number | null;
    alreadyPaid: number | null;
    group: IGroup | null;
    msg: string | null;
    utm: string | null;
    manager: IOrderManager | null;
    comments: IComment[];
    createdAt: string | null;
    updatedAt: string;
}

export interface IOrder extends Omit<IApiOrder, "_id"> {
    databaseId: string;
}

export interface IOrderEdit {
    groupId?: string | null;
    managerId?: string | null;
    orderStatus?: OrderStatus | null;
    name?: string | null;
    surname?: string | null;
    email?: string | null;
    phone?: string | null;
    age?: number | null;
    sum?: number | null;
    alreadyPaid?: number | null;
    course?: Course | null;
    courseFormat?: CourseFormat | null;
    courseType?: CourseType | null;
}

export interface IOrdersStatistics {
    total: number | null;
    inWork: number | null;
    agree: number | null;
    disagree: number | null;
    new: number | null;
    noStatus: number | null;
    dubbing: number | null;
}

export interface IOrderBaseQuery {
    name?: string;
    surname?: string;
    email?: string;
    phone?: string;
    age?: number;
    course?: Course;
    courseFormat?: CourseFormat;
    courseType?: CourseType;
    orderStatus?: OrderStatus;
    groupId?: string;
    dateFrom?: string;
    dateTo?: string;
    myOrders?: boolean;
    order?: OrderQuerySortFull;
}

export interface IOrderQuery extends IOrderBaseQuery {
    page?: number;
    pageSize?: number;
}

export interface IOrderFilters {
    name: string;
    surname: string;
    email: string;
    phone: string;
    age: string;
    dateFrom: string;
    dateTo: string;
    course: string;
    courseFormat: string;
    courseType: string;
    orderStatus: string;
    groupId: string;
    myOrders: boolean;
}
