import { Player } from "@/models/Player";
import { Team } from "@/models/Team";

export const playerResolvers = {
  Query: {
    players: async () => {
      return await Player.find().populate("team");
    },
    player: async (_: any, { id }: { id: string }) => {
      return await Player.findById(id).populate("team");
    },
  },
  Mutation: {
    createPlayer: async (
      _: any,
      {
        input,
      }: {
        input: {
          name: string;
          age: number;
          nationality: string;
          position: string;
          marketValue: number;
          teamId: string;
          speed: number;
          strength: number;
          technique: number;
          passing: number;
          stamina: number;
        };
      }
    ) => {
      const team = await Team.findById(input.teamId);
      if (!team) throw new Error("Takım bulunamadı");

      const newPlayer = await Player.create({
        name: input.name,
        age: input.age,
        nationality: input.nationality,
        position: input.position,
        marketValue: input.marketValue,
        team: team._id,
        speed: input.speed,
        strength: input.strength,
        technique: input.technique,
        passing: input.passing,
        stamina: input.stamina,
      });

      return await newPlayer.populate("team");
    },
  },
};
