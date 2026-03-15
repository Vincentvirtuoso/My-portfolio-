import express from "express";
import {
  getAbout,
  updateAbout,
  updateSection,
  addArrayItem,
  updateArrayItem,
  deleteArrayItem,
  updateStats,
} from "../controllers/about.controller.js";
import { protect } from "../middlewares/auth.middleware.js";

const router = express.Router();

// Public route
router.get("/", getAbout);

// Protected routes
router.put("/", protect, updateAbout);
router.patch("/stats", protect, updateStats);
router.patch("/:section", protect, updateSection);
router.post("/:section", protect, addArrayItem);
router.put("/:section/:index", protect, updateArrayItem);
router.delete("/:section/:index", protect, deleteArrayItem);

export default router;
