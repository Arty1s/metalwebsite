import type { RpgStore } from '../hooks/useRpgStore';
import { TaskForm } from '../components/tasks/TaskForm';
import { TaskList } from '../components/tasks/TaskList';

export const Tasks = ({ store }: { store: RpgStore }) => {
  const daily = store.state.tasks.filter((task) => task.cadence === 'daily');
  const weekly = store.state.tasks.filter((task) => task.cadence === 'weekly');

  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs uppercase tracking-[0.2em] text-mana">Quest board</p>
        <h1 className="mt-2 text-3xl font-black text-white">Tasks</h1>
      </div>
      <TaskForm onAdd={store.actions.addTask} />
      <section className="grid gap-6 lg:grid-cols-2">
        <div>
          <h2 className="mb-3 text-xl font-black text-white">Daily Quests</h2>
          <TaskList tasks={daily} onComplete={store.actions.completeTask} />
        </div>
        <div>
          <h2 className="mb-3 text-xl font-black text-white">Weekly Quests</h2>
          <TaskList tasks={weekly} onComplete={store.actions.completeTask} />
        </div>
      </section>
    </div>
  );
};
