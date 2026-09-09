import { Router } from "express";

import { orderController } from "../controllers/orderController";

const router = Router();

router.get("/", orderController.getOrders);
router.get("/:id", orderController.getOrderById);
router.patch("/:id", orderController.editOrderById);
router.post("/:id/comments", orderController.createCommentToOrder);
router.get("/statistics", orderController.getOrdersStatistics);
router.get("/export", orderController.getOrdersExport);

export const orderRouter = router;

