import { createORPCClient } from "@orpc/client";
import { RPCLink } from "@orpc/client/fetch";
import { createTanstackQueryUtils } from "@orpc/tanstack-query";
import { QueryClient } from "@tanstack/react-query";

import { appContract } from "@zenflow/contracts";
import type { ContractRouterClient } from "@orpc/contract";

export const queryClient = new QueryClient();

export const link = new RPCLink({
  url: `${import.meta.env.VITE_API_URL}/rpc`,
  fetch: (input, options) =>
    fetch(input, {
      ...options,
      credentials: "include",
    }),
});

const client: ContractRouterClient<typeof appContract> = createORPCClient(link);

export const orpc = createTanstackQueryUtils(client);
