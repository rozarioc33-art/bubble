import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { getMessages, sendMessage, markMessagesAsRead } from "../controllers/messageController.js";

const router = express.Router();

router.post("/", protect, sendMessage);
router.get("/:chatId", protect, getMessages);
router.put("/read/:chatId", protect, markMessagesAsRead);

export default router;