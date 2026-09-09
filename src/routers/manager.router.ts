import { Router } from "express";

import { managerController } from "../controllers/managerController";

const router = Router();

router.get("/", managerController.getManagers);

router.post("/", managerController.createManager);

router.post("/:id/ban", managerController.banManager);

router.post("/:id/unban", managerController.unbanManager);

export const managerRouter = router;
