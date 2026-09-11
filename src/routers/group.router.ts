import { Router } from "express";

import { groupController } from "../controllers/groupController";
import { commonMiddleware } from "../middlewares/common.middleware";
import { GroupValidator } from "../validators/group.validator";

const router = Router();

router.get("/", groupController.getGroups);
router.post(
    "/",
    commonMiddleware.isBodyValid(GroupValidator.create),
    groupController.createGroup,
);

export const groupRouter = router;
