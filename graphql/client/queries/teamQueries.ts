import { gql } from "@apollo/client";

export const GET_TEAMS = gql`
  query GetTeams {
    teams {
      _id
      name
      logoUrl
      played
      won
      drawn
      lost
      goalsFor
      goalsAgainst
      points
      league {
        _id
        name
        country
      }
    }
  }
`;

export const GET_TEAM = gql`
  query GetTeam($id: ID!) {
    team(id: $id) {
      _id
      name
      logoUrl
      played
      won
      drawn
      lost
      goalsFor
      goalsAgainst
      points
      league {
        _id
        name
        country
      }
      players {
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
      }
    }
  }
`;
