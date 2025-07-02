"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useCreateTeamWithPlayers } from "@/hooks/graphql/useCreateTeam";
import { useGetLeagues } from "@/hooks/graphql/useLeagues";
import { useState } from "react";
import { toast } from "sonner";

const teamSchema = z.object({
  name: z.string().min(1, "Team name is required").max(50, "Team name is too long"),
  league: z.string().min(1, "League selection is required"),
  city: z.string().min(1, "City is required").max(30, "City name is too long"),
  stadium: z.string().min(1, "Stadium name is required").max(50, "Stadium name is too long"),
  logoUrl: z.string().url("Please enter a valid URL").optional().or(z.literal("")),
  playerCount: z.number().min(15, "Minimum 15 players").max(30, "Maximum 30 players"),
});

type TeamFormData = z.infer<typeof teamSchema>;

interface CreateTeamFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
  preselectedLeague?: string;
}

export function CreateTeamForm({ isOpen, onClose, onSuccess, preselectedLeague }: CreateTeamFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { createTeamWithPlayers, loading, error } = useCreateTeamWithPlayers();
  const { data: leaguesData, loading: leaguesLoading } = useGetLeagues();
  const leagues = leaguesData?.leagues || [];

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<TeamFormData>({
    resolver: zodResolver(teamSchema),
    defaultValues: {
      playerCount: 20,
      league: preselectedLeague || "",
    },
  });

  const playerCount = watch("playerCount");

  const onSubmit = async (data: TeamFormData) => {
    setIsSubmitting(true);
    try {
      await createTeamWithPlayers({
        name: data.name,
        league: data.league,
        city: data.city,
        stadium: data.stadium,
        logoUrl: data.logoUrl || undefined,
        playerCount: data.playerCount,
      });

      toast.success(`${data.name} team created successfully with ${data.playerCount} players!`);
      reset();
      onSuccess?.();
      onClose();
    } catch (err: any) {
      console.error("Error creating team:", err);
      toast.error(err.message || "Failed to create team. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-slate-800">Create New Team</DialogTitle>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mt-2">
            <p className="text-sm text-blue-800">
              <strong>League Rules:</strong> Each league can have maximum 10 teams. Team names must be unique within
              each league.
            </p>
          </div>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Team Name *</label>
            <input
              {...register("name")}
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent"
              placeholder="Manchester United"
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">League *</label>
            <select
              {...register("league")}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent"
              disabled={leaguesLoading}
            >
              <option value="">Select a league</option>
              {leagues?.map((league: any) => (
                <option key={league._id} value={league._id}>
                  {league.name} ({league.country})
                </option>
              ))}
            </select>
            {errors.league && <p className="text-red-500 text-sm mt-1">{errors.league.message}</p>}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">City *</label>
              <input
                {...register("city")}
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent"
                placeholder="Manchester"
              />
              {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Stadium *</label>
              <input
                {...register("stadium")}
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent"
                placeholder="Old Trafford"
              />
              {errors.stadium && <p className="text-red-500 text-sm mt-1">{errors.stadium.message}</p>}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Team Logo URL</label>
            <input
              {...register("logoUrl")}
              type="url"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent"
              placeholder="https://example.com/logo.png"
            />
            {errors.logoUrl && <p className="text-red-500 text-sm mt-1">{errors.logoUrl.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Number of Players to Generate: {playerCount}
            </label>
            <input
              {...register("playerCount", { valueAsNumber: true })}
              type="range"
              min="15"
              max="30"
              className="w-full"
            />
            <div className="flex justify-between text-xs text-slate-500 mt-1">
              <span>15</span>
              <span>30</span>
            </div>
            {errors.playerCount && <p className="text-red-500 text-sm mt-1">{errors.playerCount.message}</p>}
            <p className="text-xs text-slate-600 mt-1">
              Random players with realistic stats will be automatically generated for your team
            </p>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
              <p className="text-sm">Failed to create team. Please try again.</p>
            </div>
          )}

          <div className="flex gap-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1" disabled={isSubmitting}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting || loading} className="flex-1 bg-slate-600 hover:bg-slate-700">
              {isSubmitting ? "Creating Team..." : "Create Team with Players"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
