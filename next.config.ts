import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'www.callnik.com' }],
        destination: 'https://callnik.com/:path*',
        permanent: true,
      },
    ]
  },
};

export default nextConfig;
