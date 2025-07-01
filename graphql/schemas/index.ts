import { playerTypeDefs } from "./player";
import { teamTypeDefs } from "./team";
import { leagueTypeDefs } from "./league";

export const typeDefs = /* GraphQL */ `
  ${leagueTypeDefs}
  ${teamTypeDefs}
  ${playerTypeDefs}
`;
