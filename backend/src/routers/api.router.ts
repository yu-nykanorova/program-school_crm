import { Router } from "express";

import { adminRouter } from "./admin.router";
import { authRouter } from "./auth.router";
import { groupRouter } from "./group.router";
import { orderRouter } from "./order.router";

const router = Router();

router.use("/auth", authRouter);
router.use("/admin", adminRouter);
router.use("/orders", orderRouter);
router.use("/groups", groupRouter);

export const apiRouter = router;
