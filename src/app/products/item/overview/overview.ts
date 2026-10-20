import { Component, inject } from '@angular/core';
import { DashPage } from '../../../shared/dash-page/dash-page';
import { CardTabs } from '../../../shared/card-tabs/card-tabs';
import { Pagination } from '../../../shared/pagination/pagination';
import { DataTable, PillTone, TableCell, TableColumn } from '../../../shared/data-table/data-table';
import { IncomeChart } from '../../../shared/income-chart/income-chart';
import { ProductPanel } from '../../product-panel';
import { IncomeDonut } from '../../income-donut';
import { SALE_ROWS, SaleStatus } from '../../products-data';
import { ProductsStore } from '../../products-store';

const STATUS_TONES: Record<SaleStatus, PillTone> = {
  Paid: 'blue',
  Pending: 'yellow',
  Cancelled: 'red',
};

@Component({
  selector: 'app-item-overview',
  standalone: true,
  imports: [DashPage, ProductPanel, CardTabs, Pagination, DataTable, IncomeChart, IncomeDonut],
  templateUrl: './overview.html',
  styleUrl: './overview.scss',
})
export class ItemOverview {
  protected store = inject(ProductsStore);

  period = 'Day';
  breakdownPeriod = 'Day';
  page = 2;

  grid = 'minmax(0,1.6fr) minmax(0,0.7fr) minmax(0,0.8fr) auto';
  columns: TableColumn[] = [
    { key: 'email', label: 'Email', sortable: true, kind: 'text' },
    { key: 'price', label: 'Price', sortable: true, kind: 'price' },
    { key: 'status', label: 'Tag', kind: 'pill' },
  ];

  rows(): Array<{ id: string; cells: Record<string, TableCell> }> {
    return SALE_ROWS.map((s, i) => ({
      id: `sale-${i}`,
      cells: {
        email: { text: s.email },
        price: { text: s.price },
        status: { text: s.status, tone: STATUS_TONES[s.status] },
      },
    }));
  }
}
