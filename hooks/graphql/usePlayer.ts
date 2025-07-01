"use client";

import { useQuery } from "@apollo/client";
import { GET_PLAYER } from "@/graphql/client/queries/playerQueries";

export const useGetPlayer = (id: string) => {
  return useQuery(GET_PLAYER, {
    variables: { id },
    skip: !id,
  });
};
