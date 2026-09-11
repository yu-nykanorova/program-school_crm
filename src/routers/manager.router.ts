import { Router } from "express";

import { managerController } from "../controllers/managerController";
import { UserRoleEnum } from "../enums/user-role.enum";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router();

router.use(authMiddleware.checkAccessToken);
router.use(authMiddleware.checkRole(UserRoleEnum.ADMIN));

router.get("/", managerController.getManagers);

router.post("/", managerController.createManager);

router.post("/:id/ban", managerController.banManager);

router.post("/:id/unban", managerController.unbanManager);

export const managerRouter = router;
