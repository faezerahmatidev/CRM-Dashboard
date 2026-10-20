import { Component, inject } from '@angular/core';
import { DashPage } from '../../shared/dash-page/dash-page';
import { ViewToolbar } from '../../shared/view-toolbar/view-toolbar';
import { ViewCard } from '../../shared/view-card/view-card';
import { FilterTabs } from '../../shared/filter-tabs/filter-tabs';
import { Pagination } from '../../shared/pagination/pagination';
import { ContactAvatar } from '../../shared/contact-avatar/contact-avatar';
import { DataTable, PillTone, TableCell, TableColumn } from '../../shared/data-table/data-table';
import { CellDef } from '../../shared/data-table/cell-def';
import { InvoicesSidebar } from '../invoices-sidebar';
import { Invoice, InvoiceFilter, InvoiceStatus } from '../invoices-data';
import { InvoiceSortKey, InvoicesStore } from '../invoices-store';

const SORT_MAP: Record<string, InvoiceSortKey> = {
  doc: 'number',
  date: 'date',
  customer: 'customer',
  amount: 'amount',
};

const STATUS_TONES: Record<InvoiceStatus, PillTone> = {
  Paid: 'blue',
  Scheduled: 'yellow',
  Unpaid: 'red',
};

@Component({
  selector: 'app-invoices-list-01',
  standalone: true,
  imports: [DashPage, InvoicesSidebar, ViewToolbar, ViewCard, FilterTabs, Pagination, ContactAvatar, DataTable, CellDef],
  templateUrl: './list-01.html',
  styleUrl: './list-01.scss',
})
export class InvoicesList01 {
  protected store = inject(InvoicesStore);

  filterOptions = [
    { value: 'All', label: 'All' },
    { value: 'Draft', label: 'Draft' },
    { value: 'Scheduled', label: 'Scheduled' },
    { value: 'Paid', label: 'Paid' },
  ];
  grid = 'minmax(0,1.2fr) minmax(0,0.9fr) minmax(0,1.3fr) minmax(0,0.8fr) minmax(0,0.8fr) auto';
  columns: TableColumn[] = [
    { key: 'doc', label: 'Number', sortable: true, kind: 'product' },
    { key: 'date', label: 'Date', sortable: true, kind: 'text' },
    { key: 'customer', label: 'Customer', sortable: true, kind: 'custom' },
    { key: 'status', label: 'Status', sortable: true, kind: 'pill' },
    { key: 'amount', label: 'Amount', sortable: true, kind: 'price' },
  ];

  rows(): Array<{ id: string; cells: Record<string, TableCell> }> {
    return this.store.visible().map((i: Invoice) => ({
      id: i.id,
      cells: {
        doc: { text: i.number, icon: 'doc', palette: '#eef2fe', color: '#5e81f4' },
        date: { text: i.date },
        customer: { text: i.customer },
        status: { text: i.status, tone: STATUS_TONES[i.status] },
        amount: { text: i.amount },
      },
    }));
  }

  invoiceOf(id: string): Invoice | undefined {
    return this.store.invoices().find((i) => i.id === id);
  }

  openById(id: string): void {
    const i = this.invoiceOf(id);
    if (i) this.store.openDetails(i);
  }

  sortBy(col: string): void {
    const key = SORT_MAP[col];
    if (key) this.store.toggleSortKey(key);
  }

  setFilter(f: string): void {
    this.store.setFilter(f as InvoiceFilter);
  }
}
