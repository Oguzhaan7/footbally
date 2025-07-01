import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";

export const apolloClient = new ApolloClient({
  uri: "/api/graphql",
  cache: new InMemoryCache(),
});

export const apolloClientServer = () => {
  return new ApolloClient({
    ssrMode: true,
    link: new HttpLink({
      uri: `${process.env.NEXT_PUBLIC_APP_URL}/api/graphql`,
      fetch,
    }),
    cache: new InMemoryCache(),
  });
};
