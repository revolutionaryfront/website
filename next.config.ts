import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export", // static site generation
  images: {
    unoptimized: true, // disable server-side image optimization
  },
};

export default nextConfig;
