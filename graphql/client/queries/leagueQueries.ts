import { gql } from "@apollo/client";

export const GET_LEAGUES = gql`
  query GetLeagues {
    _id
    name
    country
  }
`;

export const GET_LEAGUE = gql`
  query GetLeague($id: ID!) {
    league(id: $id) {
      _id
      name
      country
    }
  }
`;
