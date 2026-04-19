/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // API traffic: `app/api/[...path]/route.ts` proxies to Flask and forwards headers (incl. X-Clairvyn-Investor).
}

export default nextConfig
