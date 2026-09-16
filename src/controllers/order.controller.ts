import { NextFunction, Request, Response } from "express";

import { StatusCodesEnum } from "../enums/status-codes.enum";
import { IOrderEditDTO, IOrderQuery } from "../interfaces/order.interface";
import { ITokenPayload } from "../interfaces/token.interface";
import { ICommentCreateDTO } from "../interfaces/comment.interface";

class OrderController {
    public async getOrders(req: Request, res: Response, next: NextFunction) {
        try {
            const { validatedQuery } = req as any as {
                validatedQuery: IOrderQuery;
            };
            const payload = res.locals.tokenPayload as ITokenPayload;
            const orders = await orderService.getOrders(
                validatedQuery,
                payload,
            );
            res.status(StatusCodesEnum.OK).json(orders);
        } catch (e) {
            next(e);
        }
    }

    public async getOrderById(req: Request, res: Response, next: NextFunction) {
        try {
            const orderId = req.params.id as string;
            const payload = res.locals.tokenPayload as ITokenPayload;
            const order = await orderService.getOrderById(orderId, payload);
            res.status(StatusCodesEnum.OK).json(order);
        } catch (e) {
            next(e);
        }
    }

    public async editOrderById(
        req: Request,
        res: Response,
        next: NextFunction,
    ) {
        try {
            const payload = res.locals.tokenPayload as ITokenPayload;
            const dto = req.body as IOrderEditDTO;
            const orderId = req.params.id as string;
            const order = await orderService.editOrderById(
                orderId,
                payload,
                dto,
            );
            res.status(StatusCodesEnum.OK).json(order);
        } catch (e) {
            next(e);
        }
    }

    public async createCommentToOrder(
        req: Request,
        res: Response,
        next: NextFunction,
    ) {
        try {
            const payload = res.locals.tokenPayload as ITokenPayload;
            const dto = req.body as ICommentCreateDTO;
            const orderId = req.params.id as string;
            const order = await orderService.createCommentToOrder(
                orderId,
                payload,
                dto,
            );
            res.status(StatusCodesEnum.CREATED).json(order);
        } catch (e) {
            next(e);
        }
    }

    public async getOrdersExport(
        req: Request,
        res: Response,
        next: NextFunction,
    ) {
        try {
            res.status(StatusCodesEnum.OK).json();
        } catch (e) {
            next(e);
        }
    }
}

export const orderController = new OrderController();
