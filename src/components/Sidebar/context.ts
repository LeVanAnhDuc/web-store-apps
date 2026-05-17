"use client";

// libs
import { createContext, useContext } from "react";

interface SidebarContextValue {
  isCollapsed: boolean;
  onCollapsedChange: (collapsed: boolean) => void;
  isMobileOpen: boolean;
  onMobileOpenChange: (open: boolean) => void;
}

const SidebarContext = createContext<SidebarContextValue | null>(null);

export const SidebarContextProvider = SidebarContext.Provider;

export const useSidebarContext = (): SidebarContextValue => {
  const ctx = useContext(SidebarContext);
  if (!ctx) {
    throw new Error("Sidebar parts must be used inside <Sidebar.Root>");
  }
  return ctx;
};

export const useEffectiveCollapsed = (): boolean => {
  const { isCollapsed, isMobileOpen } = useSidebarContext();
  return !isMobileOpen && isCollapsed;
};
