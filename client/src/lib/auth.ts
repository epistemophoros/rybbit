import { adminClient, organizationClient, emailOTPClient, apiKeyClient } from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";

// Server-side in Docker: fetch self (127.0.0.1) so Next.js rewrite can proxy to backend — avoids resolving public hostname from inside container.
const baseURL =
  typeof window === "undefined" && process.env.BACKEND_INTERNAL_URL
    ? `http://127.0.0.1:${process.env.PORT || 3002}`
    : process.env.NEXT_PUBLIC_BACKEND_URL;

export const authClient = createAuthClient({
  baseURL,
  plugins: [adminClient(), organizationClient(), emailOTPClient(), apiKeyClient()],
  fetchOptions: {
    credentials: "include",
  },
  socialProviders: ["google", "github", "twitter"],
});
