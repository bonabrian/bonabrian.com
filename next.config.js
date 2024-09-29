/** @type {import('next').NextConfig} */
const { withSentryConfig } = require('@sentry/nextjs');

const SentryWebpackPluginOptions = { silent: true };

const isDevelopment = process.env.NODE_ENV === 'development';
const appHeaders = require('./config/next/headers');
const redirects = require('./config/next/redirects');

const { withContentlayer } = require('next-contentlayer');
const million = require('million/compiler');

const nextConfig = {
  swcMinify: true,
  compress: true,
  reactStrictMode: true,
  crossOrigin: 'anonymous',
  pageExtensions: ['ts', 'tsx', 'md', 'mdx'],
  images: {
    remotePatterns: [
      // google avatar
      { hostname: 'lh3.googleusercontent.com' },
      // github avatar
      { hostname: 'avatars.githubusercontent.com' },
      { hostname: 'i.scdn.co' },
      { hostname: 'spotify.com' },
      { hostname: 'res.cloudinary.com' },
      { hostname: 'ui-avatars.com' },
    ],
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.(png|jpe?g|gif|mp4)$/i,
      use: [
        {
          loader: 'file-loader',
          options: {
            publicPath: '/_next',
            name: 'static/media/[name].[hash].[ext]',
          },
        },
      ],
    });
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });

    return config;
  },
  async headers() {
    return appHeaders;
  },
  async redirects() {
    return redirects;
  },
};

const millionConfig = {
  mute: true,
  // auto: { rsc: true },
  rsc: true,
};

module.exports = isDevelopment
  ? million.next(withContentlayer(nextConfig), millionConfig)
  : million.next(
      withSentryConfig(
        withContentlayer(nextConfig),
        SentryWebpackPluginOptions,
      ),
      millionConfig,
    );
