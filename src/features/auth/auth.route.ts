import { Router } from "express";
import { createAccount, getUser, loginAccount } from "./auth.controller";
import { validate } from "../../middleware/validate";
import { signInSchema, signUpSchema } from "./auth.schema";
import { verifyToken } from "../../middleware/verifyToken";

const router = Router();

router.post("/signup", validate(signUpSchema, "body"), createAccount);
router.post("/signin", validate(signInSchema, "body"), loginAccount);
router.get("/user", verifyToken, getUser);

export default router;
