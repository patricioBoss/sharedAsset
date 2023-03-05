/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["https://s3-symbol-logo.tradingview.com"],
  },
  async rewrites() {
    return [
      {
        source: "/finance/:path*",
        // has: [
        //   {
        //     type: "query",
        //     key: "symbols",
        //   },
        // ],
        destination: "https://query1.finance.yahoo.com/v7/finance/:path*",
      },
    ];
  },
};

module.exports = nextConfig;
