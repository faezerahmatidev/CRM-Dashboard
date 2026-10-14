# CRM-Dashboard (Angular)

CRM dashboard — implementation from Figma, step by step, with **Angular** standalone + SCSS + Angular Router.

## Auth (Login & Register)

- `/signup` — Sign Up
- `/signin` — Sign In
- `/recover` — Recover password
- `/details` — Company details step

## Dashboard (from `figma/Dashboard`)

One **Dashboard section** (gauge rail icon, highlighted on every view below):

- `/dashboard` — Section home: Sales, Latest Events, Income Breakdown, Income Details
- `/dashboard/overview` — Business overview: KPIs, Orders chart, Planned Income, Latest sales (rail: briefcase)
- `/dashboard/orders` — Fulfillment: Orders table, Invoices table (rail: clipboard)
- `/dashboard/messages` — Messages side panel + empty-business state (rail: chat, green dot = unread)

Remaining rail icons are placeholders for future sections.

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
