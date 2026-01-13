import { sdk } from "@lib/client";
import { queryKeysFactory } from "@lib/query-key-factory";
import { useMutation, useQuery } from "@tanstack/react-query";

import type { AlgoliaStatus } from "@custom-types/algolia";

export const algoliaQueryKeys = queryKeysFactory("algolia");

export const useSyncAlgolia = () => {
  return useMutation({
    mutationFn: async () => {
      const response = await sdk.client.fetch("/admin/algolia", {
        method: "POST",
      });

      // Return the actual response so we can inspect it
      return response;
    },
  });
};

export const useAlgolia = () => {
  return useQuery<AlgoliaStatus>({
    queryKey: algoliaQueryKeys.all,
    queryFn: () => sdk.client.fetch("/admin/algolia", { method: "GET" }),
  });
};
