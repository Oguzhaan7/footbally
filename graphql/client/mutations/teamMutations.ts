import { gql } from "@apollo/client";

export const CREATE_TEAM = gql`
  mutation CreateTeam($input: CreateTeamInput!) {
    createTeam(input: $input) {
      _id
      name
      logoUrl
      city
      stadium
      league {
        _id
        name
      }
    }
  }
`;

export const CREATE_TEAM_WITH_PLAYERS = gql`
  mutation CreateTeamWithPlayers($input: CreateTeamWithPlayersInput!) {
    createTeamWithPlayers(input: $input) {
      _id
      name
      logoUrl
      city
      stadium
      league {
        _id
        name
      }
      players {
        _id
        name
        position
      }
    }
  }
`;
