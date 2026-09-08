import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["172.16.1.205"],
  output: "export", // static site generation
  images: {
    unoptimized: true, // disable server-side image optimization
  },
};

export default nextConfig;
