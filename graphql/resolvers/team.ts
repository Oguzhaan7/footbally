import { Team } from "@/models/Team";

export const teamResolvers = {
  Query: {
    teams: async () => Team.find().populate("league"),
    team: async (_: any, { id }: { id: string }) => Team.findById(id).populate("league"),
  },
  Mutation: {
    createTeam: async (_: any, { input }: any) => {
      const newTeam = new Team(input);
      return await newTeam.save();
    },
  },
};
