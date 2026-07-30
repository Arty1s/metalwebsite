import { Activity, Brain, Flame, Rocket, Swords, Trophy, Zap } from 'lucide-react';
import { DailyCheckIn } from '../components/checkin/DailyCheckIn';
import { JourneyMap } from '../components/campaign/JourneyMap';
import { TaskList } from '../components/tasks/TaskList';
import { ProgressBar } from '../components/ui/ProgressBar';
import { StatCard } from '../components/ui/StatCard';
import type { RpgStore } from '../hooks/useRpgStore';
import { xpForNextLevel } from '../lib/progression';

export const Dashboard = ({ store }: { store: RpgStore }) => {
  const { state, derived, actions } = store;
  const nextLevel = xpForNextLevel(state.stats.level);
  const todayTotal = Math.max(derived.todayTasks.length, 1);
  const todayProgress = (derived.todayCompleted.length / todayTotal) * 100;
  const defeatedYesterday = derived.xpToday > derived.xpYesterday || derived.todayCompleted.length > derived.yesterdayCompleted.length;
  const currentCampaign = derived.activeCampaigns[0];

  return (
    <div className="space-y-5">
      <section className="grid gap-4 lg:grid-cols-[1.35fr_0.85fr]">
        <div className="panel overflow-hidden p-5">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-mana">System awakened.</p>
              <h1 className="mt-2 text-3xl font-black text-silver sm:text-4xl">Today&apos;s path is ready.</h1>
              <p className="mt-3 max-w-2xl text-slate-400">
                Your old self is the final boss. Small quests count. Do not break the chain.
              </p>
            </div>
            <div className="rounded-md border border-mana/25 bg-mana/10 p-4 text-center">
              <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Current Rank</p>
              <p className="mt-1 text-2xl font-black text-silver">{state.stats.rank}</p>
              <p className="text-sm text-mana">Level {state.stats.level}</p>
            </div>
          </div>
          <div className="mt-6">
            <ProgressBar value={state.stats.xp} max={nextLevel} label={`${state.stats.xp} / ${nextLevel} XP to next level`} tone="mana" />
          </div>
        </div>

        <div className="panel p-5">
          <div className="flex items-center gap-2 text-ember">
            <Swords size={20} />
            <h2 className="font-black text-silver">Final Boss: Yesterday Me</h2>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
            <div className="rounded-md border border-silver/10 bg-black/20 p-3">
              <p className="text-slate-500">Yesterday XP</p>
              <p className="text-2xl font-bold text-silver">{derived.xpYesterday}</p>
            </div>
            <div className="rounded-md border border-silver/10 bg-black/20 p-3">
              <p className="text-slate-500">Today XP</p>
              <p className="text-2xl font-bold text-mana">{derived.xpToday}</p>
            </div>
            <div className="rounded-md border border-silver/10 bg-black/20 p-3">
              <p className="text-slate-500">Yesterday quests</p>
              <p className="text-2xl font-bold text-silver">{derived.yesterdayCompleted.length}</p>
            </div>
            <div className="rounded-md border border-silver/10 bg-black/20 p-3">
              <p className="text-slate-500">Today quests</p>
              <p className="text-2xl font-bold text-mana">{derived.todayCompleted.length}</p>
            </div>
          </div>
          <p className={`mt-4 rounded-md border p-3 text-sm font-semibold ${defeatedYesterday ? 'border-success/20 bg-success/10 text-emerald-300' : 'border-ember/20 bg-ember/10 text-amber-200'}`}>
            {defeatedYesterday ? 'You defeated yesterday\'s version of yourself.' : 'The boss still stands.'}
          </p>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard icon={Zap} label="XP today" value={derived.xpToday} detail={`${derived.xpWeek} XP this week`} />
        <StatCard icon={Activity} label="Today progress" value={`${Math.round(todayProgress)}%`} detail={`${derived.todayCompleted.length}/${derived.todayTasks.length} quests cleared`} />
        <StatCard icon={Flame} label="Streak" value={state.stats.streak} detail="Small quests count" />
        <StatCard icon={Rocket} label="Monthly income" value="0 / 500" detail="EUR toward D-Rank" />
      </section>

      <section className="grid gap-4 lg:grid-cols-[1fr_0.8fr]">
        <div className="panel p-5">
          <div className="flex items-center gap-2">
            <Brain className="text-mana" size={20} />
            <h2 className="text-xl font-black text-silver">Current Campaign</h2>
          </div>
          {currentCampaign ? (
            <div className="mt-4 rounded-md border border-silver/10 bg-black/20 p-4">
              <p className="font-bold text-silver">{currentCampaign.outcome}</p>
              <p className="mt-2 text-sm text-slate-400">{currentCampaign.targetOutcome}</p>
              <p className="mt-3 text-sm text-mana">{currentCampaign.skillTree} - {currentCampaign.availableMinutesPerDay} min/day - deadline {currentCampaign.deadline}</p>
            </div>
          ) : (
            <p className="mt-4 text-sm text-slate-400">Generate a campaign from Goals to receive your journey.</p>
          )}
        </div>

        <div className="panel p-5">
          <div className="flex items-center gap-2 text-ember">
            <Trophy size={20} />
            <h2 className="text-xl font-black text-silver">Next Boss Fight</h2>
          </div>
          {derived.nextBossFight ? (
            <div className="mt-4 rounded-md border border-ember/25 bg-ember/10 p-4">
              <p className="font-bold text-silver">{derived.nextBossFight.title}</p>
              <p className="mt-2 text-sm text-slate-400">{derived.nextBossFight.campaignTitle}</p>
              <p className="mt-3 text-sm text-mana">{derived.nextBossFight.deadline} - {derived.nextBossFight.xpReward} XP</p>
            </div>
          ) : (
            <p className="mt-4 text-sm text-slate-400">No boss fight queued. Generate a campaign to summon one.</p>
          )}
        </div>
      </section>

      <JourneyMap campaign={currentCampaign} />

      <section className="grid gap-6 lg:grid-cols-[1fr_0.8fr]">
        <div>
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-xl font-black text-silver">Today&apos;s Quests</h2>
            <span className="text-sm text-slate-500">{derived.today}</span>
          </div>
          <TaskList tasks={derived.todayTasks} onComplete={actions.completeTask} emptyText="No daily quests yet. Generate a campaign from Goals." />
        </div>
        <div className="panel p-5">
          <h2 className="text-xl font-black text-silver">Weekly Progress</h2>
          <div className="mt-5 space-y-4">
            <ProgressBar value={derived.weekCompleted.length} max={Math.max(derived.weekTasks.length, 1)} label="Quests cleared this week" tone="mana" />
            <ProgressBar value={derived.xpWeek} max={700} label="Weekly XP rhythm" tone="hunter" />
            <div className="rounded-md border border-silver/10 bg-black/20 p-4">
              <p className="text-sm text-slate-400">Path instruction</p>
              <p className="mt-2 text-lg font-semibold text-silver">D-Rank is not far. Execute today&apos;s path.</p>
            </div>
          </div>
        </div>
      </section>

      <DailyCheckIn onSave={actions.saveCheckIn} />
    </div>
  );
};
