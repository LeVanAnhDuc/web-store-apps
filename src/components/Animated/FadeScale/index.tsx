"use client";

// libs
import { motion } from "framer-motion";
// types
import type { ReactNode } from "react";
// others
import { cn } from "@/libs/utils";

const FadeScale = ({
  children,
  delay = 0,
  duration = 0.3,
  scale = 0.9,
  className
}: {
  children: ReactNode;
  delay?: number;
  duration?: number;
  scale?: number;
  className?: string;
}) => (
  <motion.div
    initial={{ opacity: 0, scale }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale }}
    transition={{ duration, delay }}
    className={cn(className)}
  >
    {children}
  </motion.div>
);

export default FadeScale;
