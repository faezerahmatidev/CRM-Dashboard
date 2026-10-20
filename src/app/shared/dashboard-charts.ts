import type { ChartSet } from './chart-card/chart-card';

export interface DashEvent {
  icon: 'invoice' | 'client' | 'meeting';
  title: string;
  sub: string;
  value: string;
  link: string;
}

export interface DonutSet {
  total: string;
  pct: string;
  values: number[];
  legend: string[];
}

/** Chart datasets shared by the dashboard sales view and the reports views. */
export const DASH_TABS = ['Day', 'Week', 'Month'];

export const SALES_EVENTS: DashEvent[] = [
  { icon: 'invoice', title: 'Invoice #AA-04-19-1890678', sub: 'New Madleton LLC.', value: '$118.00', link: '/dashboard/orders' },
  { icon: 'client', title: 'Client Bernard Stanley', sub: 'bernard.stanley@gmail.com', value: '$208.00', link: '/dashboard/messages' },
  { icon: 'meeting', title: 'Meeting with the client', sub: '24 Vandervort Springs.', value: '29 Oct 2019', link: '/dashboard/messages' },
  { icon: 'invoice', title: 'Invoice #AA-04-19-1890243', sub: 'Tyrique mouth LLC.', value: '$578.00', link: '/dashboard/orders' },
];

export const YOUR_SALES_SETS: Record<string, ChartSet> = {
  Day: {
    lines: [{ d: 'M0 140 C 40 120, 60 178, 110 172 C 160 166, 168 66, 222 60 C 276 54, 286 124, 336 134 C 386 144, 404 112, 452 118 C 496 123, 522 84, 560 90', color: '#5e81f4' }],
    marker: { x: 222, y: 60, color: '#5e81f4', label: 'March', value: '$48,200' },
  },
  Week: {
    lines: [{ d: 'M0 118 C 45 100, 70 152, 120 146 C 170 140, 185 72, 242 68 C 299 64, 308 128, 358 126 C 408 124, 428 92, 482 98 C 522 102, 540 72, 560 78', color: '#5e81f4' }],
    marker: { x: 300, y: 96, color: '#5e81f4', label: 'April', value: '$52,400' },
  },
  Month: {
    lines: [{ d: 'M0 152 C 50 136, 75 182, 125 176 C 175 170, 190 88, 245 84 C 300 80, 318 142, 372 136 C 426 130, 448 78, 502 84 C 530 87, 545 64, 560 70', color: '#5e81f4' }],
    marker: { x: 378, y: 72, color: '#5e81f4', label: 'May', value: '$61,800' },
  },
};

export const INCOME_SETS: Record<string, ChartSet> = {
  Day: {
    lines: [{ d: 'M0 120 C 60 110, 90 60, 150 62 C 210 64, 230 110, 300 108 C 370 106, 400 60, 460 58 C 510 56, 530 80, 560 74', color: '#7ce7ac' }],
    marker: { x: 300, y: 108, color: '#7ce7ac', label: 'March', value: '$48,200' },
  },
  Week: {
    lines: [{ d: 'M0 128 C 60 120, 95 70, 155 72 C 215 74, 235 118, 305 116 C 375 114, 405 66, 465 64 C 515 62, 535 88, 560 82', color: '#7ce7ac' }],
    marker: { x: 340, y: 92, color: '#7ce7ac', label: 'April', value: '$51,300' },
  },
  Month: {
    lines: [{ d: 'M0 110 C 60 100, 90 52, 150 54 C 210 56, 235 104, 305 100 C 375 96, 400 50, 465 48 C 515 46, 535 72, 560 66', color: '#7ce7ac' }],
    marker: { x: 420, y: 62, color: '#7ce7ac', label: 'June', value: '$64,900' },
  },
};

export const INCOME_STATS: Record<string, string[]> = {
  Day: ['$342,000', '$200,000', '$142,000'],
  Week: ['$368,000', '$214,000', '$154,000'],
  Month: ['$410,000', '$232,000', '$178,000'],
};

export const DONUT_COLORS = ['#f4be5e', '#5e81f4', '#7ce7ac', '#ff808b'];
export const DONUT_LEGEND_COLORS = ['#5e81f4', '#f4be5e', '#7ce7ac', '#ff808b'];
export const DONUT_NAMES = ['Marketing Channels', 'Offline Channels', 'Direct Sales', 'Other Channels'];

export const DONUT_SETS: Record<string, DonutSet> = {
  Day: { total: '$85k', pct: '14%', values: [34.2, 28.9, 13.1, 23.8], legend: ['$22.0k', '$18.6k', '$8.4k', '$15.3k'] },
  Week: { total: '$98k', pct: '32%', values: [30, 32, 15, 23], legend: ['$25.3k', '$21.4k', '$9.7k', '$17.6k'] },
  Month: { total: '$112k', pct: '30%', values: [28, 30, 18, 24], legend: ['$29.0k', '$24.5k', '$11.1k', '$20.1k'] },
};

/** Donut arc geometry shared by every income-breakdown donut. */
export function donutSegs(values: number[]): Array<{ len: number; off: number }> {
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

export const PLANNED_SET: ChartSet = {
  lines: [
    { d: 'M0 130 C 30 128, 45 90, 80 92 C 115 94, 120 150, 155 148', color: '#5e81f4' },
    { d: 'M155 148 C 190 146, 195 60, 230 58 C 265 56, 280 100, 340 96', color: '#5e81f4', width: 2, dash: '4 5' },
  ],
  marker: { x: 155, y: 148, color: '#5e81f4' },
};

export const OVERVIEW_ORDERS_SETS: Record<string, ChartSet> = {
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
