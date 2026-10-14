import { Component } from '@angular/core';
import { DashWelcome } from '../widgets/welcome';
import { LatestUpdates } from '../widgets/latest-updates';
import { UpcomingEvents } from '../widgets/upcoming-events';

interface Kpi {
  label: string;
  value: string;
  sub: string;
  bar: string;
  width: string;
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
  imports: [DashWelcome, LatestUpdates, UpcomingEvents],
  templateUrl: './overview.html',
  styleUrl: './overview.scss',
})
export class DashOverview {
  kpis: Kpi[] = [
    { label: 'Sales', value: '1.345', sub: 'Week comparison', bar: '#7ce7ac', width: '72%' },
    { label: 'Leads', value: '3.820', sub: 'Month comparison', bar: '#5e81f4', width: '58%' },
    { label: 'Income', value: '$690.00', sub: 'Week comparison', bar: '#ff808b', width: '44%' },
  ];

  sales: Sale[] = [
    { product: 'Macbook Pro', pid: 'ID 10-2299-08', customer: 'Rodney Cannon', email: 'rodney.cannon@gmail.com', country: 'United Kingdom', address: '193 Cole Plains Suite 649, 89120E', shipping: '$18.00', total: '$118.00', status: 'Shipped', badge: 'badge-green', color: 'linear-gradient(135deg,#5e81f4,#9698d6)', initial: 'M' },
    { product: 'Dell Laptop', pid: 'ID 10-3456-18', customer: 'Mike Franklin', email: 'mike.franklin@gmail.com', country: 'United States', address: '619 Jeffrey Freeway Apt. 273', shipping: '$28.00', total: '$208.00', status: 'Processing', badge: 'badge-yellow', color: 'linear-gradient(135deg,#1c1d21,#8181a5)', initial: 'D' },
    { product: 'Macbook Air', pid: 'ID 10-3776-23', customer: 'Louis Franklin', email: 'louis.franklin@gmail.com', country: 'Germany', address: '200 Davis Estates Suite 421', shipping: '$18.00', total: '$118.00', status: 'Processing', badge: 'badge-yellow', color: 'linear-gradient(135deg,#9698d6,#5e81f4)', initial: 'A' },
  ];
}
