"use client";

import { useQuery } from "@apollo/client";
import { GET_PLAYERS } from "@/graphql/client/queries/playerQueries";

export const useGetPlayers = () => {
  return useQuery(GET_PLAYERS);
};
