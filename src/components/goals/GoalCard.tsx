import { Check, Flag } from 'lucide-react';
import type { Goal } from '../../types/rpg';
import { ProgressBar } from '../ui/ProgressBar';

type GoalCardProps = {
  goal: Goal;
  onMilestone: (goalId: string, milestoneId: string) => void;
};

export const getGoalProgress = (goal: Goal) => {
  if (goal.milestones.length === 0) return 0;
  return Math.round((goal.milestones.filter((milestone) => milestone.completed).length / goal.milestones.length) * 100);
};

export const GoalCard = ({ goal, onMilestone }: GoalCardProps) => {
  const progress = getGoalProgress(goal);

  return (
    <article className="panel p-4">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <div className="flex items-center gap-2 text-mana">
            <Flag size={18} />
            <span className="text-xs uppercase tracking-[0.18em]">{goal.category}</span>
          </div>
          <h3 className="mt-2 text-xl font-black text-white">{goal.title}</h3>
          <p className="mt-1 text-sm text-slate-400">{goal.description}</p>
          <p className="mt-2 text-xs text-slate-500">Target: {goal.targetDate}</p>
        </div>
        <div className="text-left sm:text-right">
          <p className="text-3xl font-black text-white">{progress}%</p>
          <p className="text-xs uppercase tracking-[0.18em] text-slate-500">complete</p>
        </div>
      </div>
      <div className="mt-4">
        <ProgressBar value={progress} tone={progress === 100 ? 'success' : 'hunter'} />
      </div>
      <div className="mt-4 grid gap-2">
        {goal.milestones.map((milestone) => (
          <button
            key={milestone.id}
            className={`flex items-center justify-between rounded-md border px-3 py-2 text-left text-sm transition ${
              milestone.completed ? 'border-success/30 bg-success/10 text-slate-300' : 'border-white/10 bg-white/5 text-white hover:border-mana/40'
            }`}
            disabled={milestone.completed}
            onClick={() => onMilestone(goal.id, milestone.id)}
          >
            <span className="flex items-center gap-2">
              <span className={`grid size-6 place-items-center rounded border ${milestone.completed ? 'border-success/50 bg-success/20 text-success' : 'border-white/20'}`}>
                {milestone.completed ? <Check size={15} /> : null}
              </span>
              {milestone.title}
            </span>
            <span className="font-bold text-mana">{milestone.xpReward} XP</span>
          </button>
        ))}
      </div>
    </article>
  );
};
