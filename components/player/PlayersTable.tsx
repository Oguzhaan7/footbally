"use client";

import { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { IPlayer } from "@/models/Player";
import { PlayerModal } from "./PlayerModal";

interface PlayersTableProps {
  players: Array<IPlayer & { _id: string }>;
}

export function PlayersTable({ players }: PlayersTableProps) {
  const [selectedPlayer, setSelectedPlayer] = useState<(IPlayer & { _id: string }) | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handlePlayerClick = (player: IPlayer & { _id: string }) => {
    setSelectedPlayer(player);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedPlayer(null);
  };
  const getPositionColor = (position: string) => {
    switch (position) {
      case "GK":
        return "bg-yellow-100 text-yellow-800";
      case "DF":
        return "bg-blue-100 text-blue-800";
      case "MF":
        return "bg-green-100 text-green-800";
      case "FW":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const formatMarketValue = (value: number) => {
    if (value >= 1000000) {
      return `€${(value / 1000000).toFixed(1)}M`;
    } else if (value >= 1000) {
      return `€${(value / 1000).toFixed(0)}K`;
    }
    return `€${value}`;
  };

  const getOverallRating = (player: IPlayer) => {
    const stats = [player.speed, player.strength, player.technique, player.passing, player.stamina];
    const average = stats.reduce((sum, stat) => sum + stat, 0) / stats.length;
    return Math.round(average);
  };

  const getRatingColor = (rating: number) => {
    if (rating >= 80) return "text-green-600 font-bold";
    if (rating >= 70) return "text-blue-600 font-semibold";
    if (rating >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  if (!players || players.length === 0) {
    return <div className="text-center py-8 text-muted-foreground">No players found for this team.</div>;
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Position</TableHead>
            <TableHead>Age</TableHead>
            <TableHead>Nationality</TableHead>
            <TableHead>Market Value</TableHead>
            <TableHead>Rating</TableHead>
            <TableHead>Speed</TableHead>
            <TableHead>Strength</TableHead>
            <TableHead>Technique</TableHead>
            <TableHead>Passing</TableHead>
            <TableHead>Stamina</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {players.map((player) => {
            const overallRating = getOverallRating(player);
            return (
              <TableRow
                key={player._id}
                className="cursor-pointer transition-colors hover:bg-blue-50"
                onClick={() => handlePlayerClick(player)}
              >
                <TableCell className="font-medium">{player.name}</TableCell>
                <TableCell>
                  <Badge className={getPositionColor(player.position)}>{player.position}</Badge>
                </TableCell>
                <TableCell>{player.age}</TableCell>
                <TableCell>{player.nationality}</TableCell>
                <TableCell className="font-medium">{formatMarketValue(player.marketValue)}</TableCell>
                <TableCell>
                  <span className={getRatingColor(overallRating)}>{overallRating}</span>
                </TableCell>
                <TableCell>
                  <div className="w-8 text-center">
                    <span
                      className={`text-sm ${
                        player.speed >= 80 ? "text-green-600 font-bold" : player.speed >= 70 ? "text-blue-600" : ""
                      }`}
                    >
                      {player.speed}
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="w-8 text-center">
                    <span
                      className={`text-sm ${
                        player.strength >= 80
                          ? "text-green-600 font-bold"
                          : player.strength >= 70
                          ? "text-blue-600"
                          : ""
                      }`}
                    >
                      {player.strength}
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="w-8 text-center">
                    <span
                      className={`text-sm ${
                        player.technique >= 80
                          ? "text-green-600 font-bold"
                          : player.technique >= 70
                          ? "text-blue-600"
                          : ""
                      }`}
                    >
                      {player.technique}
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="w-8 text-center">
                    <span
                      className={`text-sm ${
                        player.passing >= 80 ? "text-green-600 font-bold" : player.passing >= 70 ? "text-blue-600" : ""
                      }`}
                    >
                      {player.passing}
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="w-8 text-center">
                    <span
                      className={`text-sm ${
                        player.stamina >= 80 ? "text-green-600 font-bold" : player.stamina >= 70 ? "text-blue-600" : ""
                      }`}
                    >
                      {player.stamina}
                    </span>
                  </div>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>

      {/* Player Modal */}
      {selectedPlayer && <PlayerModal player={selectedPlayer} isOpen={isModalOpen} onClose={handleModalClose} />}
    </div>
  );
}
