import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

/**
 * Next.js 15 configuration.
 *
 * PWA support is installed via `@ducanh2912/next-pwa` (see package.json) and
 * can be enabled by wrapping with `withPwa(initPwa({ ... }))` in a follow-up
 * task. Keeping it out of the default build avoids the service-worker
 * transform during `next dev` and CI which can mask application errors.
 */
const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "**" },
    ],
  },
  experimental: {
    optimizePackageImports: ["lucide-react", "framer-motion", "@react-three/drei"],
  },
  // next-pwa wrapper intentionally left for the PWA task — see comment above.
};

export default withNextIntl(nextConfig);
