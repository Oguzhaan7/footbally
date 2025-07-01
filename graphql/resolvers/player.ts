import { Player } from "@/models/Player";

export const playerResolvers = {
  Query: {
    players: async () => Player.find().populate("team"),
    player: async (_: any, { id }: { id: string }) => Player.findById(id).populate("team"),
  },
  Mutation: {
    createPlayer: async (_: any, { input }: any) => {
      const newPlayer = new Player(input);
      return await newPlayer.save();
    },
  },
};
