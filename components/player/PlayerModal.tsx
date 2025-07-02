"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { IPlayer } from "@/models/Player";
import Image from "next/image";

interface PlayerModalProps {
  player: IPlayer & { _id: string };
  isOpen: boolean;
  onClose: () => void;
}

export function PlayerModal({ player, isOpen, onClose }: PlayerModalProps) {
  const getPositionColor = (position: string) => {
    switch (position) {
      case "GK":
        return "bg-yellow-100 text-yellow-800 border-yellow-300";
      case "DF":
        return "bg-blue-100 text-blue-800 border-blue-300";
      case "MF":
        return "bg-green-100 text-green-800 border-green-300";
      case "FW":
        return "bg-red-100 text-red-800 border-red-300";
      default:
        return "bg-gray-100 text-gray-800 border-gray-300";
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

  const getOverallRating = () => {
    const stats = [player.speed, player.strength, player.technique, player.passing, player.stamina];
    const average = stats.reduce((sum, stat) => sum + stat, 0) / stats.length;
    return Math.round(average);
  };

  const getRatingColor = (rating: number) => {
    if (rating >= 85) return "text-slate-800 bg-slate-100";
    if (rating >= 75) return "text-slate-700 bg-slate-50";
    if (rating >= 65) return "text-slate-600 bg-gray-50";
    return "text-slate-500 bg-gray-100";
  };

  const getPlayerPhoto = () => {
    const photoIds = [
      "1571019613454-1cb2f99b2d8b",
      "1544005313-94ddf0286df2",
      "1566577739112-5180d4bf9390",
      "1594736797933-d0c65ead0a0e",
      "1573496359142-b8d87734a5a2",
    ];
    const randomId = photoIds[Math.floor(Math.random() * photoIds.length)];
    return `https://images.unsplash.com/photo-${randomId}?w=300&h=300&fit=crop&crop=face&auto=format&q=80`;
  };

  const overallRating = getOverallRating();
  const ratingStyle = getRatingColor(overallRating);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="!max-w-4xl w-[90vw] max-h-[90vh] overflow-hidden p-0">
        <div className="relative bg-white">
          <div className="relative bg-gradient-to-r from-slate-800 to-slate-700 text-white p-6">
            <div className="relative flex items-center gap-6">
              <div className="relative">
                <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white/30 shadow-lg">
                  <Image
                    src={getPlayerPhoto()}
                    alt={player.name}
                    width={96}
                    height={96}
                    className="object-cover w-full h-full"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = `https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300&h=300&fit=crop&crop=face&auto=format&q=80`;
                    }}
                  />
                </div>
                <div
                  className={`absolute -bottom-2 -right-2 w-12 h-12 rounded-full ${ratingStyle} border-4 border-white shadow-md flex items-center justify-center`}
                >
                  <span className="font-bold text-lg">{overallRating}</span>
                </div>
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold mb-2">{player.name}</h2>
                <div className="flex items-center gap-3 mb-3">
                  <Badge className={`${getPositionColor(player.position)} border`}>{player.position}</Badge>
                  <span className="text-slate-300">•</span>
                  <span className="text-slate-300">{player.age} years old</span>
                  <span className="text-slate-300">•</span>
                  <span className="text-slate-300">{player.nationality}</span>
                </div>
                <div className="text-slate-200 font-semibold text-lg">{formatMarketValue(player.marketValue)}</div>
              </div>
            </div>
          </div>

          <div className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-slate-800 mb-4">Player Attributes</h3>
                {[
                  { name: "Speed", value: player.speed, icon: "⚡" },
                  { name: "Strength", value: player.strength, icon: "💪" },
                  { name: "Technique", value: player.technique, icon: "🎯" },
                  { name: "Passing", value: player.passing, icon: "⚽" },
                  { name: "Stamina", value: player.stamina, icon: "🏃" },
                ].map((stat) => (
                  <div key={stat.name} className="group">
                    <div className="flex justify-between items-center mb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-base text-gray-400">{stat.icon}</span>
                        <span className="font-medium text-slate-700">{stat.name}</span>
                      </div>
                      <span className="font-bold text-slate-800 bg-gray-100 px-2 py-1 rounded-md text-sm">
                        {stat.value}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                      <div
                        className="h-full bg-slate-600 transition-all duration-700 ease-out rounded-full"
                        style={{ width: `${stat.value}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex flex-col items-center">
                <h3 className="text-lg font-semibold text-slate-800 mb-4">Performance Radar</h3>
                <div className="relative w-64 h-64">
                  <svg width="256" height="256" viewBox="0 0 256 256" className="drop-shadow-lg">
                    <defs>
                      <radialGradient id="radarBg" cx="50%" cy="50%" r="50%">
                        <stop offset="0%" stopColor="#f8fafc" />
                        <stop offset="100%" stopColor="#e2e8f0" />
                      </radialGradient>
                    </defs>

                    {[100, 80, 60, 40, 20].map((scale, i) => (
                      <polygon
                        key={scale}
                        points={`${128 + scale * 0.8 * Math.cos(-Math.PI / 2)},${
                          128 + scale * 0.8 * Math.sin(-Math.PI / 2)
                        } ${128 + scale * 0.8 * Math.cos(-Math.PI / 2 + (2 * Math.PI) / 5)},${
                          128 + scale * 0.8 * Math.sin(-Math.PI / 2 + (2 * Math.PI) / 5)
                        } ${128 + scale * 0.8 * Math.cos(-Math.PI / 2 + (4 * Math.PI) / 5)},${
                          128 + scale * 0.8 * Math.sin(-Math.PI / 2 + (4 * Math.PI) / 5)
                        } ${128 + scale * 0.8 * Math.cos(-Math.PI / 2 + (6 * Math.PI) / 5)},${
                          128 + scale * 0.8 * Math.sin(-Math.PI / 2 + (6 * Math.PI) / 5)
                        } ${128 + scale * 0.8 * Math.cos(-Math.PI / 2 + (8 * Math.PI) / 5)},${
                          128 + scale * 0.8 * Math.sin(-Math.PI / 2 + (8 * Math.PI) / 5)
                        }`}
                        fill={i === 4 ? "url(#radarBg)" : "none"}
                        stroke="#cbd5e1"
                        strokeWidth={i === 4 ? "2" : "1"}
                        opacity={0.6}
                      />
                    ))}

                    {[0, 1, 2, 3, 4].map((i) => (
                      <line
                        key={i}
                        x1="128"
                        y1="128"
                        x2={128 + 100 * 0.8 * Math.cos(-Math.PI / 2 + (i * 2 * Math.PI) / 5)}
                        y2={128 + 100 * 0.8 * Math.sin(-Math.PI / 2 + (i * 2 * Math.PI) / 5)}
                        stroke="#cbd5e1"
                        strokeWidth="1"
                        opacity="0.4"
                      />
                    ))}

                    <polygon
                      points={`${128 + (player.speed / 100) * 100 * 0.8 * Math.cos(-Math.PI / 2)},${
                        128 + (player.speed / 100) * 100 * 0.8 * Math.sin(-Math.PI / 2)
                      } ${128 + (player.strength / 100) * 100 * 0.8 * Math.cos(-Math.PI / 2 + (2 * Math.PI) / 5)},${
                        128 + (player.strength / 100) * 100 * 0.8 * Math.sin(-Math.PI / 2 + (2 * Math.PI) / 5)
                      } ${128 + (player.technique / 100) * 100 * 0.8 * Math.cos(-Math.PI / 2 + (4 * Math.PI) / 5)},${
                        128 + (player.technique / 100) * 100 * 0.8 * Math.sin(-Math.PI / 2 + (4 * Math.PI) / 5)
                      } ${128 + (player.passing / 100) * 100 * 0.8 * Math.cos(-Math.PI / 2 + (6 * Math.PI) / 5)},${
                        128 + (player.passing / 100) * 100 * 0.8 * Math.sin(-Math.PI / 2 + (6 * Math.PI) / 5)
                      } ${128 + (player.stamina / 100) * 100 * 0.8 * Math.cos(-Math.PI / 2 + (8 * Math.PI) / 5)},${
                        128 + (player.stamina / 100) * 100 * 0.8 * Math.sin(-Math.PI / 2 + (8 * Math.PI) / 5)
                      }`}
                      fill="rgba(71, 85, 105, 0.15)"
                      stroke="#475569"
                      strokeWidth="2"
                      className="drop-shadow-sm"
                    />

                    {[
                      { value: player.speed, angle: -Math.PI / 2, label: "SPD" },
                      { value: player.strength, angle: -Math.PI / 2 + (2 * Math.PI) / 5, label: "STR" },
                      { value: player.technique, angle: -Math.PI / 2 + (4 * Math.PI) / 5, label: "TEC" },
                      { value: player.passing, angle: -Math.PI / 2 + (6 * Math.PI) / 5, label: "PAS" },
                      { value: player.stamina, angle: -Math.PI / 2 + (8 * Math.PI) / 5, label: "STA" },
                    ].map((stat, i) => (
                      <circle
                        key={i}
                        cx={128 + (stat.value / 100) * 100 * 0.8 * Math.cos(stat.angle)}
                        cy={128 + (stat.value / 100) * 100 * 0.8 * Math.sin(stat.angle)}
                        r="3"
                        fill="#475569"
                        stroke="white"
                        strokeWidth="2"
                        className="drop-shadow-sm"
                      />
                    ))}

                    <text x="128" y="35" textAnchor="middle" className="text-xs font-medium fill-slate-600">
                      Speed
                    </text>
                    <text x="220" y="90" textAnchor="start" className="text-xs font-medium fill-slate-600">
                      Strength
                    </text>
                    <text x="190" y="200" textAnchor="middle" className="text-xs font-medium fill-slate-600">
                      Technique
                    </text>
                    <text x="66" y="200" textAnchor="middle" className="text-xs font-medium fill-slate-600">
                      Passing
                    </text>
                    <text x="36" y="90" textAnchor="end" className="text-xs font-medium fill-slate-600">
                      Stamina
                    </text>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
