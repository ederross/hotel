/** @type {import('next').NextConfig} */

const { i18n } = require('./next-i18next.config');

const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'a0.muscache.com',
      'images.unsplash.com',
      'hospeda.in',
      'img.freepik.com',
      'images.pexels.com',
      'dm8fjazsua2ut.cloudfront.net',
    ],
  },
  compiler: {
    // Enables the styled-components SWC transform
    styledComponents: true,
  },
  i18n,
  webpack5: true,
  webpack: (config) => {
    config.resolve.fallback = { fs: false };

    return config;
  },
};

module.exports = nextConfig;

// module.exports = {
//   async rewrites() {
//     return [
//       {
//         source: '/api/:path*',
//         destination: 'https://api.example.com/:path*',
//       },
//     ];
//   },
// };
