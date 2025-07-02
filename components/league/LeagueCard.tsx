import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ILeague } from "@/models/League";
import Link from "next/link";
import { Trophy, Users, ArrowRight, MapPin } from "lucide-react";

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
  const teamCount = league.teams?.length || 0;
  const isComplete = teamCount === 10;

  return (
    <Link href={`/leagues/${league._id}`} className="group">
      <Card className="h-full hover:shadow-xl hover:shadow-emerald-500/10 transition-all duration-300 cursor-pointer border-border/50 hover:border-emerald-200 group-hover:scale-[1.02] bg-gradient-to-br from-white to-gray-50/50 hover:from-emerald-50/30 hover:to-blue-50/30">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-3 flex-1 min-w-0">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-blue-600 text-white shadow-lg group-hover:shadow-xl group-hover:shadow-emerald-500/25 transition-all duration-300 group-hover:scale-110 flex-shrink-0">
                <Trophy className="h-6 w-6 group-hover:rotate-12 transition-transform duration-300" />
              </div>
              <div className="min-w-0 flex-1">
                <CardTitle className="text-xl font-bold text-slate-900 group-hover:text-emerald-700 transition-colors duration-300 truncate">
                  {league.name}
                </CardTitle>
                <div className="flex items-center gap-1 mt-1">
                  <MapPin className="h-3 w-3 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">{league.country}</span>
                </div>
              </div>
            </div>
            <Badge
              variant={isComplete ? "default" : "secondary"}
              className={`${
                isComplete
                  ? "bg-gradient-to-r from-emerald-500 to-green-600 text-white shadow-sm"
                  : "bg-gray-100 text-gray-600"
              } transition-all duration-300`}
            >
              {league.country}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="space-y-4">
            {/* Teams Count */}
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-emerald-600" />
              <span className="text-sm font-medium text-slate-700">{teamCount} teams</span>
              {isComplete && (
                <Badge variant="outline" className="ml-auto text-xs bg-emerald-50 text-emerald-700 border-emerald-200">
                  Complete
                </Badge>
              )}
            </div>

            {/* Progress Bar */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>League Progress</span>
                <span>{teamCount}/10 teams</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                <div
                  className={`h-2 rounded-full transition-all duration-500 ${
                    isComplete
                      ? "bg-gradient-to-r from-emerald-500 to-green-600"
                      : "bg-gradient-to-r from-blue-500 to-emerald-500"
                  }`}
                  style={{ width: `${(teamCount / 10) * 100}%` }}
                ></div>
              </div>
            </div>

            {/* CTA */}
            <div className="flex items-center justify-between pt-2 border-t border-gray-100">
              <span className="text-sm font-medium text-emerald-700 group-hover:text-emerald-800 transition-colors">
                View Standings
              </span>
              <ArrowRight className="h-4 w-4 text-emerald-600 group-hover:text-emerald-700 group-hover:translate-x-1 transition-all duration-300" />
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
