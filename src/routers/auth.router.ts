import { Router } from "express";

import { authController } from "../controllers/auth.controller";
import { TokenTypeEnum } from "../enums/token-type.enum";
import { authMiddleware } from "../middlewares/auth.middleware";
import { commonMiddleware } from "../middlewares/common.middleware";
import { UserValidator } from "../validators/user.validator";

const router = Router();

router.post(
    "/login",
    commonMiddleware.isBodyValid(UserValidator.login),
    authController.login,
);

router.post(
    "/refresh",
    authMiddleware.checkRefreshToken,
    authController.refresh,
);

router.post("/logout", authMiddleware.checkRefreshToken, authController.logout);

router.post(
    "/activate",
    commonMiddleware.isBodyValid(UserValidator.setNewPassword),
    authMiddleware.checkActionToken(TokenTypeEnum.ACTION),
    authController.activate,
);

export const authRouter = router;
