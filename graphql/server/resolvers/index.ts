import { playerResolvers } from "./player";
import { teamResolvers } from "./team";
import { leagueResolvers } from "./league";

export const resolvers = {
  Query: {
    ...playerResolvers.Query,
    ...teamResolvers.Query,
    ...leagueResolvers.Query,
  },
  Mutation: {
    ...playerResolvers.Mutation,
    ...teamResolvers.Mutation,
    ...leagueResolvers.Mutation,
  },
  League: {
    ...leagueResolvers.League,
  },
  Team: {
    ...teamResolvers.Team,
  },
};
