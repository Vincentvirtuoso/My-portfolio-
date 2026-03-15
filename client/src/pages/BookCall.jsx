import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import { LuCalendar, LuClock, LuCircleCheck, LuLoader } from "react-icons/lu";
import { useBookings } from "../hooks/useBookings";

const BookCallMVP = () => {
  const { api, user } = useAuth();

  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0],
  );
  const [slots, setSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ type: "", msg: "" });

  const { fetchAvailableSlots, confirmBooking } = useBookings();

  // Sync with your backend
  useEffect(() => {
    const fetchSlots = async () => {
      setLoading(true);
      setSelectedSlot("");
      try {
        const res = await fetchAvailableSlots(selectedDate);
        setSlots(res || []);
      } catch (err) {
        setStatus({ type: "error", msg: "Failed to load slots." });
      } finally {
        setLoading(false);
      }
    };
    fetchSlots();
  }, [selectedDate, api]);

  const handleBooking = async () => {
    if (!selectedSlot) return;
    setLoading(true);
    try {
      await confirmBooking({
        name: user?.name || "Guest",
        email: user?.email,
        date: selectedDate,
        time: selectedSlot,
      });
      setStatus({ type: "success", msg: "Call Scheduled!" });
    } catch (err) {
      setStatus({ type: "error", msg: "Booking failed. Try again." });
      setLoading(false);
    }
  };

  if (status.type === "success") {
    return (
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="max-w-md mx-auto p-8 text-center bg-card rounded-2xl border border-border shadow-xl"
      >
        <LuCircleCheck className="w-12 h-12 text-green-500 mx-auto mb-4" />
        <h2 className="text-xl font-bold text-card-foreground">{status.msg}</h2>
        <p className="text-muted-foreground mt-2">
          Check your email for the link.
        </p>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-md mx-auto p-6 bg-card rounded-2xl border border-input shadow-sm "
    >
      <h2 className="text-xl font-heading font-bold mb-6 flex items-center gap-2">
        <LuCalendar className="text-brand" /> Book a Call
      </h2>

      {/* Date Input */}
      <div className="mb-6">
        <label className="text-sm font-medium text-muted-foreground mb-2 block">
          Select Date
        </label>
        <input
          type="date"
          value={selectedDate}
          min={new Date().toISOString().split("T")[0]}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="w-full p-3 bg-secondary text-foreground border border-border rounded-xl focus:ring-2 focus:ring-brand focus:outline-none"
        />
      </div>

      {/* Slots Grid */}
      <div className="mb-6">
        <label className="text-sm font-medium text-muted-foreground mb-3 block flex items-center gap-2">
          <LuClock className="text-brand" /> Available Times
        </label>

        {loading ? (
          <div className="flex justify-center py-4">
            <LuLoader className="animate-spin text-brand w-6 h-6" />
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-2">
            <AnimatePresence mode="popLayout">
              {slots.map((slot) => (
                <motion.button
                  key={slot}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  onClick={() => setSelectedSlot(slot)}
                  className={`p-2 text-sm rounded-lg border transition-all ${
                    selectedSlot === slot
                      ? "bg-brand text-primary-foreground border-brand shadow-md"
                      : "bg-secondary text-foreground border-transparent hover:border-brand/50"
                  }`}
                >
                  {slot}
                </motion.button>
              ))}
            </AnimatePresence>
          </div>
        )}
        {!loading && slots.length === 0 && (
          <p className="text-sm text-muted-foreground text-center py-2 bg-secondary/50 rounded-lg">
            No slots available.
          </p>
        )}
      </div>

      {status.type === "error" && (
        <p className="text-red-500 text-xs mb-4 text-center">{status.msg}</p>
      )}

      {/* CTA Button */}
      <button
        onClick={handleBooking}
        disabled={loading || !selectedSlot}
        className="w-full bg-brand hover:bg-brand-dark text-primary-foreground py-3 rounded-xl font-semibold shadow-lg shadow-brand/20 disabled:opacity-50 transition-all flex justify-center items-center gap-2"
      >
        {loading ? <LuLoader className="animate-spin" /> : "Confirm Booking"}
      </button>
    </motion.div>
  );
};

export default BookCallMVP;
