import express from "express";
import {protect} from "../middleware/authMiddleware.js";
import { createOrGetChat, getMyChats } from "../controllers/chatController.js";

const router = express.Router();

router.get("/", protect, getMyChats);
router.post("/", protect, createOrGetChat);

export default router;