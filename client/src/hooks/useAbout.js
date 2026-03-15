import { useState, useCallback, useEffect } from "react";
import { useAuth } from "../context/AuthContext";

export const useAbout = () => {
  const { api } = useAuth();
  const [about, setAbout] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch about information
  const fetchAbout = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.get("/about");
      setAbout(response.data);
      return { success: true, data: response.data };
    } catch (err) {
      const errorMessage =
        err.response?.data?.error || "Failed to fetch about information";
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  }, [api]);

  useEffect(() => {
    fetchAbout();
  }, []);

  return { about, loading, error, fetchAbout };
};
