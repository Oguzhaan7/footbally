import { League } from "@/models/League";
import { Team } from "@/models/Team";

const simulateMatch = (team1: any, team2: any) => {
  const team1Strength = Math.random() * 100;
  const team2Strength = Math.random() * 100;

  const goals1 = Math.floor(Math.random() * 4);
  const goals2 = Math.floor(Math.random() * 4);

  if (goals1 > goals2) {
    return {
      team1Goals: goals1,
      team2Goals: goals2,
      winner: team1._id,
      result: "team1_win",
    };
  } else if (goals2 > goals1) {
    return {
      team1Goals: goals1,
      team2Goals: goals2,
      winner: team2._id,
      result: "team2_win",
    };
  } else {
    return {
      team1Goals: goals1,
      team2Goals: goals2,
      winner: null,
      result: "draw",
    };
  }
};

export const leagueResolvers = {
  Query: {
    leagues: async () => League.find(),
    league: async (_: any, { id }: { id: string }) => League.findById(id),
  },
  League: {
    teams: async (league: any) => Team.find({ league: league._id }),
  },
  Mutation: {
    createLeague: async (_: any, { input }: any) => {
      const newLeague = new League(input);
      return await newLeague.save();
    },
    simulateLeague: async (_: any, { leagueId }: { leagueId: string }) => {
      try {
        const teams = await Team.find({ league: leagueId });

        if (teams.length < 10) {
          return {
            success: false,
            message: `League needs exactly 10 teams to simulate. Currently has ${teams.length} teams.`,
          };
        }

        if (teams.length > 10) {
          return {
            success: false,
            message: `League has too many teams (${teams.length}). Maximum is 10 teams.`,
          };
        }

        for (let i = 0; i < teams.length; i++) {
          for (let j = i + 1; j < teams.length; j++) {
            const match = simulateMatch(teams[i], teams[j]);

            await Team.findByIdAndUpdate(teams[i]._id, {
              $inc: {
                played: 1,
                won: match.result === "team1_win" ? 1 : 0,
                drawn: match.result === "draw" ? 1 : 0,
                lost: match.result === "team2_win" ? 1 : 0,
                goalsFor: match.team1Goals,
                goalsAgainst: match.team2Goals,
                points: match.result === "team1_win" ? 3 : match.result === "draw" ? 1 : 0,
              },
            });

            await Team.findByIdAndUpdate(teams[j]._id, {
              $inc: {
                played: 1,
                won: match.result === "team2_win" ? 1 : 0,
                drawn: match.result === "draw" ? 1 : 0,
                lost: match.result === "team1_win" ? 1 : 0,
                goalsFor: match.team2Goals,
                goalsAgainst: match.team1Goals,
                points: match.result === "team2_win" ? 3 : match.result === "draw" ? 1 : 0,
              },
            });
          }
        }

        return {
          success: true,
          message: `League simulation completed! ${teams.length} teams played their matches.`,
        };
      } catch (error) {
        console.error("Error simulating league:", error);
        return {
          success: false,
          message: "Failed to simulate league matches",
        };
      }
    },
  },
};
