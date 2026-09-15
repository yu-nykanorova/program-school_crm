import { NextFunction, Request, Response } from "express";

import { StatusCodesEnum } from "../enums/status-codes.enum";
import { toListResponse } from "../helpers/to-list-response";
import { IManagerCreateDTO } from "../interfaces/manager.interface";
import { IUserQuery } from "../interfaces/user.interface";
import { managerPresenter } from "../presenters/manager.presenter";
import { adminService } from "../services/admin.service";

class AdminController {
    public async getManagers(req: Request, res: Response, next: NextFunction) {
        try {
            const { validatedQuery } = req as any as {
                validatedQuery: IUserQuery;
            };
            const managers = await adminService.getManagers(validatedQuery);
            const result = toListResponse.toListResDto(
                managers,
                managerPresenter.toPublicResDtoWithStatistics.bind(
                    managerPresenter.toPublicResDtoWithStatistics,
                ),
            );
            res.status(StatusCodesEnum.OK).json(result);
        } catch (e) {
            next(e);
        }
    }

    public async createManager(
        req: Request,
        res: Response,
        next: NextFunction,
    ) {
        try {
            const body = req.body as IManagerCreateDTO;
            const manager = await adminService.createManager(body);
            const result = managerPresenter.toPublicResDto(manager);
            res.status(StatusCodesEnum.CREATED).json(result);
        } catch (e) {
            next(e);
        }
    }

    public async banManager(req: Request, res: Response, next: NextFunction) {
        try {
            const id = req.params.id as string;
            await adminService.banManager(id);
            res.sendStatus(StatusCodesEnum.NO_CONTENT);
        } catch (e) {
            next(e);
        }
    }

    public async unbanManager(req: Request, res: Response, next: NextFunction) {
        try {
            const id = req.params.id as string;
            await adminService.unbanManager(id);
            res.sendStatus(StatusCodesEnum.NO_CONTENT);
        } catch (e) {
            next(e);
        }
    }

    public async activateRequest(
        req: Request,
        res: Response,
        next: NextFunction,
    ) {
        try {
            const id = req.params.id as string;
            const activationLink = await adminService.activateRequest(id);
            res.status(StatusCodesEnum.OK).json(activationLink);
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
            const statistics = await adminService.getOrdersStatistics();
            res.status(StatusCodesEnum.OK).json(statistics);
        } catch (e) {
            next(e);
        }
    }
}

export const adminController = new AdminController();
