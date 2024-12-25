import api from './client';
import { Project } from '../../types';

export async function getProjects(): Promise<Project[]> {
  const response = await api.get<Project[]>('/projects');
  return response.data;
}

export async function createProject(project: Omit<Project, 'id'>): Promise<Project> {
  const response = await api.post<Project>('/projects', project);
  return response.data;
}

export async function updateProject(id: string, project: Partial<Project>): Promise<Project> {
  const response = await api.put<Project>(`/projects/${id}`, project);
  return response.data;
}

export async function deleteProject(id: string): Promise<void> {
  await api.delete(`/projects/${id}`);
}