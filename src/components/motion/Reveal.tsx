"use client";

import { motion, MotionConfig } from "motion/react";

type RevealProps = {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  rotate?: number;
  className?: string;
};

/** Fades and lifts its children in the first time they scroll into view. */
export function Reveal({ children, delay = 0, y = 24, rotate = 0, className }: RevealProps) {
  return (
    <MotionConfig reducedMotion="user">
      <motion.div
        className={className}
        initial={{ opacity: 0, y, rotate: rotate ? rotate * 2 : 0 }}
        whileInView={{ opacity: 1, y: 0, rotate }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ type: "spring", bounce: 0.3, duration: 0.8, delay }}
      >
        {children}
      </motion.div>
    </MotionConfig>
  );
}
