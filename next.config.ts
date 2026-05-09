/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
      },
    ],
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            // Allow the NGF portal to embed this site in an iframe for live preview
            value: "frame-ancestors 'self' https://app.ngfsystems.com https://*.vercel.app",
          },
        ],
      },
    ]
  },
}

module.exports = nextConfig
