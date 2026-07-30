import type { Campaign, RpgState } from '../types/rpg';
import { addDays, todayKey, toDateKey } from './date';
import { difficultyXp, rankForLevel } from './progression';
import { generateCampaign } from './questGenerator';

const STORAGE_KEY = 'solo-leveling-life-rpg-state-v1';

const id = () => crypto.randomUUID();

export const createInitialState = (): RpgState => {
  const today = todayKey();
  const yesterday = toDateKey(addDays(new Date(), -1));
  const sunday = toDateKey(addDays(new Date(), 2));
  const sixMonthsOut = toDateKey(addDays(new Date(), 180));
  const starter = generateCampaign({
    goal: 'Reach D-Rank',
    category: 'Freedom',
    deadline: sixMonthsOut,
    currentLevel: 'E-Rank beginner: building basic consistency, proof of work, and first income actions.',
    availableMinutesPerDay: 45,
    targetOutcome: '500 EUR/month online income, stable body/wisdom/technology habits, and visible proof of work.',
  });

  return {
    tasks: [
      ...starter.tasks,
      {
        id: id(),
        title: '10-20 min beginner calisthenics',
        description: 'Squats, wall or knee pushups, plank, then stop before it becomes complicated.',
        category: 'Body',
        skillTree: 'Body',
        difficulty: 'medium',
        xpReward: difficultyXp.medium,
        status: 'completed',
        cadence: 'daily',
        deadline: today,
        createdAt: today,
        completedAt: new Date().toISOString(),
      },
      {
        id: id(),
        title: 'Improve HackCode or portfolio for 20 min',
        description: 'Build one small thing, fix one issue, or make one visible proof-of-work improvement.',
        category: 'Technology',
        skillTree: 'Technology',
        difficulty: 'hard',
        xpReward: difficultyXp.hard,
        status: 'pending',
        cadence: 'daily',
        deadline: today,
        createdAt: today,
      },
      {
        id: id(),
        title: 'Read 5 pages or listen 10 min',
        description: 'Capture one lesson learned. Small quests count. Do not break the chain.',
        category: 'Wisdom',
        skillTree: 'Wisdom',
        difficulty: 'easy',
        xpReward: difficultyXp.easy,
        status: 'pending',
        cadence: 'daily',
        deadline: today,
        createdAt: today,
      },
      {
        id: id(),
        title: 'Yesterday reading streak',
        description: 'Read 10 pages before sleep and wrote one lesson.',
        category: 'Wisdom',
        skillTree: 'Wisdom',
        difficulty: 'easy',
        xpReward: difficultyXp.easy,
        status: 'completed',
        cadence: 'daily',
        deadline: yesterday,
        createdAt: yesterday,
        completedAt: `${yesterday}T20:15:00.000Z`,
      },
      {
        id: id(),
        title: 'Weekly D-Rank review',
        description: 'Check income actions, HackCode proof, body consistency, reading, and next boss fight.',
        category: 'Technology',
        skillTree: 'Technology',
        difficulty: 'medium',
        xpReward: difficultyXp.medium,
        status: 'pending',
        cadence: 'weekly',
        deadline: sunday,
        createdAt: today,
      },
    ],
    goals: [starter.goal],
    campaigns: [starter.campaign],
    stats: {
      xp: 75,
      level: 2,
      rank: rankForLevel(2),
      streak: 2,
      longestStreak: 2,
      completedTasksCount: 2,
      lastActiveDate: today,
    },
    reflections: [],
    checkIns: [],
    profile: {
      archetype: 'E-Rank computer science student building HackCode, practical skills, physique, reading consistency, and online income.',
      focus: ['HackCode', 'Business Analysis', 'Technology', 'AI', 'Startups', 'Calisthenics', 'Books', 'Online income'],
      preferredInput: 'speaking',
      rankTargets: {
        'E-Rank Beginner': ['Beginner, building basic consistency'],
        'D-Rank Hunter': ['500 EUR/month online income', 'Stable basic habits', 'Basic calisthenics consistency', 'Book habit', 'Proof of work online'],
        'C-Rank Grinder': ['1000 EUR/month online income', 'Stronger skills'],
        'B-Rank Achiever': ['2000 EUR/month online income', 'Strong portfolio/client base'],
        'A-Rank Elite': ['3500 EUR/month online income', 'High performer'],
        'S-Rank Self-Master': ['5000 EUR/month online income', 'Self-master level'],
      },
    },
  };
};

const normalizeCampaign = (campaign: Campaign, fallback: Campaign): Campaign => ({
  ...fallback,
  ...campaign,
  targetOutcome: campaign.targetOutcome ?? fallback.targetOutcome,
  journeyStages: campaign.journeyStages?.length ? campaign.journeyStages : fallback.journeyStages,
});

const normalizeState = (state: Partial<RpgState>): RpgState => {
  const fresh = createInitialState();
  const hasCampaigns = Boolean(state.campaigns?.length);
  const hasDRankCampaign = Boolean(state.campaigns?.some((campaign) => campaign.outcome === 'Reach D-Rank'));
  const starterGeneratedTasks = fresh.tasks.filter((task) => task.isGenerated);
  const campaigns = hasCampaigns ? state.campaigns!.map((campaign) => normalizeCampaign(campaign, fresh.campaigns[0])) : [];
  return {
    ...fresh,
    ...state,
    tasks: state.tasks ? (hasDRankCampaign ? state.tasks : [...starterGeneratedTasks, ...state.tasks]) : fresh.tasks,
    goals: state.goals ? (hasDRankCampaign ? state.goals : [...fresh.goals, ...state.goals]) : fresh.goals,
    campaigns: hasDRankCampaign ? campaigns : [...fresh.campaigns, ...campaigns],
    stats: state.stats ?? fresh.stats,
    reflections: state.reflections ?? [],
    checkIns: state.checkIns ?? [],
    profile: fresh.profile,
  };
};

export const loadState = (): RpgState => {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return createInitialState();

  try {
    return normalizeState(JSON.parse(raw) as Partial<RpgState>);
  } catch {
    return createInitialState();
  }
};

export const saveState = (state: RpgState) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
};
