import { PipelineStage, Types } from "mongoose";

import { OrderQuerySortEnum } from "../enums/order-query-sort.enum";
import { OrderStatusEnum } from "../enums/order-status.enum";
import { timeHelper } from "../helpers/time.helper";
import { IAggregatedResponse } from "../interfaces/aggregated-response";
import { ICommentCreateDTO } from "../interfaces/comment.interface";
import { IManagerStatisticsDB } from "../interfaces/manager.interface";
import {
    IOrderBaseQuery,
    IOrderManagerUpdateDTO,
    IOrderQuery,
    IOrderResult,
    IOrdersStatistics,
} from "../interfaces/order.interface";
import { Order } from "../models/order.model";

class OrderRepository {
    public async getOrders(
        query: IOrderQuery,
        managerId?: string,
    ): Promise<IAggregatedResponse<IOrderResult>> {
        const skip = query.pageSize * (query.page - 1);
        const limit = query.pageSize;

        const pipeline = this.buildAggregate(query, managerId);

        pipeline.push({
            $facet: {
                data: [{ $skip: skip }, { $limit: limit }],
                totalItems: [{ $count: "count" }],
            },
        });

        const [result] = await Order.aggregate(pipeline).collation({
            locale: "uk",
            numericOrdering: true,
        });

        return {
            data: result?.data ?? [],
            totalItems: result?.totalItems[0]?.count ?? 0,
        };
    }

    public async getOrdersExport(
        query: IOrderBaseQuery,
        managerId?: string,
    ): Promise<IOrderResult[]> {
        const pipeline = this.buildAggregate(query, managerId);

        return await Order.aggregate(pipeline).collation({
            locale: "uk",
            numericOrdering: true,
        });
    }

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

