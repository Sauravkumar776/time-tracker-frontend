import React from 'react';
import { useAuthStore } from '../../store/authStore';
import api from '../../lib/api';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const setUser = useAuthStore((state) => state.setUser);

  React.useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      api.get('/auth/profile')
        .then(response => {
          console.log('this is get user profile api', token, response.data)
          setUser(response.data);
        })
        .catch(() => {
          localStorage.removeItem('token');
          setUser(null);
        });
    } else {
      setUser(null);
    }
  }, [setUser]);

  return <>{children}</>;
}