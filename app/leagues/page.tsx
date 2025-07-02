"use client";

import { useGetLeagues } from "@/hooks/graphql/useLeagues";
import { LeagueGrid } from "@/components/league/LeagueGrid";
import { CreateLeagueForm } from "@/components/forms/CreateLeagueForm";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useState } from "react";

const LeaguePage = () => {
  const [isCreateFormOpen, setIsCreateFormOpen] = useState(false);
  const { data, loading, refetch } = useGetLeagues();

  const handleCreateSuccess = () => {
    refetch();
  };

  if (loading) {
    return (
      <div className="container mx-auto py-8">
        <div className="animate-pulse space-y-8">
          <div className="text-center space-y-4">
            <div className="h-8 bg-gray-200 rounded-md w-64 mx-auto"></div>
            <div className="h-6 bg-gray-200 rounded-md w-96 mx-auto"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-48 bg-gray-200 rounded-lg"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold tracking-tight">All Football Leagues</h1>
        <p className="text-lg text-muted-foreground">Browse all available leagues and their standings</p>
        <Button onClick={() => setIsCreateFormOpen(true)} className="bg-slate-600 hover:bg-slate-700 text-white">
          <Plus className="w-4 h-4 mr-2" />
          Create New League
        </Button>
      </div>

      <LeagueGrid leagues={data?.leagues || []} />

      <CreateLeagueForm
        isOpen={isCreateFormOpen}
        onClose={() => setIsCreateFormOpen(false)}
        onSuccess={handleCreateSuccess}
      />
    </div>
  );
};

export default LeaguePage;
