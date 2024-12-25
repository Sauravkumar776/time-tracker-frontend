import api from './client';
import { User } from '../../types';

interface AuthResponse {
  token: string;
  user: User;
}

export async function login(email: string, password: string): Promise<AuthResponse> {
  const response = await api.post<AuthResponse>('/auth/login', { email, password });
  return response.data;
}

export async function register(email: string, password: string, name: string): Promise<AuthResponse> {
  const response = await api.post<AuthResponse>('/auth/register', { email, password, name });
  return response.data;
}

export async function getCurrentUser(): Promise<User> {
  const response = await api.get<{ user: User }>('/auth/me');
  return response.data.user;
}