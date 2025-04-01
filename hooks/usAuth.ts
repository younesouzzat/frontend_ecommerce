"use client";

import { useAuthContext } from "@/redux/stores/AuthProvider";

export const useAuth = () => {
  const { user, isLoading } = useAuthContext();
  
  const isAuthenticated = !!user.token;

  const logout = () => {
    document.cookie = "auth_data=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    window.location.reload();
  };

  return { 
    user, 
    isLoading, 
    isAuthenticated, 
    logout 
  };
};