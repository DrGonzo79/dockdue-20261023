import type { NextConfig } from "next";

const repo = "dockdue-20261023";
const isPages = process.env.GITHUB_ACTIONS === "true" && process.env.PLAYWRIGHT_TEST !== "1";
const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  allowedDevOrigins: ["127.0.0.1"],
  basePath: isPages ? `/${repo}` : "",
  assetPrefix: isPages ? `/${repo}/` : "",
  images: { unoptimized: true }
};
export default nextConfig;
