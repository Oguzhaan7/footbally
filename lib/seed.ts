import mongoose from "mongoose";
import { connectToDatabase } from "@/lib/mongodb";
import { League } from "@/models/League";
import { Team } from "@/models/Team";
import { Player } from "@/models/Player";

const TEAM_NAMES = [
  "Falcon United",
  "Lions FC",
  "Thunderbolt",
  "Blue Sharks",
  "Red Dragons",
  "Golden Eagles",
  "Silver Foxes",
  "Iron Wolves",
  "Royal Titans",
  "Emerald Knights",
  "Crimson Tigers",
  "Shadow Hawks",
  "Storm Riders",
  "Pearl Warriors",
  "Atlas Rangers",
  "Cobalt Stars",
  "Phoenix Blaze",
  "Sapphire Giants",
  "Onyx Spartans",
  "Ivory Bulls",
];

const FIRST_NAMES = [
  "Alex",
  "Brian",
  "Carlos",
  "Daniel",
  "Emre",
  "Furkan",
  "Giorgio",
  "Henry",
  "Isaac",
  "Jacob",
  "Kenan",
  "Leo",
  "Marco",
  "Nico",
  "Ozan",
  "Paul",
  "Quincy",
  "Ronaldo",
  "Serkan",
  "Thomas",
  "Umut",
  "Victor",
  "Wesley",
  "Xavi",
  "Yasin",
  "Zlatan",
  "Oscar",
  "Pedro",
  "Ruben",
  "Sergio",
];

const LAST_NAMES = [
  "Alonso",
  "Brown",
  "Çelik",
  "Davis",
  "Eriksen",
  "Fischer",
  "Gomez",
  "Hernandez",
  "Ibrahimović",
  "Johnson",
  "Kaya",
  "Lopez",
  "Martinez",
  "Nakamura",
  "Öztürk",
  "Perez",
  "Quintana",
  "Rodriguez",
  "Smith",
  "Torres",
  "Ulusoy",
  "Valencia",
  "Williams",
  "Xu",
  "Yılmaz",
  "Zapata",
  "Garcia",
  "Fernandez",
  "Silva",
  "Costa",
];

const STAT_KEYS = [
  "speed",
  "strength",
  "technique",
  "passing",
  "stamina",
] as const;

const randomStats = () =>
  STAT_KEYS.reduce((acc, key) => {
    acc[key] = Math.floor(Math.random() * 101);
    return acc;
  }, {} as Record<(typeof STAT_KEYS)[number], number>);

const LEAGUES_DATA = [
  {
    name: "League A",
    country: "Country A",
    logoUrl: "https://dummyimage.com/100x100/aaa/fff&text=A",
  },
  {
    name: "League B",
    country: "Country B",
    logoUrl: "https://dummyimage.com/100x100/aaa/fff&text=B",
  },
];

function* uniqueTeamNameGenerator() {
  const names = [...TEAM_NAMES];
  while (names.length) {
    const idx = Math.floor(Math.random() * names.length);
    yield names.splice(idx, 1)[0];
  }
}

const randomFullName = () =>
  `${FIRST_NAMES[Math.floor(Math.random() * FIRST_NAMES.length)]} ${
    LAST_NAMES[Math.floor(Math.random() * LAST_NAMES.length)]
  }`;

const generateStandings = () => {
  const played = Math.floor(Math.random() * 10) + 5;
  const won = Math.floor(Math.random() * played);
  const lost = Math.floor(Math.random() * (played - won));
  const drawn = played - won - lost;
  const goalsFor = Math.floor(Math.random() * 20) + won * 2;
  const goalsAgainst = Math.floor(Math.random() * 15) + lost * 1;
  const points = won * 3 + drawn;

  return { played, won, drawn, lost, goalsFor, goalsAgainst, points };
};

async function seed() {
  await connectToDatabase();
  await Promise.all([
    League.deleteMany(),
    Team.deleteMany(),
    Player.deleteMany(),
  ]);
  const teamNameGen = uniqueTeamNameGenerator();

  for (const leagueData of LEAGUES_DATA) {
    const league = await League.create(leagueData);

    for (let i = 0; i < 10; i++) {
      const teamName = teamNameGen.next().value as string;
      const team = await Team.create({
        name: teamName,
        logoUrl: `https://dummyimage.com/100x100/${Math.floor(
          Math.random() * 999
        )}/fff&text=${encodeURIComponent(teamName.split(" ")[0][0])}`,
        league: league._id,
        ...generateStandings(),
      });

      for (let j = 0; j < 15; j++) {
        await Player.create({
          name: randomFullName(),
          age: 18 + Math.floor(Math.random() * 15),
          nationality: `Country ${String.fromCharCode(
            65 + Math.floor(Math.random() * 26)
          )}`,
          position: ["GK", "DF", "MF", "FW"][Math.floor(Math.random() * 4)],
          marketValue: Math.floor(Math.random() * 100) * 100_000,
          team: team._id,
          ...randomStats(),
        });
      }
    }
  }

  console.log("🎉 Dummy veriler eklendi");
  await mongoose.disconnect();
}

seed().catch((err) => {
  console.error("Seed hata:", err);
  mongoose.disconnect();
});
