import { Flag, Shield } from 'lucide-react';
import type { Campaign } from '../../types/rpg';
import { ProgressBar } from '../ui/ProgressBar';

export const JourneyMap = ({ campaign }: { campaign?: Campaign }) => {
  if (!campaign) {
    return (
      <section className="panel p-4">
        <h2 className="text-lg font-semibold text-silver">Journey Map</h2>
        <p className="mt-2 text-sm text-slate-400">Generate or reset the D-Rank campaign to reveal the path.</p>
      </section>
    );
  }

  return (
    <section className="panel p-4">
      <div className="flex items-center gap-2">
        <Shield className="text-mana" size={18} />
        <h2 className="text-lg font-semibold text-silver">Journey Map: E-Rank to D-Rank</h2>
      </div>
      <div className="mt-4 grid gap-3 lg:grid-cols-3">
        {campaign.journeyStages.map((stage) => (
          <article key={stage.id} className="rounded-md border border-silver/10 bg-black/20 p-3">
            <div className="flex items-start gap-2">
              <Flag className="mt-1 text-ember" size={16} />
              <div>
                <h3 className="font-semibold text-silver">{stage.title}</h3>
                <p className="mt-1 text-sm text-slate-400">{stage.objective}</p>
              </div>
            </div>
            <div className="mt-3">
              <ProgressBar value={stage.progress} tone="mana" />
            </div>
            <div className="mt-3 space-y-2 text-xs text-slate-400">
              <p className="uppercase tracking-[0.16em] text-slate-500">Daily actions</p>
              <p>{stage.dailyActions.join(' / ')}</p>
              <p className="pt-1 text-ember">Boss: {stage.weeklyBossFight}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};
