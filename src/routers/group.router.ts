import { Router } from "express";

import { groupController } from "../controllers/groupController";

const router = Router();

router.get("/", groupController.getGroups);
router.post("/", groupController.createGroup);

export const groupRouter = router;
