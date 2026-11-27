"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";

const IDLE_MS = 1200;

/**
 * The site's own page scrollbar, for mouse and trackpad users (the native bar is
 * hidden for fine pointers in globals.css). A slim thumb on the right edge that
 * brightens while scrolling, widens on hover, can be dragged, and pages up or
 * down when the track is clicked. Keyboard and wheel scrolling are untouched.
 */
export function ScrollBar() {
  const trackRef = useRef<HTMLDivElement>(null);
  const thumbRef = useRef<HTMLDivElement>(null);
  const drag = useRef<{ startY: number; startScroll: number } | null>(null);
  const idle = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const [active, setActive] = useState(false);
  const [dragging, setDragging] = useState(false);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const track = trackRef.current;
      const thumb = thumbRef.current;
      if (!track || !thumb) return;
      const view = window.innerHeight;
      const total = document.documentElement.scrollHeight;
      if (total <= view + 1) {
        thumb.style.visibility = "hidden";
        return;
      }
      thumb.style.visibility = "";
      const trackHeight = track.clientHeight;
      const height = Math.max(48, (view / total) * trackHeight);
      const top = (window.scrollY / (total - view)) * (trackHeight - height);
      thumb.style.height = `${height}px`;
      thumb.style.transform = `translateY(${top}px)`;
    };
    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    const onScroll = () => {
      schedule();
      setActive(true);
      clearTimeout(idle.current);
      idle.current = setTimeout(() => setActive(false), IDLE_MS);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", schedule);
    const resize = new ResizeObserver(schedule);
    resize.observe(document.body);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(idle.current);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", schedule);
      resize.disconnect();
    };
  }, []);

  const scrollRatio = () => {
    const track = trackRef.current;
    const thumb = thumbRef.current;
    if (!track || !thumb) return 0;
    const scrollable = document.documentElement.scrollHeight - window.innerHeight;
    return scrollable / Math.max(1, track.clientHeight - thumb.offsetHeight);
  };

  return (
    <div
      ref={trackRef}
      aria-hidden
      className="group fixed top-0 right-0 bottom-0 z-[70] hidden w-3.5 [@media(pointer:fine)]:block"
      onPointerDown={(event) => {
        // Clicking the track (not the thumb) pages towards the click.
        if (event.target !== event.currentTarget) return;
        const thumb = thumbRef.current?.getBoundingClientRect();
        if (!thumb) return;
        const direction = event.clientY < thumb.top ? -1 : 1;
        window.scrollBy({ top: direction * window.innerHeight * 0.85, behavior: "smooth" });
      }}
    >
      <div
        ref={thumbRef}
        className={cn(
          "absolute top-0 right-[3px] w-[5px] cursor-grab rounded-full bg-ink-muted transition-[width,background-color,opacity] duration-200 group-hover:w-2 group-hover:bg-ink-soft",
          active || dragging ? "opacity-100" : "opacity-45 group-hover:opacity-100",
          dragging && "w-2 cursor-grabbing bg-boost group-hover:bg-boost",
        )}
        onPointerDown={(event) => {
          event.currentTarget.setPointerCapture(event.pointerId);
          drag.current = { startY: event.clientY, startScroll: window.scrollY };
          setDragging(true);
        }}
        onPointerMove={(event) => {
          if (!drag.current) return;
          const top = drag.current.startScroll + (event.clientY - drag.current.startY) * scrollRatio();
          window.scrollTo({ top, behavior: "instant" });
        }}
        onPointerUp={(event) => {
          event.currentTarget.releasePointerCapture(event.pointerId);
          drag.current = null;
          setDragging(false);
        }}
        onPointerCancel={() => {
          drag.current = null;
          setDragging(false);
        }}
      />
    </div>
  );
}
