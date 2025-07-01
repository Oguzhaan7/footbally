import { useQuery } from "@apollo/client";
import { GET_LEAGUES } from "@/graphql/client/queries/leagueQueries";

export const useGetLeagues = () => {
  return useQuery(GET_LEAGUES);
};
