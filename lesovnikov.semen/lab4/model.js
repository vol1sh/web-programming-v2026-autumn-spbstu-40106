export class Game {
  constructor(title, platforms = [], releaseYear = 0) {
    this.title = String(title);
    this.platforms = Array.isArray(platforms) ? [...platforms] : [];
    this.releaseYear = Number(releaseYear);
  }

  addPlatform(platform) {
    const trimmed = String(platform).trim();
    if (trimmed && !this.platforms.includes(trimmed)) {
      this.platforms.push(trimmed);
    }
  }

  removePlatform(platform) {
    this.platforms = this.platforms.filter((item) => item !== platform);
  }

  get platformCount() {
    return this.platforms.length;
  }
}

export function groupGamesByReleaseYear(games) {
  const groups = {};
  for (const game of games) {
    const year = game.releaseYear;
    if (!groups[year]) {
      groups[year] = [];
    }
    groups[year].push(game);
  }
  return groups;
}

export function getUniquePlatforms(games) {
  const platforms = new Set();
  for (const game of games) {
    for (const platform of game.platforms) {
      platforms.add(platform);
    }
  }
  return Array.from(platforms);
}

export function findGamesByPlatform(games, platform) {
  return games.filter((game) => game.platforms.includes(platform));
}

export function groupGamesByPlatformCount(games) {
  const groups = {};
  for (const game of games) {
    const count = game.platformCount;
    if (!groups[count]) {
      groups[count] = [];
    }
    groups[count].push(game);
  }
  return groups;
}

export function findGamesReleasedAfter(games, year) {
  return games.filter((game) => game.releaseYear > Number(year));
}
