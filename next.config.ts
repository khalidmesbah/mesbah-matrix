import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  devIndicators: {
    appIsrStatus: true,
    buildActivity: true,
    buildActivityPosition: 'bottom-left',
  },
  experimental: {
    staleTimes: {
      dynamic: 60,
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'http',
        hostname: 'cdn.islamic.network',
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'jv4vfhmlakbx4skb.public.blob.vercel-storage.com',
      },
    ],
  },
};

export default nextConfig;
