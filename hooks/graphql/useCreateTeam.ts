import { useMutation } from "@apollo/client";
import { CREATE_TEAM, CREATE_TEAM_WITH_PLAYERS } from "@/graphql/client/mutations/teamMutations";
import { GET_TEAMS } from "@/graphql/client/queries/teamQueries";
import { GET_LEAGUES } from "@/graphql/client/queries/leagueQueries";

interface CreateTeamInput {
  name: string;
  league: string;
  logoUrl?: string;
  city?: string;
  stadium?: string;
}

interface CreateTeamWithPlayersInput extends CreateTeamInput {
  playerCount?: number;
}

export const useCreateTeam = () => {
  const [createTeam, { loading, error, data }] = useMutation(CREATE_TEAM, {
    refetchQueries: [{ query: GET_TEAMS }, { query: GET_LEAGUES }],
    awaitRefetchQueries: true,
  });

  const handleCreateTeam = async (input: CreateTeamInput) => {
    try {
      const result = await createTeam({
        variables: { input },
      });
      return result.data?.createTeam;
    } catch (err) {
      console.error("Error creating team:", err);
      throw err;
    }
  };

  return {
    createTeam: handleCreateTeam,
    loading,
    error,
    data,
  };
};

export const useCreateTeamWithPlayers = () => {
  const [createTeamWithPlayers, { loading, error, data }] = useMutation(CREATE_TEAM_WITH_PLAYERS, {
    refetchQueries: [{ query: GET_TEAMS }, { query: GET_LEAGUES }],
    awaitRefetchQueries: true,
  });

  const handleCreateTeamWithPlayers = async (input: CreateTeamWithPlayersInput) => {
    try {
      const result = await createTeamWithPlayers({
        variables: { input },
      });
      return result.data?.createTeamWithPlayers;
    } catch (err) {
      console.error("Error creating team with players:", err);
      throw err;
    }
  };

  return {
    createTeamWithPlayers: handleCreateTeamWithPlayers,
    loading,
    error,
    data,
  };
};
