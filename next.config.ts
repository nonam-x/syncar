import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allow cross-origin requests from Clerk hosted pages
  experimental: {
    optimizePackageImports: ["lucide-react", "framer-motion"],
  },
};

export default nextConfig;
