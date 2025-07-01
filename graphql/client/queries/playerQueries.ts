import { gql } from "@apollo/client";

export const GET_PLAYERS = gql`
  query GetPlayers {
    players {
      _id
      name
      age
      nationality
      position
      marketValue
      team {
        name
      }
      speed
      strength
      technique
      passing
      stamina
    }
  }
`;

export const GET_PLAYER = gql`
  query GetPlayer($id: ID!) {
    player(id: $id) {
      _id
      name
      age
      nationality
      position
      marketValue
      speed
      strength
      technique
      passing
      stamina
      team {
        _id
        name
      }
    }
  }
`;
