"use client";

import { createContext, useContext, useState, ReactNode } from "react";

type UIContextType = {
  // UI States
  isSidebarOpen: boolean;
  setIsSidebarOpen: (val: boolean) => void;
};

const UIContext = createContext<UIContextType | undefined>(undefined);

export const UIProvider = ({ children }: { children: ReactNode }) => {

  // UI States
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  
  return (
    <UIContext.Provider
      value={{  
        isSidebarOpen,
        setIsSidebarOpen,
      }}
    >
      {children}
    </UIContext.Provider>
  );
};

export const useUI = () => {
  const context = useContext(UIContext);
  if (!context) throw new Error("useUI must be used within a UIProvider");
  return context;
};