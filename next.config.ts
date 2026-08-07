import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.shopify.com",
        pathname: "/s/files/**",
      },
    ],
  },
  turbopack: {
    root: __dirname,
  },
  async redirects() {
    return [
      {
        source: "/about",
        destination: "/our-story",
        permanent: true,
      },
      {
        source: "/contact",
        destination: "/book-event",
        permanent: true,
      },
      {
        source: "/catering",
        destination: "/#services",
        permanent: false,
      },
      {
        source: "/nitro",
        destination: "/#services",
        permanent: false,
      },
      {
        source: "/espresso",
        destination: "/#services",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
