"use client";

import { ReactNode, createContext, useContext, useEffect, useState, useCallback } from "react";
import { getCookie } from "cookies-next";

export interface User {
  id: number | null;
  name: string | null;
  token: string | null;
  email: string | null;
  displayname: string | null;
}

interface AuthContextType {
  user: User;
  isLoading: boolean;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User>({
    id: null,
    name: null,
    token: null,
    email: null,
    displayname: null,
  });
  const [isLoading, setIsLoading] = useState(true);

  const resetUserData = useCallback(() => {
    setUser({
      id: null,
      name: null,
      token: null,
      email: null,
      displayname: null,
    });
  }, []);

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const cookieData = getCookie("auth_data");
        if (!cookieData) {
          resetUserData();
          return;
        }

        const userData = typeof cookieData === 'string' ? JSON.parse(cookieData) : cookieData;
        
        setUser({
          id: userData?.id || null,
          token: userData?.token || null,
          name: userData?.name || null,
          email: userData?.email || null,
          displayname: userData?.name?.split(" ")
            .map((word: string) => word.charAt(0))
            .join("") || null,
        });
      } catch (error) {
        console.error("Failed to initialize auth:", error);
        resetUserData();
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, [resetUserData]);

  return (
    <AuthContext.Provider value={{ user, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};