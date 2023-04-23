import express from "express";
import { newUser } from "../controllers/register.js";

const router = express.Router();
router.post("/signin", newUser);

export default router;
