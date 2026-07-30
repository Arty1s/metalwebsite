import type { Campaign, CampaignInput, Goal, RpgTask, SkillTree } from '../types/rpg';
import { addDays, todayKey, toDateKey } from './date';
import { difficultyXp } from './progression';

const id = () => crypto.randomUUID();

const detectSkillTree = (goal: string, category: CampaignInput['category'] = 'auto'): SkillTree => {
  if (category !== 'auto') return category;
  const lower = goal.toLowerCase();
  if (/(calisthenics|physique|body|fitness|push|pull|workout|muscle)/.test(lower)) return 'Body';
  if (/(book|read|audiobook|learn|wisdom|reflect)/.test(lower)) return 'Wisdom';
  if (/(code|coding|hackcode|ai|technology|business analysis|product|software)/.test(lower)) return 'Technology';
  return 'Freedom';
};

type QuestTemplate = {
  daily: string[];
  weekly: string[];
  monthly: string[];
  bosses: string[];
  stages: Array<Omit<Campaign['journeyStages'][number], 'id'>>;
};

const templates: Record<SkillTree, QuestTemplate> = {
  Body: {
    daily: ['10-20 min beginner calisthenics', 'Mobility reset and easy walk', 'Squats, wall or knee pushups, plank'],
    weekly: ['Complete 4 movement days this week', 'Improve one rep, hold, or form detail', 'Review soreness and scale difficulty'],
    monthly: ['Build basic calisthenics consistency', 'Hold plank longer and improve pushup form', 'Create a repeatable beginner routine'],
    bosses: ['Body Boss: complete a clean beginner circuit', 'Consistency Boss: 4 training days in one week'],
    stages: [
      { title: 'Stage 1: Build consistency', objective: 'Show up with short movement sessions.', dailyActions: ['10 min movement', 'mobility', 'walk'], weeklyBossFight: '4 movement days', progress: 20 },
      { title: 'Stage 2: Basic strength', objective: 'Make squats, pushups, and plank feel normal.', dailyActions: ['squats', 'wall/knee pushups', 'plank'], weeklyBossFight: 'Clean circuit test', progress: 10 },
      { title: 'Stage 3: Stable habit', objective: 'Keep body training alive while building income.', dailyActions: ['short routine', 'log reps'], weeklyBossFight: 'No missed chain week', progress: 0 },
    ],
  },
  Wisdom: {
    daily: ['Read 5 pages', 'Listen to audiobook 10 min', 'Write 1 lesson learned'],
    weekly: ['Finish one useful chapter or section', 'Apply one lesson to HackCode, body, or income', 'Choose next reading block'],
    monthly: ['Finish one book or audiobook', 'Keep a simple lesson archive', 'Use one idea in real life'],
    bosses: ['Wisdom Boss: explain one book idea simply', 'Reflection Boss: turn one lesson into a quest'],
    stages: [
      { title: 'Stage 1: Small reading chain', objective: 'Make books easy to start.', dailyActions: ['5 pages', '10 min audio'], weeklyBossFight: '5 reading days', progress: 15 },
      { title: 'Stage 2: Lessons become action', objective: 'Extract practical lessons.', dailyActions: ['1 lesson learned'], weeklyBossFight: 'Apply one lesson', progress: 5 },
      { title: 'Stage 3: Monthly completion', objective: 'Finish one book per month.', dailyActions: ['read or listen'], weeklyBossFight: 'Chapter checkpoint', progress: 0 },
    ],
  },
  Technology: {
    daily: ['Code 20 min', 'Learn 1 IT, AI, product, or BA concept', 'Improve HackCode or portfolio'],
    weekly: ['Build 1 small thing users can see', 'Document a product or business insight', 'Turn work into portfolio proof'],
    monthly: ['Ship a visible HackCode improvement', 'Publish a small case study or demo', 'Improve practical IT/business skills'],
    bosses: ['HackCode Boss: ship a feature someone can test', 'Portfolio Boss: publish proof of work online'],
    stages: [
      { title: 'Stage 1: Build consistency', objective: 'Code or learn daily without overthinking.', dailyActions: ['20 min code', '1 concept'], weeklyBossFight: '5 focused sessions', progress: 25 },
      { title: 'Stage 2: Build proof', objective: 'Turn learning into visible artifacts.', dailyActions: ['improve HackCode', 'write proof note'], weeklyBossFight: 'Publish one demo update', progress: 10 },
      { title: 'Stage 3: Product thinking', objective: 'Think like a builder and analyst.', dailyActions: ['1 product insight'], weeklyBossFight: 'Mini case study', progress: 0 },
    ],
  },
  Freedom: {
    daily: ['Find 3 leads', 'Send 1 outreach message', 'Follow up or improve offer/portfolio proof'],
    weekly: ['Prepare website demo for a potential client', 'Publish one portfolio proof or helpful post', 'Review outreach pipeline'],
    monthly: ['Create a simple service offer', 'Win first paid side activity', 'Reach 500 EUR/month online income'],
    bosses: ['Outreach Boss: contact 10 relevant leads', 'Client Boss: pitch a demo to a real prospect'],
    stages: [
      { title: 'Stage 1: Build consistency', objective: 'Do small income actions daily.', dailyActions: ['find 3 leads', '1 outreach'], weeklyBossFight: '10-lead sprint', progress: 20 },
      { title: 'Stage 2: Create offer', objective: 'Define a simple website/demo/service offer.', dailyActions: ['improve offer', 'collect proof'], weeklyBossFight: 'Write clear offer', progress: 10 },
      { title: 'Stage 3: Build portfolio proof', objective: 'Show proof that you can build useful things.', dailyActions: ['create portfolio proof', 'improve demo'], weeklyBossFight: 'Publish proof online', progress: 5 },
      { title: 'Stage 4: Outreach', objective: 'Talk to real people and create opportunities.', dailyActions: ['send outreach', 'follow up'], weeklyBossFight: '5 follow-ups', progress: 0 },
      { title: 'Stage 5: First client', objective: 'Convert a conversation into paid work.', dailyActions: ['prepare client demo'], weeklyBossFight: 'Ask for paid project', progress: 0 },
      { title: 'Stage 6: Reach 500 EUR/month', objective: 'Stabilize D-Rank income target.', dailyActions: ['deliver work', 'ask for referral'], weeklyBossFight: 'Monthly income review', progress: 0 },
    ],
  },
};

