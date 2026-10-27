import type {IOrderBaseQuery, IOrderFilters} from "../interfaces/IOrder.ts";
import type {Course} from "../constants/courses.ts";
import type {CourseFormat} from "../constants/courseFormats.ts";
import type {CourseType} from "../constants/courseTypes.ts";
import type {OrderStatus} from "../constants/orderStatuses.ts";

export const getOrdersFilters = (filters: IOrderFilters): IOrderBaseQuery => {
     const queryFilters: IOrderBaseQuery = {
        ...(filters.name && {name: filters.name}),
        ...(filters.surname && {surname: filters.surname}),
        ...(filters.email && {email: filters.email}),
        ...(filters.phone && {phone: filters.phone}),
        ...(filters.course && {course: filters.course as Course}),
        ...(filters.courseFormat && {courseFormat: filters.courseFormat as CourseFormat}),
        ...(filters.courseType && {courseType: filters.courseType as CourseType}),
        ...(filters.orderStatus && {orderStatus: filters.orderStatus as OrderStatus}),
        ...(filters.groupId && {groupId: filters.groupId}),
        ...(filters.dateFrom && {dateFrom: filters.dateFrom}),
        ...(filters.dateTo && {dateTo: filters.dateTo}),
        ...(filters.myOrders && {myOrders: true}),
    }

    if (/^\d+$/.test(filters.age)) {
        queryFilters.age = Number(filters.age);
    }

    return queryFilters;
};

export const getOrdersFiltersFromParams = (
    params: URLSearchParams,
): IOrderBaseQuery => {
    return getOrdersFilters({
        name: params.get("name") ?? "",
        surname: params.get("surname") ?? "",
        email: params.get("email") ?? "",
        phone: params.get("phone") ?? "",
        age: params.get("age") ?? "",
        course: params.get("course") ?? "",
        courseFormat: params.get("courseFormat") ?? "",
        courseType: params.get("courseType") ?? "",
        orderStatus: params.get("orderStatus") ?? "",
        groupId: params.get("groupId") ?? "",
        dateFrom: params.get("dateFrom") ?? "",
        dateTo: params.get("dateTo") ?? "",
        myOrders: params.get("myOrders") === "true",
    });
};