                    noStatus: {
                        $sum: {
                            $cond: [
                                {
                                    $eq: [{ $type: "$orderStatus" }, "null"],
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
                noStatus: 0,
                dubbing: 0,
            }
        );
    }

    public async getManagersStatistics(
        managerIds: string[],
    ): Promise<IManagerStatisticsDB[]> {
        const objectManagerIds = managerIds.map((id) => new Types.ObjectId(id));

        return await Order.aggregate([
            {
                $match: {
                    managerId: {
                        $in: objectManagerIds,
                    },
                },
            },
            {
                $group: {
                    _id: "$managerId",
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
                $lookup: {
                    from: "users",
                    localField: "comments.managerId",
                    foreignField: "_id",
                    pipeline: [
                        {
                            $project: {
                                _id: 1,
                                name: 1,
                                surname: 1,
                            },
                        },
                    ],
                    as: "commentManagers",
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
                $set: {
                    comments: {
                        $map: {
                            input: "$comments",
                            as: "comment",
                            in: {
                                text: "$$comment.text",
                                createdAt: "$$comment.createdAt",
                                manager: {
                                    $arrayElemAt: [
                                        {
                                            $filter: {
                                                input: "$commentManagers",
                                                as: "manager",
                                                cond: {
                                                    $eq: [
                                                        "$$manager._id",
                                                        "$$comment.managerId",
                                                    ],
                                                },
                                            },
                                        },
                                        0,
                                    ],
                                },
                            },
                        },
                    },
                },
            },
            {
                $project: {
                    managerId: 0,
                    groupId: 0,
                },
            },
        ]);
        return order ?? null;
    }

    public async editOrderById(
        orderId: string,
        dto: IOrderManagerUpdateDTO,
    ): Promise<IOrderResult | null> {
        await Order.findByIdAndUpdate(orderId, dto);
        return await this.getOrderById(orderId);
    }

    public async createCommentToOrder(
        orderId: string,
        userId: string,
        comment: ICommentCreateDTO,
    ): Promise<void> {
        await Order.findByIdAndUpdate(orderId, {
            $push: {
                comments: {
                    ...comment,
                    managerId: userId,
                    createdAt: new Date(),
                },
            },
        });
    }

    private buildFilter(
        query: IOrderBaseQuery,
        managerId?: string,
    ): Record<string, any> {
        const filterObject: Record<string, any> = {};

        if (query.name) {
            const searchName = query.name.replace(
                /[.*+?^${}()|[\]\\]/g,
                "\\$&",
            );

            filterObject.name = {
                $regex: searchName,
                $options: "i",
            };
        }

        if (query.surname) {
            const searchSurname = query.surname.replace(
                /[.*+?^${}()|[\]\\]/g,
                "\\$&",
            );

            filterObject.surname = {
                $regex: searchSurname,
                $options: "i",
            };
        }

        if (query.email) {
            const searchEmail = query.email.replace(
                /[.*+?^${}()|[\]\\]/g,
                "\\$&",
            );

            filterObject.email = {
                $regex: searchEmail,
                $options: "i",
            };
        }

        if (query.phone) {
            const searchPhone = query.phone.replace(
                /[.*+?^${}()|[\]\\]/g,
                "\\$&",
            );

            filterObject.phone = {
                $regex: searchPhone,
                $options: "i",
            };
        }

        if (query.age !== undefined && query.age !== null) {
            filterObject.age = query.age === 0 ? null : query.age;
        }

        if (query.course) {
            filterObject.course = query.course;
        }

        if (query.courseFormat) {
            filterObject.courseFormat = query.courseFormat;
        }

        if (query.courseType) {
            filterObject.courseType = query.courseType;
        }

        if (query.orderStatus) {
            if (query.orderStatus === OrderStatusEnum.NEW) {
                filterObject.orderStatus = {
                    $in: [OrderStatusEnum.NEW, null],
                };
            } else {
                filterObject.orderStatus = query.orderStatus;
            }
        }

        if (query.groupId) {
            filterObject.groupId = new Types.ObjectId(query.groupId);
        }

        if (query.dateFrom) {
            filterObject.createdAt = {
                ...filterObject.createdAt,
                $gte: timeHelper.buildFilterDateFrom(query.dateFrom),
            };
        }

        if (query.dateTo) {
            filterObject.createdAt = {
                ...filterObject.createdAt,
                $lt: timeHelper.buildFilterDateTo(query.dateTo),
            };
        }

        if (managerId) {
            filterObject.managerId = new Types.ObjectId(managerId);
        }

        return filterObject;
    }

    private buildSort(query: IOrderBaseQuery): Record<string, 1 | -1> {
        const orderObject: Record<string, 1 | -1> = {};

        const orderKey = query.order.startsWith("-")
            ? query.order.slice(1)
            : query.order;

        const direction = query.order.startsWith("-") ? -1 : 1;

        if (orderKey === OrderQuerySortEnum.MANAGER) {
            orderObject["manager.name"] = direction;
            orderObject["manager._id"] = direction;
            return orderObject;
        }

        if (orderKey === OrderQuerySortEnum.GROUP) {
            orderObject["group.name"] = direction;
            orderObject["group._id"] = direction;
            return orderObject;
        }

        orderObject[orderKey] = direction;
        return orderObject;
    }

    private buildAggregate(
        query: IOrderBaseQuery,
        managerId?: string,
    ): PipelineStage[] {
        const filterObject = this.buildFilter(query, managerId);

        const sortObject = this.buildSort(query);

        return [
            {
                $match: filterObject,
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
                $lookup: {
                    from: "users",
                    localField: "comments.managerId",
                    foreignField: "_id",
                    pipeline: [
                        {
                            $project: {
                                _id: 1,
                                name: 1,
                                surname: 1,
                            },
                        },
                    ],
                    as: "commentManagers",
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
                $set: {
                    comments: {
                        $map: {
                            input: "$comments",
                            as: "comment",
                            in: {
                                text: "$$comment.text",
                                createdAt: "$$comment.createdAt",
                                manager: {
                                    $arrayElemAt: [
                                        {
                                            $filter: {
                                                input: "$commentManagers",
                                                as: "manager",
                                                cond: {
                                                    $eq: [
                                                        "$$manager._id",
                                                        "$$comment.managerId",
                                                    ],
                                                },
                                            },
                                        },
                                        0,
                                    ],
                                },
                            },
                        },
                    },
                },
            },
            {
                $sort: sortObject,
            },
            {
                $project: {
                    managerId: 0,
                    groupId: 0,
                    commentManagers: 0,
                },
            },
        ];
    }
}

export const orderRepository = new OrderRepository();
