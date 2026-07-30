import { CheckCircle2, Crown, Swords } from 'lucide-react';
import type { Campaign } from '../../types/rpg';

type CampaignCardProps = {
  campaign: Campaign;
  onBoss: (campaignId: string, bossId: string) => void;
};

export const CampaignCard = ({ campaign, onBoss }: CampaignCardProps) => (
  <article className="panel p-4">
    <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
      <div>
        <div className="flex items-center gap-2 text-mana">
          <Crown size={18} />
          <span className="text-xs uppercase tracking-[0.18em]">{campaign.skillTree} Campaign</span>
        </div>
        <h3 className="mt-2 text-xl font-black text-silver">{campaign.outcome}</h3>
        <p className="mt-1 text-sm text-slate-400">{campaign.targetOutcome}</p>
        <p className="mt-1 text-sm text-slate-400">{campaign.availableMinutesPerDay} minutes/day from: {campaign.currentLevel}</p>
      </div>
      <p className="rounded-md border border-silver/10 bg-black/20 px-3 py-2 text-sm text-slate-300">Deadline {campaign.deadline}</p>
    </div>
    <div className="mt-5 grid gap-4 lg:grid-cols-3">
      <div>
        <h4 className="font-bold text-silver">Daily Quest Loop</h4>
        <ul className="mt-2 space-y-2 text-sm text-slate-400">
          {campaign.dailyActions.map((item) => <li key={item}>{item}</li>)}
        </ul>
      </div>
      <div>
        <h4 className="font-bold text-silver">Weekly Objectives</h4>
        <ul className="mt-2 space-y-2 text-sm text-slate-400">
          {campaign.weeklyObjectives.map((item) => <li key={item}>{item}</li>)}
        </ul>
      </div>
      <div>
        <h4 className="font-bold text-silver">Boss Fights</h4>
        <div className="mt-2 space-y-2">
          {campaign.bossFights.map((boss) => (
            <button
              key={boss.id}
              className={`flex w-full items-center justify-between rounded-md border px-3 py-2 text-left text-sm ${
                boss.completed ? 'border-success/30 bg-success/10 text-slate-300' : 'border-ember/30 bg-ember/10 text-silver hover:border-ember'
              }`}
              disabled={boss.completed}
              onClick={() => onBoss(campaign.id, boss.id)}
            >
              <span className="flex items-center gap-2">
                {boss.completed ? <CheckCircle2 size={16} /> : <Swords size={16} />}
                {boss.title}
              </span>
              <span className="font-bold text-mana">{boss.xpReward}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  </article>
);
