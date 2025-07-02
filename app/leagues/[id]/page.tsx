"use client";

import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_LEAGUE } from "@/graphql/client/queries/leagueQueries";
import { StandingsTable } from "@/components/team/StandingsTable";
import { CreateTeamForm } from "@/components/forms/CreateTeamForm";
import { useSimulateLeague } from "@/hooks/graphql/useSimulateLeague";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Plus, Play } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

interface Props {
  params: Promise<{ id: string }>;
}

const LeagueDetailPage = ({ params }: Props) => {
  const [leagueId, setLeagueId] = useState<string>("");
  const [isCreateFormOpen, setIsCreateFormOpen] = useState(false);

  const { simulateLeague, loading: simulateLoading } = useSimulateLeague();

  React.useEffect(() => {
    params.then(({ id }) => setLeagueId(id));
  }, [params]);

  const { data, loading, refetch } = useQuery(GET_LEAGUE, {
    variables: { id: leagueId },
    skip: !leagueId,
    fetchPolicy: "cache-and-network",
  });

  const handleCreateSuccess = () => {
    refetch();
  };

  const handleSimulateLeague = async () => {
    if (!leagueId) return;

    try {
      const result = await simulateLeague(leagueId);
      if (result?.success) {
        toast.success(result.message);
        refetch();
      } else {
        toast.error(result?.message || "Failed to simulate league");
      }
    } catch (err: any) {
      toast.error(err.message || "Failed to simulate league");
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto py-8">
        <div className="text-center">Loading league...</div>
      </div>
    );
  }

  if (!data?.league) {
    return (
      <div className="container mx-auto py-8">
        <div className="text-center">League not found</div>
      </div>
    );
  }

  const teams = data.league.teams || [];

  return (
    <div className="container mx-auto py-8 space-y-8">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <CardTitle className="text-3xl">{data.league.name}</CardTitle>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="text-lg px-3 py-1">
                  {data.league.country}
                </Badge>
                <span className="text-sm text-muted-foreground">{teams.length}/10 teams</span>
                {teams.length >= 10 && (
                  <Badge variant="destructive" className="text-xs">
                    Full
                  </Badge>
                )}
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                onClick={() => setIsCreateFormOpen(true)}
                disabled={teams.length >= 10}
                className="bg-slate-600 hover:bg-slate-700 text-white"
              >
                <Plus className="w-4 h-4 mr-2" />
                {teams.length >= 10 ? "League Full" : "Add Team"}
              </Button>
              <Button
                onClick={handleSimulateLeague}
                disabled={simulateLoading || teams.length !== 10}
                variant="secondary"
                className="bg-green-600 hover:bg-green-700 text-white disabled:bg-gray-400"
              >
                <Play className="w-4 h-4 mr-2" />
                {simulateLoading
                  ? "Simulating..."
                  : teams.length !== 10
                  ? `Need 10 Teams (${teams.length}/10)`
                  : "Simulate League"}
              </Button>
              <Button asChild variant="outline">
                <Link href="/teams">View All Teams</Link>
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">League standings and team performance</p>
        </CardContent>
      </Card>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold">League Standings</h2>
        <StandingsTable teams={teams} />
      </div>

      <CreateTeamForm
        isOpen={isCreateFormOpen}
        onClose={() => setIsCreateFormOpen(false)}
        onSuccess={handleCreateSuccess}
        preselectedLeague={leagueId}
      />
    </div>
  );
};

export default LeagueDetailPage;
