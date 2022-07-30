/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['nextjs.org', 'cafein-bucket.s3.ap-northeast-2.amazonaws.com']
  },
  async rewrites() {
    return [
      {
        source: '/api/stores/:id',
        destination: `${process.env.API_DOMAIN}/stores/:id`
      },
      {
        source: '/api/stores/:id/detail-review-score',
        destination: `${process.env.API_DOMAIN}/stores/:id/detail-review-score`
      }
    ]
  }
}

module.exports = nextConfig
