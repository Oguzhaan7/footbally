import { gql } from "@apollo/client";

export const CREATE_LEAGUE = gql`
  mutation CreateLeague($input: CreateLeagueInput!) {
    createLeague(input: $input) {
      _id
      name
      country
      logoUrl
    }
  }
`;

export const SIMULATE_LEAGUE = gql`
  mutation SimulateLeague($leagueId: ID!) {
    simulateLeague(leagueId: $leagueId) {
      success
      message
    }
  }
`;
