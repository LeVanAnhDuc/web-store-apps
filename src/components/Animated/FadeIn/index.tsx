"use client";

// libs
import { motion } from "framer-motion";
// types
import type { ReactNode } from "react";
// others
import { cn } from "@/libs/utils";

const FadeIn = ({
  children,
  delay = 0,
  duration = 0.3,
  y = 0,
  className
}: {
  children: ReactNode;
  delay?: number;
  duration?: number;
  y?: number;
  className?: string;
}) => (
  <motion.div
    initial={{ opacity: 0, y }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration, delay }}
    className={cn(className)}
  >
    {children}
  </motion.div>
);

export default FadeIn;
