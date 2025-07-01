import { LeagueCard } from "./LeagueCard";
import { ILeague } from "@/models/League";

interface LeagueGridProps {
  leagues: Array<
    ILeague & {
      _id: string;
      teams?: Array<{
        _id: string;
        name: string;
      }>;
    }
  >;
}

export function LeagueGrid({ leagues }: LeagueGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {leagues.map((league) => (
        <LeagueCard key={league._id} league={league} />
      ))}
    </div>
  );
}
