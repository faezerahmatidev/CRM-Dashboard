import { Component } from '@angular/core';
import { DashPage } from '../../shared/dash-page/dash-page';
import { DashCard } from '../../shared/dash-card/dash-card';
import { ConversionBars } from '../../dashboard/widgets/conversion-bars';
import { ProductsSidebar } from '../../products/products-sidebar';
import { IncomeDonut } from '../../products/income-donut';
import { AreaChart } from '../area-chart';
import { DASH_TABS } from '../../shared/dashboard-charts';

@Component({
  selector: 'app-reports-03',
  standalone: true,
  imports: [DashPage, DashCard, ConversionBars, ProductsSidebar, IncomeDonut, AreaChart],
  templateUrl: './view-03.html',
  styleUrl: './view-03.scss',
})
export class Reports03 {
  tabs = DASH_TABS;
  donutTab = 'Day';

  yellowTab = 'Day';
  yellowSets = {
    Day: {
      lines: [{
        d: 'M0 110 C 40 60, 70 90, 110 84 C 150 78, 170 50, 210 56 C 250 62, 280 40, 340 44',
        color: '#f4be5e',
        area: {
          d: 'M0 110 C 40 60, 70 90, 110 84 C 150 78, 170 50, 210 56 C 250 62, 280 40, 340 44 L 340 170 L 0 170 Z',
          from: '#f4be5e', to: '#f4be5e',
        },
      }],
      marker: { x: 160, y: 62, color: '#f4be5e', label: 'June 16', value: '$48,200' },
    },
    Week: {
      lines: [{
        d: 'M0 100 C 50 70, 80 95, 120 88 C 160 81, 180 55, 220 60 C 260 65, 290 45, 340 48',
        color: '#f4be5e',
        area: {
          d: 'M0 100 C 50 70, 80 95, 120 88 C 160 81, 180 55, 220 60 C 260 65, 290 45, 340 48 L 340 170 L 0 170 Z',
          from: '#f4be5e', to: '#f4be5e',
        },
      }],
      marker: { x: 220, y: 60, color: '#f4be5e', label: 'June 23', value: '$51,600' },
    },
    Month: {
      lines: [{
        d: 'M0 120 C 45 80, 75 100, 115 92 C 155 84, 175 58, 215 62 C 255 66, 285 48, 340 50',
        color: '#f4be5e',
        area: {
          d: 'M0 120 C 45 80, 75 100, 115 92 C 155 84, 175 58, 215 62 C 255 66, 285 48, 340 50 L 340 170 L 0 170 Z',
          from: '#f4be5e', to: '#f4be5e',
        },
      }],
      marker: { x: 250, y: 58, color: '#f4be5e', label: 'July 02', value: '$55,100' },
    },
  };

  dualTab = 'Day';
  dualSets = {
    Day: {
      lines: [
        { d: 'M0 120 C 50 100, 80 60, 130 66 C 180 72, 200 110, 250 100 C 300 90, 320 60, 340 56', color: '#5e81f4' },
        { d: 'M0 140 C 60 130, 90 100, 140 104 C 190 108, 210 130, 260 124 C 300 119, 320 100, 340 98', color: '#7ce7ac' },
      ],
      marker: { x: 250, y: 100, color: '#5e81f4', label: 'June 16', value: '$48,200' },
    },
    Week: {
      lines: [
        { d: 'M0 110 C 55 90, 85 55, 135 62 C 185 69, 205 105, 255 96 C 300 88, 320 58, 340 54', color: '#5e81f4' },
        { d: 'M0 135 C 60 125, 95 98, 145 102 C 195 106, 215 128, 265 122 C 305 117, 325 98, 340 96', color: '#7ce7ac' },
      ],
      marker: { x: 290, y: 88, color: '#5e81f4', label: 'June 23', value: '$51,600' },
    },
    Month: {
      lines: [
        { d: 'M0 125 C 50 105, 80 65, 130 70 C 180 75, 200 112, 250 103 C 300 94, 322 62, 340 58', color: '#5e81f4' },
        { d: 'M0 142 C 60 132, 90 102, 140 106 C 190 110, 212 132, 262 126 C 302 121, 322 102, 340 100', color: '#7ce7ac' },
      ],
      marker: { x: 230, y: 100, color: '#5e81f4', label: 'July 02', value: '$55,100' },
    },
  };

  ordersTab = 'Day';
  ordersLegend = [
    { label: '28 July 2018', color: '#8181a5' },
    { label: '28 July 2019', color: '#5e81f4' },
    { label: '28 July 2020', color: '#7ce7ac' },
  ];
  ordersSets = {
    Day: {
      lines: [
        {
          d: 'M0 150 C 60 145, 90 110, 150 112 C 210 114, 240 90, 300 92 C 360 94, 400 70, 460 72 C 510 74, 535 60, 560 58',
          color: '#5e81f4',
          area: {
            d: 'M0 150 C 60 145, 90 110, 150 112 C 210 114, 240 90, 300 92 C 360 94, 400 70, 460 72 C 510 74, 535 60, 560 58 L 560 190 L 0 190 Z',
            from: '#5e81f4', to: '#5e81f4',
          },
        },
        {
          d: 'M0 165 C 70 160, 100 135, 160 137 C 220 139, 250 118, 310 120 C 370 122, 410 100, 470 102 C 515 104, 540 92, 560 90',
          color: '#8181a5',
          area: {
            d: 'M0 165 C 70 160, 100 135, 160 137 C 220 139, 250 118, 310 120 C 370 122, 410 100, 470 102 C 515 104, 540 92, 560 90 L 560 190 L 0 190 Z',
            from: '#8181a5', to: '#8181a5',
          },
        },
      ],
      marker: { x: 300, y: 92, color: '#5e81f4', label: 'June 16', value: '$48,200' },
    },
    Week: {
      lines: [
        {
          d: 'M0 145 C 65 140, 95 108, 155 110 C 215 112, 245 88, 305 90 C 365 92, 405 68, 465 70 C 515 72, 540 58, 560 56',
          color: '#5e81f4',
          area: {
            d: 'M0 145 C 65 140, 95 108, 155 110 C 215 112, 245 88, 305 90 C 365 92, 405 68, 465 70 C 515 72, 540 58, 560 56 L 560 190 L 0 190 Z',
            from: '#5e81f4', to: '#5e81f4',
          },
        },
      ],
      marker: { x: 350, y: 86, color: '#5e81f4', label: 'June 23', value: '$51,600' },
    },
    Month: {
      lines: [
        {
          d: 'M0 155 C 60 150, 90 118, 150 120 C 210 122, 240 96, 300 98 C 360 100, 400 76, 460 78 C 510 80, 538 64, 560 62',
          color: '#5e81f4',
          area: {
            d: 'M0 155 C 60 150, 90 118, 150 120 C 210 122, 240 96, 300 98 C 360 100, 400 76, 460 78 C 510 80, 538 64, 560 62 L 560 190 L 0 190 Z',
            from: '#5e81f4', to: '#5e81f4',
          },
        },
      ],
      marker: { x: 280, y: 96, color: '#5e81f4', label: 'July 02', value: '$55,100' },
    },
  };
}
