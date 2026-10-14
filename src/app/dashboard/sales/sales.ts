import { Component } from '@angular/core';
import { DashWelcome } from '../widgets/welcome';
import { LatestUpdates } from '../widgets/latest-updates';
import { UpcomingEvents } from '../widgets/upcoming-events';

interface DashEvent {
  icon: 'invoice' | 'client' | 'meeting';
  title: string;
  sub: string;
  value: string;
}

@Component({
  selector: 'app-dash-sales',
  standalone: true,
  imports: [DashWelcome, LatestUpdates, UpcomingEvents],
  templateUrl: './sales.html',
  styleUrl: './sales.scss',
})
export class DashSales {
  events: DashEvent[] = [
    { icon: 'invoice', title: 'Invoice #AA-04-19-1890678', sub: 'New Madleton LLC.', value: '$118.00' },
    { icon: 'client', title: 'Client Bernard Stanley', sub: 'bernard.stanley@gmail.com', value: '$208.00' },
    { icon: 'meeting', title: 'Meeting with the client', sub: '24 Vandervort Springs.', value: '29 Oct 2019' },
    { icon: 'invoice', title: 'Invoice #AA-04-19-1890243', sub: 'Tyrique mouth LLC.', value: '$578.00' },
  ];
}
