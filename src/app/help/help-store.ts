import { Injectable, computed, effect, signal } from '@angular/core';
import { hasStringKey, loadList, saveList } from '../shared/storage/storage';
import { FAQS, TICKETS, Ticket } from './help-data';

function clone(list: Ticket[]): Ticket[] {
  return list.map((t) => ({ ...t }));
}

function seedTickets(): Ticket[] {
  return clone(TICKETS);
}

/** Help center state: FAQ search, tickets and the new-ticket dialog. */
@Injectable({ providedIn: 'root' })
export class HelpStore {
  private static readonly STORAGE_KEY = 'crm-dashboard-help-v1';

  private readonly _tickets = signal<Ticket[]>(HelpStore.load());
  readonly tickets = this._tickets.asReadonly();

  private readonly _query = signal('');
  readonly query = this._query.asReadonly();

  private readonly _category = signal('Personal');
  readonly category = this._category.asReadonly();

  private readonly _expandedId = signal<string | null>('f3');
  readonly expandedId = this._expandedId.asReadonly();

  private readonly _sortAsc = signal(true);
  readonly sortAsc = this._sortAsc.asReadonly();

  private readonly _page = signal(2);
  readonly page = this._page.asReadonly();

  private readonly _modalOpen = signal(false);
  readonly modalOpen = this._modalOpen.asReadonly();

  constructor() {
    effect(() => saveList(HelpStore.STORAGE_KEY, this._tickets()));
  }

  private static load(): Ticket[] {
    return loadList(HelpStore.STORAGE_KEY, seedTickets, hasStringKey('id'));
  }

  readonly results = computed((): typeof FAQS => {
    const q = this._query().trim().toLowerCase();
    if (!q) return FAQS;
    return FAQS.filter(
      (f) => f.question.toLowerCase().includes(q) || f.answer.toLowerCase().includes(q),
    );
  });

  readonly visibleTickets = computed((): Ticket[] => {
    const asc = this._sortAsc();
    return [...this._tickets()].sort((a, b) =>
      asc ? a.number.localeCompare(b.number) : b.number.localeCompare(a.number),
    );
  });

  setQuery(q: string): void {
    this._query.set(q);
  }

  setCategory(c: string): void {
    this._category.set(c);
  }

  toggleExpanded(id: string): void {
    this._expandedId.update((cur) => (cur === id ? null : id));
  }

  toggleSort(): void {
    this._sortAsc.update((v) => !v);
  }

  toggleCheck(id: string, checked: boolean): void {
    this._tickets.update((list) => list.map((t) => (t.id === id ? { ...t, checked } : t)));
  }

  setPage(p: number): void {
    this._page.set(p);
  }

  remove(id: string): void {
    this._tickets.update((list) => list.filter((t) => t.id !== id));
  }

  openNew(): void {
    this._modalOpen.set(true);
  }

  setModalOpen(open: boolean): void {
    this._modalOpen.set(open);
  }
}
