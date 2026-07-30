export type Difficulty = 'easy' | 'medium' | 'hard' | 'boss';
export type TaskCadence = 'daily' | 'weekly';
export type TaskStatus = 'pending' | 'completed';
export type SkillTree = 'Body' | 'Wisdom' | 'Technology' | 'Freedom';

export type RpgTask = {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: Difficulty;
  xpReward: number;
  status: TaskStatus;
  cadence: TaskCadence;
  deadline: string;
  createdAt: string;
  completedAt?: string;
  skillTree?: SkillTree;
  campaignId?: string;
  isGenerated?: boolean;
};

export type Milestone = {
  id: string;
  title: string;
  xpReward: number;
  completed: boolean;
  completedAt?: string;
};

export type Goal = {
  id: string;
  title: string;
  description: string;
  category: string;
  targetDate: string;
  milestones: Milestone[];
  createdAt: string;
  currentLevel?: string;
  availableMinutesPerDay?: number;
  skillTree?: SkillTree;
  campaignId?: string;
};

export type BossFight = {
  id: string;
  title: string;
  description: string;
  deadline: string;
  xpReward: number;
  completed: boolean;
  completedAt?: string;
};

export type JourneyStage = {
  id: string;
  title: string;
  objective: string;
  dailyActions: string[];
  weeklyBossFight: string;
  progress: number;
};

export type Campaign = {
  id: string;
  goalId: string;
  title: string;
  outcome: string;
  skillTree: SkillTree;
  deadline: string;
  currentLevel: string;
  availableMinutesPerDay: number;
  targetOutcome: string;
  createdAt: string;
  monthlyRoadmap: string[];
  weeklyObjectives: string[];
  dailyActions: string[];
  bossFights: BossFight[];
  journeyStages: JourneyStage[];
};

export type UserProfile = {
  archetype: string;
  focus: string[];
  preferredInput: 'typing' | 'speaking';
  rankTargets: Record<string, string[]>;
};

export type PlayerStats = {
  xp: number;
  level: number;
  rank: string;
  streak: number;
  longestStreak: number;
  completedTasksCount: number;
  lastActiveDate?: string;
};

export type Reflection = {
  weekKey: string;
  text: string;
  updatedAt: string;
};

export type DailyCheckIn = {
  id: string;
  text: string;
  mood: 'drained' | 'steady' | 'focused' | 'powered up';
  extractedWins: string[];
  xpAwarded: number;
  createdAt: string;
};

export type RpgState = {
  tasks: RpgTask[];
  goals: Goal[];
  campaigns: Campaign[];
  stats: PlayerStats;
  reflections: Reflection[];
  checkIns: DailyCheckIn[];
  profile: UserProfile;
};

export type TaskInput = Omit<RpgTask, 'id' | 'status' | 'createdAt' | 'completedAt'>;
export type GoalInput = Omit<Goal, 'id' | 'createdAt' | 'milestones'> & {
  milestones: Array<Omit<Milestone, 'id' | 'completed' | 'completedAt'>>;
};

export type CampaignInput = {
  goal: string;
  category: SkillTree | 'auto';
  deadline: string;
  currentLevel: string;
  availableMinutesPerDay: number;
  targetOutcome: string;
};
