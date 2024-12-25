import { useState, useEffect } from 'react';
import * as projectsApi from '../lib/api/projects';
import { Project } from '../types';

export function useProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await projectsApi.getProjects();
      setProjects(data);
    } catch (err: any) {
      setError(err.message);
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const createProject = async (project: Omit<Project, 'id'>) => {
    try {
      setError(null);
      const newProject = await projectsApi.createProject(project);
      setProjects((prev) => [...prev, newProject]);
    } catch (err: any) {
      setError(err.message);
      console.error(err);
    }
  };

  const updateProject = async (id: string, project: Partial<Project>) => {
    try {
      setError(null);
      const updatedProject = await projectsApi.updateProject(id, project);
      setProjects((prev) => prev.map((p) => (p.id === id ? updatedProject : p)));
    } catch (err: any) {
      setError(err.message);
      console.error(err);
    }
  };

  const deleteProject = async (id: string) => {
    try {
      setError(null);
      await projectsApi.deleteProject(id);
      setProjects((prev) => prev.filter((p) => p.id !== id));
    } catch (err: any) {
      setError(err.message);
      console.error(err);
    }
  };

  return {
    projects,
    isLoading,
    error,
    createProject,
    updateProject,
    deleteProject,
    refresh: loadProjects,
  };
}
