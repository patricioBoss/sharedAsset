/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["https://s3-symbol-logo.tradingview.com"],
  },
};

module.exports = nextConfig;
