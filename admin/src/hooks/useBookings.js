import { useState, useCallback } from "react";
import { useAuth } from "../context/AuthContext";

export const useBookings = () => {
  const { api } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchAvailableSlots = useCallback(
    async (date) => {
      setLoading(true);
      setError(null);
      try {
        const res = await api.get(`/bookings/available?date=${date}`);
        return res.data.availableSlots;
      } catch (err) {
        setError(err.response?.data?.error || "Error loading slots");
        return [];
      } finally {
        setLoading(false);
      }
    },
    [api],
  );

  const confirmBooking = async (bookingData) => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.post("/bookings/create", bookingData);
      return { success: true, data: res.data };
    } catch (err) {
      const msg = err.response?.data?.error || "Booking failed";
      setError(msg);
      return { success: false, error: msg };
    } finally {
      setLoading(false);
    }
  };

  return { fetchAvailableSlots, confirmBooking, loading, error };
};
