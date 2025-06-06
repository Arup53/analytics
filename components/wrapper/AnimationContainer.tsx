"use client";
import { motion } from "framer-motion";
import { type ReactNode } from "react";

interface AnimationContainerProps {
  children: ReactNode;
  className?: string;
  animation?: { opacity: number; y: number };
  delay?: number;
}

const AnimationContainer = ({
  children,
  className,
  animation = { opacity: 0, y: 20 },
  delay = 0,
}: AnimationContainerProps) => {
  return (
    <motion.div
      className={className}
      initial={animation}
      whileInView={{
        opacity: 1,
        y: 0,
        x: 0,
        scale: 1,
      }}
      viewport={{ once: true }}
      transition={{
        duration: 0.2,
        delay: delay * 0.2,
        ease: "easeOut",
      }}
    >
      {children}
    </motion.div>
  );
};

export default AnimationContainer;
