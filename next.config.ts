import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  devIndicators: {
    position: 'bottom-left',
  },
  experimental: {
    staleTimes: {
      dynamic: 60,
    },
    globalNotFound: true,
    clientSegmentCache: true,
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
      {
        protocol: 'https',
        hostname: 'www.google.com',
      },
      {
        protocol: 'https',
        hostname: 'plus.unsplash.com',
      },
    ],
  },
};

export default nextConfig;
