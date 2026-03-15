// context/AuthContext.jsx
import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [authToken, setAuthToken] = useState(null);
  const [authError, setAuthError] = useState(null);
  const api = axios.create({
    baseURL: import.meta.env.VITE_API || "http://localhost:5000/api",
  });
  const [pageTitle, setPageTitle] = useState("Admin Dashboard");

  api.interceptors.request.use((config) => {
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  api.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response && error.response.status === 401) {
        setAuthError("Session expired or invalid token. Please login again.");

        setTimeout(() => {
          logout();
        }, 5000);
      }

      return Promise.reject(error);
    },
  );

  useEffect(() => {
    if (!authToken) return;

    const checkToken = async () => {
      try {
        await api.get("/auth/me");
      } catch (error) {
        console.log("Token invalid or expired");
      }
    };

    const interval = setInterval(() => {
      checkToken();
    }, 60000); // 1 minute

    return () => clearInterval(interval);
  }, [authToken]);

  useEffect(() => {
    const token = localStorage.getItem("authToken");

    if (token) {
      setAuthToken(token);

      setIsAuthenticated(true);
    }

    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      const res = await api.post("/auth/login", { email, password });

      const token = res.data.token;

      localStorage.setItem("authToken", token);

      setAuthToken(token);
      clearError();
      setIsAuthenticated(true);

      return { success: true };
    } catch (err) {
      console.error(err);

      return {
        success: false,

        error: err.response?.data?.error || "Login failed",
      };
    }
  };

  const logout = () => {
    localStorage.removeItem("authToken");
    setAuthToken(null);
    setIsAuthenticated(false);
    setAuthError(null);
  };

  // Clear error manually after showing it
  const clearError = () => setAuthError(null);

  const value = {
    isAuthenticated,
    pageTitle,
    setPageTitle,
    login,
    logout,
    loading,
    api,
    authToken,
    authError,
    clearError,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
