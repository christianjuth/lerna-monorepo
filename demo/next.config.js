/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    styledComponents: true
  },
  webpack5: true,
  webpack: (config) => {
    config.resolve.fallback = { fs: false };
    return config;
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: 'https://www.npmjs.com/search?q=%40christianjuth%2F',
        permanent: true,
        basePath: false
      },
    ]
  },
}
