import { Router } from "express";

import { orderController } from "../controllers/orderController";
import { UserRoleEnum } from "../enums/user-role.enum";
import { authMiddleware } from "../middlewares/auth.middleware";
import { commonMiddleware } from "../middlewares/common.middleware";
import { CommentValidator } from "../validators/comment.validator";

const router = Router();

router.use(authMiddleware.checkAccessToken);

router.get("/", orderController.getOrders);

router.get(
    "/statistics",
    authMiddleware.checkRole(UserRoleEnum.ADMIN),
    orderController.getOrdersStatistics,
);

router.get("/export", orderController.getOrdersExport);

router.get(
    "/:id",
    commonMiddleware.isIdValid("id"),
    orderController.getOrderById,
);

router.patch(
    "/:id",
    commonMiddleware.isIdValid("id"),
    orderController.editOrderById,
);

router.post(
    "/:id/comments",
    commonMiddleware.isIdValid("id"),
    commonMiddleware.isBodyValid(CommentValidator.create),
    orderController.createCommentToOrder,
);

export const orderRouter = router;
