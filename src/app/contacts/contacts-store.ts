import { Injectable, effect, signal } from '@angular/core';
import { CONTACTS, Contact, ContactGroup, blankContact } from './contacts-data';

function clone(contacts: Contact[]): Contact[] {
  return contacts.map((c) => ({ ...c, member: { ...c.member } }));
}

/** Contacts state shared by the list/grid views and the contact dialog. */
@Injectable({ providedIn: 'root' })
export class ContactsStore {
  private static readonly STORAGE_KEY = 'crm-dashboard-contacts-v1';

  private readonly _contacts = signal<Contact[]>(ContactsStore.load());
  readonly contacts = this._contacts.asReadonly();

  private readonly _sortAsc = signal(true);
  readonly sortAsc = this._sortAsc.asReadonly();

  private readonly _page = signal(2);
  readonly page = this._page.asReadonly();

  private readonly _modalOpen = signal(false);
  readonly modalOpen = this._modalOpen.asReadonly();

  /** Set = details mode, null = add-new mode. */
  private readonly _selected = signal<Contact | null>(null);
  readonly selected = this._selected.asReadonly();

  constructor() {
    effect(() => {
      try {
        localStorage.setItem(ContactsStore.STORAGE_KEY, JSON.stringify(this._contacts()));
      } catch {
        // Storage unavailable (private mode) — keep in-memory state.
      }
    });
  }

  private static load(): Contact[] {
    try {
      const raw = localStorage.getItem(ContactsStore.STORAGE_KEY);
      if (!raw) return clone(CONTACTS);
      const parsed = JSON.parse(raw) as Contact[];
      return Array.isArray(parsed) && parsed.length ? parsed : clone(CONTACTS);
    } catch {
      return clone(CONTACTS);
    }
  }

  inGroup(group: ContactGroup): Contact[] {
    const asc = this._sortAsc();
    return this._contacts()
      .filter((c) => c.group === group)
      .sort((a, b) =>
        asc
          ? `${a.first} ${a.last}`.localeCompare(`${b.first} ${b.last}`)
          : `${b.first} ${b.last}`.localeCompare(`${a.first} ${a.last}`),
      );
  }

  toggleSort(): void {
    this._sortAsc.update((v) => !v);
  }

  setPage(p: number): void {
    this._page.set(p);
  }

  add(first: string, last: string): void {
    if (!first.trim() && !last.trim()) return;
    this._contacts.update((list) => [blankContact(first, last), ...list]);
  }

  update(id: string, patch: Partial<Contact>): void {
    this._contacts.update((list) => list.map((c) => (c.id === id ? { ...c, ...patch } : c)));
  }

  remove(id: string): void {
    this._contacts.update((list) => list.filter((c) => c.id !== id));
  }

  openNew(): void {
    this._selected.set(null);
    this._modalOpen.set(true);
  }

  openDetails(contact: Contact): void {
    this._selected.set(contact);
    this._modalOpen.set(true);
  }

  setModalOpen(open: boolean): void {
    this._modalOpen.set(open);
    if (!open) this._selected.set(null);
  }
}
