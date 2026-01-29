import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { getMe, getUsers, updateMe } from "../controllers/userController.js";

const router = express.Router();

router.get("/me", protect, getMe);
router.put("/me", protect, updateMe);
router.get("/", protect, getUsers);

export default router;