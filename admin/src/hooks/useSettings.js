import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";

export const useSettings = () => {
  const { api } = useAuth();
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchSettings = async () => {
    try {
      const res = await api.get("/settings");
      setSettings(res.data);
    } catch (err) {
      console.error("Settings fetch failed");
    }
  };

  const saveSettings = async (newData) => {
    setLoading(true);
    try {
      const res = await api.patch("/settings", newData);
      setSettings(res.data);
      return { success: true };
    } catch (err) {
      return { success: false };
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  return { settings, saveSettings, loading, fetchSettings };
};
