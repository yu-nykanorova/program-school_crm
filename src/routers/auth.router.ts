import { Router } from "express";

import { authController } from "../controllers/authController";

const router = Router();

router.post("/login", authController.login);

router.post("/refresh", authController.refresh);

router.post("/logout", authController.logout);

router.post("/activate", authController.activate);

router.post("/activate/request", authController.activateRequest);

export const authRouter = router;
