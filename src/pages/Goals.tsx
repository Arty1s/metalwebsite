import { CampaignCard } from '../components/goals/CampaignCard';
import { GoalCard } from '../components/goals/GoalCard';
import { GoalForm } from '../components/goals/GoalForm';
import type { RpgStore } from '../hooks/useRpgStore';

export const Goals = ({ store }: { store: RpgStore }) => (
  <div className="space-y-6">
    <div>
      <p className="text-xs uppercase tracking-[0.2em] text-mana">Personal AI Quest Master</p>
      <h1 className="mt-2 text-3xl font-black text-white">Campaign Generator</h1>
      <p className="mt-2 max-w-3xl text-slate-400">You bring the outcome. The system turns it into daily quests, weekly objectives, monthly milestones, and boss fights.</p>
    </div>
    <GoalForm onGenerate={store.actions.generateGoalCampaign} />
    <section className="grid gap-4">
      <h2 className="text-xl font-black text-white">Active Campaigns</h2>
      {store.state.campaigns.map((campaign) => (
        <CampaignCard key={campaign.id} campaign={campaign} onBoss={store.actions.completeBossFight} />
      ))}
    </section>
    <div className="grid gap-4">
      <h2 className="text-xl font-black text-white">Monthly Milestones</h2>
      {store.state.goals.map((goal) => (
        <GoalCard key={goal.id} goal={goal} onMilestone={store.actions.toggleMilestone} />
      ))}
    </div>
  </div>
);
