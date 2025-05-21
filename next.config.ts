import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
  domains: ['uploadthing.com'], // or wherever the PDF is hosted
}
  typescript: {
    ignoreBuildErrors: true, // Ignores TypeScript errors during build
  },
  eslint: {
    ignoreDuringBuilds: true, // Ignores ESLint errors during build
  },
  /* config options here */
};

export default nextConfig;
