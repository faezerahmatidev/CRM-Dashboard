# CRM-Dashboard (Angular)

CRM dashboard — Figma implementation with **Angular 20** (standalone components + SCSS + Angular Router). All data is local mock data; there is no backend.

## Features

- **Auth flow** (`/signup`, `/signin`, `/recover`, `/details`, `/finish`) with split-screen layout and client-side navigation between steps.
- **Dashboard section** (`/dashboard`, `/dashboard/overview`, `/dashboard/orders`, `/dashboard/messages`): sales/income charts with Day/Week/Month filtering, KPI cards, orders/invoices tables, messages panel, empty state.
- **Projects section** (`/projects/empty`, `/projects/list-01`, `/projects/grid-01`, `/projects/details/tasks|desk|activity|files|reports|settings`): project list/grid with sorting and pagination, working Edit/Delete row menus, Add/Edit project modal, task checklist, kanban desk, activity feed, files table, reports, settings form. Project changes persist to `localStorage`.
- **Shared component library** (`src/app/shared`, 20+ components): cards, charts, tables controls, menus, dialogs, avatars, auth primitives. See below.

## Tech stack

- Angular 20.3 (standalone) + TypeScript 5.9 (strict + strictTemplates) + SCSS
- Angular Router (eager routes), signals-based `ProjectsStore`, Reactive/Template-driven forms
- Jasmine + Karma for unit tests; GitHub Actions deploys a demo to GitHub Pages

## Prerequisites

- Node.js 20+ and npm

## Run

```bash
npm install
npm start        # dev server at http://localhost:4200
```

Build and test:

```bash
npm run build                     # production build
npx ng test --watch=false         # unit tests (needs Chrome)
```

## Shared components (`src/app/shared`)

Reusable building blocks used across sections:

- `AppShell` — rail sidebar + topbar shell (dashboard uses its own copy)
- `DashPage` / `DashCard` / `CardTabs` — dashboard page skeleton, cards, Day/Week/Month tabs
- `ChartCard` — line-chart card with per-tab datasets, marker tooltip, footer slot
- `StatCard` / `SparkCard` — KPI card and sparkline card
- `ProjectBrand` / `AvatarStack` / `UserAvatar` — brand glyph, member avatars
- `PanelHeader` / `ProjectInfoPanel` / `DetailsTabs` — project side panels and tabs
- `Pagination` / `ViewToggle` / `SortControl` / `Toggle` — list controls
- `DotsMenu` — row Edit/Delete popup menu
- `AuthLayout` / `AuthField` / `AuthSocial` — auth split layout, form fields, social buttons
- `EmptyState` — empty-page hero (illustration + text + action)
- `Fab` — floating action button

Projects state lives in `ProjectsStore` (signals, persisted to localStorage).

Design tokens from `figma/UI-kit` (Primary `#5E81F4`, Lato font).

## Routes

Auth: `/signup`, `/signin`, `/recover`, `/details`, `/finish`.
Dashboard section (gauge rail icon): `/dashboard`, `/dashboard/overview`, `/dashboard/orders`, `/dashboard/messages`.
Projects section (briefcase rail icon): `/projects/empty`, `/projects/list-01`, `/projects/grid-01`, `/projects/details/tasks|desk|activity|files|reports|settings`.
Dashboard rail icons other than gauge/briefcase are placeholders for future Figma sections. In-page shortcuts (KPI cards, table rows, event rows, View all) navigate within the current section and replace the history entry, so browser Back exits the section.

## Known limitations

- All data is static mock data; there is no backend. Auth accepts any input, and project CRUD lives only in `localStorage`.
- Member/product photos from Figma are represented by initial-based placeholders until real image assets arrive.
- Pagination controls switch the active page indicator; tables show the demo dataset.
- Icon-only buttons without a target section are intentionally non-navigating.

