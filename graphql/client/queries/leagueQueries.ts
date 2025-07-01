import { gql } from "@apollo/client";

export const GET_LEAGUES = gql`
  query GetLeagues {
    leagues {
      _id
      name
      country
      teams {
        _id
        name
        logoUrl
      }
    }
  }
`;

export const GET_LEAGUE = gql`
  query GetLeague($id: ID!) {
    league(id: $id) {
      _id
      name
      country
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
      }
    }
  }
`;

export const GET_LEAGUE_WITH_TEAMS = gql`
  query GetLeagueWithTeams($id: ID!) {
    league(id: $id) {
      _id
      name
      country
      teams {
        _id
        name
        logoUrl
      }
    }
  }
`;
