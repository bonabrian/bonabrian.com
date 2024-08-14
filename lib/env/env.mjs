import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

/**
 * Transform an empty string to undefined
 */
const emptyStringToUndefined = z.literal('').transform(() => undefined);

/**
 * An optional string type that is at least one character long, or transformed
 * to undefined
 */
const optionalString = z
  .string()
  .trim()
  .min(1)
  .optional()
  .or(emptyStringToUndefined);

export const env = createEnv({
  /**
   * Environment variables available on the client (and server).

   * 💡 You'll get type errors if these are not prefixed with NEXT_PUBLIC_.
   *
   * Specify your client-side environment variables schema here. This way you can ensure the app
   * isn't built with invalid env vars. To expose them to the client, prefix them with
   * `NEXT_PUBLIC_`.
   */
  client: {
    NEXT_PUBLIC_APP_URL: z.string().url(),
    NEXT_PUBLIC_GOOGLE_ANALYTICS: optionalString,
    NEXT_PUBLIC_SENTRY_DSN: z.string().url().optional(),
    NEXT_PUBLIC_AVAILABLE_FOR_HIRE: z
      .string()
      .refine((val) => val === 'true' || val === 'false')
      .transform((val) => val === 'true')
      .default('false'),
  },

  /**
   * Server-side Environment variables, not available on the client. Will throw
   * if you access these variables on the client.
   *
   * Specify your server-side environment variables schema here. This way you can ensure the app
   * isn't built with invalid env vars.
   */
  server: {
    /** database */
    DATABASE_URL: z.string().url(),
    DIRECT_URL: z.string().url(),

    /** next-auth */
    NEXTAUTH_URL: z.string().url(),
    NEXTAUTH_SECRET: z.string().trim().min(1),

    /** sentry */
    SENTRY_DSN: z.string().url().optional(),
    SENTRY_AUTH_TOKEN: optionalString,

    /** google */
    GOOGLE_ID: optionalString,
    GOOGLE_SECRET: optionalString,

    /** github */
    GITHUB_ID: optionalString,
    GITHUB_SECRET: optionalString,
    GITHUB_READ_USER_TOKEN_PERSONAL: optionalString,

    /** spotify */
    SPOTIFY_CLIENT_ID: optionalString,
    SPOTIFY_CLIENT_SECRET: optionalString,
    SPOTIFY_CLIENT_REFRESH_TOKEN: optionalString,

    /** wakatime */
    WAKATIME_API_KEY: optionalString,
  },

  /**
   * Shared between server and client
   */
  shared: {
    NODE_ENV: z
      .enum(['development', 'production', 'test'])
      .default('development'),
    GITHUB_READ_USER_TOKEN_PERSONAL: optionalString,
  },

  /**
   * Due to how Next.js (>= 13.4.4) bundles environment variables on the Client,
   * we need to manually destructure them to make sure all are included in bundle.
   *
   * Means you can't destruct `process.env` as a regular object during the Next.js edge
   * runtime (e.g. with middleware) or client-side, so we need to destruct it manually.
   *
   * 💡 You'll get type errors if not all variables from `client` are included here.
   */
  runtimeEnv: {
    /** Client */
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
    NEXT_PUBLIC_GOOGLE_ANALYTICS: process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS,
    NEXT_PUBLIC_SENTRY_DSN: process.env.NEXT_PUBLIC_SENTRY_DSN,
    NEXT_PUBLIC_AVAILABLE_FOR_HIRE: process.env.NEXT_PUBLIC_AVAILABLE_FOR_HIRE,

    /** Server */

    /** database */
    DATABASE_URL: process.env.DATABASE_URL,
    DIRECT_URL: process.env.DIRECT_URL,

    /** next-auth */
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,

    /** sentry */
    SENTRY_DSN: process.env.SENTRY_DSN,
    SENTRY_AUTH_TOKEN: process.env.SENTRY_AUTH_TOKEN,

    /** google */
    GOOGLE_ID: process.env.GOOGLE_ID,
    GOOGLE_SECRET: process.env.GOOGLE_SECRET,

    /** github */
    GITHUB_ID: process.env.GITHUB_ID,
    GITHUB_SECRET: process.env.GITHUB_SECRET,
    GITHUB_READ_USER_TOKEN_PERSONAL:
      process.env.GITHUB_READ_USER_TOKEN_PERSONAL,

    /** spotify */
    SPOTIFY_CLIENT_ID: process.env.SPOTIFY_CLIENT_ID,
    SPOTIFY_CLIENT_SECRET: process.env.SPOTIFY_CLIENT_SECRET,
    SPOTIFY_CLIENT_REFRESH_TOKEN: process.env.SPOTIFY_CLIENT_REFRESH_TOKEN,

    /** wakatime */
    WAKATIME_API_KEY: process.env.WAKATIME_API_KEY,
  },
});
