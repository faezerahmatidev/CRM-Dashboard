import { Component } from '@angular/core';
import { DashPage } from '../../../shared/dash-page/dash-page';
import { ProjectInfoPanel } from '../../../shared/project-info-panel/project-info-panel';
import { DetailsTabs } from '../../../shared/details-tabs/details-tabs';
import { DashCard } from '../../../shared/dash-card/dash-card';
import { ChartCard, ChartSet } from '../../../shared/chart-card/chart-card';
import { DETAILS_INFO, REPORT_SALES } from '../../details-data';

@Component({
  selector: 'app-project-reports',
  standalone: true,
  imports: [DashPage, ProjectInfoPanel, DetailsTabs, DashCard, ChartCard],
  templateUrl: './reports.html',
  styleUrl: './reports.scss',
})
export class ProjectReports {
  info = DETAILS_INFO;
  tabs = ['Day', 'Week', 'Month'];
  sales = REPORT_SALES;

  ordersSets: Record<string, ChartSet> = {
    Day: {
      lines: [
        { d: 'M0 150 C 30 145, 45 170, 75 168 C 105 166, 115 90, 150 88 C 185 86, 195 150, 230 148 C 265 146, 275 100, 310 104 C 345 108, 355 160, 390 158 C 425 156, 435 120, 470 122 C 505 124, 520 150, 555 146 C 590 142, 610 120, 640 124', color: '#5e81f4' },
        { d: 'M0 120 C 40 118, 60 60, 100 62 C 140 64, 155 130, 195 132 C 235 134, 250 70, 290 66 C 330 62, 345 140, 385 142 C 425 144, 440 90, 480 92 C 520 94, 545 140, 585 138 C 610 137, 625 125, 640 128', color: '#7ce7ac' },
      ],
      marker: { x: 290, y: 66, color: '#7ce7ac', label: 'June 16', value: '$48,200' },
    },
  };

  plannedSet: ChartSet = {
    lines: [
      { d: 'M0 130 C 30 128, 45 90, 80 92 C 115 94, 120 150, 155 148', color: '#5e81f4' },
      { d: 'M155 148 C 190 146, 195 60, 230 58 C 265 56, 280 100, 340 96', color: '#5e81f4', width: 2, dash: '4 5' },
    ],
    marker: { x: 155, y: 148, color: '#5e81f4' },
  };
}
