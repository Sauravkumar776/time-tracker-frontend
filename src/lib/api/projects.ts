import api from './client';
import { Project } from '../../types';

// Generic API call wrapper
async function apiCall<T>(
  method: 'get' | 'post' | 'put' | 'delete',
  url: string,
  data?: any
): Promise<T> {
  try {
    const response = await api[method]<T>(url, data);
    return response.data;
  } catch (err: any) {
    const errorMessage = err.response?.data?.message || 'An unexpected error occurred';
    throw new Error(errorMessage);
  }
}

// API calls using the generic function
export async function getProjects(): Promise<Project[]> {
  return apiCall<Project[]>('get', '/projects');
}

export async function createProject(project: Omit<Project, 'id'>): Promise<Project> {
  return apiCall<Project>('post', '/projects', project);
}

export async function updateProject(id: string, project: Partial<Project>): Promise<Project> {
  return apiCall<Project>('put', `/projects/${id}`, project);
}

export async function deleteProject(id: string): Promise<void> {
  return apiCall<void>('delete', `/projects/${id}`);
}
