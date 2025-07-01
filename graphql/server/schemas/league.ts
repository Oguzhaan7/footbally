export const leagueTypeDefs = /* GraphQL */ `
  type League {
    _id: ID!
    name: String!
    country: String
    logoUrl: String
  }

  type Query {
    leagues: [League!]!
    league(id: ID!): League
  }

  input CreateLeagueInput {
    name: String!
    country: String
    logoUrl: String
  }

  type Mutation {
    createLeague(input: CreateLeagueInput!): League
  }
`;
