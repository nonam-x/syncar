"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useUIStore } from "@/lib/store/ui.store";

interface LogoProps {
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
}

export function Logo({ width = 24, height = 24, className = "", priority = false }: LogoProps) {
  const theme = useUIStore((s) => s.theme);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // During hydration/SSR, render a spacer of the exact same size to avoid layout shift
  if (!mounted) {
    return <div className={className} style={{ width, height }} />;
  }

  const src = theme === "dark" ? "/dark-them-logo.svg" : "/light-them-logo.svg";

  return (
    <div className={`relative flex items-center justify-center ${className}`} style={{ width, height }}>
      <Image
        src={src}
        alt="Syncar Logo"
        width={width}
        height={height}
        className="object-contain"
        priority={priority}
      />
    </div>
  );
}
