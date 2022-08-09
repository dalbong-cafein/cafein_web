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
      },
      {
        source: '/api/web/recommendations',
        destination: `${process.env.API_DOMAIN}/web/recommendations`
      },
      {
        source: '/api/web/stores/:storeId/recommendations',
        destination: `${process.env.API_DOMAIN}/web/stores/:storeId/recommendations`
      }
    ]
  }
}

module.exports = nextConfig
