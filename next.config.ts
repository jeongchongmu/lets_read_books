import type { NextConfig } from "next";
import nextra from "nextra";

const nextConfig: NextConfig = {
  reactStrictMode: true,
};

const withNextra = nextra({
  theme: "nextra-theme-docs",
  themeConfig: "./theme.config.jsx",
});

export default withNextra(nextConfig);