import { Types } from "mongoose";

import { OrderStatusEnum } from "../enums/order-status.enum";
import { IComment } from "../interfaces/comment.interface";
import {
    IOrderEditDTO,
    IOrderResult,
    IOrdersStatistics,
} from "../interfaces/order.interface";
import { Order } from "../models/order.model";

class OrderRepository {
    public async getOrders(
        query: IOrderQuery = {},
    ): Promise<IAggregatedResponse<IOrderResult>> {}

    public async getOrdersStatistics(): Promise<IOrdersStatistics> {
        const [result] = await Order.aggregate([
            {
                $group: {
                    _id: null,
                    total: { $sum: 1 },

                    inWork: {
                        $sum: {
                            $cond: [
                                {
                                    $eq: [
                                        "$orderStatus",
                                        OrderStatusEnum.IN_WORK,
                                    ],
                                },
                                1,
                                0,
                            ],
                        },
                    },

                    agree: {
                        $sum: {
                            $cond: [
                                {
                                    $eq: [
                                        "$orderStatus",
                                        OrderStatusEnum.AGREE,
                                    ],
                                },
                                1,
                                0,
                            ],
                        },
                    },

                    disagree: {
                        $sum: {
                            $cond: [
                                {
                                    $eq: [
                                        "$orderStatus",
                                        OrderStatusEnum.DISAGREE,
                                    ],
                                },
                                1,
                                0,
                            ],
                        },
                    },

                    new: {
                        $sum: {
                            $cond: [
                                {
                                    $eq: ["$orderStatus", OrderStatusEnum.NEW],
                                },
                                1,
                                0,
                            ],
                        },
                    },

                    null: {
                        $sum: {
                            $cond: [
                                {
                                    $eq: ["$orderStatus", null],
                                },
                                1,
                                0,
                            ],
                        },
                    },

                    dubbing: {
                        $sum: {
                            $cond: [
                                {
                                    $eq: [
                                        "$orderStatus",
                                        OrderStatusEnum.DUBBING,
                                    ],
                                },
                                1,
                                0,
                            ],
                        },
                    },
                },
            },
        ]);

        return (
            result ?? {
                total: 0,
                inWork: 0,
                agree: 0,
                disagree: 0,
                new: 0,
                null: 0,
                dubbing: 0,
            }
        );
    }

    public async getOrderById(orderId: string): Promise<IOrderResult | null> {
        const [order] = await Order.aggregate([
            {
                $match: {
                    _id: new Types.ObjectId(orderId),
                },
            },
            {
                $lookup: {
                    from: "users",
                    localField: "managerId",
                    foreignField: "_id",
                    pipeline: [
                        {
                            $project: {
                                _id: 1,
                                email: 1,
                                name: 1,
                                surname: 1,
                            },
                        },
                    ],
                    as: "manager",
                },
            },
            {
                $lookup: {
                    from: "groups",
                    localField: "groupId",
                    foreignField: "_id",
                    as: "group",
                },
            },
            {
                $unwind: {
                    path: "$manager",
                    preserveNullAndEmptyArrays: true,
                },
            },
            {
                $unwind: {
                    path: "$group",
                    preserveNullAndEmptyArrays: true,
                },
            },
            {
                $project: {
                    manager: 0,
                    groupId: 0,
                },
            },
        ]);
        return order ?? null;
    }

    public async editOrderById(
        orderId: string,
        dto: IOrderEditDTO,
    ): Promise<IOrderResult | null> {
        return await Order.findByIdAndUpdate(orderId, dto, {
            returnDocument: "after",
        });
    }

    public async createCommentToOrder(
        orderId: string,
        comment: IComment,
    ): Promise<IOrderResult> {
        return await Order.findByIdAndUpdate(
            orderId,
            {
                $push: {
                    comments: comment,
                },
            },
            { returnDocument: "after" },
        );
    }
}

export const orderRepository = new OrderRepository();
