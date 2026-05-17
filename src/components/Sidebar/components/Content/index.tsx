"use client";

// libs
import type { ReactNode } from "react";
// components
import { ScrollArea } from "@/components/ui/scroll-area";

const Content = ({ children }: { children: ReactNode }) => (
  <ScrollArea className="flex-1 px-3 py-4">{children}</ScrollArea>
);

export default Content;
