"use client"

import React, { createContext, useState, ReactNode, Context } from 'react';
import axios from 'axios'; // Import axios directly
import { useRouter } from 'next/navigation';

interface User {
  id: string;
  username: string;
  email: string;
}

interface AuthResponse {
  auth_token: string;
  token_type: string;
  expires_in: number;
  user: User;
}

interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext: Context<AuthContextType | undefined> = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  const login = async (username: string, password: string) => {
    try {
      // Specify the response type directly within the axios call
      const response = await axios.post<AuthResponse>(
        'http://localhost:8000/auth/token',
        new URLSearchParams({
          username,
          password
        }),
        {
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          withCredentials: true,
        }
      );

      axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.auth_token}`;
      localStorage.setItem('token', response.data.auth_token);
      setUser(response.data.user); // Now using response.data.user, which is typed
      router.push('/');
    } catch (error) {
      console.log('Login Failed:', error);
    }
  };

  const logout = async () => {
    try {
      await axios.post('http://localhost:8000/auth/logout', {}, { withCredentials: true });
      delete axios.defaults.headers.common['Authorization'];
      localStorage.removeItem('token');
      setUser(null);
      router.push('/login');
    } catch (error) {
      console.log('Logout Failed:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
