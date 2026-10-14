import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DashWelcome } from '../widgets/welcome';
import { LatestUpdates } from '../widgets/latest-updates';
import { UpcomingEvents } from '../widgets/upcoming-events';

interface DashEvent {
  icon: 'invoice' | 'client' | 'meeting';
  title: string;
  sub: string;
  value: string;
  link: string;
}

interface ChartSet {
  d: string;
  mx: number;
  my: number;
  label: string;
  value: string;
}

interface DonutSet {
  total: string;
  pct: string;
  values: number[];
  legend: string[];
}

@Component({
  selector: 'app-dash-sales',
  standalone: true,
  imports: [DashWelcome, LatestUpdates, UpcomingEvents, RouterLink],
  templateUrl: './sales.html',
  styleUrl: './sales.scss',
})
export class DashSales {
  events: DashEvent[] = [
    { icon: 'invoice', title: 'Invoice #AA-04-19-1890678', sub: 'New Madleton LLC.', value: '$118.00', link: '/dashboard/orders' },
    { icon: 'client', title: 'Client Bernard Stanley', sub: 'bernard.stanley@gmail.com', value: '$208.00', link: '/dashboard/messages' },
    { icon: 'meeting', title: 'Meeting with the client', sub: '24 Vandervort Springs.', value: '29 Oct 2019', link: '/dashboard/messages' },
    { icon: 'invoice', title: 'Invoice #AA-04-19-1890243', sub: 'Tyrique mouth LLC.', value: '$578.00', link: '/dashboard/orders' },
  ];

  tabs = ['Day', 'Week', 'Month'];

  salesTab = 'Day';
  salesSets: Record<string, ChartSet> = {
    Day: {
      d: 'M0 140 C 40 120, 60 178, 110 172 C 160 166, 168 66, 222 60 C 276 54, 286 124, 336 134 C 386 144, 404 112, 452 118 C 496 123, 522 84, 560 90',
      mx: 222, my: 60, label: 'March', value: '$48,200',
    },
    Week: {
      d: 'M0 118 C 45 100, 70 152, 120 146 C 170 140, 185 72, 242 68 C 299 64, 308 128, 358 126 C 408 124, 428 92, 482 98 C 522 102, 540 72, 560 78',
      mx: 300, my: 96, label: 'April', value: '$52,400',
    },
    Month: {
      d: 'M0 152 C 50 136, 75 182, 125 176 C 175 170, 190 88, 245 84 C 300 80, 318 142, 372 136 C 426 130, 448 78, 502 84 C 530 87, 545 64, 560 70',
      mx: 378, my: 72, label: 'May', value: '$61,800',
    },
  };

  incomeTab = 'Day';
  incomeSets: Record<string, ChartSet> = {
    Day: {
      d: 'M0 120 C 60 110, 90 60, 150 62 C 210 64, 230 110, 300 108 C 370 106, 400 60, 460 58 C 510 56, 530 80, 560 74',
      mx: 300, my: 108, label: 'March', value: '$48,200',
    },
    Week: {
      d: 'M0 128 C 60 120, 95 70, 155 72 C 215 74, 235 118, 305 116 C 375 114, 405 66, 465 64 C 515 62, 535 88, 560 82',
      mx: 340, my: 92, label: 'April', value: '$51,300',
    },
    Month: {
      d: 'M0 110 C 60 100, 90 52, 150 54 C 210 56, 235 104, 305 100 C 375 96, 400 50, 465 48 C 515 46, 535 72, 560 66',
      mx: 420, my: 62, label: 'June', value: '$64,900',
    },
  };
  incomeStats: Record<string, string[]> = {
    Day: ['$342,000', '$200,000', '$142,000'],
    Week: ['$368,000', '$214,000', '$154,000'],
    Month: ['$410,000', '$232,000', '$178,000'],
  };

  donutTab = 'Day';
  donutColors = ['#f4be5e', '#5e81f4', '#7ce7ac', '#ff808b'];
  legendColors = ['#5e81f4', '#f4be5e', '#7ce7ac', '#ff808b'];
  donutNames = ['Marketing Channels', 'Offline Channels', 'Direct Sales', 'Other Channels'];
  donutSets: Record<string, DonutSet> = {
    Day: { total: '$85k', pct: '14%', values: [34.2, 28.9, 13.1, 23.8], legend: ['$22.0k', '$18.6k', '$8.4k', '$15.3k'] },
    Week: { total: '$98k', pct: '32%', values: [30, 32, 15, 23], legend: ['$25.3k', '$21.4k', '$9.7k', '$17.6k'] },
    Month: { total: '$112k', pct: '30%', values: [28, 30, 18, 24], legend: ['$29.0k', '$24.5k', '$11.1k', '$20.1k'] },
  };

  donutSegs(values: number[]): Array<{ len: number; off: number }> {
    const total = values.reduce((a, b) => a + b, 0);
    const circ = 2 * Math.PI * 70;
    const gap = 4;
    let acc = 0;
    return values.map((v) => {
      const arc = (v / total) * circ;
      const seg = { len: +(Math.max(arc - gap, 2)).toFixed(1), off: +(-acc).toFixed(1) };
      acc += arc;
      return seg;
    });
  }
}
