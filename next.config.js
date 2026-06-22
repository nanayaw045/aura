/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: false,
  reactStrictMode: true,
  swcMinify: true,
  compress: true,
  poweredByHeader: false,
  productionBrowserSourceMaps: false,
  optimizeFonts: true,
  images: {
    unoptimized: true,
    formats: ['image/webp']
  },
  experimental: {
    optimizePackageImports: ['lucide-react', 'framer-motion']
  }
};

module.exports = nextConfig;
