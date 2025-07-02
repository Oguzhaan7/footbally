import { useMutation } from "@apollo/client";
import { CREATE_LEAGUE } from "@/graphql/client/mutations/leagueMutations";
import { GET_LEAGUES } from "@/graphql/client/queries/leagueQueries";

interface CreateLeagueInput {
  name: string;
  country?: string;
  logoUrl?: string;
}

export const useCreateLeague = () => {
  const [createLeague, { loading, error, data }] = useMutation(CREATE_LEAGUE, {
    refetchQueries: [{ query: GET_LEAGUES }],
    awaitRefetchQueries: true,
  });

  const handleCreateLeague = async (input: CreateLeagueInput) => {
    try {
      const result = await createLeague({
        variables: { input },
      });
      return result.data?.createLeague;
    } catch (err) {
      console.error("Error creating league:", err);
      throw err;
    }
  };

  return {
    createLeague: handleCreateLeague,
    loading,
    error,
    data,
  };
};
