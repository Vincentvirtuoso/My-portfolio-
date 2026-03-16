import React, { createContext, useState, useContext, useEffect } from "react";
import { useAuth } from "./AuthContext";

const SettingsContext = createContext();

export const useSettings = () => useContext(SettingsContext);

export const SettingsProvider = ({ children }) => {
  const { api } = useAuth();
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchSettings = async () => {
    try {
      const res = await api.get("/settings");
      setSettings(res.data);
      applySettings(res.data);
    } catch (err) {
      console.error("Failed to load settings:", err);
    } finally {
      setLoading(false);
    }
  };

  const applySettings = (data) => {
    // 1. Update Document Title
    document.title = data.siteTitle || "Felix Vincent | Portfolio";

    // 2. Update Theme
    const root = window.document.documentElement;
    const theme =
      data.theme === "system"
        ? window.matchMedia("(prefers-color-scheme: dark)").matches
          ? "dark"
          : "light"
        : data.theme;

    root.classList.remove("light", "dark");
    root.classList.add(theme);
    localStorage.setItem("theme", theme);
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  return (
    <SettingsContext.Provider
      value={{ settings, loading, refreshSettings: fetchSettings }}
    >
      {children}
    </SettingsContext.Provider>
  );
};
