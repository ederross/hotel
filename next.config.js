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
      'images.pexels.com'
    ],
  },
  compiler: {
    // Enables the styled-components SWC transform
    styledComponents: true,
  },
  i18n,
};

module.exports = nextConfig;
