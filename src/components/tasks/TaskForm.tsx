import { Plus } from 'lucide-react';
import type { FormEvent } from 'react';
import { useState } from 'react';
import { todayKey, toDateKey, addDays } from '../../lib/date';
import { difficultyXp } from '../../lib/progression';
import type { Difficulty, TaskCadence, TaskInput } from '../../types/rpg';

type TaskFormProps = {
  onAdd: (input: TaskInput) => void;
};

const categories = ['Fitness', 'Mind', 'Career', 'Health', 'Learning', 'Planning'];
const difficulties: Difficulty[] = ['easy', 'medium', 'hard', 'boss'];

export const TaskForm = ({ onAdd }: TaskFormProps) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState(categories[0]);
  const [difficulty, setDifficulty] = useState<Difficulty>('easy');
  const [cadence, setCadence] = useState<TaskCadence>('daily');
  const [deadline, setDeadline] = useState(todayKey());

  const submit = (event: FormEvent) => {
    event.preventDefault();
    if (!title.trim()) return;

    onAdd({
      title: title.trim(),
      description: description.trim() || 'No description. Just clear the quest.',
      category,
      difficulty,
      cadence,
      deadline,
      xpReward: difficultyXp[difficulty],
    });

    setTitle('');
    setDescription('');
    setDifficulty('easy');
    setDeadline(cadence === 'daily' ? todayKey() : toDateKey(addDays(new Date(), 6)));
  };

  return (
    <form className="panel p-4" onSubmit={submit}>
      <div className="grid gap-3 lg:grid-cols-[1.3fr_1fr_auto]">
        <input className="input" value={title} onChange={(event) => setTitle(event.target.value)} placeholder="Add a quest..." />
        <input className="input" value={description} onChange={(event) => setDescription(event.target.value)} placeholder="Optional description" />
        <button className="btn-primary" type="submit">
          <Plus size={18} />
          Add
        </button>
      </div>
      <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <select className="input" value={category} onChange={(event) => setCategory(event.target.value)}>
          {categories.map((item) => (
            <option key={item}>{item}</option>
          ))}
        </select>
        <select className="input" value={difficulty} onChange={(event) => setDifficulty(event.target.value as Difficulty)}>
          {difficulties.map((item) => (
            <option key={item} value={item}>
              {item.toUpperCase()} - {difficultyXp[item]} XP
            </option>
          ))}
        </select>
        <select
          className="input"
          value={cadence}
          onChange={(event) => {
            const next = event.target.value as TaskCadence;
            setCadence(next);
            setDeadline(next === 'daily' ? todayKey() : toDateKey(addDays(new Date(), 6)));
          }}
        >
          <option value="daily">Daily quest</option>
          <option value="weekly">Weekly quest</option>
        </select>
        <input className="input" type="date" value={deadline} onChange={(event) => setDeadline(event.target.value)} />
      </div>
    </form>
  );
};
