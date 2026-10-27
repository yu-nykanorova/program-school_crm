import type {OrderFiltersData} from "../validators/order.validator.ts";

export const defaultOrderFilters: OrderFiltersData = {
    name: "",
    surname: "",
    email: "",
    phone: "",
    age: "",
    dateFrom: "",
    dateTo: "",
    course: "",
    courseFormat: "",
    courseType: "",
    orderStatus: "",
    groupId: "",
    myOrders: false,
};