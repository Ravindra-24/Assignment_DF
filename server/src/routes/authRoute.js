import { Router } from "express";
import { login, signup, validate } from "../controller/auth.js";

const router = Router();

router.post("/signup",  signup );

router.post("/login", login);

router.get("/validate/:token", validate);

export default router;
