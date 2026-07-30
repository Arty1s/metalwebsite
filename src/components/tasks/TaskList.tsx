import { CheckCircle2, Clock, Flame } from 'lucide-react';
import type { RpgTask } from '../../types/rpg';

type TaskListProps = {
  tasks: RpgTask[];
  onComplete: (taskId: string) => void;
  emptyText?: string;
};

const difficultyTone = {
  easy: 'text-emerald-300 bg-emerald-400/10 border-emerald-300/20',
  medium: 'text-cyan-300 bg-cyan-400/10 border-cyan-300/20',
  hard: 'text-violet-300 bg-violet-400/10 border-violet-300/20',
  boss: 'text-orange-300 bg-orange-400/10 border-orange-300/20',
};

export const TaskList = ({ tasks, onComplete, emptyText = 'No quests here yet.' }: TaskListProps) => {
  if (tasks.length === 0) {
    return <div className="panel p-6 text-center text-slate-400">{emptyText}</div>;
  }

  return (
    <div className="space-y-3">
      {tasks.map((task) => (
        <article key={task.id} className={`panel p-4 ${task.status === 'completed' ? 'border-success/30 bg-success/5' : ''}`}>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="font-bold text-white">{task.title}</h3>
                <span className={`rounded px-2 py-1 text-xs font-semibold ${difficultyTone[task.difficulty]}`}>{task.difficulty}</span>
                {task.isGenerated ? <span className="rounded border border-mana/20 bg-mana/10 px-2 py-1 text-xs font-semibold text-mana">generated</span> : null}
                {task.difficulty === 'boss' ? <Flame className="text-ember" size={16} /> : null}
              </div>
              <p className="mt-1 text-sm text-slate-400">{task.description}</p>
              <div className="mt-3 flex flex-wrap gap-2 text-xs text-slate-500">
                <span>{task.category}</span>
                {task.skillTree && task.skillTree !== task.category ? <span>{task.skillTree}</span> : null}
                <span>{task.cadence}</span>
                <span className="inline-flex items-center gap-1">
                  <Clock size={13} />
                  {task.deadline}
                </span>
                <span className="font-bold text-mana">{task.xpReward} XP</span>
              </div>
            </div>
            <button className={task.status === 'completed' ? 'btn-secondary opacity-70' : 'btn-primary'} disabled={task.status === 'completed'} onClick={() => onComplete(task.id)}>
              <CheckCircle2 size={18} />
              {task.status === 'completed' ? 'Cleared' : 'Complete'}
            </button>
          </div>
        </article>
      ))}
    </div>
  );
};
