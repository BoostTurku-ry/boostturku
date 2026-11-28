"use client";

import { useRef } from "react";
import { cn } from "@/lib/cn";

/**
 * Tips its children towards the pointer, like turning a trading card in your hand.
 * Mouse and pen only, and off for people who prefer reduced motion.
 */
export function Tilt({ children, className, max = 7 }: { children: React.ReactNode; className?: string; max?: number }) {
  const ref = useRef<HTMLDivElement>(null);

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el || e.pointerType === "touch" || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `perspective(900px) rotateX(${(-y * max).toFixed(2)}deg) rotateY(${(x * max).toFixed(2)}deg) translateY(-4px)`;
  };

  const reset = () => {
    if (ref.current) ref.current.style.transform = "";
  };

  return (
    <div ref={ref} onPointerMove={onPointerMove} onPointerLeave={reset} className={cn("transition-transform duration-200 ease-out", className)}>
      {children}
    </div>
  );
}
