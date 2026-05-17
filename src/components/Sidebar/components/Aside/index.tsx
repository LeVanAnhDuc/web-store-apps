"use client";

// libs
import type { ReactNode } from "react";
// others
import { cn } from "@/libs/utils";
import { useSidebarContext } from "../../context";

const Aside = ({ children }: { children: ReactNode }) => {
  const { isCollapsed, isMobileOpen } = useSidebarContext();
  return (
    <aside
      className={cn(
        "bg-card border-border fixed top-0 left-0 z-30 flex h-screen flex-col border-r transition-[width,transform] duration-300 lg:relative",
        isCollapsed ? "lg:w-16" : "lg:w-64",
        isMobileOpen
          ? "w-64 translate-x-0"
          : "-translate-x-full lg:translate-x-0"
      )}
    >
      {children}
    </aside>
  );
};

export default Aside;
