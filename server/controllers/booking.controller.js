import Booking from "../models/Booking.js";

const MASTER_SLOTS = ["09:00", "10:00", "11:00", "14:00", "15:00", "16:00"];

export const getAvailableSlots = async (req, res) => {
  try {
    const { date } = req.query;
    if (!date) return res.status(400).json({ error: "Date is required" });

    const existingBookings = await Booking.find({ date }).select("time");
    const bookedTimes = existingBookings.map((b) => b.time);
    const availableSlots = MASTER_SLOTS.filter(
      (slot) => !bookedTimes.includes(slot),
    );

    res.json({ availableSlots });
  } catch (err) {
    res.status(500).json({ error: "Server error fetching slots" });
  }
};

export const createBooking = async (req, res) => {
  try {
    const newBooking = new Booking(req.body);
    await newBooking.save();
    res
      .status(201)
      .json({ message: "Booking successful", booking: newBooking });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({ error: "This slot was just taken." });
    }
    res.status(500).json({ error: "Booking failed." });
  }
};
