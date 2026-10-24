import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allow local network devices (e.g. mobile phones on WiFi) to access dev server and HMR/scripts
  allowedDevOrigins: [
    "192.168.1.3",
    "192.168.1.*",
    "192.168.*.*",
    "10.*.*.*",
    "172.16.*.*",
    "localhost",
    "localhost:3000",
    "localhost:3001",
    "127.0.0.1",
  ],
};

export default nextConfig;
