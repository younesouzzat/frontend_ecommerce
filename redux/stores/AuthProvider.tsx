"use client";

import { ReactNode, createContext, useEffect, useState } from "react";
import { getCookie } from "cookies-next";

interface User {
  name: string | null;
  token: string | null;
  email: string | null;
}

interface AuthContextType {
  user: User;
  isLoading: boolean;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setUserToken] = useState(null);
  const [username, setUserName] = useState(null);
  const [useremail, setUserEmail] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const resetUserData = () => {
    setUserToken(null);
    setUserName(null);
    setUserEmail(null);
  };

  useEffect(() => {
    const getCookie = (name: any) => {
      const cookie = document.cookie
        .split("; ")
        .find((row) => row.startsWith(name + "="))
        ?.split("=")[1];

      return cookie ? JSON.parse(decodeURIComponent(cookie)) : null;
    };

    const userData = getCookie("auth_data");

    if (userData) {
      try {
        setUserToken(userData?.token || null);
        setUserName(userData?.username || "Guest");
        setUserEmail(userData?.useremail || "m@example.com");
      } catch (error) {
        console.error("Failed to parse user data from cookies:", error);
        resetUserData();
      }
    } else {
      resetUserData();
    }
    setIsLoading(false);
  }, [resetUserData]);

  const user: User = {
    token,
    name: username,
    email: useremail,
  };

  return (
    <AuthContext.Provider value={{ user, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};
