"use client";

// libs
import { motion } from "framer-motion";
// types
import type { ReactNode } from "react";
// others
import { cn } from "@/libs/utils";

const FadeSlideLeft = ({
  children,
  delay = 0,
  duration = 0.3,
  x = -20,
  className
}: {
  children: ReactNode;
  delay?: number;
  duration?: number;
  x?: number;
  className?: string;
}) => (
  <motion.div
    initial={{ opacity: 0, x }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x }}
    transition={{ duration, delay }}
    className={cn(className)}
  >
    {children}
  </motion.div>
);

export default FadeSlideLeft;
