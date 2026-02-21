"use client";

// libs
import { motion } from "framer-motion";
// types
import type { ReactNode } from "react";
// others
import { cn } from "@/libs/utils";

const FadeSlideUp = ({
  children,
  delay = 0,
  duration = 0.3,
  y = 20,
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
    exit={{ opacity: 0, y: -y }}
    transition={{ duration, delay }}
    className={cn(className)}
  >
    {children}
  </motion.div>
);

export default FadeSlideUp;
