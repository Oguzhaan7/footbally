import { apolloClientServer } from "@/lib/apollo";
import { GET_LEAGUES } from "@/graphql/client/queries/leagueQueries";
import { LeagueGrid } from "@/components/league/LeagueGrid";

const LeaguePage = async () => {
  const client = apolloClientServer();
  const { data } = await client.query({ query: GET_LEAGUES });
  return (
    <div className="container mx-auto py-8 space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold tracking-tight">
          All Football Leagues
        </h1>
        <p className="text-lg text-muted-foreground">
          Browse all available leagues and their standings
        </p>
      </div>

      <LeagueGrid leagues={data.leagues} />
    </div>
  );
};

export default LeaguePage;
