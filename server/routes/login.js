import express from "express";
import { postUserByEmail } from "../controllers/login.js";

const router = express.Router();
router.post("/query", postUserByEmail);

export default router;
