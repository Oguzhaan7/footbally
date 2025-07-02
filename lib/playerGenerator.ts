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
  "Mert",
  "Can",
  "Arda",
  "Kaan",
  "Berk",
  "Eren",
  "Deniz",
  "Tuncay",
  "Mehmet",
  "Ali",
  "Mustafa",
  "Ahmet",
  "Hasan",
  "İbrahim",
  "Yusuf",
  "Omar",
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
  "Demir",
  "Şahin",
  "Aydın",
  "Korkmaz",
  "Arslan",
  "Doğan",
  "Kılıç",
  "Erdoğan",
  "Koç",
  "Kurt",
];

const COUNTRIES = [
  "Turkey",
  "Germany",
  "France",
  "Spain",
  "Italy",
  "England",
  "Brazil",
  "Argentina",
  "Portugal",
  "Netherlands",
  "Belgium",
  "Croatia",
  "Serbia",
  "Poland",
  "Sweden",
  "Denmark",
  "Norway",
  "Austria",
  "Switzerland",
  "Greece",
];

const POSITIONS = ["GK", "DF", "MF", "FW"] as const;

const STAT_KEYS = ["speed", "strength", "technique", "passing", "stamina"] as const;

const generatePositionBasedStats = (position: string) => {
  const baseStats = {
    speed: 50 + Math.floor(Math.random() * 40),
    strength: 50 + Math.floor(Math.random() * 40),
    technique: 50 + Math.floor(Math.random() * 40),
    passing: 50 + Math.floor(Math.random() * 40),
    stamina: 50 + Math.floor(Math.random() * 40),
  };

  switch (position) {
    case "GK":
      baseStats.strength += Math.floor(Math.random() * 15);
      baseStats.technique += Math.floor(Math.random() * 10);
      baseStats.speed = Math.max(30, baseStats.speed - Math.floor(Math.random() * 20));
      break;
    case "DF":
      baseStats.strength += Math.floor(Math.random() * 20);
      baseStats.stamina += Math.floor(Math.random() * 15);
      baseStats.technique = Math.max(40, baseStats.technique - Math.floor(Math.random() * 10));
      break;
    case "MF":
      baseStats.passing += Math.floor(Math.random() * 20);
      baseStats.technique += Math.floor(Math.random() * 15);
      baseStats.stamina += Math.floor(Math.random() * 20);
      break;
    case "FW":
      baseStats.speed += Math.floor(Math.random() * 20);
      baseStats.technique += Math.floor(Math.random() * 20);
      baseStats.strength += Math.floor(Math.random() * 10);
      break;
  }

  Object.keys(baseStats).forEach((key) => {
    const statKey = key as keyof typeof baseStats;
    baseStats[statKey] = Math.min(100, baseStats[statKey]);
  });

  return baseStats;
};

export const generateRandomPlayerName = (): string => {
  const firstName = FIRST_NAMES[Math.floor(Math.random() * FIRST_NAMES.length)];
  const lastName = LAST_NAMES[Math.floor(Math.random() * LAST_NAMES.length)];
  return `${firstName} ${lastName}`;
};

export const generateRandomNationality = (): string => {
  return COUNTRIES[Math.floor(Math.random() * COUNTRIES.length)];
};

export const generateRandomPosition = (): string => {
  const weights = { GK: 1, DF: 4, MF: 4, FW: 3 };
  const totalWeight = Object.values(weights).reduce((sum, weight) => sum + weight, 0);

  let random = Math.random() * totalWeight;

  for (const [position, weight] of Object.entries(weights)) {
    random -= weight;
    if (random <= 0) {
      return position;
    }
  }

  return "MF";
};

export const generateMarketValue = (age: number, position: string): number => {
  let baseValue = 500000;

  if (age <= 22) baseValue *= 1.5;
  else if (age <= 26) baseValue *= 2;
  else if (age <= 30) baseValue *= 1.8;
  else if (age <= 33) baseValue *= 1.2;
  else baseValue *= 0.7;

  if (position === "GK") baseValue *= 0.8;
  else if (position === "FW") baseValue *= 1.3;

  const randomMultiplier = 0.5 + Math.random() * 1.5;
  baseValue *= randomMultiplier;

  return Math.round(baseValue / 50000) * 50000;
};

export const generateRandomPlayer = (teamId: string) => {
  const age = 18 + Math.floor(Math.random() * 17);
  const position = generateRandomPosition();
  const stats = generatePositionBasedStats(position);

  return {
    name: generateRandomPlayerName(),
    age,
    nationality: generateRandomNationality(),
    position,
    marketValue: generateMarketValue(age, position),
    team: teamId,
    ...stats,
  };
};

export const generatePlayersForTeam = (teamId: string, playerCount: number = 20) => {
  const players = [];

  players.push({
    ...generateRandomPlayer(teamId),
    position: "GK",
  });

  for (let i = 1; i < playerCount; i++) {
    players.push(generateRandomPlayer(teamId));
  }

  return players;
};

export const balanceTeamPositions = (players: any[]) => {
  const positionCount = {
    GK: players.filter((p) => p.position === "GK").length,
    DF: players.filter((p) => p.position === "DF").length,
    MF: players.filter((p) => p.position === "MF").length,
    FW: players.filter((p) => p.position === "FW").length,
  };

  const idealDistribution = { GK: 2, DF: 6, MF: 8, FW: 4 };

  const balancedPlayers = [...players];

  Object.entries(idealDistribution).forEach(([position, ideal]) => {
    const current = positionCount[position as keyof typeof positionCount];
    if (current < ideal) {
      const needed = ideal - current;
      let converted = 0;

      for (let i = 0; i < balancedPlayers.length && converted < needed; i++) {
        if (
          balancedPlayers[i].position !== position &&
          positionCount[balancedPlayers[i].position as keyof typeof positionCount] >
            idealDistribution[balancedPlayers[i].position as keyof typeof idealDistribution]
        ) {
          balancedPlayers[i].position = position;
          balancedPlayers[i] = {
            ...balancedPlayers[i],
            ...generatePositionBasedStats(position),
          };
          converted++;
        }
      }
    }
  });

  return balancedPlayers;
};
