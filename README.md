# Solo Leveling Life RPG

A full-stack-ready React + TypeScript MVP that turns daily tasks, goals, and weekly reflection into a self-improvement RPG. It uses localStorage today and keeps the data layer isolated for an API/backend later.

## Run locally

```bash
npm install
npm run dev
```

Then open the local URL shown by Vite.

## Build

```bash
npm run build
```

## Structure

- `src/types` - app domain models
- `src/lib` - date, XP, rank, and storage utilities
- `src/hooks` - localStorage-backed RPG state actions
- `src/components` - reusable UI and feature components
- `src/pages` - Dashboard, Tasks, Goals, Weekly Review, Profile
