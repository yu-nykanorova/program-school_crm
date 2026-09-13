import { NextFunction, Request, Response } from "express";

import { StatusCodesEnum } from "../enums/status-codes.enum";
import { IActivate, IAuth } from "../interfaces/auth.interface";
import { ITokenPayload } from "../interfaces/token.interface";
import { userPresenter } from "../presenters/user.presenter";

class AuthController {
    public async login(req: Request, res: Response, next: NextFunction) {
        try {
            const dto = req.body as IAuth;
            const data = await authService.login(dto);
            const result = userPresenter.toPublicResDto(data.user);
            res.status(StatusCodesEnum.OK).json({
                user: result,
                tokens: data.tokens,
            });
        } catch (e) {
            next(e);
        }
    }

    public async refresh(req: Request, res: Response, next: NextFunction) {
        try {
            const refreshToken = res.locals.refreshToken as string;
            const payload = res.locals.tokenPayload as ITokenPayload;

            const tokens = await authService.refresh(refreshToken, payload);
            res.status(StatusCodesEnum.OK).json(tokens);
        } catch (e) {
            next(e);
        }
    }

    public async logout(req: Request, res: Response, next: NextFunction) {
        try {
            const refreshToken = res.locals.refreshToken as string;
            await authService.logout(refreshToken);
            res.sendStatus(StatusCodesEnum.NO_CONTENT);
        } catch (e) {
            next(e);
        }
    }

    public async activate(req: Request, res: Response, next: NextFunction) {
        try {
            const payload = res.locals.tokenPayload as ITokenPayload;
            const dto = req.body as IActivate;
            await authService.activate(dto, payload);
            res.sendStatus(StatusCodesEnum.NO_CONTENT);
        } catch (e) {
            next(e);
        }
    }
}

export const authController = new AuthController();
