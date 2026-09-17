import ExcelJS from "exceljs";

import { ordersTableColumnsConstants } from "../constants/orders-table-columns.constants";
import { OrderStatusEnum } from "../enums/order-status.enum";
import { StatusCodesEnum } from "../enums/status-codes.enum";
import { ApiError } from "../errors/api.errors";
import { ICommentCreateDTO } from "../interfaces/comment.interface";
import {
    IOrderEditDTO,
    IOrderQuery,
    IOrderResult,
} from "../interfaces/order.interface";
import { IPaginatedResponse } from "../interfaces/paginated-response";
import { ITokenPayload } from "../interfaces/token.interface";
import { orderRepository } from "../repositories/order.repository";

class OrderService {
    public async getOrders(
        query: IOrderQuery,
        payload: ITokenPayload,
    ): Promise<IPaginatedResponse<IOrderResult>> {
        const dataFromDB = await orderRepository.getOrders(
            query,
            payload.userId,
        );

        const orders = dataFromDB.data;
        const totalItems = dataFromDB.totalItems;
        const pageSize = query.pageSize;
        const page = query.page;
        const totalPages = Math.ceil(totalItems / pageSize);

        return {
            totalItems,
            totalPages,
            prevPage: page > 1,
            nextPage: page < totalPages,
            data: orders,
        };
    }

    public async editOrderById(
        orderId: string,
        payload: ITokenPayload,
        dto: IOrderEditDTO,
    ): Promise<IOrderResult> {
        const order = await orderRepository.getOrderById(orderId);

        if (!order) {
            throw new ApiError("Order not found", StatusCodesEnum.NOT_FOUND);
        }

        this.checkAccessToEdit(order, payload.userId);

        const updatedDto = {
            ...dto,
            ...(dto.orderStatus === OrderStatusEnum.NEW
                ? { managerId: null }
                : {}),
        };

        await orderRepository.editOrderById(orderId, updatedDto);

        return await orderRepository.getOrderById(orderId);
    }

    public async createCommentToOrder(
        orderId: string,
        payload: ITokenPayload,
        dto: ICommentCreateDTO,
    ): Promise<IOrderResult> {
        const order = await orderRepository.getOrderById(orderId);

        if (!order) {
            throw new ApiError("Order not found", StatusCodesEnum.NOT_FOUND);
        }

        this.checkAccessToEdit(order, payload.userId);

        const commentedOrder = await orderRepository.createCommentToOrder(
            orderId,
            dto,
        );

        if (!order.manager?._id) {
            await orderRepository.editOrderById(orderId, {
                managerId: payload.userId,
            });
        }

        if (
            commentedOrder.orderStatus === OrderStatusEnum.NEW ||
            commentedOrder.orderStatus === null
        ) {
            await orderRepository.editOrderById(orderId, {
                orderStatus: OrderStatusEnum.IN_WORK,
            });
        }

        return commentedOrder;
    }

    public async getOrdersExport(query: IOrderQuery, payload: ITokenPayload) {
        const orders = await orderRepository.getOrdersExport(
            query,
            payload.userId,
        );

        return await this.exportToExcel(orders);
    }

    private checkAccessToEdit(order: IOrderResult, userId: string): void {
        if (order.manager?._id && order.manager._id !== userId) {
            throw new ApiError(
                "You cannot edit this order",
                StatusCodesEnum.FORBIDDEN,
            );
        }
    }

    private async exportToExcel(data: IOrderResult[]) {
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet("Orders");

        worksheet.columns = [];

        ordersTableColumnsConstants.forEach((item) => {
            worksheet.columns.push(item);
        });

        data.forEach((item) => {
            worksheet.addRow({
                id: item._id,
                name: item.name,
                surname: item.surname,
                email: item.email,
                phone: item.phone,
                age: item.age,
                course: item.course,
                courseFormat: item.courseFormat,
                courseType: item.courseType,
                orderStatus: item.orderStatus,
                sum: item.sum,
                alreadyPaid: item.alreadyPaid,
                group: item.group.name,
                createdAt: item.createdAt,
                manager: item.manager.name,
            });
        });

        return await workbook.xlsx.writeBuffer();
    }
}

export const orderService = new OrderService();
