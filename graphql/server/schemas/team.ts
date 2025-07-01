export const teamTypeDefs = /* GraphQL */ `
  type Team {
    _id: ID!
    name: String!
    logoUrl: String
    league: League
    played: Int!
    won: Int!
    drawn: Int!
    lost: Int!
    goalsFor: Int!
    goalsAgainst: Int!
    points: Int!
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
