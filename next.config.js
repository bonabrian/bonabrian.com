/** @type {import('next').NextConfig} */
const { withSentryConfig } = require('@sentry/nextjs')

const SentryWebpackPluginOptions = { silent: true }

const isDevelopment = process.env.NODE_ENV === 'development'

const nextConfig = {
  reactStrictMode: true,
  pageExtensions: ['ts', 'tsx', 'md', 'mdx'],
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
    })
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    })

    return config
  },
}

module.exports = isDevelopment
  ? nextConfig
  : withSentryConfig(nextConfig, SentryWebpackPluginOptions)
