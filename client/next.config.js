/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  env: {
    NEXT_PUBLIC_BACKEND_URL: process.env.NEXT_PUBLIC_BACKEND_URL,
    NEXT_PUBLIC_DISABLE_SIGNUP: process.env.NEXT_PUBLIC_DISABLE_SIGNUP,
    NEXT_PUBLIC_APP_VERSION: process.env.npm_package_version
  },
  // In production (Docker), proxy /api to backend so requests to the client at /api/* reach the backend. Skips in dev so localhost is unchanged.
  async rewrites() {
    const dest =
      process.env.BACKEND_INTERNAL_URL ||
      (process.env.NODE_ENV === "production" ? "http://backend:3001" : null);
    if (dest) {
      return [{ source: "/api/:path*", destination: `${dest.replace(/\/$/, "")}/api/:path*` }];
    }
    return [];
  },
};

module.exports = nextConfig;
