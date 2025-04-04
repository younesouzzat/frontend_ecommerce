import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  webpack(config) {
    config?.module?.rules?.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });

    config.resolve.alias = {
      ...config.resolve.alias,
      "@": path.resolve(__dirname),
    };

    return config;
  },
  images: {
    domains: [
      "127.0.0.1",
      "bigstore.byethost14.com",  // Your HTTP API domain
      "utfs.io",
      "lh3.googleusercontent.com",
      "platform-lookaside.fbsbx.com",
    ],
    remotePatterns: [
      {
        protocol: "http",  // Allow HTTP
        hostname: "127.0.0.1",
        port: "8000",
        pathname: "/storage/**",
      },
      {
        protocol: "http",  // Allow HTTP for your backend API
        hostname: "bigstore.byethost14.com",
        port: "",
        pathname: "/storage/**",
      },
      { protocol: "https", hostname: "utfs.io", port: "" },
      { protocol: "https", hostname: "lh3.googleusercontent.com", port: "" },
      { protocol: "https", hostname: "platform-lookaside.fbsbx.com", port: "" },
    ],
  },
  experimental: {
    fullySpecified: false,
  },
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "http://bigstore.byethost14.com/api/:path*", // Proxy HTTP API requests
      },
    ];
  },
};

export default nextConfig;
