import { Injectable, effect, signal } from '@angular/core';
import { hasStringKey, loadList, saveList } from '../shared/storage/storage';
import { KanbanCard, KanbanColumn, SEED_CARDS, blankCard } from './kanban-data';

function clone(cards: KanbanCard[]): KanbanCard[] {
  return cards.map((c) => ({
    ...c,
    members: c.members.map((m) => ({ ...m })),
    checklist: c.checklist.map((x) => ({ ...x })),
  }));
}

function seedCards(): KanbanCard[] {
  return clone(SEED_CARDS);
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
    effect(() => saveList(KanbanStore.STORAGE_KEY, this._cards()));
  }

  private static load(): KanbanCard[] {
    return loadList(KanbanStore.STORAGE_KEY, seedCards, hasStringKey('id'));
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
