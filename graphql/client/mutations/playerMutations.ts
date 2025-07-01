import { gql } from "@apollo/client";

export const CREATE_PLAYER = gql`
  mutation CreatePlayer($input: CreatePlayerInput!) {
    createPlayer(input: $input) {
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
