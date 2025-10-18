import { Router } from "express";
import { createAccount, loginAccount } from "./auth.controller";

const router = Router();

router.post("/signup", createAccount);
router.post("/signin", loginAccount);

export default router;
