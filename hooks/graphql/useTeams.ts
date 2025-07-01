import { useQuery } from "@apollo/client";
import { GET_TEAMS } from "@/graphql/client/queries/teamQueries";

export const useGetTeams = () => {
  return useQuery(GET_TEAMS);
};
