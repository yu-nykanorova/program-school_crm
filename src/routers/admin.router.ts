import { Router } from "express";

import { adminController } from "../controllers/admin.controller";
import { UserRoleEnum } from "../enums/user-role.enum";
import { authMiddleware } from "../middlewares/auth.middleware";
import { commonMiddleware } from "../middlewares/common.middleware";

const router = Router();

router.use(authMiddleware.checkAccessToken);
router.use(authMiddleware.checkRole(UserRoleEnum.ADMIN));

router.get("/managers", adminController.getManagers);

router.post("/managers", adminController.createManager);

router.post(
    "/managers/:id/ban",
    commonMiddleware.isIdValid("id"),
    adminController.banManager,
);

router.post(
    "/managers/:id/unban",
    commonMiddleware.isIdValid("id"),
    adminController.unbanManager,
);

router.post(
    "/managers/:id/activate-request",
    commonMiddleware.isIdValid("id"),
    adminController.activateRequest,
);

router.get("/statistics/orders", adminController.getOrdersStatistics);

export const adminRouter = router;
