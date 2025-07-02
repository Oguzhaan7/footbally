import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { ITeam } from "@/models/Team";
import { TeamLogo } from "./TeamLogo";
import Link from "next/link";

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
    if (position <= 2) return "default";
    if (position <= 4) return "secondary";
    if (position >= sortedTeams.length - 1) return "destructive";
    return "outline";
  };

  const getPositionColor = (position: number) => {
    if (position <= 2) return "bg-green-100 dark:bg-green-900/20";
    if (position <= 4) return "bg-blue-100 dark:bg-blue-900/20";
    if (position >= sortedTeams.length - 1) return "bg-red-100 dark:bg-red-900/20";
    return "";
  };

  return (
    <div className="space-y-4">
      <div className="rounded-md border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead className="w-12 text-center">Pos</TableHead>
              <TableHead className="min-w-[200px]">Team</TableHead>
              <TableHead className="text-center w-12">P</TableHead>
              <TableHead className="text-center w-12">W</TableHead>
              <TableHead className="text-center w-12">D</TableHead>
              <TableHead className="text-center w-12">L</TableHead>
              <TableHead className="text-center w-16">GF</TableHead>
              <TableHead className="text-center w-16">GA</TableHead>
              <TableHead className="text-center w-16">GD</TableHead>
              <TableHead className="text-center w-16 font-bold">Pts</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedTeams.map((team, index) => {
              const position = index + 1;
              const goalDifference = team.goalsFor - team.goalsAgainst;

              return (
                <TableRow key={team._id} className={`hover:bg-muted/50 ${getPositionColor(position)}`}>
                  <TableCell className="text-center">
                    <Badge
                      variant={getPositionBadge(position)}
                      className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold"
                    >
                      {position}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <TeamLogo src={team.logoUrl} alt={`${team.name} logo`} />
                      <Link
                        href={`/teams/${team._id}`}
                        className="font-medium text-sm hover:text-blue-600 hover:underline transition-colors"
                      >
                        {team.name}
                      </Link>
                    </div>
                  </TableCell>
                  <TableCell className="text-center font-medium">{team.played}</TableCell>
                  <TableCell className="text-center text-green-600 font-medium">{team.won}</TableCell>
                  <TableCell className="text-center text-yellow-600 font-medium">{team.drawn}</TableCell>
                  <TableCell className="text-center text-red-600 font-medium">{team.lost}</TableCell>
                  <TableCell className="text-center font-medium">{team.goalsFor}</TableCell>
                  <TableCell className="text-center font-medium">{team.goalsAgainst}</TableCell>
                  <TableCell className="text-center font-medium">
                    <span
                      className={`${
                        goalDifference > 0
                          ? "text-green-600"
                          : goalDifference < 0
                          ? "text-red-600"
                          : "text-muted-foreground"
                      }`}
                    >
                      {goalDifference > 0 ? "+" : ""}
                      {goalDifference}
                    </span>
                  </TableCell>
                  <TableCell className="text-center font-bold text-lg">{team.points}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-green-100 dark:bg-green-900/20 rounded border"></div>
          <span className="text-muted-foreground">Positions 1-2: Champions League</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-blue-100 dark:bg-blue-900/20 rounded border"></div>
          <span className="text-muted-foreground">Positions 3-4: Europa League</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-red-100 dark:bg-red-900/20 rounded border"></div>
          <span className="text-muted-foreground">Positions 9-10: Relegation Zone</span>
        </div>
      </div>
    </div>
  );
}
