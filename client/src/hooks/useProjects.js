import { useState, useCallback } from "react";
import { useAuth } from "../context/AuthContext";

export const useProjects = () => {
  const { api } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [projects, setProjects] = useState([]);

  const getProjects = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.get("/projects");
      setProjects(response.data);
      return { success: true, projects: response.data };
    } catch (err) {
      const errorMessage =
        err.response?.data?.error || "Failed to fetch projects";
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  }, [api]);

  const getProjectById = useCallback(
    async (id) => {
      setLoading(true);
      setError(null);
      try {
        const response = await api.get(`/projects/${id}`);
        return { success: true, project: response.data };
      } catch (err) {
        const errorMessage =
          err.response?.data?.error || "Failed to fetch project";
        setError(errorMessage);
        return { success: false, error: errorMessage };
      } finally {
        setLoading(false);
      }
    },
    [api],
  );

  return {
    loading,
    error,
    projects,
    getProjects,
    getProjectById,
  };
};
