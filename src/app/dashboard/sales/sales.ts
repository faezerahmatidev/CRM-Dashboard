import { Component } from '@angular/core';
import { DashWelcome } from '../widgets/welcome';
import { LatestUpdates } from '../widgets/latest-updates';
import { UpcomingEvents } from '../widgets/upcoming-events';
import { DashCard } from '../../shared/dash-card/dash-card';
import { DashPage } from '../../shared/dash-page/dash-page';
import { ChartCard } from '../../shared/chart-card/chart-card';
import { EventsCard } from '../../shared/events-card/events-card';
import {
  DASH_TABS,
  DONUT_COLORS,
  DONUT_LEGEND_COLORS,
  DONUT_NAMES,
  DONUT_SETS,
  INCOME_SETS,
  INCOME_STATS,
  SALES_EVENTS,
  YOUR_SALES_SETS,
  donutSegs,
} from '../../shared/dashboard-charts';

@Component({
  selector: 'app-dash-sales',
  standalone: true,
  imports: [DashWelcome, LatestUpdates, UpcomingEvents, DashCard, DashPage, ChartCard, EventsCard],
  templateUrl: './sales.html',
  styleUrl: './sales.scss',
})
export class DashSales {
  events = SALES_EVENTS;

  tabs = DASH_TABS;

  salesTab = 'Day';
  salesSets = YOUR_SALES_SETS;

  incomeTab = 'Day';
  incomeSets = INCOME_SETS;
  incomeStats = INCOME_STATS;

  donutTab = 'Day';
  donutColors = DONUT_COLORS;
  legendColors = DONUT_LEGEND_COLORS;
  donutNames = DONUT_NAMES;
  donutSets = DONUT_SETS;

  donutSegs = donutSegs;
}
