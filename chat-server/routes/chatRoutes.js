import express from "express";
import {protect} from "../middleware/authMiddleware.js";
import { createOrGetChat } from "../controllers/chatController.js";

const router = express.Router();

router.post("/", protect, createOrGetChat);

export default router;