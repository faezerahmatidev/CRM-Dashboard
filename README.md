# CRM-Dashboard (Angular)

CRM dashboard — implementation from Figma, step by step, with **Angular** standalone + SCSS + Angular Router.

## Auth (Login & Register)

- `/signup` — Sign Up
- `/signin` — Sign In
- `/recover` — Recover password
- `/details` — Company details step

## Dashboard (from `figma/Dashboard`)

One **Dashboard section** (gauge rail icon, always highlighted):

- `/dashboard` — Section home: Sales, Latest Events, Income Breakdown, Income Details
- `/dashboard/overview` — Business overview: KPIs, Orders chart, Planned Income, Latest sales
- `/dashboard/orders` — Fulfillment: Orders table, Invoices table
- `/dashboard/messages` — Messages side panel + empty-business state

Rail icons are placeholders for future Figma sections (no navigation yet).

In-page behavior: Day/Week/Month tabs filter their chart or table.
Card shortcuts: KPI cards jump to Sales (`/dashboard`) or Orders
(`/dashboard/orders`); Latest sales rows and `View all` open
`/dashboard/orders`. From the home view: card titles
(Your Sales, Income Breakdown, Income Details) open
`/dashboard/overview`; invoice event rows open `/dashboard/orders`;
client and meeting event rows open `/dashboard/messages`.
Navigation inside the section replaces the history
entry, so browser Back exits the section instead of stepping views.

Design tokens from `figma/UI-kit` (Primary `#5E81F4`, Lato font).

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

## Run

```bash
npm install
npm start
```

Build:

```bash
npm run build
```
