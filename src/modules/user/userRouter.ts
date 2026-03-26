import { Router } from "express";
import userActions from "./userActions";

const router = Router();

router.post("/register", userActions.register);
router.post("/login", userActions.login);

export default router;