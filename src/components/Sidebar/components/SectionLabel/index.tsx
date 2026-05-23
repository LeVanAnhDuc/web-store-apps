"use client";

// libs
import type { ReactNode } from "react";
// others
import { useEffectiveCollapsed } from "../../context";

const SectionLabel = ({ children }: { children: ReactNode }) => {
  const collapsed = useEffectiveCollapsed();
  if (collapsed) return null;
  return (
    <p className="text-muted-foreground mt-5 mb-2 px-2 text-xs font-semibold tracking-[0.12em] uppercase">
      {children}
    </p>
  );
};

export default SectionLabel;
