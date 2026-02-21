"use client";

// libs
import { motion } from "framer-motion";
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
}) => (
  <motion.div
    initial={{ scale: 0 }}
    animate={{ scale: 1 }}
    transition={{
      type: "spring",
      stiffness,
      damping,
      delay
    }}
    className={cn(className)}
  >
    {children}
  </motion.div>
);

export default ScaleSpring;
