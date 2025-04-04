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
      "bigstore.byethost14.com",
      "utfs.io",
      "lh3.googleusercontent.com",
      "platform-lookaside.fbsbx.com",
    ],
    remotePatterns: [
      {
        protocol: "http",
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
};

export default nextConfig;
