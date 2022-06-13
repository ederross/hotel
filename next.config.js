/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['a0.muscache.com', 'images.unsplash.com'],
  },
  compiler: {
    // Enables the styled-components SWC transform
    styledComponents: true,
  },
  i18n: {
    // The locales you want to support in your app
    locales: ['pt', 'en'],
    // The default locale you want to be used when visiting a non-locale prefixed path e.g. `/hello`
    defaultLocale: 'pt',
  
  },
};

module.exports = nextConfig;
