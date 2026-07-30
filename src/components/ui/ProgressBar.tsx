type ProgressBarProps = {
  value: number;
  max?: number;
  label?: string;
  tone?: 'mana' | 'hunter' | 'success' | 'ember';
};

const toneClass = {
  mana: 'from-emerald to-mana',
  hunter: 'from-hunter to-silver',
  success: 'from-success to-emerald-200',
  ember: 'from-ember to-amber-200',
};

export const ProgressBar = ({ value, max = 100, label, tone = 'mana' }: ProgressBarProps) => {
  const percent = Math.max(0, Math.min(100, Math.round((value / max) * 100)));

  return (
    <div className="space-y-2">
      {label ? (
        <div className="flex items-center justify-between text-xs text-slate-400">
          <span>{label}</span>
          <span>{percent}%</span>
        </div>
      ) : null}
      <div className="h-2 overflow-hidden rounded-full bg-white/10">
        <div className={`h-full rounded-full bg-gradient-to-r ${toneClass[tone]} shadow-mana transition-all`} style={{ width: `${percent}%` }} />
      </div>
    </div>
  );
};
