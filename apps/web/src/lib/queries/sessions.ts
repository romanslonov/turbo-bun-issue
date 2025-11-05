import type { UseQueryOptions } from "@tanstack/react-query";
import { authClient } from "@zenflow/auth/client";

export const sessionQueryOptions = {
  queryKey: ["session"],
  queryFn: () => authClient.getSession(),
  staleTime: 300_000,
} satisfies UseQueryOptions;
