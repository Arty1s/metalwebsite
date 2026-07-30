import type { Difficulty, PlayerStats } from '../types/rpg';

export const difficultyXp: Record<Difficulty, number> = {
  easy: 25,
  medium: 50,
  hard: 90,
  boss: 160,
};

export const xpForNextLevel = (level: number) => 180 + level * 70;

export const rankForLevel = (level: number) => {
  if (level >= 30) return 'S-Rank Self-Master';
  if (level >= 22) return 'A-Rank Elite';
  if (level >= 15) return 'B-Rank Achiever';
  if (level >= 9) return 'C-Rank Grinder';
  if (level >= 4) return 'D-Rank Hunter';
  return 'E-Rank Beginner';
};

export const applyXp = (stats: PlayerStats, gainedXp: number): PlayerStats => {
  let xp = stats.xp + gainedXp;
  let level = stats.level;

  while (xp >= xpForNextLevel(level)) {
    xp -= xpForNextLevel(level);
    level += 1;
  }

  return {
    ...stats,
    xp,
    level,
    rank: rankForLevel(level),
  };
};
