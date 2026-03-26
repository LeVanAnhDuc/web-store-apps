"use client";

// libs
import { motion, useReducedMotion } from "framer-motion";
// types
import type { ReactNode } from "react";
// others
import { cn } from "@/libs/utils";

const ScaleSpring = ({
  children,
  delay = 0.1,
  stiffness = 260,
  damping = 20,
  className
}: {
  children: ReactNode;
  delay?: number;
  stiffness?: number;
  damping?: number;
  className?: string;
}) => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={shouldReduceMotion ? false : { scale: 0 }}
      animate={{ scale: 1 }}
      transition={
        shouldReduceMotion
          ? { duration: 0 }
          : { type: "spring", stiffness, damping, delay }
      }
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
};

export default ScaleSpring;
