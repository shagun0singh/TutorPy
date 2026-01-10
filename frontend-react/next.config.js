/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['hextaui.com'],
  },
  async rewrites() {
    // In production (Vercel), vercel.json handles routing, so rewrites aren't needed
    // In local development, proxy API calls to backend server
    if (process.env.NODE_ENV === 'development') {
      return [
        {
          source: '/api/:path*',
          destination: 'http://localhost:3001/api/:path*',
        },
      ];
    }
    // In production, return empty array (vercel.json handles routing)
    return [];
  },
}

module.exports = nextConfig

