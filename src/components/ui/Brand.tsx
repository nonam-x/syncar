"use client";

import { Logo } from "./Logo";

interface BrandProps {
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  showText?: boolean;
  layout?: "horizontal" | "vertical";
  className?: string;
  textClassName?: string;
}

export function Brand({
  size = "md",
  showText = true,
  layout = "horizontal",
  className = "",
  textClassName = "",
}: BrandProps) {
  const presets = {
    xs: { logo: 14, text: "text-xs tracking-tight font-medium" },
    sm: { logo: 18, text: "text-sm tracking-tight font-semibold" },
    md: { logo: 24, text: "text-base tracking-tight font-bold" },
    lg: { logo: 36, text: "text-2xl tracking-tight font-bold" },
    xl: { logo: 48, text: "text-3xl tracking-tighter font-extrabold" },
  };

  const current = presets[size];

  return (
    <div
      className={`flex ${
        layout === "vertical" ? "flex-col items-center text-center gap-1" : "items-center gap-1"
      } ${className}`}
    >
      <Logo width={current.logo} height={current.logo} />
      {showText && (
        <span
          className={`select-none leading-none tracking-tight font-bold ${current.text} ${textClassName}`}
          style={{ color: "var(--foreground)", fontFamily: "var(--font-geist), sans-serif" }}
        >
          Syncar
        </span>
      )}
    </div>
  );
}
