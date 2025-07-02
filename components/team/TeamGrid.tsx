import { ITeam } from "@/models/Team";
import { TeamCard } from "./TeamCard";

interface TeamGridProps {
  teams: Array<ITeam & { _id: string }>;
}

export function TeamGrid({ teams }: TeamGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {teams.map((team) => (
        <TeamCard key={team._id} team={team} />
      ))}
    </div>
  );
}
