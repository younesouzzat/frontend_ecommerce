import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack(config) {
    config?.module?.rules?.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },
  images: {
    domains: ["127.0.0.1"],
    remotePatterns: [
      {
        protocol: "http",
        hostname: "127.0.0.1",
        port: "8000",
        pathname: "/storage/**",
      },
      { protocol: "https", hostname: "utfs.io", port: "" },
      { protocol: "https", hostname: "lh3.googleusercontent.com", port: "" },
      { protocol: "https", hostname: "platform-lookaside.fbsbx.com", port: "" },
    ],
  }
};

export default nextConfig;
