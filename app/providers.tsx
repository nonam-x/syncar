"use client";

import { QueryClientProvider } from "@tanstack/react-query";
import { getQueryClient } from "@/lib/query/queryClient";
import { useRef, useEffect } from "react";
import { useUIStore } from "@/lib/store/ui.store";

export function Providers({ children }: { children: React.ReactNode }) {
  const queryClientRef = useRef(getQueryClient());
  const setTheme = useUIStore((s) => s.setTheme);

  useEffect(() => {
    const localTheme = localStorage.getItem("theme") as "light" | "dark" | null;
    const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const initialTheme = localTheme || (systemPrefersDark ? "dark" : "light");
    setTheme(initialTheme);
  }, [setTheme]);

  // Handle Aura Precision mouse-following flashlight glow effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const targets = document.querySelectorAll(".interactive-glow");
      targets.forEach((target) => {
        const rect = (target as HTMLElement).getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const htmlTarget = target as HTMLElement;
        htmlTarget.style.setProperty("--mouse-x", `${x}px`);
        htmlTarget.style.setProperty("--mouse-y", `${y}px`);
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <QueryClientProvider client={
      queryClientRef.current}>
      {children}
    </QueryClientProvider>
  );
}
