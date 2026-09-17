import { Router } from "express";

import { orderController } from "../controllers/order.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { commonMiddleware } from "../middlewares/common.middleware";
import { CommentValidator } from "../validators/comment.validator";
import { OrderValidator } from "../validators/order.validator";

const router = Router();

router.use(authMiddleware.checkAccessToken);

router.get(
    "/",
    commonMiddleware.isQueryValid(OrderValidator.query),
    orderController.getOrders,
);

router.get(
    "/export",
    commonMiddleware.isQueryValid(OrderValidator.query),
    orderController.getOrdersExport,
);

router.patch(
    "/:id",
    commonMiddleware.isIdValid("id"),
    commonMiddleware.isBodyValid(OrderValidator.edit),
    orderController.editOrderById,
);

router.post(
    "/:id/comments",
    commonMiddleware.isIdValid("id"),
    commonMiddleware.isBodyValid(CommentValidator.create),
    orderController.createCommentToOrder,
);

export const orderRouter = router;
