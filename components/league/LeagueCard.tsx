import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ILeague } from "@/models/League";
import Link from "next/link";

interface LeagueCardProps {
  league: ILeague & {
    _id: string;
    teams?: Array<{
      _id: string;
      name: string;
    }>;
  };
}

export function LeagueCard({ league }: LeagueCardProps) {
  return (
    <Link href={`/leagues/${league._id}`}>
      <Card className="hover:shadow-lg transition-shadow cursor-pointer">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl">{league.name}</CardTitle>
            <Badge variant="secondary">{league.country}</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>{league.teams?.length || 0} teams</span>
            <span>View Standings →</span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
