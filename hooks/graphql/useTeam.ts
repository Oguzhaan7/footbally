import { useQuery } from "@apollo/client";
import { GET_TEAM } from "@/graphql/client/queries/teamQueries";

export const useGetTeam = (id: string) => {
  return useQuery(GET_TEAM, {
    variables: { id },
    skip: !id,
  });
};
