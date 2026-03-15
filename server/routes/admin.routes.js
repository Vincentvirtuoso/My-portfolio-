import express from "express";
import { protect } from "../middlewares/auth.middleware.js";

const router = express.Router();

// All routes here are protected
router.use(protect);

router.get("/dashboard", (req, res) => {
  res.json({ message: "Welcome to admin dashboard!" });
});

export default router;
