import { NextFunction, Request, Response } from "express";

import { StatusCodesEnum } from "../enums/status-codes.enum";

class GroupController {
    public async getGroups(req: Request, res: Response, next: NextFunction) {
        try {
            res.status(StatusCodesEnum.OK).json();
        } catch (e) {
            next(e);
        }
    }

    public async createGroup(req: Request, res: Response, next: NextFunction) {
        try {
            res.status(StatusCodesEnum.CREATED).json();
        } catch (e) {
            next(e);
        }
    }
}

export const groupController = new GroupController();
