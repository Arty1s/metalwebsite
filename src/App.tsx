import { useState } from 'react';
import type { ReactNode } from 'react';
import { Layout } from './components/Layout';
import { XpToast } from './components/XpToast';
import { useRpgStore } from './hooks/useRpgStore';
import { Dashboard } from './pages/Dashboard';
import { Goals } from './pages/Goals';
import { Profile } from './pages/Profile';
import { Tasks } from './pages/Tasks';
import { WeeklyReview } from './pages/WeeklyReview';

export type Page = 'dashboard' | 'tasks' | 'goals' | 'review' | 'profile';

export const App = () => {
  const [page, setPage] = useState<Page>('dashboard');
  const store = useRpgStore();

  const pages: Record<Page, ReactNode> = {
    dashboard: <Dashboard store={store} />,
    tasks: <Tasks store={store} />,
    goals: <Goals store={store} />,
    review: <WeeklyReview store={store} />,
    profile: <Profile store={store} />,
  };

  return (
    <Layout activePage={page} onNavigate={setPage} stats={store.state.stats}>
      <XpToast xp={store.xpBurst} />
      {pages[page]}
    </Layout>
  );
};
