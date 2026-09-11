import { Router } from "express";

import { authController } from "../controllers/authController";
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
    authMiddleware.checkActionToken(TokenTypeEnum.ACTION),
    commonMiddleware.isBodyValid(UserValidator.setNewPassword),
    authController.activate,
);

router.post(
    "/activate/request/:id",
    commonMiddleware.isIdValid("id"),
    authController.activateRequest,
);

export const authRouter = router;
