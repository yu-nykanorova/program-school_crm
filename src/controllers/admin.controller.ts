import { NextFunction, Request, Response } from "express";

import { StatusCodesEnum } from "../enums/status-codes.enum";
import { toListResponse } from "../helpers/to-list-response";
import { managerPresenter } from "../presenters/manager.presenter";
import { IManagerCreateDTO } from "../interfaces/manager.interface";

class AdminController {
    public async getManagers(req: Request, res: Response, next: NextFunction) {
        try {
            const managers = await adminService.getManagers();
            const result = toListResponse.toListResDto(
                managers,
                managerPresenter.toPublicResDto.bind(
                    managerPresenter.toPublicResDto,
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
            res.status(StatusCodesEnum.CREATED).json(manager);
        } catch (e) {
            next(e);
        }
    }

    public async banManager(req: Request, res: Response, next: NextFunction) {
        try {
            const id = req.params.id as string;
            const manager = await adminService.banManager(id);
            const result = managerPresenter.toPublicResDto(manager);
            res.status(StatusCodesEnum.OK).json();
        } catch (e) {
            next(e);
        }
    }

    public async unbanManager(req: Request, res: Response, next: NextFunction) {
        try {
            res.status(StatusCodesEnum.OK).json();
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
            res.status(StatusCodesEnum.OK).json();
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
}

export const adminController = new AdminController();
