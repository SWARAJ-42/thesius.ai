"use client";

import { createContext, useState, ReactNode } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { BACKEND_URL } from "@/lib/constants";

type LoginResult = {
  success: boolean;
  error?: string;
};

interface AuthContextType {
  user: any;
  login: (email: string, password: string) => Promise<LoginResult>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  const login = async (
    email: string,
    password: string
  ): Promise<LoginResult> => {
    try {
      const formData = new FormData();
      formData.append("username", email);
      formData.append("password", password);

      const response = await axios.post<{ access_token: string }>(
        `${BACKEND_URL}/auth/token`,
        formData,
        {
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
        }
      );
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${response.data.access_token}`;
      localStorage.setItem("token", response.data.access_token);
      setUser(response.data);
      router.push("/");
      return { success: true };
    } catch (error) {
      console.error("Login Failed:", error);
      return {
        success: false,
        error: "Invalid credentials, try again",
      };
    }
  };

  const logout = () => {
    setUser(null);
    delete axios.defaults.headers.common["Authorization"];
    localStorage.removeItem("token");
    router.push("/login");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
