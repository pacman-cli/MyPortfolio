import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  output: 'standalone',
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'source.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'github.com',
      }
    ],
  },
  async rewrites() {
    return [
      {
        source: '/api/v1/:path*',
        destination: `${process.env.BACKEND_URL || (process.env.NODE_ENV === 'production' ? 'http://portfolio-backend:8080' : 'http://localhost:8082')}/api/v1/:path*`,
      },
    ]
  },
}

console.log('🔗 Connecting to Backend at:', process.env.BACKEND_URL || (process.env.NODE_ENV === 'production' ? 'http://portfolio-backend:8080' : 'http://localhost:8082'))

export default nextConfig
