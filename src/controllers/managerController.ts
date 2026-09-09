import { NextFunction, Request, Response } from "express";

import { StatusCodesEnum } from "../enums/status-codes.enum";

class ManagerController {
    public async getManagers(req: Request, res: Response, next: NextFunction) {
        try {
            res.status(StatusCodesEnum.OK).json();
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
            res.status(StatusCodesEnum.CREATED).json();
        } catch (e) {
            next(e);
        }
    }

    public async banManager(req: Request, res: Response, next: NextFunction) {
        try {
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
}

export const managerController = new ManagerController();
