import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "pxqmxxjuewlpptvibnhg.supabase.co",
      },
    ],
  },
};

export default nextConfig;
