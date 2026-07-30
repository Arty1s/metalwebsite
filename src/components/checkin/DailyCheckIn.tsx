import { Mic, Send } from 'lucide-react';
import { useState } from 'react';

export const DailyCheckIn = ({ onSave }: { onSave: (text: string) => void }) => {
  const [text, setText] = useState('Today I read 8 pages, did 15 minutes of movement, sent 2 outreach messages and worked on HackCode.');

  return (
    <section className="panel p-5">
      <div className="flex items-center gap-2">
        <Mic className="text-mana" size={20} />
        <h2 className="text-xl font-black text-silver">Daily Check-In</h2>
      </div>
      <textarea
        className="input mt-4 min-h-28"
        value={text}
        onChange={(event) => setText(event.target.value)}
        placeholder="Type your spoken-style update..."
      />
      <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-slate-500">Paste your spoken thoughts. The system extracts progress, mood, and XP locally.</p>
        <button
          className="btn-primary"
          onClick={() => {
            if (!text.trim()) return;
            onSave(text.trim());
            setText('');
          }}
        >
          <Send size={18} />
          Extract Progress
        </button>
      </div>
    </section>
  );
};
