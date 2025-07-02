import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { ITeam } from "@/models/Team";
import { TeamLogo } from "./TeamLogo";
import Link from "next/link";
import { Trophy, Medal, TrendingDown, ArrowRight } from "lucide-react";

interface StandingsTableProps {
  teams: Array<ITeam & { _id: string }>;
}

export function StandingsTable({ teams }: StandingsTableProps) {
  const sortedTeams = [...teams].sort((a, b) => {
    if (b.points !== a.points) return b.points - a.points;
    const aGD = a.goalsFor - a.goalsAgainst;
    const bGD = b.goalsFor - b.goalsAgainst;
    if (bGD !== aGD) return bGD - aGD;
    return b.goalsFor - a.goalsFor;
  });

  const getPositionBadge = (position: number) => {
    if (position === 1) return "default";
    if (position <= 2) return "secondary";
    if (position <= 4) return "outline";
    if (position >= sortedTeams.length - 1) return "destructive";
    return "outline";
  };

  const getPositionColor = (position: number) => {
    if (position === 1) return "bg-gradient-to-r from-yellow-50 to-amber-50 border-l-4 border-l-yellow-400";
    if (position <= 2) return "bg-gradient-to-r from-emerald-50 to-green-50 border-l-4 border-l-emerald-400";
    if (position <= 4) return "bg-gradient-to-r from-blue-50 to-cyan-50 border-l-4 border-l-blue-400";
    if (position >= sortedTeams.length - 1)
      return "bg-gradient-to-r from-red-50 to-rose-50 border-l-4 border-l-red-400";
    return "hover:bg-slate-50/50";
  };

  const getPositionIcon = (position: number) => {
    if (position === 1) return <Trophy className="h-3 w-3 text-yellow-600" />;
    if (position <= 2) return <Medal className="h-3 w-3 text-emerald-600" />;
    if (position >= sortedTeams.length - 1) return <TrendingDown className="h-3 w-3 text-red-600" />;
    return null;
  };

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-border/50 overflow-hidden shadow-sm bg-white/50 backdrop-blur-sm">
        <Table>
          <TableHeader>
            <TableRow className="bg-gradient-to-r from-slate-50 to-gray-50 hover:from-slate-100 hover:to-gray-100">
              <TableHead className="w-12 text-center font-semibold">Pos</TableHead>
              <TableHead className="min-w-[200px] font-semibold">Team</TableHead>
              <TableHead className="text-center w-12 font-semibold">P</TableHead>
              <TableHead className="text-center w-12 font-semibold">W</TableHead>
              <TableHead className="text-center w-12 font-semibold">D</TableHead>
              <TableHead className="text-center w-12 font-semibold">L</TableHead>
              <TableHead className="text-center w-16 font-semibold">GF</TableHead>
              <TableHead className="text-center w-16 font-semibold">GA</TableHead>
              <TableHead className="text-center w-16 font-semibold">GD</TableHead>
              <TableHead className="text-center w-16 font-bold text-emerald-700">Pts</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedTeams.map((team, index) => {
              const position = index + 1;
              const goalDifference = team.goalsFor - team.goalsAgainst;

              return (
                <TableRow
                  key={team._id}
                  className={`transition-all duration-300 hover:shadow-sm ${getPositionColor(position)}`}
                >
                  <TableCell className="text-center">
                    <div className="flex items-center justify-center gap-1">
                      <Badge
                        variant={getPositionBadge(position)}
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                          position === 1
                            ? "bg-gradient-to-r from-yellow-500 to-amber-600 text-white shadow-md"
                            : position <= 2
                            ? "bg-gradient-to-r from-emerald-500 to-green-600 text-white"
                            : position <= 4
                            ? "bg-gradient-to-r from-blue-500 to-cyan-600 text-white"
                            : position >= sortedTeams.length - 1
                            ? "bg-gradient-to-r from-red-500 to-rose-600 text-white"
                            : ""
                        }`}
                      >
                        {position}
                      </Badge>
                      {getPositionIcon(position)}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Link
                      href={`/teams/${team._id}`}
                      className="flex items-center space-x-3 group transition-all duration-300 hover:translate-x-1"
                    >
                      <TeamLogo
                        src={team.logoUrl}
                        alt={`${team.name} logo`}
                        className="group-hover:scale-110 transition-transform duration-300"
                      />
                      <span className="font-medium text-sm group-hover:text-emerald-700 transition-colors">
                        {team.name}
                      </span>
                      <ArrowRight className="h-3 w-3 text-muted-foreground group-hover:text-emerald-600 opacity-0 group-hover:opacity-100 transition-all duration-300" />
                    </Link>
                  </TableCell>
                  <TableCell className="text-center font-medium text-slate-700">{team.played}</TableCell>
                  <TableCell className="text-center text-emerald-600 font-semibold">{team.won}</TableCell>
                  <TableCell className="text-center text-amber-600 font-semibold">{team.drawn}</TableCell>
                  <TableCell className="text-center text-red-600 font-semibold">{team.lost}</TableCell>
                  <TableCell className="text-center font-medium text-slate-700">{team.goalsFor}</TableCell>
                  <TableCell className="text-center font-medium text-slate-700">{team.goalsAgainst}</TableCell>
                  <TableCell className="text-center font-semibold">
                    <span
                      className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-bold ${
                        goalDifference > 0
                          ? "bg-emerald-100 text-emerald-700"
                          : goalDifference < 0
                          ? "bg-red-100 text-red-700"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {goalDifference > 0 ? "+" : ""}
                      {goalDifference}
                    </span>
                  </TableCell>
                  <TableCell className="text-center">
                    <div className="flex items-center justify-center">
                      <span className="font-bold text-lg bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
                        {team.points}
                      </span>
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>

      {/* Legend */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm bg-gradient-to-r from-slate-50 to-gray-50 p-4 rounded-xl border border-border/50">
        <div className="flex items-center space-x-3 group hover:scale-105 transition-transform duration-300">
          <div className="flex items-center gap-1">
            <div className="w-4 h-4 bg-gradient-to-r from-emerald-500 to-green-600 rounded border shadow-sm"></div>
            <Trophy className="h-3 w-3 text-emerald-600" />
          </div>
          <span className="text-muted-foreground group-hover:text-emerald-700 transition-colors">
            Positions 1-2: Champions League
          </span>
        </div>
        <div className="flex items-center space-x-3 group hover:scale-105 transition-transform duration-300">
          <div className="flex items-center gap-1">
            <div className="w-4 h-4 bg-gradient-to-r from-blue-500 to-cyan-600 rounded border shadow-sm"></div>
            <Medal className="h-3 w-3 text-blue-600" />
          </div>
          <span className="text-muted-foreground group-hover:text-blue-700 transition-colors">
            Positions 3-4: Europa League
          </span>
        </div>
        <div className="flex items-center space-x-3 group hover:scale-105 transition-transform duration-300">
          <div className="flex items-center gap-1">
            <div className="w-4 h-4 bg-gradient-to-r from-red-500 to-rose-600 rounded border shadow-sm"></div>
            <TrendingDown className="h-3 w-3 text-red-600" />
          </div>
          <span className="text-muted-foreground group-hover:text-red-700 transition-colors">
            Positions 9-10: Relegation Zone
          </span>
        </div>
      </div>
    </div>
  );
}
