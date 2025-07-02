import { apolloClientServer } from "@/lib/apollo";
import { GET_TEAM } from "@/graphql/client/queries/teamQueries";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TeamLogo } from "@/components/team/TeamLogo";
import { PlayersTable } from "@/components/player/PlayersTable";
import { notFound } from "next/navigation";
import Link from "next/link";

export const dynamic = "force-dynamic";

interface Props {
  params: Promise<{ id: string }>;
}

const TeamDetailPage = async ({ params }: Props) => {
  const { id } = await params;
  const client = apolloClientServer();

  try {
    const { data } = await client.query({
      query: GET_TEAM,
      variables: { id },
    });

    if (!data.team) {
      notFound();
    }

    const team = data.team;
    const goalDifference = team.goalsFor - team.goalsAgainst;
    const winRate = team.played > 0 ? ((team.won / team.played) * 100).toFixed(1) : "0";

    return (
      <div className="container mx-auto py-8 space-y-8">
        <Card>
          <CardHeader>
            <div className="flex flex-col lg:flex-row items-start lg:items-center gap-6">
              <div className="flex items-center gap-6 flex-1">
                <TeamLogo src={team.logoUrl} alt={team.name} className="h-20 w-20" />
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-2">
                    <CardTitle className="text-3xl">{team.name}</CardTitle>
                    <Badge variant="outline" className="text-sm px-3 py-1">
                      {team.league?.name || "League"}
                    </Badge>
                  </div>
                  <p className="text-muted-foreground">{team.league?.country || "Country"} • Season Statistics</p>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-2">
                <Button asChild variant="outline" size="sm">
                  <Link href="/teams">All Teams</Link>
                </Button>
                <Button asChild variant="default" size="sm">
                  <Link href={`/leagues/${team.league?._id}`}>League Standings</Link>
                </Button>
              </div>
            </div>
          </CardHeader>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">{team.points}</div>
              <div className="text-sm text-muted-foreground">Total Points</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold mb-2">{team.played}</div>
              <div className="text-sm text-muted-foreground">Matches Played</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">{winRate}%</div>
              <div className="text-sm text-muted-foreground">Win Rate</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <div className={`text-3xl font-bold mb-2 ${goalDifference >= 0 ? "text-green-600" : "text-red-600"}`}>
                {goalDifference >= 0 ? "+" : ""}
                {goalDifference}
              </div>
              <div className="text-sm text-muted-foreground">Goal Difference</div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Season Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600 mb-1">{team.won}</div>
                <div className="text-sm text-muted-foreground">Wins</div>
              </div>
              <div className="text-center p-4 bg-yellow-50 rounded-lg">
                <div className="text-2xl font-bold text-yellow-600 mb-1">{team.drawn}</div>
                <div className="text-sm text-muted-foreground">Draws</div>
              </div>
              <div className="text-center p-4 bg-red-50 rounded-lg">
                <div className="text-2xl font-bold text-red-600 mb-1">{team.lost}</div>
                <div className="text-sm text-muted-foreground">Losses</div>
              </div>
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600 mb-1">
                  {team.goalsFor}:{team.goalsAgainst}
                </div>
                <div className="text-sm text-muted-foreground">Goals</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-4">
          <h2 className="text-2xl font-bold">Squad Players</h2>
          <PlayersTable players={team.players || []} />
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error fetching team:", error);
    notFound();
  }
};

export default TeamDetailPage;
