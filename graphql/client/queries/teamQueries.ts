import { gql } from "@apollo/client";

export const GET_TEAMS = gql`
  query GetTeams {
    teams {
      _id
      name
      logo
      league {
        _id
        name
      }
    }
  }
`;

export const GET_TEAM = gql`
  query GetTeam($id: ID!) {
    team(id: $id) {
      _id
      name
      logo
      league {
        _id
        name
      }
    }
  }
`;
