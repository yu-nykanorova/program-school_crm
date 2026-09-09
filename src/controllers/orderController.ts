import { NextFunction, Request, Response } from "express";

import { StatusCodesEnum } from "../enums/status-codes.enum";

class OrderController {
    public async getOrders(req: Request, res: Response, next: NextFunction) {
        try {
            res.status(StatusCodesEnum.OK).json();
        } catch (e) {
            next(e);
        }
    }

    public async getOrderById(req: Request, res: Response, next: NextFunction) {
        try {
            res.status(StatusCodesEnum.OK).json();
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
            res.status(StatusCodesEnum.OK).json();
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
            res.status(StatusCodesEnum.CREATED).json();
        } catch (e) {
            next(e);
        }
    }

    public async getOrdersStatistics(
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
