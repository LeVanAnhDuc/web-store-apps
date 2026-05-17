"use client";

// libs
import { useMemo, type ReactNode } from "react";
// others
import { SidebarContextProvider } from "../../context";

const Root = ({
  isCollapsed,
  onCollapsedChange,
  isMobileOpen,
  onMobileOpenChange,
  children
}: {
  isCollapsed: boolean;
  onCollapsedChange: (collapsed: boolean) => void;
  isMobileOpen: boolean;
  onMobileOpenChange: (open: boolean) => void;
  children: ReactNode;
}) => {
  const value = useMemo(
    () => ({
      isCollapsed,
      onCollapsedChange,
      isMobileOpen,
      onMobileOpenChange
    }),
    [isCollapsed, onCollapsedChange, isMobileOpen, onMobileOpenChange]
  );
  return (
    <SidebarContextProvider value={value}>{children}</SidebarContextProvider>
  );
};

export default Root;
