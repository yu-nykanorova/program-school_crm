import { NextFunction, Request, Response } from "express";

import { StatusCodesEnum } from "../enums/status-codes.enum";

class AuthController {
    public login = async (req: Request, res: Response, next: NextFunction) => {
        try {
            res.status(StatusCodesEnum.OK).json();
        } catch (e) {
            next(e);
        }
    };

    public async refresh(req: Request, res: Response, next: NextFunction) {
        try {
            res.status(StatusCodesEnum.OK).json();
        } catch (e) {
            next(e);
        }
    }

    public async logout(req: Request, res: Response, next: NextFunction) {
        try {
            res.sendStatus(StatusCodesEnum.NO_CONTENT);
        } catch (e) {
            next(e);
        }
    }

    public async activate(req: Request, res: Response, next: NextFunction) {
        try {
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
            res.status(StatusCodesEnum.OK).json();
        } catch (e) {
            next(e);
        }
    }
}

export const authController = new AuthController();
