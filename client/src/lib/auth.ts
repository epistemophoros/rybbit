import { adminClient, organizationClient, emailOTPClient, apiKeyClient } from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";

// Server-side (e.g. SSR in Docker): use BACKEND_INTERNAL_URL so the client container can reach the backend by service name (e.g. http://backend:3001). Browser uses public URL.
const baseURL =
  typeof window === "undefined" && process.env.BACKEND_INTERNAL_URL
    ? process.env.BACKEND_INTERNAL_URL
    : process.env.NEXT_PUBLIC_BACKEND_URL;

export const authClient = createAuthClient({
  baseURL,
  plugins: [adminClient(), organizationClient(), emailOTPClient(), apiKeyClient()],
  fetchOptions: {
    credentials: "include",
  },
  socialProviders: ["google", "github", "twitter"],
});
