export const playerTypeDefs = /* GraphQL */ `
  type Player {
    _id: ID!
    name: String!
    age: Int!
    nationality: String!
    position: String!
    marketValue: Int!
    team: Team!
    speed: Int!
    strength: Int!
    technique: Int!
    passing: Int!
    stamina: Int!
  }

  input CreatePlayerInput {
    name: String!
    age: Int!
    nationality: String!
    position: String!
    marketValue: Int!
    teamId: ID!
    speed: Int!
    strength: Int!
    technique: Int!
    passing: Int!
    stamina: Int!
  }

  type Query {
    players: [Player!]!
    player(id: ID!): Player
  }

  type Mutation {
    createPlayer(input: CreatePlayerInput!): Player!
  }
`;
