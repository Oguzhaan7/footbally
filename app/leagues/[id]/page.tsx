import { apolloClientServer } from "@/lib/apollo";
import { GET_LEAGUE } from "@/graphql/client/queries/leagueQueries";
import { StandingsTable } from "@/components/team/StandingsTable";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

interface Props {
  params: Promise<{ id: string }>;
}

const LeagueDetailPage = async ({ params }: Props) => {
  const { id } = await params;
  const client = apolloClientServer();

  try {
    const { data } = await client.query({
      query: GET_LEAGUE,
      variables: { id },
    });

    if (!data.league) {
      notFound();
    }

    return (
      <div className="container mx-auto py-8 space-y-8">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-3xl">{data.league.name}</CardTitle>
              <Badge variant="outline" className="text-lg px-3 py-1">
                {data.league.country}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              League standings and team performance
            </p>
          </CardContent>
        </Card>

        <div className="space-y-4">
          <h2 className="text-2xl font-bold">League Standings</h2>
          <StandingsTable teams={data.league.teams || []} />
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error fetching league:", error);
    notFound();
  }
};

export default LeagueDetailPage;
