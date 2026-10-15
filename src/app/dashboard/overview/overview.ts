import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DashWelcome } from '../widgets/welcome';
import { LatestUpdates } from '../widgets/latest-updates';
import { UpcomingEvents } from '../widgets/upcoming-events';
import { DashCard } from '../../shared/dash-card/dash-card';
import { DashPage } from '../../shared/dash-page/dash-page';
import { ChartCard, ChartSet } from '../../shared/chart-card/chart-card';
import { StatCard } from '../../shared/stat-card/stat-card';

interface Kpi {
  label: string;
  value: string;
  sub: string;
  bar: string;
  width: string;
  link: string;
}

interface Sale {
  product: string;
  pid: string;
  customer: string;
  email: string;
  country: string;
  address: string;
  shipping: string;
  total: string;
  status: string;
  badge: string;
  color: string;
  initial: string;
}

@Component({
  selector: 'app-dash-overview',
  standalone: true,
  imports: [DashWelcome, LatestUpdates, UpcomingEvents, RouterLink, DashCard, DashPage, ChartCard, StatCard],
  templateUrl: './overview.html',
  styleUrl: './overview.scss',
})
export class DashOverview {
  kpis: Kpi[] = [
    { label: 'Sales', value: '1.345', sub: 'Week comparison', bar: '#7ce7ac', width: '72%', link: '/dashboard' },
    { label: 'Leads', value: '3.820', sub: 'Month comparison', bar: '#5e81f4', width: '58%', link: '/dashboard/orders' },
    { label: 'Income', value: '$690.00', sub: 'Week comparison', bar: '#ff808b', width: '44%', link: '/dashboard' },
  ];

  sales: Sale[] = [
    { product: 'Macbook Pro', pid: 'ID 10-2299-08', customer: 'Rodney Cannon', email: 'rodney.cannon@gmail.com', country: 'United Kingdom', address: '193 Cole Plains Suite 649, 89120E', shipping: '$18.00', total: '$118.00', status: 'Shipped', badge: 'badge-green', color: 'linear-gradient(135deg,#5e81f4,#9698d6)', initial: 'M' },
    { product: 'Dell Laptop', pid: 'ID 10-3456-18', customer: 'Mike Franklin', email: 'mike.franklin@gmail.com', country: 'United States', address: '619 Jeffrey Freeway Apt. 273', shipping: '$28.00', total: '$208.00', status: 'Processing', badge: 'badge-yellow', color: 'linear-gradient(135deg,#1c1d21,#8181a5)', initial: 'D' },
    { product: 'Macbook Air', pid: 'ID 10-3776-23', customer: 'Louis Franklin', email: 'louis.franklin@gmail.com', country: 'Germany', address: '200 Davis Estates Suite 421', shipping: '$18.00', total: '$118.00', status: 'Processing', badge: 'badge-yellow', color: 'linear-gradient(135deg,#9698d6,#5e81f4)', initial: 'A' },
  ];

  tabs = ['Day', 'Week', 'Month'];

  plannedSet: ChartSet = {
    lines: [
      { d: 'M0 130 C 30 128, 45 90, 80 92 C 115 94, 120 150, 155 148', color: '#5e81f4' },
      { d: 'M155 148 C 190 146, 195 60, 230 58 C 265 56, 280 100, 340 96', color: '#5e81f4', width: 2, dash: '4 5' },
    ],
    marker: { x: 155, y: 148, color: '#5e81f4' },
  };

  ordersTab = 'Day';
  ordersSets: Record<string, ChartSet> = {
    Day: {
      lines: [
        { d: 'M0 150 C 30 145, 45 170, 75 168 C 105 166, 115 90, 150 88 C 185 86, 195 150, 230 148 C 265 146, 275 100, 310 104 C 345 108, 355 160, 390 158 C 425 156, 435 120, 470 122 C 505 124, 520 150, 555 146 C 590 142, 610 120, 640 124', color: '#5e81f4' },
        { d: 'M0 120 C 40 118, 60 60, 100 62 C 140 64, 155 130, 195 132 C 235 134, 250 70, 290 66 C 330 62, 345 140, 385 142 C 425 144, 440 90, 480 92 C 520 94, 545 140, 585 138 C 610 137, 625 125, 640 128', color: '#7ce7ac' },
      ],
      marker: { x: 290, y: 66, color: '#7ce7ac', label: 'June 16', value: '$48,200' },
    },
    Week: {
      lines: [
        { d: 'M0 140 C 35 135, 55 160, 90 155 C 125 150, 135 100, 170 98 C 205 96, 215 145, 250 142 C 285 139, 295 105, 330 108 C 365 111, 375 150, 410 148 C 445 146, 460 115, 495 118 C 530 121, 560 140, 600 136 C 620 134, 630 125, 640 128', color: '#5e81f4' },
        { d: 'M0 110 C 40 105, 65 70, 105 72 C 145 74, 160 120, 200 122 C 240 124, 255 80, 295 78 C 335 76, 350 130, 390 132 C 430 134, 445 95, 485 97 C 525 99, 550 130, 590 128 C 615 127, 628 118, 640 120', color: '#7ce7ac' },
      ],
      marker: { x: 335, y: 78, color: '#7ce7ac', label: 'June 23', value: '$51,600' },
    },
    Month: {
      lines: [
        { d: 'M0 160 C 40 155, 60 175, 95 170 C 130 165, 140 110, 175 108 C 210 106, 220 155, 255 152 C 290 149, 300 112, 335 115 C 370 118, 380 160, 415 158 C 450 156, 465 125, 500 128 C 535 131, 565 148, 595 144 C 618 141, 630 132, 640 134', color: '#5e81f4' },
        { d: 'M0 130 C 45 125, 70 80, 110 82 C 150 84, 165 135, 205 137 C 245 139, 260 90, 300 88 C 340 86, 355 145, 395 147 C 435 149, 450 100, 490 102 C 530 104, 555 145, 595 143 C 618 142, 630 132, 640 134', color: '#7ce7ac' },
      ],
      marker: { x: 300, y: 88, color: '#7ce7ac', label: 'July 02', value: '$55,100' },
    },
  };

}
