import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: "export",
  images: {
      unoptimized: true
  },
  basePath: '/website',
  assetPrefix: '/website/'
};

export default nextConfig;
