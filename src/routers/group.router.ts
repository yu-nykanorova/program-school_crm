import { Router } from "express";

const router = Router();

router.get("/", groupController.getGroups);
router.post("/", groupController.createGroup);

export const groupRouter = router;
