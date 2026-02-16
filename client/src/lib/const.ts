// Server-side in Docker: fetch self (127.0.0.1) so Next.js rewrite proxies to backend — avoids resolving public hostname from inside container.
const apiBase =
  typeof window === "undefined" && process.env.BACKEND_INTERNAL_URL
    ? `http://127.0.0.1:${process.env.PORT || 3002}/api`
    : process.env.NEXT_PUBLIC_BACKEND_URL === "http://localhost:3001"
      ? "http://localhost:3001/api"
      : `${process.env.NEXT_PUBLIC_BACKEND_URL}/api`;

export const BACKEND_URL = apiBase;
export const IS_CLOUD = process.env.NEXT_PUBLIC_CLOUD === "true";

// Time constants
export const MINUTES_IN_24_HOURS = 24 * 60; // 1440 minutes

export const DEMO_HOSTNAME = "demo.rybbit.com";

export const FREE_SITE_LIMIT = 1;
export const STANDARD_SITE_LIMIT = 5;
export const STANDARD_TEAM_LIMIT = 3;
