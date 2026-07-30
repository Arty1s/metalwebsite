import { useEffect, useState } from 'react';
import { BookOpen, CalendarDays, CircleX, Lightbulb, Target, Trophy, Zap } from 'lucide-react';
import type { RpgStore } from '../hooks/useRpgStore';
import { StatCard } from '../components/ui/StatCard';

export const WeeklyReview = ({ store }: { store: RpgStore }) => {
  const [reflection, setReflection] = useState(store.derived.reflection);

  useEffect(() => setReflection(store.derived.reflection), [store.derived.reflection]);

  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs uppercase tracking-[0.2em] text-mana">Weekly raid report</p>
        <h1 className="mt-2 text-3xl font-black text-white">Weekly Review</h1>
      </div>
      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        <StatCard icon={Zap} label="Total XP" value={store.derived.xpWeek} />
        <StatCard icon={Trophy} label="Completed" value={store.derived.weekCompleted.length} />
        <StatCard icon={CircleX} label="Missed" value={store.derived.missedTasks.length} />
        <StatCard icon={Target} label="Goals progressed" value={store.derived.goalMilestonesThisWeek.length} />
        <StatCard icon={CalendarDays} label="Best day" value={store.derived.bestDay.date.slice(5)} detail={`${store.derived.bestDay.xp} XP`} />
      </section>
      <section className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="panel p-5">
          <h2 className="text-xl font-black text-white">Week Pattern</h2>
          <div className="mt-5 grid grid-cols-7 gap-2">
            {store.derived.weekDates.map((date) => {
              const completed = store.state.tasks.filter((task) => task.completedAt?.slice(0, 10) === date).length;
              return (
                <div key={date} className="rounded-md border border-white/10 bg-white/5 p-2 text-center">
                  <p className="text-xs text-slate-500">{date.slice(5)}</p>
                  <p className="mt-2 text-xl font-black text-mana">{completed}</p>
                </div>
              );
            })}
          </div>
        </div>
        <div className="panel p-5">
          <div className="flex items-center gap-2">
            <BookOpen className="text-mana" size={20} />
            <h2 className="text-xl font-black text-white">What did I learn this week?</h2>
          </div>
          <textarea className="input mt-4 min-h-36" value={reflection} onChange={(event) => setReflection(event.target.value)} placeholder="Write one honest lesson from this week." />
          <button className="btn-primary mt-4" onClick={() => store.actions.saveReflection(reflection)}>
            Save Reflection
          </button>
        </div>
      </section>
      <section className="grid gap-6 lg:grid-cols-2">
        <div className="panel p-5">
          <h2 className="text-xl font-black text-white">Skill Tree Report</h2>
          <div className="mt-4 grid gap-3">
            {store.derived.skillProgress.map((skill) => (
              <div key={skill.skillTree} className="rounded-md border border-white/10 bg-white/5 p-3">
                <div className="flex items-center justify-between">
                  <p className="font-bold text-white">{skill.skillTree}</p>
                  <p className="text-sm font-bold text-mana">{skill.xp} XP</p>
                </div>
                <p className="mt-1 text-sm text-slate-400">{skill.completed} completed quests</p>
              </div>
            ))}
          </div>
        </div>
        <div className="panel p-5">
          <div className="flex items-center gap-2">
            <Lightbulb className="text-mana" size={20} />
            <h2 className="text-xl font-black text-white">Recommendations</h2>
          </div>
          <div className="mt-4 space-y-3 text-sm text-slate-400">
            <p>Freedom: keep outreach daily until income is measurable. One lead, one follow-up, or one offer improvement counts.</p>
            <p>Technology: connect HackCode work to portfolio proof so skills become visible.</p>
            <p>Body and Wisdom: protect small daily wins. They keep the system stable when income work gets uncomfortable.</p>
            <p>Monthly report lens: income progress, fitness progress, reading completion, learning proof, and next boss fight.</p>
          </div>
        </div>
      </section>
      {store.state.checkIns.length > 0 ? (
        <section className="panel p-5">
          <h2 className="text-xl font-black text-white">Recent Check-Ins</h2>
          <div className="mt-4 grid gap-3">
            {store.state.checkIns.slice(0, 3).map((checkIn) => (
              <div key={checkIn.id} className="rounded-md border border-white/10 bg-white/5 p-3">
                <p className="text-sm text-slate-300">{checkIn.text}</p>
                <p className="mt-2 text-xs uppercase tracking-[0.18em] text-mana">{checkIn.mood} • +{checkIn.xpAwarded} XP</p>
              </div>
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
};
