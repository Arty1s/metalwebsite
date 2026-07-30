import { WandSparkles } from 'lucide-react';
import type { FormEvent } from 'react';
import { useState } from 'react';
import { addDays, toDateKey } from '../../lib/date';
import type { CampaignInput, SkillTree } from '../../types/rpg';

export const GoalForm = ({ onGenerate }: { onGenerate: (input: CampaignInput) => void }) => {
  const [goal, setGoal] = useState('Reach D-Rank');
  const [category, setCategory] = useState<CampaignInput['category']>('Freedom');
  const [deadline, setDeadline] = useState(toDateKey(addDays(new Date(), 180)));
  const [currentLevel, setCurrentLevel] = useState('E-Rank beginner: inconsistent but ready to execute a simple path.');
  const [availableMinutesPerDay, setAvailableMinutesPerDay] = useState(45);
  const [targetOutcome, setTargetOutcome] = useState('500 EUR/month online income, stable habits, and proof of work online.');
  const categories: Array<CampaignInput['category']> = ['auto', 'Freedom', 'Body', 'Wisdom', 'Technology'];

  const submit = (event: FormEvent) => {
    event.preventDefault();
    if (!goal.trim()) return;
    onGenerate({
      goal: goal.trim(),
      category,
      deadline,
      currentLevel,
      availableMinutesPerDay,
      targetOutcome,
    });
  };

  return (
    <form className="panel space-y-4 p-4" onSubmit={submit}>
      <div>
        <p className="text-xs uppercase tracking-[0.2em] text-mana">AI Quest Generator</p>
        <h2 className="mt-2 text-xl font-black text-white">Tell the system the outcome. It creates the journey.</h2>
      </div>
      <div className="grid gap-3 lg:grid-cols-[1.2fr_0.7fr_0.7fr_0.7fr]">
        <label className="space-y-2 text-sm text-slate-400">
          Goal title
          <input className="input" value={goal} onChange={(event) => setGoal(event.target.value)} placeholder="What outcome do you want?" />
        </label>
        <label className="space-y-2 text-sm text-slate-400">
          Category
          <select className="input" value={category} onChange={(event) => setCategory(event.target.value as SkillTree | 'auto')}>
            {categories.map((item) => <option key={item} value={item}>{item}</option>)}
          </select>
        </label>
        <label className="space-y-2 text-sm text-slate-400">
          Deadline
          <input className="input" type="date" value={deadline} onChange={(event) => setDeadline(event.target.value)} />
        </label>
        <label className="space-y-2 text-sm text-slate-400">
          Minutes per day
          <input className="input" type="number" min={10} max={240} value={availableMinutesPerDay} onChange={(event) => setAvailableMinutesPerDay(Number(event.target.value))} />
        </label>
      </div>
      <label className="block space-y-2 text-sm text-slate-400">
        Current level
        <textarea className="input min-h-24" value={currentLevel} onChange={(event) => setCurrentLevel(event.target.value)} />
      </label>
      <label className="block space-y-2 text-sm text-slate-400">
        Target outcome
        <textarea className="input min-h-20" value={targetOutcome} onChange={(event) => setTargetOutcome(event.target.value)} />
      </label>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-slate-500">Generates daily quests, weekly objectives, monthly milestones, boss fights, XP, and difficulty scaling.</p>
        <button className="btn-primary" type="submit">
          <WandSparkles size={18} />
          Generate Journey
        </button>
      </div>
    </form>
  );
};
