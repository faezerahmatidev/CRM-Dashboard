import { Injectable, effect, signal } from '@angular/core';
import { KanbanCard, KanbanColumn, SEED_CARDS, blankCard } from './kanban-data';

function clone(cards: KanbanCard[]): KanbanCard[] {
  return cards.map((c) => ({
    ...c,
    members: c.members.map((m) => ({ ...m })),
    checklist: c.checklist.map((x) => ({ ...x })),
  }));
}

/** Kanban desk state shared by the board view and the card description dialog. */
@Injectable({ providedIn: 'root' })
export class KanbanStore {
  private static readonly STORAGE_KEY = 'crm-dashboard-kanban-v1';

  private readonly _cards = signal<KanbanCard[]>(KanbanStore.load());
  readonly cards = this._cards.asReadonly();

  private readonly _modalOpen = signal(false);
  readonly modalOpen = this._modalOpen.asReadonly();

  /** Set = description mode, null with pendingColumn set = add-new mode. */
  private readonly _selected = signal<KanbanCard | null>(null);
  readonly selected = this._selected.asReadonly();

  private readonly _pendingColumn = signal<KanbanColumn>('todo');
  readonly pendingColumn = this._pendingColumn.asReadonly();

  constructor() {
    effect(() => {
      try {
        localStorage.setItem(KanbanStore.STORAGE_KEY, JSON.stringify(this._cards()));
      } catch {
        // Storage unavailable (private mode) — keep in-memory state.
      }
    });
  }

  private static load(): KanbanCard[] {
    try {
      const raw = localStorage.getItem(KanbanStore.STORAGE_KEY);
      if (!raw) return clone(SEED_CARDS);
      const parsed = JSON.parse(raw) as KanbanCard[];
      return Array.isArray(parsed) && parsed.length ? parsed : clone(SEED_CARDS);
    } catch {
      return clone(SEED_CARDS);
    }
  }

  inColumn(column: KanbanColumn): KanbanCard[] {
    return this._cards().filter((c) => c.column === column);
  }

  move(id: string, column: KanbanColumn): void {
    this._cards.update((list) => list.map((c) => (c.id === id ? { ...c, column } : c)));
  }

  addTo(column: KanbanColumn, title: string): void {
    const name = title.trim();
    if (!name) return;
    this._cards.update((list) => [...list, blankCard(column, name)]);
  }

  update(id: string, patch: Partial<KanbanCard>): void {
    this._cards.update((list) => list.map((c) => (c.id === id ? { ...c, ...patch } : c)));
  }

  openNew(column: KanbanColumn = 'todo'): void {
    this._selected.set(null);
    this._pendingColumn.set(column);
    this._modalOpen.set(true);
  }

  openDetails(card: KanbanCard): void {
    this._selected.set(card);
    this._modalOpen.set(true);
  }

  setModalOpen(open: boolean): void {
    this._modalOpen.set(open);
    if (!open) this._selected.set(null);
  }
}
