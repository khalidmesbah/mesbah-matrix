const nextConfig = {
  reactStrictMode: true,
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  devIndicators: {
    appIsrStatus: false,
    buildActivityPosition: 'bottom-right',
  },
  experimental: {
    staleTimes: {
      dynamic: 60,
    },
    // turbo: {
    //   rules: {
    //     '*.scss': {
    //       loaders: ['sass-loader'],
    //       as: '*.css',
    //     },
    //   },
    // },
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
    ],
  },
};

export default nextConfig;
