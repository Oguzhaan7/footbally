import { Team } from "@/models/Team";
import { Player } from "@/models/Player";
import { generatePlayersForTeam, balanceTeamPositions } from "@/lib/playerGenerator";

const getInitialTeamStats = () => {
  return {
    played: 0,
    won: 0,
    drawn: 0,
    lost: 0,
    goalsFor: 0,
    goalsAgainst: 0,
    points: 0,
  };
};

export const teamResolvers = {
  Query: {
    teams: async () => Team.find().populate("league"),
    team: async (_: any, { id }: { id: string }) => Team.findById(id).populate("league"),
  },
  Team: {
    players: async (parent: any) => {
      return await Player.find({ team: parent._id });
    },
  },
  Mutation: {
    createTeam: async (_: any, { input }: any) => {
      const existingTeam = await Team.findOne({
        name: input.name,
        league: input.league,
      });

      if (existingTeam) {
        throw new Error("A team with this name already exists in this league");
      }

      const teamsInLeague = await Team.countDocuments({ league: input.league });
      if (teamsInLeague >= 10) {
        throw new Error("League already has maximum 10 teams");
      }

      const teamData = {
        ...input,
        ...getInitialTeamStats(),
      };
      const newTeam = new Team(teamData);
      const savedTeam = await newTeam.save();
      return await Team.findById(savedTeam._id).populate("league");
    },
    createTeamWithPlayers: async (_: any, { input }: any) => {
      try {
        const existingTeam = await Team.findOne({
          name: input.name,
          league: input.league,
        });

        if (existingTeam) {
          throw new Error("A team with this name already exists in this league");
        }

        const teamsInLeague = await Team.countDocuments({ league: input.league });
        if (teamsInLeague >= 10) {
          throw new Error("League already has maximum 10 teams");
        }

        const teamData = {
          ...input,
          ...getInitialTeamStats(),
        };
        const newTeam = await Team.create(teamData);

        const playerCount = input.playerCount || 20;
        let players = generatePlayersForTeam(newTeam._id.toString(), playerCount);

        players = balanceTeamPositions(players);

        await Player.insertMany(players);

        console.log(`✅ ${newTeam.name} team created with ${players.length} players`);

        const populatedTeam = await Team.findById(newTeam._id).populate("league");
        return populatedTeam;
      } catch (error) {
        console.error("Error creating team:", error);
        throw error;
      }
    },
  },
};
