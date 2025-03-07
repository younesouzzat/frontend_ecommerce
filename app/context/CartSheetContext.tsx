"use client";

import { createContext, useContext, useState, ReactNode } from "react";

type SheetType = "cart" | "anotherSheet"; // Add more if needed

interface CartSheetContextType {
  openSheet: (sheet: SheetType) => void;
  closeSheet: (sheet: SheetType) => void;
  isSheetOpen: (sheet: SheetType) => boolean;
}

const CartSheetContext = createContext<CartSheetContextType | undefined>(undefined);

export const CartSheetProvider = ({ children }: { children: ReactNode }) => {
  const [openSheets, setOpenSheets] = useState<Record<SheetType, boolean>>({
    cart: false,
    anotherSheet: false,
  });

  const openSheet = (sheet: SheetType) => {
    console.log(`Opening sheet: ${sheet}`); // Debug log
    setOpenSheets((prev) => ({ ...prev, [sheet]: true }));
  };

  const closeSheet = (sheet: SheetType) => {
    console.log(`Closing sheet: ${sheet}`); // Debug log
    setOpenSheets((prev) => ({ ...prev, [sheet]: false }));
  };

  const isSheetOpen = (sheet: SheetType) => {
    const isOpen = openSheets[sheet];
    console.log(`Checking if sheet ${sheet} is open: ${isOpen}`); // Debug log
    return isOpen;
  };

  return (
    <CartSheetContext.Provider value={{ openSheet, closeSheet, isSheetOpen }}>
      {children}
    </CartSheetContext.Provider>
  );
};

export const useCartSheet = () => {
  const context = useContext(CartSheetContext);
  if (!context) {
    console.error("useCartSheet must be used within a CartSheetProvider"); // Improved error logging
    throw new Error("useCartSheet must be used within a CartSheetProvider");
  }
  return context;
};