import { Injectable, effect, signal } from '@angular/core';
import { CONVERSATIONS, Conversation } from './messages-data';

function clone(list: Conversation[]): Conversation[] {
  return list.map((c) => ({ ...c, member: { ...c.member } }));
}

/** Messages state shared by the list/conversation/media/about views and the compose dialog. */
@Injectable({ providedIn: 'root' })
export class MessagesStore {
  private static readonly STORAGE_KEY = 'crm-dashboard-messages-v1';

  private readonly _threads = signal<Conversation[]>(MessagesStore.load());
  readonly threads = this._threads.asReadonly();

  private readonly _sortAsc = signal(true);
  readonly sortAsc = this._sortAsc.asReadonly();

  private readonly _selectedId = signal('m2');
  readonly selectedId = this._selectedId.asReadonly();

  private readonly _modalOpen = signal(false);
  readonly modalOpen = this._modalOpen.asReadonly();

  private readonly _draft = signal('');
  readonly draft = this._draft.asReadonly();

  constructor() {
    effect(() => {
      try {
        localStorage.setItem(MessagesStore.STORAGE_KEY, JSON.stringify(this._threads()));
      } catch {
        // Storage unavailable (private mode) — keep in-memory state.
      }
    });
  }

  private static load(): Conversation[] {
    try {
      const raw = localStorage.getItem(MessagesStore.STORAGE_KEY);
      if (!raw) return clone(CONVERSATIONS);
      const parsed = JSON.parse(raw) as Conversation[];
      return Array.isArray(parsed) && parsed.length ? parsed : clone(CONVERSATIONS);
    } catch {
      return clone(CONVERSATIONS);
    }
  }

  visible(): Conversation[] {
    const asc = this._sortAsc();
    return [...this._threads()].sort((a, b) =>
      asc ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name),
    );
  }

  selected(): Conversation | undefined {
    const list = this._threads();
    return list.find((c) => c.id === this._selectedId()) ?? (list.length ? list[0] : undefined);
  }

  select(id: string): void {
    this._selectedId.set(id);
  }

  toggleSort(): void {
    this._sortAsc.update((v) => !v);
  }

  toggleStar(id: string): void {
    this._threads.update((list) =>
      list.map((c) => (c.id === id ? { ...c, starred: !c.starred } : c)),
    );
  }

  remove(id: string): void {
    const next = this._threads().filter((c) => c.id !== id);
    this._threads.set(next);
    if (id === this._selectedId() && next.length) this._selectedId.set(next[0].id);
  }

  setDraft(text: string): void {
    this._draft.set(text);
  }

  sendDraft(): void {
    const text = this._draft().trim();
    if (!text) return;
    this._draft.set('');
  }

  openNew(): void {
    this._modalOpen.set(true);
  }

  setModalOpen(open: boolean): void {
    this._modalOpen.set(open);
  }
}
