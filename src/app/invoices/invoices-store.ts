import { Injectable, computed, effect, signal } from '@angular/core';
import { hasStringKey, loadList, saveList } from '../shared/storage/storage';
import { INVOICES, Invoice, InvoiceFilter } from './invoices-data';

export type InvoiceSortKey = 'number' | 'date' | 'customer' | 'amount';

function clone(list: Invoice[]): Invoice[] {
  return list.map((i) => ({ ...i, member: { ...i.member } }));
}

function seedInvoices(): Invoice[] {
  return clone(INVOICES);
}

function keyOf(i: Invoice, key: InvoiceSortKey): string {
  return key === 'number' ? i.number : key === 'date' ? i.date : key === 'customer' ? i.customer : i.amount;
}

/** Invoices state shared by the list views and the details dialog. */
@Injectable({ providedIn: 'root' })
export class InvoicesStore {
  private static readonly STORAGE_KEY = 'crm-dashboard-invoices-v1';

  private readonly _invoices = signal<Invoice[]>(InvoicesStore.load());
  readonly invoices = this._invoices.asReadonly();

  private readonly _filter = signal<InvoiceFilter>('All');
  readonly filter = this._filter.asReadonly();

  private readonly _sortAsc = signal(true);
  readonly sortAsc = this._sortAsc.asReadonly();

  private readonly _sortKey = signal<InvoiceSortKey>('number');
  readonly sortKey = this._sortKey.asReadonly();

  private readonly _page = signal(2);
  readonly page = this._page.asReadonly();

  /** Null = closed, set = details dialog for that invoice. */
  private readonly _selected = signal<Invoice | null>(null);
  readonly selected = this._selected.asReadonly();

  constructor() {
    effect(() => saveList(InvoicesStore.STORAGE_KEY, this._invoices()));
  }

  private static load(): Invoice[] {
    return loadList(InvoicesStore.STORAGE_KEY, seedInvoices, hasStringKey('id'));
  }

  readonly visible = computed((): Invoice[] => {
    const filter = this._filter();
    const asc = this._sortAsc();
    const key = this._sortKey();
    return this._invoices()
      .filter((i) => filter === 'All' || (filter === 'Draft' ? false : i.status === filter))
      .sort((a, b) =>
        asc
          ? keyOf(a, key).localeCompare(keyOf(b, key))
          : keyOf(b, key).localeCompare(keyOf(a, key)),
      );
  });

  setFilter(f: InvoiceFilter): void {
    this._filter.set(f);
  }

  toggleSortKey(key: InvoiceSortKey): void {
    if (this._sortKey() === key) {
      this._sortAsc.update((v) => !v);
    } else {
      this._sortKey.set(key);
      this._sortAsc.set(true);
    }
  }

  setPage(p: number): void {
    this._page.set(p);
  }

  remove(id: string): void {
    this._invoices.update((list) => list.filter((i) => i.id !== id));
  }

  openDetails(invoice: Invoice): void {
    this._selected.set(invoice);
  }

  closeDetails(): void {
    this._selected.set(null);
  }
}
