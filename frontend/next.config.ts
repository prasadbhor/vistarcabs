import type { NextConfig } from 'next';
const nextConfig: NextConfig = {
  poweredByHeader: false, devIndicators: false,
  distDir: process.env.NEXT_DIST_DIR || '.next',
  async redirects() {
    return [{ source: '/corporate-cab-service', destination: '/corporate-cabs', permanent: true }];
  },
  experimental: { cpus: 1, workerThreads: false },
};
export default nextConfig;
