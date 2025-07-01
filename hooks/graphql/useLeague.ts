import { useQuery } from "@apollo/client";
import { GET_LEAGUE } from "@/graphql/client/queries/leagueQueries";

export const useGetLeague = (id: string) => {
  return useQuery(GET_LEAGUE, {
    variables: { id },
    skip: !id,
  });
};