export const generateCampaign = (input: CampaignInput) => {
  const skillTree = detectSkillTree(input.goal, input.category);
  const template = templates[skillTree];
  const now = todayKey();
  const campaignId = id();
  const goalId = id();
  const monthCount = Math.max(1, Math.ceil((new Date(input.deadline).getTime() - new Date(now).getTime()) / (1000 * 60 * 60 * 24 * 30)));

  const goal: Goal = {
    id: goalId,
    title: input.goal,
    description: `Quest Master campaign for ${input.goal}. Target outcome: ${input.targetOutcome}.`,
    category: skillTree,
    targetDate: input.deadline,
    createdAt: now,
    currentLevel: input.currentLevel,
    availableMinutesPerDay: input.availableMinutesPerDay,
    skillTree,
    campaignId,
    milestones: Array.from({ length: Math.min(monthCount, 6) }, (_, index) => ({
      id: id(),
      title: `Month ${index + 1}: ${template.monthly[index % template.monthly.length]}`,
      xpReward: 120 + index * 30,
      completed: false,
    })),
  };

  const campaign: Campaign = {
    id: campaignId,
    goalId,
    title: `${skillTree} Campaign`,
    outcome: input.goal,
    skillTree,
    deadline: input.deadline,
    currentLevel: input.currentLevel,
    availableMinutesPerDay: input.availableMinutesPerDay,
    targetOutcome: input.targetOutcome,
    createdAt: now,
    monthlyRoadmap: goal.milestones.map((milestone) => milestone.title),
    weeklyObjectives: template.weekly,
    dailyActions: template.daily,
    journeyStages: template.stages.map((stage) => ({ ...stage, id: id() })),
    bossFights: template.bosses.map((boss, index) => ({
      id: id(),
      title: boss,
      description: `Boss fight for ${input.goal}. Complete this after enough daily quests.`,
      deadline: toDateKey(addDays(new Date(), 14 + index * 21)),
      xpReward: 180 + index * 60,
      completed: false,
    })),
  };

  const tasks: RpgTask[] = [
    ...template.daily.map((title, index) => ({
      id: id(),
      title,
      description: `${input.availableMinutesPerDay} min available. Do the smallest useful version today.`,
      category: skillTree,
      skillTree,
      campaignId,
      difficulty: index === 0 ? 'medium' as const : 'easy' as const,
      xpReward: index === 0 ? difficultyXp.medium : difficultyXp.easy,
      status: 'pending' as const,
      cadence: 'daily' as const,
      deadline: now,
      createdAt: now,
      isGenerated: true,
    })),
    ...template.weekly.map((title, index) => ({
      id: id(),
      title,
      description: `Weekly objective generated for: ${input.goal}.`,
      category: skillTree,
      skillTree,
      campaignId,
      difficulty: index === 0 ? 'hard' as const : 'medium' as const,
      xpReward: index === 0 ? difficultyXp.hard : difficultyXp.medium,
      status: 'pending' as const,
      cadence: 'weekly' as const,
      deadline: toDateKey(addDays(new Date(), 6)),
      createdAt: now,
      isGenerated: true,
    })),
    {
      id: id(),
      title: campaign.bossFights[0].title,
      description: campaign.bossFights[0].description,
      category: skillTree,
      skillTree,
      campaignId,
      difficulty: 'boss' as const,
      xpReward: difficultyXp.boss,
      status: 'pending' as const,
      cadence: 'weekly' as const,
      deadline: campaign.bossFights[0].deadline,
      createdAt: now,
      isGenerated: true,
    },
  ];

  return { goal, campaign, tasks };
};
