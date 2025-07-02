export const teamTypeDefs = /* GraphQL */ `
  type Team {
    _id: ID!
    name: String!
    logoUrl: String
    league: League!
    city: String
    stadium: String
    played: Int!
    won: Int!
    drawn: Int!
    lost: Int!
    goalsFor: Int!
    goalsAgainst: Int!
    points: Int!
    players: [Player!]
  }

  type Query {
    teams: [Team!]!
    team(id: ID!): Team
  }

  input CreateTeamInput {
    name: String!
    logoUrl: String
    league: ID!
  }

  input CreateTeamWithPlayersInput {
    name: String!
    logoUrl: String
    league: ID!
    city: String
    stadium: String
    playerCount: Int = 20
  }

  type Mutation {
    createTeam(input: CreateTeamInput!): Team
    createTeamWithPlayers(input: CreateTeamWithPlayersInput!): Team
  }
`;
