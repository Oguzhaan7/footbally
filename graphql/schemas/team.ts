export const teamTypeDefs = /* GraphQL */ `
  type Team {
    _id: ID!
    name: String!
    logoUrl: String
    league: League
  }

  type Query {
    teams: [Team!]!
    team(id: ID!): Team
  }

  input CreateTeamInput {
    name: String!
    logoUrl: String
    league: ID
  }

  type Mutation {
    createTeam(input: CreateTeamInput!): Team
  }
`;
