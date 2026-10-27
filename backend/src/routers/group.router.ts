import { Router } from "express";

import { groupController } from "../controllers/group.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { commonMiddleware } from "../middlewares/common.middleware";
import { GroupValidator } from "../validators/group.validator";

const router = Router();

router.use(authMiddleware.checkAccessToken);

router.get("/", groupController.getGroups);

router.post(
    "/",
    commonMiddleware.isBodyValid(GroupValidator.create),
    groupController.createGroup,
);

export const groupRouter = router;
