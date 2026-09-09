import { Router } from "express";

import { authRouter } from "./auth.router";
import { groupRouter } from "./group.router";
import { managerRouter } from "./manager.router";
import { orderRouter } from "./order.router";

const router = Router();

router.use("/auth", authRouter);
router.use("/managers", managerRouter);
router.use("/orders", orderRouter);
router.use("/groups", groupRouter);

export const apiRouter = router;
