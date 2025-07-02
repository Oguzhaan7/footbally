import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ITeam } from "@/models/Team";
import { TeamLogo } from "./TeamLogo";

interface TeamCardProps {
  team: ITeam & { _id: string };
}

export function TeamCard({ team }: TeamCardProps) {
  const goalDifference = team.goalsFor - team.goalsAgainst;
  const winRate = team.played > 0 ? ((team.won / team.played) * 100).toFixed(1) : "0";

  return (
    <Link href={`/teams/${team._id}`}>
      <Card className="h-full hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer group">
        <CardHeader className="text-center pb-4">
          <div className="flex justify-center mb-3">
            <TeamLogo src={team.logoUrl} alt={team.name} className="h-16 w-16" />
          </div>
          <CardTitle className="text-lg font-bold group-hover:text-blue-600 transition-colors">{team.name}</CardTitle>
          <div className="flex justify-center">
            <Badge variant="outline" className="text-xs">
              League Team
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="text-center">
              <div className="font-semibold text-xl text-blue-600">{team.points}</div>
              <div className="text-muted-foreground">Points</div>
            </div>
            <div className="text-center">
              <div className="font-semibold text-xl">{team.played}</div>
              <div className="text-muted-foreground">Played</div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2 text-xs">
            <div className="text-center p-2 bg-green-50 rounded">
              <div className="font-bold text-green-600">{team.won}</div>
              <div className="text-muted-foreground">Won</div>
            </div>
            <div className="text-center p-2 bg-yellow-50 rounded">
              <div className="font-bold text-yellow-600">{team.drawn}</div>
              <div className="text-muted-foreground">Draw</div>
            </div>
            <div className="text-center p-2 bg-red-50 rounded">
              <div className="font-bold text-red-600">{team.lost}</div>
              <div className="text-muted-foreground">Lost</div>
            </div>
          </div>

          <div className="flex justify-between text-sm">
            <div>
              <span className="text-muted-foreground">Goals:</span>
              <span className="ml-1 font-medium">
                {team.goalsFor}:{team.goalsAgainst}
              </span>
            </div>
            <div className={`font-medium ${goalDifference >= 0 ? "text-green-600" : "text-red-600"}`}>
              {goalDifference >= 0 ? "+" : ""}
              {goalDifference}
            </div>
          </div>

          <div className="text-center text-sm">
            <span className="text-muted-foreground">Win Rate: </span>
            <span className="font-medium text-blue-600">{winRate}%</span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
