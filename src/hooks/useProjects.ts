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
    } catch (err) {
      setError('Failed to load projects');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const createProject = async (project: Omit<Project, 'id'>) => {
    try {
      setError(null);
      const newProject = await projectsApi.createProject(project);
      setProjects([...projects, newProject]);
      return newProject;
    } catch (err) {
      setError('Failed to create project');
      console.error(err);
      throw err;
    }
  };

  const updateProject = async (id: string, project: Partial<Project>) => {
    try {
      setError(null);
      const updatedProject = await projectsApi.updateProject(id, project);
      setProjects(projects.map(p => p.id === id ? updatedProject : p));
      return updatedProject;
    } catch (err) {
      setError('Failed to update project');
      console.error(err);
      throw err;
    }
  };

  const deleteProject = async (id: string) => {
    try {
      setError(null);
      await projectsApi.deleteProject(id);
      setProjects(projects.filter(p => p.id !== id));
    } catch (err) {
      setError('Failed to delete project');
      console.error(err);
      throw err;
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