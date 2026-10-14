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
`/dashboard/orders`. Navigation inside the section replaces the history
entry, so browser Back exits the section instead of stepping views.

Design tokens from `figma/UI-kit` (Primary `#5E81F4`, Lato font).

## Run

```bash
npm install
npm start
```

Build:

```bash
npm run build
```
