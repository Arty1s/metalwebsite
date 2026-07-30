import { RotateCcw, Shield, Star, Target, Trophy, Zap } from 'lucide-react';
import type { RpgStore } from '../hooks/useRpgStore';
import { xpForNextLevel } from '../lib/progression';
import { ProgressBar } from '../components/ui/ProgressBar';
import { StatCard } from '../components/ui/StatCard';

export const Profile = ({ store }: { store: RpgStore }) => {
  const { stats } = store.state;

  return (
    <div className="space-y-6">
      <section className="panel p-6">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-mana">Hunter profile</p>
            <h1 className="mt-2 text-3xl font-black text-white">RPG Stats</h1>
            <p className="mt-2 max-w-3xl text-slate-400">{store.state.profile.archetype}</p>
          </div>
          <div className="rounded-lg border border-mana/30 bg-mana/10 p-5 text-center">
            <Shield className="mx-auto text-mana" size={28} />
            <p className="mt-2 text-2xl font-black text-white">{stats.rank}</p>
            <p className="text-sm text-slate-400">Level {stats.level}</p>
          </div>
        </div>
        <div className="mt-6">
          <ProgressBar value={stats.xp} max={xpForNextLevel(stats.level)} label="Current XP bar" tone="hunter" />
        </div>
      </section>
      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard icon={Zap} label="Current XP" value={stats.xp} detail={`${xpForNextLevel(stats.level) - stats.xp} XP to next level`} />
        <StatCard icon={Star} label="Level" value={stats.level} />
        <StatCard icon={Trophy} label="Tasks cleared" value={stats.completedTasksCount} />
        <StatCard icon={Target} label="Streak" value={stats.streak} detail={`Longest: ${stats.longestStreak}`} />
      </section>
      <section className="panel p-5">
        <h2 className="text-xl font-black text-white">Rank Ladder</h2>
        <div className="mt-4 grid gap-2 md:grid-cols-2 lg:grid-cols-3">
          {Object.entries(store.state.profile.rankTargets).map(([rank, targets]) => (
            <div key={rank} className={`rounded-md border p-3 ${rank === stats.rank ? 'border-mana/50 bg-mana/10 text-mana' : 'border-white/10 bg-white/5 text-slate-400'}`}>
              <p className="font-bold">{rank}</p>
              <ul className="mt-2 space-y-1 text-sm">
                {targets.map((target) => <li key={target}>{target}</li>)}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-5 rounded-md border border-white/10 bg-white/5 p-4">
          <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Main Skill Trees</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {store.state.profile.focus.map((focus) => (
              <span key={focus} className="rounded border border-mana/20 bg-mana/10 px-3 py-1 text-sm text-mana">{focus}</span>
            ))}
          </div>
        </div>
        <button className="btn-secondary mt-5" onClick={store.actions.resetDemo}>
          <RotateCcw size={18} />
          Reload Starter Data
        </button>
      </section>
    </div>
  );
};
