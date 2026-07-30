import { BarChart3, CalendarCheck, Crosshair, Flag, ScrollText, Swords } from 'lucide-react';
import type { ReactNode } from 'react';
import type { Page } from '../App';
import type { PlayerStats } from '../types/rpg';

const navItems: Array<{ page: Page; label: string; icon: typeof BarChart3 }> = [
  { page: 'dashboard', label: 'Dashboard', icon: BarChart3 },
  { page: 'tasks', label: 'Tasks', icon: CalendarCheck },
  { page: 'goals', label: 'Goals', icon: Flag },
  { page: 'review', label: 'Review', icon: ScrollText },
  { page: 'profile', label: 'Profile', icon: Crosshair },
];

type LayoutProps = {
  activePage: Page;
  onNavigate: (page: Page) => void;
  stats: PlayerStats;
  children: ReactNode;
};

export const Layout = ({ activePage, onNavigate, stats, children }: LayoutProps) => (
  <div className="min-h-screen text-slate-100">
    <header className="sticky top-0 z-20 border-b border-silver/10 bg-void/92 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between">
        <button className="flex items-center gap-3 text-left" onClick={() => onNavigate('dashboard')}>
          <span className="rounded-md border border-mana/30 bg-mana/10 p-2 text-mana">
            <Swords size={24} />
          </span>
          <span>
            <span className="block text-lg font-black text-silver">Life RPG Quest Master</span>
            <span className="block text-xs uppercase tracking-[0.18em] text-mana">{stats.rank}</span>
          </span>
        </button>
        <nav className="grid grid-cols-5 gap-2 overflow-x-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = item.page === activePage;
            return (
              <button
                key={item.page}
                className={`flex min-w-0 flex-col items-center gap-1 rounded-md px-3 py-2 text-xs transition sm:min-w-24 sm:flex-row sm:justify-center sm:text-sm ${
                  active ? 'bg-mana/15 text-mana ring-1 ring-mana/40' : 'text-slate-400 hover:bg-white/5 hover:text-white'
                }`}
                onClick={() => onNavigate(item.page)}
              >
                <Icon size={17} />
                <span className="truncate">{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </header>
    <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:py-8">{children}</main>
  </div>
);
