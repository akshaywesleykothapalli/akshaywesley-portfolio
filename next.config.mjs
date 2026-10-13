/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  basePath: process.env.GITHUB_ACTIONS === 'true' ? '/akshaywesley-portfolio' : '',
  env: {
    NEXT_PUBLIC_BASE_PATH: process.env.GITHUB_ACTIONS === 'true' ? '/akshaywesley-portfolio' : '',
  },
  images: {
    remotePatterns: [],
    formats: ['image/avif', 'image/webp'],
    unoptimized: true,
  },
  experimental: {
    optimizePackageImports: ['@react-three/fiber', 'three'],
  },
  webpack(config) {
    config.experiments = { ...config.experiments, topLevelAwait: true }
    return config
  },
}

export default nextConfig