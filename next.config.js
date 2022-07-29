/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['nextjs.org']
  },
  async rewrites() {
    return [
      {
        source: '/api/stores/:id',
        destination: `${process.env.API_DOMAIN}/stores/:id`
      }
    ]
  }
}

module.exports = nextConfig
