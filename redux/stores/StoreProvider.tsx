"use client";

import { Provider, useDispatch } from "react-redux";
import { store } from "./store";
import { ReactNode, useEffect } from "react";
import { setToken } from "../services/authSlice";
import { parseCookies } from "nookies";

interface StoreProviderProps {
  children: ReactNode;
}

const AuthSync = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const cookies = parseCookies();
    if (cookies.auth_token) {
      dispatch(setToken(cookies.auth_token));
    }
  }, [dispatch]);

  return null;
};

export const StoreProvider: React.FC<StoreProviderProps> = ({ children }) => {
  return (
    <Provider store={store}>
      <AuthSync />
      {children}
    </Provider>
  );
};
