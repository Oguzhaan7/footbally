import { League } from "@/models/League";

export const leagueResolvers = {
  Query: {
    leagues: async () => League.find(),
    league: async (_: any, { id }: { id: string }) => League.findById(id),
  },
  Mutation: {
    createLeague: async (_: any, { input }: any) => {
      const newLeague = new League(input);
      return await newLeague.save();
    },
  },
};
