import express from "express";
import {
  getAvailableSlots,
  createBooking,
} from "../controllers/booking.controller.js";

const router = express.Router();

router.get("/available", getAvailableSlots);
router.post("/create", createBooking);

export default router;
