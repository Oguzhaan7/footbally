import mongoose from "mongoose";
import { connectToDatabase } from "@/lib/mongodb";
import { League } from "@/models/League";
import { Team } from "@/models/Team";
import { Player } from "@/models/Player";

const statKeys = ["speed", "strength", "technique", "passing", "stamina"] as const;

function randomStats() {
  const stats: Record<string, number> = {};
  for (const key of statKeys) {
    stats[key] = Math.floor(Math.random() * 101);
  }
  return stats;
}

const leagues = [
  {
    name: "Demo League A",
    country: "Country A",
    logoUrl: "https://dummyimage.com/100x100/aaa/fff&text=A",
  },
  {
    name: "Demo League B",
    country: "Country B",
    logoUrl: "https://dummyimage.com/100x100/aaa/fff&text=B",
  },
];

async function seed() {
  await connectToDatabase();
  await League.deleteMany();
  await Team.deleteMany();
  await Player.deleteMany();

  for (const leagueData of leagues) {
    const league = await League.create(leagueData);

    for (let i = 1; i <= 10; i++) {
      const team = await Team.create({
        name: `${league.name} Team ${i}`,
        logoUrl: `https://dummyimage.com/100x100/${Math.floor(Math.random() * 999)}/fff&text=T${i}`,
        league: league._id,
      });

      for (let j = 1; j <= 15; j++) {
        await Player.create({
          name: `Player ${j} - ${team.name}`,
          age: 18 + Math.floor(Math.random() * 15),
          nationality: `Country ${String.fromCharCode(65 + Math.floor(Math.random() * 26))}`,
          position: ["GK", "DF", "MF", "FW"][Math.floor(Math.random() * 4)],
          marketValue: Math.floor(Math.random() * 100) * 100_000,
          team: team._id,
          ...randomStats(),
        });
      }
    }
  }

  console.log("Dummy seed tamamlandı 🎉");
  await mongoose.disconnect();
}

seed().catch((err) => {
  console.error("Seed hata:", err);
  mongoose.disconnect();
});
