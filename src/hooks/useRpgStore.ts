import { useEffect, useMemo, useState } from 'react';
import type { CampaignInput, GoalInput, RpgState, TaskInput } from '../types/rpg';
import { addDays, getWeekDates, isSameDayKey, todayKey, toDateKey, weekKey } from '../lib/date';
import { applyXp } from '../lib/progression';
import { createInitialState, loadState, saveState } from '../lib/storage';
import { generateCampaign } from '../lib/questGenerator';

const id = () => crypto.randomUUID();

const touchStreak = (state: RpgState): RpgState => {
  const today = todayKey();
  const yesterday = toDateKey(addDays(new Date(), -1));
  const last = state.stats.lastActiveDate;
  const streak = last === today ? state.stats.streak : last === yesterday ? state.stats.streak + 1 : 1;

  return {
    ...state,
    stats: {
      ...state.stats,
      streak,
      longestStreak: Math.max(state.stats.longestStreak, streak),
      lastActiveDate: today,
    },
  };
};

export const useRpgStore = () => {
  const [state, setState] = useState<RpgState>(() => loadState());
  const [xpBurst, setXpBurst] = useState<number | null>(null);

  useEffect(() => saveState(state), [state]);

  useEffect(() => {
    if (xpBurst === null) return;
    const timeout = window.setTimeout(() => setXpBurst(null), 1400);
    return () => window.clearTimeout(timeout);
  }, [xpBurst]);

  const addTask = (input: TaskInput) => {
    setState((current) => ({
      ...current,
      tasks: [
        {
          ...input,
          id: id(),
          status: 'pending',
          createdAt: todayKey(),
        },
        ...current.tasks,
      ],
    }));
  };

  const completeTask = (taskId: string) => {
    setState((current) => {
      const task = current.tasks.find((item) => item.id === taskId);
      if (!task || task.status === 'completed') return current;

      setXpBurst(task.xpReward);
      const completedAt = new Date().toISOString();
      const next = touchStreak({
        ...current,
        tasks: current.tasks.map((item) => (item.id === taskId ? { ...item, status: 'completed', completedAt } : item)),
        stats: {
          ...applyXp(current.stats, task.xpReward),
          completedTasksCount: current.stats.completedTasksCount + 1,
        },
      });
      return next;
    });
  };

  const addGoal = (input: GoalInput) => {
    setState((current) => ({
      ...current,
      goals: [
        {
          ...input,
          id: id(),
          createdAt: todayKey(),
          milestones: input.milestones.map((milestone) => ({ ...milestone, id: id(), completed: false })),
        },
        ...current.goals,
      ],
    }));
  };

  const generateGoalCampaign = (input: CampaignInput) => {
    const generated = generateCampaign(input);
    setXpBurst(50);
    setState((current) => ({
      ...current,
      goals: [generated.goal, ...current.goals],
      campaigns: [generated.campaign, ...current.campaigns],
      tasks: [...generated.tasks, ...current.tasks],
      stats: applyXp(current.stats, 50),
    }));
  };

  const toggleMilestone = (goalId: string, milestoneId: string) => {
    setState((current) => {
      const goal = current.goals.find((item) => item.id === goalId);
      const milestone = goal?.milestones.find((item) => item.id === milestoneId);
      if (!goal || !milestone || milestone.completed) return current;

      setXpBurst(milestone.xpReward);
      return touchStreak({
        ...current,
        goals: current.goals.map((item) =>
          item.id === goalId
            ? {
                ...item,
                milestones: item.milestones.map((candidate) =>
                  candidate.id === milestoneId
                    ? { ...candidate, completed: true, completedAt: new Date().toISOString() }
                    : candidate,
                ),
              }
            : item,
        ),
        stats: applyXp(current.stats, milestone.xpReward),
      });
    });
  };

  const saveReflection = (text: string) => {
    const currentWeek = weekKey();
    setState((current) => ({
      ...current,
      reflections: [
        ...current.reflections.filter((reflection) => reflection.weekKey !== currentWeek),
        { weekKey: currentWeek, text, updatedAt: new Date().toISOString() },
      ],
    }));
  };

  const completeBossFight = (campaignId: string, bossId: string) => {
    setState((current) => {
      const campaign = current.campaigns.find((item) => item.id === campaignId);
      const boss = campaign?.bossFights.find((item) => item.id === bossId);
      if (!campaign || !boss || boss.completed) return current;

      setXpBurst(boss.xpReward);
      return touchStreak({
        ...current,
        campaigns: current.campaigns.map((item) =>
          item.id === campaignId
            ? {
                ...item,
                bossFights: item.bossFights.map((candidate) =>
                  candidate.id === bossId ? { ...candidate, completed: true, completedAt: new Date().toISOString() } : candidate,
                ),
              }
            : item,
        ),
        stats: applyXp(current.stats, boss.xpReward),
      });
    });
  };

  const saveCheckIn = (text: string) => {
    const lower = text.toLowerCase();
    const matchedTasks = state.tasks.filter((task) => {
      if (task.status === 'completed') return false;
      const titleWords = task.title.toLowerCase().split(/\W+/).filter((word) => word.length > 4);
      return titleWords.some((word) => lower.includes(word));
    });
    const mood = /tired|drained|bad|exhausted/.test(lower)
      ? 'drained'
      : /great|strong|amazing|energized|proud/.test(lower)
        ? 'powered up'
        : /focused|deep|flow/.test(lower)
          ? 'focused'
          : 'steady';
    const extractedWins = [
      lower.includes('read') ? 'Reading progress logged' : '',
      lower.includes('hackcode') || lower.includes('code') ? 'HackCode or coding progress logged' : '',
      lower.includes('exercise') || lower.includes('workout') || lower.includes('calisthenics') ? 'Body training logged' : '',
      lower.includes('outreach') || lower.includes('client') || lower.includes('lead') ? 'Freedom/outreach progress logged' : '',
    ].filter(Boolean);
    const checkInXp = Math.max(20, extractedWins.length * 20);

    setXpBurst(checkInXp + matchedTasks.reduce((sum, task) => sum + task.xpReward, 0));
    setState((current) => {
      const completedAt = new Date().toISOString();
      const taskIds = new Set(matchedTasks.map((task) => task.id));
      const xpFromTasks = matchedTasks.reduce((sum, task) => sum + task.xpReward, 0);
      return touchStreak({
        ...current,
        tasks: current.tasks.map((task) => (taskIds.has(task.id) ? { ...task, status: 'completed', completedAt } : task)),
        checkIns: [
          {
            id: id(),
            text,
            mood,
            extractedWins: extractedWins.length > 0 ? extractedWins : ['Daily check-in captured'],
            xpAwarded: checkInXp,
            createdAt: completedAt,
          },
          ...current.checkIns,
        ],
        stats: {
          ...applyXp(current.stats, checkInXp + xpFromTasks),
          completedTasksCount: current.stats.completedTasksCount + matchedTasks.length,
        },
      });
    });
  };

  const resetDemo = () => setState(createInitialState());

  const derived = useMemo(() => {
    const today = todayKey();
    const yesterday = toDateKey(addDays(new Date(), -1));
    const weekDates = getWeekDates();
    const completedTasks = state.tasks.filter((task) => task.status === 'completed');
    const todayTasks = state.tasks.filter((task) => task.deadline === today || isSameDayKey(task.completedAt, today));
    const weekTasks = state.tasks.filter((task) => weekDates.includes(task.deadline) || weekDates.some((date) => isSameDayKey(task.completedAt, date)));
    const todayCompleted = completedTasks.filter((task) => isSameDayKey(task.completedAt, today));
    const yesterdayCompleted = completedTasks.filter((task) => isSameDayKey(task.completedAt, yesterday));
    const weekCompleted = completedTasks.filter((task) => weekDates.some((date) => isSameDayKey(task.completedAt, date)));
    const missedTasks = weekTasks.filter((task) => task.status === 'pending' && task.deadline < today);
    const xpToday = todayCompleted.reduce((sum, task) => sum + task.xpReward, 0);
    const xpYesterday = yesterdayCompleted.reduce((sum, task) => sum + task.xpReward, 0);
    const xpWeek = weekCompleted.reduce((sum, task) => sum + task.xpReward, 0);
    const goalMilestonesThisWeek = state.goals.flatMap((goal) => goal.milestones).filter((milestone) => weekDates.some((date) => isSameDayKey(milestone.completedAt, date)));
    const checkInsThisWeek = state.checkIns.filter((checkIn) => weekDates.some((date) => isSameDayKey(checkIn.createdAt, date)));
    const generatedToday = todayTasks.filter((task) => task.isGenerated);
    const activeCampaigns = state.campaigns.filter((campaign) => campaign.bossFights.some((boss) => !boss.completed));
    const nextBossFight = activeCampaigns.flatMap((campaign) => campaign.bossFights.map((boss) => ({ ...boss, campaignTitle: campaign.title, campaignId: campaign.id }))).filter((boss) => !boss.completed).sort((a, b) => a.deadline.localeCompare(b.deadline))[0];
    const skillProgress = (['Body', 'Wisdom', 'Technology', 'Freedom'] as const).map((skillTree) => {
      const skillTasks = completedTasks.filter((task) => task.skillTree === skillTree || task.category === skillTree);
      return {
        skillTree,
        completed: skillTasks.length,
        xp: skillTasks.reduce((sum, task) => sum + task.xpReward, 0),
      };
    });
    const daySummaries = weekDates.map((date) => {
      const tasks = completedTasks.filter((task) => isSameDayKey(task.completedAt, date));
      return {
        date,
        completed: tasks.length,
        xp: tasks.reduce((sum, task) => sum + task.xpReward, 0),
      };
    });
    const bestDay = [...daySummaries].sort((a, b) => b.xp - a.xp)[0];
    const improvementBase = Math.max(1, xpYesterday);
    const improvementPercentage = Math.round(((xpToday - xpYesterday) / improvementBase) * 100);
    const reflection = state.reflections.find((item) => item.weekKey === weekKey())?.text ?? '';

    return {
      today,
      weekDates,
      todayTasks,
      weekTasks,
      todayCompleted,
      yesterdayCompleted,
      weekCompleted,
      missedTasks,
      xpToday,
      xpYesterday,
      xpWeek,
      bestDay,
      improvementPercentage,
      goalMilestonesThisWeek,
      reflection,
      checkInsThisWeek,
      generatedToday,
      activeCampaigns,
      nextBossFight,
      skillProgress,
    };
  }, [state]);

  return {
    state,
    derived,
    xpBurst,
    actions: { addTask, completeTask, addGoal, generateGoalCampaign, toggleMilestone, completeBossFight, saveCheckIn, saveReflection, resetDemo },
  };
};

export type RpgStore = ReturnType<typeof useRpgStore>;
