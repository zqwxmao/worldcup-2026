import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/worldcup-2026",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
