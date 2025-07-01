import { League } from "@/models/League";
import { Team } from "@/models/Team";

export const leagueResolvers = {
  Query: {
    leagues: async () => League.find(),
    league: async (_: any, { id }: { id: string }) => League.findById(id),
    teams: async (_: any, { leagueId }: { leagueId: string }) =>
      Team.find({ league: leagueId }),
  },
  League: {
    teams: async (league: any) => Team.find({ league: league._id }),
  },
  Mutation: {
    createLeague: async (_: any, { input }: any) => {
      const newLeague = new League(input);
      return await newLeague.save();
    },
  },
};
