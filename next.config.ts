import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'curiokit.com',
      },
      {
        protocol: 'https',
        hostname: 'curiositas-clawkit-demo.vercel.app',
      },
    ],
  },
};

export default nextConfig;
