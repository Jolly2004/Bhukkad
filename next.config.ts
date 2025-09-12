import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  eslint: {
    // Warning: This will **ignore all ESLint errors/warnings** during `next build`
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
