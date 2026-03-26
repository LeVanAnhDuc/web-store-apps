"use client";

// libs
import { motion, useReducedMotion } from "framer-motion";
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
}) => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={shouldReduceMotion ? false : { opacity: 0, x }}
      animate={{ opacity: 1, x: 0 }}
      exit={shouldReduceMotion ? undefined : { opacity: 0, x }}
      transition={shouldReduceMotion ? { duration: 0 } : { duration, delay }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
};

export default FadeSlideLeft;
