import { Component } from '@angular/core';
import { DashWelcome } from '../widgets/welcome';
import { UpcomingEvents } from '../widgets/upcoming-events';
import { ConversionBars } from '../widgets/conversion-bars';

interface Spark {
  value: string;
  sub: string;
  path: string;
  dot?: string;
}

interface Order {
  product: string;
  address: string;
  price: string;
  status: string;
  badge: string;
  color: string;
  initial: string;
}

interface Invoice {
  number: string;
  client: string;
  amount: string;
  status: string;
  badge: string;
}

@Component({
  selector: 'app-dash-orders',
  standalone: true,
  imports: [DashWelcome, UpcomingEvents, ConversionBars],
  templateUrl: './orders.html',
  styleUrl: './orders.scss',
})
export class DashOrders {
  sparks: Spark[] = [
    { value: '$1,870', sub: 'Income per lead', path: 'M2 26 C 12 24, 16 12, 26 14 S 40 24, 50 20 S 62 6, 74 10 S 88 22, 100 18 S 114 8, 126 12' },
    { value: '2,890', sub: 'New leads', path: 'M2 16 C 14 14, 20 24, 32 22 S 46 8, 58 12 S 72 26, 84 22 S 98 6, 110 10 S 120 18, 126 14' },
    { value: '15.10%', sub: 'Conversion rate', path: 'M2 22 C 12 20, 18 10, 30 12 S 44 24, 56 20 S 70 8, 82 12 S 96 24, 108 20 S 120 10, 126 14', dot: '82,12' },
  ];

  orders: Order[] = [
    { product: 'Macbook Pro 2013, 16 GB, 256 GB SSD', address: '4574 Balahian Creek Suite 631', price: '$118.00', status: 'Shipped', badge: 'badge-green', color: 'linear-gradient(135deg,#5e81f4,#9698d6)', initial: 'M' },
    { product: 'Dell XPS, 16 GB, 512 GB SSD, 1050 TI', address: '8874 Candelario Valleys', price: '$208.00', status: 'Processing', badge: 'badge-yellow', color: 'linear-gradient(135deg,#1c1d21,#8181a5)', initial: 'D' },
    { product: 'Macbook Air 2013, 4GB, 128 GB SSD', address: '6124 Flossie Station', price: '$118.00', status: 'Processing', badge: 'badge-yellow', color: 'linear-gradient(135deg,#9698d6,#5e81f4)', initial: 'A' },
    { product: 'Macbook, 4GB, 128 GB SSD', address: '1910 Erdman Station Apt. 696', price: '$578.00', status: 'Shipped', badge: 'badge-green', color: 'linear-gradient(135deg,#7ce7ac,#34b26b)', initial: 'M' },
    { product: 'LG Laptop, 8 GB, 256 GB SSD', address: '586 Macdonald Landing Suite 706', price: '$37.00', status: 'Cancelled', badge: 'badge-red', color: 'linear-gradient(135deg,#ff808b,#f4be5e)', initial: 'L' },
    { product: 'Macbook Pro 2016, 16 GB, 512 GB SSD', address: '201 Bosco Coves', price: '$220.00', status: 'Shipped', badge: 'badge-green', color: 'linear-gradient(135deg,#5e81f4,#34b26b)', initial: 'M' },
    { product: 'Macbook Pro 2018, 32 GB, 1 TB SSD', address: '9823 Crist Brooks Suite 116', price: '$698.00', status: 'Processing', badge: 'badge-yellow', color: 'linear-gradient(135deg,#8181a5,#1c1d21)', initial: 'M' },
  ];

  invoices: Invoice[] = [
    { number: 'Invoice #AA-04-19-1890678', client: 'New Madleton LLC.', amount: '$118.00', status: 'Paid', badge: 'badge-green' },
    { number: 'Invoice #AA-04-19-1897890', client: 'Crystallion INC.', amount: '$118.00', status: 'Pending', badge: 'badge-yellow' },
    { number: 'Invoice #AA-04-19-1890243', client: 'Tyriquemouth LLC.', amount: '$595.00', status: 'Paid', badge: 'badge-green' },
    { number: 'Invoice #AA-04-19-1893481', client: 'Lothianmouth LLC.', amount: '$274.00', status: 'Paid', badge: 'badge-green' },
    { number: 'Invoice #AA-04-19-1828208', client: 'KirovskBig INC', amount: '$220.00', status: 'Paid', badge: 'badge-green' },
    { number: 'Invoice #AA-04-19-1890123', client: 'Paxtonschester LLC.', amount: '$698.00', status: 'Processing', badge: 'badge-yellow' },
    { number: 'Invoice #AA-04-19-1890243', client: 'Tyriquemouth LLC.', amount: '$595.00', status: 'Paid', badge: 'badge-green' },
  ];

  tabs = ['Day', 'Week', 'Month'];

  orderTab = 'Day';
  orderTotals: Record<string, string> = { Day: '480', Week: '1,240', Month: '2,480' };

  invTab = 'Day';
  invTotals: Record<string, string> = { Day: '320', Week: '860', Month: '1,520' };

  visibleOrders() {
    if (this.orderTab === 'Day') return this.orders.slice(0, 3);
    if (this.orderTab === 'Week') return this.orders.slice(0, 5);
    return this.orders;
  }

  visibleInvoices() {
    if (this.invTab === 'Day') return this.invoices.slice(0, 3);
    if (this.invTab === 'Week') return this.invoices.slice(0, 5);
    return this.invoices;
  }
}
