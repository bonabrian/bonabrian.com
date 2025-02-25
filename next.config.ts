import MillionLint from '@million/lint';
import { withSentryConfig } from '@sentry/nextjs';
import type { NextConfig } from 'next';
import { withContentlayer } from 'next-contentlayer2';

import appHeaders from './config/next/headers';
import redirects from './config/next/redirects';

const SentryWebpackPluginOptions = { silent: true };

const isDevelopment = process.env.NODE_ENV === 'development';

const nextConfig: NextConfig = {
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

export default MillionLint.next(millionConfig)(
  isDevelopment
    ? withContentlayer(nextConfig)
    : withSentryConfig(
        withContentlayer(nextConfig),
        SentryWebpackPluginOptions,
      ),
);
