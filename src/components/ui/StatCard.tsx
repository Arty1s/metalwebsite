import type { LucideIcon } from 'lucide-react';

type StatCardProps = {
  label: string;
  value: string | number;
  detail?: string;
  icon: LucideIcon;
};

export const StatCard = ({ label, value, detail, icon: Icon }: StatCardProps) => (
  <section className="panel p-4">
    <div className="flex items-start justify-between gap-4">
      <div>
        <p className="text-xs uppercase tracking-[0.18em] text-slate-500">{label}</p>
        <p className="mt-2 text-2xl font-bold text-white">{value}</p>
        {detail ? <p className="mt-1 text-sm text-slate-400">{detail}</p> : null}
      </div>
      <div className="rounded-md border border-mana/20 bg-mana/10 p-2 text-mana">
        <Icon size={20} />
      </div>
    </div>
  </section>
);
