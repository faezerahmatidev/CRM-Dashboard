import { Component } from '@angular/core';
import { DashPage } from '../../shared/dash-page/dash-page';
import { ChartCard } from '../../shared/chart-card/chart-card';
import { DashCard } from '../../shared/dash-card/dash-card';
import { EventsCard } from '../../shared/events-card/events-card';
import { ProductsSidebar } from '../../products/products-sidebar';
import { IncomeDonut, DonutSlice } from '../../products/income-donut';
import {
  DASH_TABS,
  DONUT_LEGEND_COLORS,
  DONUT_NAMES,
  DONUT_SETS,
  INCOME_SETS,
  INCOME_STATS,
  SALES_EVENTS,
  YOUR_SALES_SETS,
} from '../../shared/dashboard-charts';

@Component({
  selector: 'app-reports-02',
  standalone: true,
  imports: [DashPage, ChartCard, DashCard, EventsCard, ProductsSidebar, IncomeDonut],
  templateUrl: './view-02.html',
  styleUrl: './view-02.scss',
})
export class Reports02 {
  tabs = DASH_TABS;

  salesTab = 'Day';
  salesSets = YOUR_SALES_SETS;

  events = SALES_EVENTS;

  breakdownTab = 'Day';

  incomeTab = 'Day';
  incomeSets = INCOME_SETS;
  incomeStats = INCOME_STATS;

  donutSlices(): DonutSlice[] {
    const set = DONUT_SETS[this.breakdownTab];
    return set.values.map((v, i) => ({
      label: DONUT_NAMES[i],
      value: set.legend[i],
      color: DONUT_LEGEND_COLORS[i],
      fraction: v / 100,
    }));
  }

  donutTotal(): string {
    return DONUT_SETS[this.breakdownTab].total;
  }
}
