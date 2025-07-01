import { ApolloServer } from "@apollo/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { typeDefs } from "./schemas";
import { resolvers } from "./resolvers";
import { connectToDatabase } from "@/lib/mongodb";

export const handler = startServerAndCreateNextHandler(
  new ApolloServer({
    typeDefs,
    resolvers,
  }),
  {
    context: async () => {
      await connectToDatabase();
      return {};
    },
  }
);
