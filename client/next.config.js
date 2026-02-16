/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  env: {
    NEXT_PUBLIC_BACKEND_URL: process.env.NEXT_PUBLIC_BACKEND_URL,
    NEXT_PUBLIC_DISABLE_SIGNUP: process.env.NEXT_PUBLIC_DISABLE_SIGNUP,
    NEXT_PUBLIC_APP_VERSION: process.env.npm_package_version
  },
  // When BACKEND_INTERNAL_URL is set (Docker), proxy /api to backend so server-side fetch to self works without resolving public hostname.
  async rewrites() {
    const internal = process.env.BACKEND_INTERNAL_URL;
    if (internal) {
      return [{ source: "/api/:path*", destination: `${internal}/api/:path*` }];
    }
    return [];
  },
};

module.exports = nextConfig;
