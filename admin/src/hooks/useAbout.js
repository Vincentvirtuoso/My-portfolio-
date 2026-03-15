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

  // Update entire about document
  const updateAbout = useCallback(
    async (aboutData) => {
      setLoading(true);
      setError(null);
      try {
        const response = await api.put("/about", aboutData);
        setAbout(response.data.about);
        return { success: true, data: response.data.about };
      } catch (err) {
        const errorMessage =
          err.response?.data?.error || "Failed to update about information";
        setError(errorMessage);
        return { success: false, error: errorMessage };
      } finally {
        setLoading(false);
      }
    },
    [api],
  );

  // Update specific section
  const updateSection = useCallback(
    async (section, data) => {
      setLoading(true);
      setError(null);
      try {
        const response = await api.patch(`/about/${section}`, data);
        setAbout((prev) => ({
          ...prev,
          [section]: response.data[section],
        }));
        return { success: true, data: response.data[section] };
      } catch (err) {
        const errorMessage =
          err.response?.data?.error || `Failed to update ${section}`;
        setError(errorMessage);
        return { success: false, error: errorMessage };
      } finally {
        setLoading(false);
      }
    },
    [api],
  );

  // Add item to array field
  const addArrayItem = useCallback(
    async (section, item) => {
      setLoading(true);
      setError(null);
      try {
        const response = await api.post(`/about/${section}`, item);
        setAbout((prev) => ({
          ...prev,
          [section]: response.data[section],
        }));
        return { success: true, data: response.data.item };
      } catch (err) {
        const errorMessage =
          err.response?.data?.error || `Failed to add item to ${section}`;
        setError(errorMessage);
        return { success: false, error: errorMessage };
      } finally {
        setLoading(false);
      }
    },
    [api],
  );

  // Update item in array field
  const updateArrayItem = useCallback(
    async (section, index, updates) => {
      setLoading(true);
      setError(null);
      try {
        const response = await api.put(`/about/${section}/${index}`, updates);
        setAbout((prev) => ({
          ...prev,
          [section]: response.data[section],
        }));
        return { success: true, data: response.data.item };
      } catch (err) {
        const errorMessage =
          err.response?.data?.error || `Failed to update item in ${section}`;
        setError(errorMessage);
        return { success: false, error: errorMessage };
      } finally {
        setLoading(false);
      }
    },
    [api],
  );

  // Delete item from array field
  const deleteArrayItem = useCallback(
    async (section, index) => {
      setLoading(true);
      setError(null);
      try {
        const response = await api.delete(`/about/${section}/${index}`);
        setAbout((prev) => ({
          ...prev,
          [section]: response.data[section],
        }));
        return { success: true };
      } catch (err) {
        const errorMessage =
          err.response?.data?.error || `Failed to delete item from ${section}`;
        setError(errorMessage);
        return { success: false, error: errorMessage };
      } finally {
        setLoading(false);
      }
    },
    [api],
  );

  // Update stats
  const updateStats = useCallback(
    async (statsData) => {
      setLoading(true);
      setError(null);
      try {
        const response = await api.patch("/about/stats", statsData);
        setAbout((prev) => ({
          ...prev,
          stats: response.data.stats,
        }));
        return { success: true, data: response.data.stats };
      } catch (err) {
        const errorMessage =
          err.response?.data?.error || "Failed to update stats";
        setError(errorMessage);
        return { success: false, error: errorMessage };
      } finally {
        setLoading(false);
      }
    },
    [api],
  );

  // Load about on hook mount
  useEffect(() => {
    fetchAbout();
  }, [fetchAbout]);

  return {
    about,
    loading,
    error,
    fetchAbout,
    updateAbout,
    updateSection,
    addArrayItem,
    updateArrayItem,
    deleteArrayItem,
    updateStats,
  };
};
