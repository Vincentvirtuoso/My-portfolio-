import { useState, useCallback } from "react";
import { useAuth } from "../context/AuthContext";

export const useProjects = () => {
  const { api } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [projects, setProjects] = useState([]);

  const createProject = useCallback(
    async (projectData) => {
      setLoading(true);
      setError(null);
      try {
        const response = await api.post("/projects", projectData);
        setProjects((prev) => [response.data.project, ...prev]);
        return { success: true, project: response.data.project };
      } catch (err) {
        const errorMessage =
          err.response?.data?.error || "Failed to create project";
        setError(errorMessage);
        return { success: false, error: errorMessage };
      } finally {
        setLoading(false);
      }
    },
    [api],
  );

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

  const updateProject = useCallback(
    async (id, projectData) => {
      setLoading(true);
      setError(null);
      try {
        const response = await api.put(`/projects/${id}`, projectData);
        setProjects((prev) =>
          prev.map((p) => (p._id === id ? response.data.project : p)),
        );
        return { success: true, project: response.data.project };
      } catch (err) {
        const errorMessage =
          err.response?.data?.error || "Failed to update project";
        setError(errorMessage);
        return { success: false, error: errorMessage };
      } finally {
        setLoading(false);
      }
    },
    [api],
  );

  const deleteProject = useCallback(
    async (id) => {
      setLoading(true);
      setError(null);
      try {
        await api.delete(`/projects/${id}`);
        setProjects((prev) => prev.filter((p) => p._id !== id));
        return { success: true };
      } catch (err) {
        const errorMessage =
          err.response?.data?.error || "Failed to delete project";
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
    createProject,
    getProjects,
    getProjectById,
    updateProject,
    deleteProject,
  };
};
