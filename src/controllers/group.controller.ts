import { NextFunction, Request, Response } from "express";

import { StatusCodesEnum } from "../enums/status-codes.enum";
import { IGroupCreateDTO } from "../interfaces/group.interface";

class GroupController {
    public async getGroups(req: Request, res: Response, next: NextFunction) {
        try {
            const data = await groupService.getGroups();
            res.status(StatusCodesEnum.OK).json(data);
        } catch (e) {
            next(e);
        }
    }

    public async createGroup(req: Request, res: Response, next: NextFunction) {
        try {
            const group = req.body as IGroupCreateDTO;
            const data = await groupService.createGroup(group.name);
            res.status(StatusCodesEnum.CREATED).json(data);
        } catch (e) {
            next(e);
        }
    }
}

export const groupController = new GroupController();
