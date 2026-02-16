// Server-side in Docker: use BACKEND_INTERNAL_URL so fetches from the client container reach the backend (e.g. http://backend:3001). Browser uses public URL.
const apiBase =
  typeof window === "undefined" && process.env.BACKEND_INTERNAL_URL
    ? `${process.env.BACKEND_INTERNAL_URL}/api`
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
