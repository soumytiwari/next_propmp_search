/**
 * @type {import('next').NextConfig}
*/
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ["mongoose"],
  },
  images: {
    remotePatterns: [
      {
        hostname: 'lh3.googleusercontent.com',
        protocol: 'https',
        // hostname: 'lh3.googleusercontent.com',
        // regExp: '^https://lh3\\.googleusercontent\\.com/'
        // /^https:\/\/lh3\.googleusercontent\.com\//,
      },
    ],
  },
  webpack(config) {
    config.experiments = {
      ...config.experiments,
      topLevelAwait: true,
    };
    return config;
  },
  /* config options here */
}
 
module.exports = nextConfig
