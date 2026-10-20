import { Component } from '@angular/core';
import { DashWelcome } from '../../dashboard/widgets/welcome';
import { LatestUpdates } from '../../dashboard/widgets/latest-updates';
import { UpcomingEvents } from '../../dashboard/widgets/upcoming-events';
import { DashPage } from '../../shared/dash-page/dash-page';
import { ChartCard } from '../../shared/chart-card/chart-card';
import { StatCard } from '../../shared/stat-card/stat-card';
import { ConversionBars } from '../../dashboard/widgets/conversion-bars';
import { RingsChart } from '../../shared/rings-chart/rings-chart';
import { DASH_TABS, OVERVIEW_ORDERS_SETS, PLANNED_SET } from '../../shared/dashboard-charts';

@Component({
  selector: 'app-reports-01',
  standalone: true,
  imports: [DashWelcome, LatestUpdates, UpcomingEvents, DashPage, ChartCard, StatCard, ConversionBars, RingsChart],
  templateUrl: './view-01.html',
  styleUrl: './view-01.scss',
})
export class Reports01 {
  tabs = DASH_TABS;
  ordersTab = 'Day';
  ordersSets = OVERVIEW_ORDERS_SETS;
  plannedSet = PLANNED_SET;

  kpis = [
    { label: 'Sales', value: '1.345', sub: 'Week comparison', bar: '#7ce7ac', width: '72%' },
    { label: 'Leads', value: '3.820', sub: 'Month comparison', bar: '#5e81f4', width: '58%' },
    { label: 'Income', value: '$690.00', sub: 'Week comparison', bar: '#ff808b', width: '44%' },
  ];

  miniTab = 'Day';
  miniSets = {
    Day: {
      lines: [{ d: 'M0 120 C 60 100, 90 130, 150 110 C 210 90, 240 120, 300 105 C 360 90, 400 115, 460 100', color: '#5e81f4' }],
    },
  };
}
