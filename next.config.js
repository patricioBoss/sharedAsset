/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["https://s3-symbol-logo.tradingview.com"],
  },
  async rewrites() {
    return [
      {
        source: "/yahooapi/:path*",
        // has: [
        //   {
        //     type: "query",
        //     key: "symbols",
        //   },
        // ],
        destination: "https://www.pipsville.top/api/:path*",
      },
    ];
  },
};

module.exports = nextConfig;
