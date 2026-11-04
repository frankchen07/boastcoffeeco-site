import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.shopify.com",
        pathname: "/s/files/1/0761/3661/2008/**",
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
        destination: "/#about",
        permanent: true,
      },
      {
        source: "/contact",
        destination: "/book-event",
        permanent: true,
      },
      {
        source: "/nitro",
        destination: "/office-programs",
        permanent: true,
      },
      {
        source: "/espresso",
        destination: "/wholesale",
        permanent: true,
      },
      {
        source: "/shop-1",
        destination: "/shop",
        permanent: true,
      },
      {
        source: "/product-page/keep-it-movin-blend",
        destination: "/shop/keep-it-movin-house-blend-peru-mexico",
        permanent: true,
      },
      {
        source: "/product-page/:path*",
        destination: "/shop",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
