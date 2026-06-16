import type { NextConfig } from 'next'
import path from 'node:path'

const nextConfig: NextConfig = {
  // Pin the workspace root to this project so a stray lockfile in a parent
  // directory can't be picked up as the root or cause duplicate module resolution.
  turbopack: {
    root: path.join(__dirname),
  },
  // @react-pdf/renderer must not be bundled — it runs as a plain Node module
  // when generating will-draft PDFs server-side.
  serverExternalPackages: ['@react-pdf/renderer'],
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'blanket.ae' },
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'plus.unsplash.com' },
    ],
  },
}

export default nextConfig
