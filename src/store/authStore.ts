import { create } from 'zustand';
import { User } from '../types';
import api from '../lib/api';

interface AuthState {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, firstName: string, lastName: string, company: string) => Promise<void>;
  signOut: () => Promise<void>;
  setUser: (user: User | null) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  loading: true,
  
  setUser: (user) => set({ user, loading: false }),
  
  signIn: async (email, password) => {
    const response = await api.post('/auth/login', { email, password });
    localStorage.setItem('token', response.data.token);
    set({ user: response.data.user });
  },
  
  signUp: async (email, password, firstName, lastName, company) => {
    const response = await api.post('/auth/register', { email, password, firstName, lastName, company });
    localStorage.setItem('token', response.data.token);
    set({ user: response.data.user });
  },
  
  signOut: async () => {
    localStorage.removeItem('token');
    set({ user: null });
  },
}));