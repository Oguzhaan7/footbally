import { useMutation } from "@apollo/client";
import { SIMULATE_LEAGUE } from "@/graphql/client/mutations/leagueMutations";
import { GET_TEAMS } from "@/graphql/client/queries/teamQueries";

export const useSimulateLeague = () => {
  const [simulateLeague, { loading, error, data }] = useMutation(SIMULATE_LEAGUE, {
    refetchQueries: [{ query: GET_TEAMS }],
    awaitRefetchQueries: true,
  });

  const handleSimulateLeague = async (leagueId: string) => {
    try {
      const result = await simulateLeague({
        variables: { leagueId },
      });
      return result.data?.simulateLeague;
    } catch (err) {
      console.error("Error simulating league:", err);
      throw err;
    }
  };

  return {
    simulateLeague: handleSimulateLeague,
    loading,
    error,
    data,
  };
};
