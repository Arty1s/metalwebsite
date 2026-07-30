import { Sparkles } from 'lucide-react';

export const XpToast = ({ xp }: { xp: number | null }) =>
  xp === null ? null : (
    <div className="fixed right-4 top-24 z-30 flex animate-bounce items-center gap-2 rounded-md border border-mana/40 bg-obsidian px-4 py-3 text-mana shadow-mana">
      <Sparkles size={18} />
      <span className="font-bold">+{xp} XP</span>
    </div>
  );
