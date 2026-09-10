import { model, Schema } from "mongoose";

import { OrderCourseEnum } from "../enums/order-course.enum";
import { OrderCourseFormatEnum } from "../enums/order-course-format.enum";
import { OrderCourseTypeEnum } from "../enums/order-course-type.enum";
import { OrderStatusEnum } from "../enums/order-status.enum";
import { IOrder } from "../interfaces/order.interface";

const orderSchema = new Schema(
    {
        name: { type: String, default: null },
        surname: { type: String, default: null },
        email: { type: String, default: null },
        phone: { type: String, default: null },
        age: { type: Number, default: null },
        course: {
            type: String,
            enum: Object.values(OrderCourseEnum),
            default: null,
        },
        courseFormat: {
            type: String,
            enum: Object.values(OrderCourseFormatEnum),
            default: null,
        },
        courseType: {
            type: String,
            enum: Object.values(OrderCourseTypeEnum),
            default: null,
        },
        orderStatus: {
            type: String,
            enum: Object.values(OrderStatusEnum),
            default: null,
        },
        sum: { type: Number, default: null },
        alreadyPaid: { type: Number, default: null },
        utm: { type: String, default: null },
        msg: { type: String, default: null },
        managerId: { type: Schema.Types.ObjectId, ref: "User", default: null },
        groupId: { type: Schema.Types.ObjectId, ref: "Group", default: null },
        comments: [
            {
                text: { type: String, required: true },
                managerId: {
                    type: Schema.Types.ObjectId,
                    ref: "User",
                    required: true,
                },
                createdAt: { type: Date, required: true },
            },
        ],
    },
    {
        timestamps: true,
        versionKey: false,
    },
);

export const Order = model<IOrder>("Order", orderSchema, "orders");
