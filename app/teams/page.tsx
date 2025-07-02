"use client";

import { useState, useMemo, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { GET_TEAMS } from "@/graphql/client/queries/teamQueries";
import { GET_LEAGUES } from "@/graphql/client/queries/leagueQueries";
import { TeamGrid } from "@/components/team/TeamGrid";
import { CreateTeamForm } from "@/components/forms/CreateTeamForm";
import { useSimulateLeague } from "@/hooks/graphql/useSimulateLeague";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, Play } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

const TeamsPage = () => {
  const [selectedLeague, setSelectedLeague] = useState<string>("");
  const [isCreateFormOpen, setIsCreateFormOpen] = useState(false);

  const { simulateLeague, loading: simulateLoading } = useSimulateLeague();

  const {
    data: teamsData,
    loading: teamsLoading,
    refetch: refetchTeams,
  } = useQuery(GET_TEAMS, {
    fetchPolicy: "cache-and-network",
    notifyOnNetworkStatusChange: true,
  });
  const { data: leaguesData, loading: leaguesLoading } = useQuery(GET_LEAGUES);

  useEffect(() => {
    if (leaguesData?.leagues?.length > 0 && !selectedLeague) {
      setSelectedLeague(leaguesData.leagues[0]._id);
    }
  }, [leaguesData, selectedLeague]);

  const filteredTeams = useMemo(() => {
    if (!teamsData?.teams || !selectedLeague) return [];

    return teamsData.teams.filter((team: any) => team.league?._id === selectedLeague);
  }, [teamsData?.teams, selectedLeague]);

  const selectedLeagueData = useMemo(() => {
    return leaguesData?.leagues?.find((league: any) => league._id === selectedLeague);
  }, [leaguesData, selectedLeague]);

  const handleCreateSuccess = () => {
    refetchTeams();
  };

  const handleSimulateLeague = async () => {
    if (!selectedLeague) return;

    try {
      const result = await simulateLeague(selectedLeague);
      if (result?.success) {
        toast.success(result.message);
        refetchTeams();
      } else {
        toast.error(result?.message || "Failed to simulate league");
      }
    } catch (err: any) {
      toast.error(err.message || "Failed to simulate league");
    }
  };

  if (teamsLoading || leaguesLoading) {
    return (
      <div className="container mx-auto py-8">
        <div className="text-center">Loading teams...</div>
      </div>
    );
  }

  if (!selectedLeague || !selectedLeagueData) {
    return (
      <div className="container mx-auto py-8">
        <div className="text-center">No leagues found</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold tracking-tight">Teams</h1>
        <p className="text-lg text-muted-foreground">Browse teams by league</p>
        <Button
          onClick={() => setIsCreateFormOpen(true)}
          className="bg-slate-600 hover:bg-slate-700 text-white"
          disabled={filteredTeams.length >= 10}
        >
          <Plus className="w-4 h-4 mr-2" />
          {filteredTeams.length >= 10 ? "League Full (10/10)" : "Create New Team"}
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div className="space-y-2">
              <CardTitle className="text-2xl">{selectedLeagueData.name}</CardTitle>
              <div className="flex items-center gap-2">
                <Badge variant="outline">{selectedLeagueData.country}</Badge>
                <span className="text-sm text-muted-foreground">{filteredTeams.length}/10 teams</span>
                {filteredTeams.length >= 10 && (
                  <Badge variant="destructive" className="text-xs">
                    Full
                  </Badge>
                )}
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                onClick={handleSimulateLeague}
                disabled={simulateLoading || filteredTeams.length !== 10}
                variant="secondary"
                className="bg-green-600 hover:bg-green-700 text-white disabled:bg-gray-400"
              >
                <Play className="w-4 h-4 mr-2" />
                {simulateLoading
                  ? "Simulating..."
                  : filteredTeams.length !== 10
                  ? `Need 10 Teams (${filteredTeams.length}/10)`
                  : "Simulate League"}
              </Button>
              <Button asChild variant="outline">
                <Link href={`/leagues/${selectedLeague}`}>View League Standings</Link>
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <label htmlFor="league-select" className="text-sm font-medium">
              Change League:
            </label>
            <select
              id="league-select"
              value={selectedLeague}
              onChange={(e) => setSelectedLeague(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {leaguesData?.leagues?.map((league: any) => (
                <option key={league._id} value={league._id}>
                  {league.name} ({league.country})
                </option>
              ))}
            </select>
          </div>
        </CardContent>
      </Card>

      <TeamGrid teams={filteredTeams} />

      <CreateTeamForm
        isOpen={isCreateFormOpen}
        onClose={() => setIsCreateFormOpen(false)}
        onSuccess={handleCreateSuccess}
      />
    </div>
  );
};

export default TeamsPage;
