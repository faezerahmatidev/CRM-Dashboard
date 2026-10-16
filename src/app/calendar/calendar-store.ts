import { Injectable, effect, signal } from '@angular/core';
import { CalEvent, CalView, DEMO_TODAY, SEED_EVENTS, blankEvent, toISO } from './calendar-data';

export interface Cursor {
  y: number;
  m: number;
  d: number;
}

function clone(events: CalEvent[]): CalEvent[] {
  return events.map((e) => ({ ...e }));
}

/** Calendar state shared by the month/week/day views and the event dialog. */
@Injectable({ providedIn: 'root' })
export class CalendarStore {
  private static readonly STORAGE_KEY = 'crm-dashboard-calendar-v1';

  private readonly _events = signal<CalEvent[]>(CalendarStore.load());
  readonly events = this._events.asReadonly();

  private readonly _view = signal<CalView>('month');
  readonly view = this._view.asReadonly();

  private readonly _cursor = signal<Cursor>({ ...DEMO_TODAY });
  readonly cursor = this._cursor.asReadonly();

  /** Selected day for the striped "Type to add" placeholder (defaults to Tue 4, like Figma). */
  private readonly _selectedDay = signal('2018-09-04');
  readonly selectedDay = this._selectedDay.asReadonly();

  private readonly _modalOpen = signal(false);
  readonly modalOpen = this._modalOpen.asReadonly();

  /** Set = edit mode, null = add-new mode for `draftDate`. */
  private readonly _editing = signal<CalEvent | null>(null);
  readonly editing = this._editing.asReadonly();

  private readonly _draftDate = signal('2018-09-04');
  readonly draftDate = this._draftDate.asReadonly();

  constructor() {
    effect(() => {
      try {
        localStorage.setItem(CalendarStore.STORAGE_KEY, JSON.stringify(this._events()));
      } catch {
        // Storage unavailable (private mode) — keep in-memory state.
      }
    });
  }

  private static load(): CalEvent[] {
    try {
      const raw = localStorage.getItem(CalendarStore.STORAGE_KEY);
      if (!raw) return clone(SEED_EVENTS);
      const parsed = JSON.parse(raw) as CalEvent[];
      return Array.isArray(parsed) && parsed.length ? parsed : clone(SEED_EVENTS);
    } catch {
      return clone(SEED_EVENTS);
    }
  }

  setView(v: CalView): void {
    this._view.set(v);
  }

  selectDay(iso: string): void {
    this._selectedDay.set(iso);
  }

  prev(): void {
    this._cursor.update((c) => CalendarStore.shift(c, this._view(), -1));
  }

  next(): void {
    this._cursor.update((c) => CalendarStore.shift(c, this._view(), 1));
  }

  today(): void {
    this._cursor.set({ ...DEMO_TODAY });
  }

  eventsOn(iso: string): CalEvent[] {
    return this._events()
      .filter((e) => e.date === iso)
      .sort((a, b) => a.startHour - b.startHour);
  }

  add(date: string, title: string): void {
    const name = title.trim();
    if (!name) return;
    this._events.update((list) => [...list, blankEvent(date, name)]);
  }

  update(id: string, patch: Partial<CalEvent>): void {
    this._events.update((list) => list.map((e) => (e.id === id ? { ...e, ...patch } : e)));
  }

  toggleDone(id: string): void {
    this._events.update((list) => list.map((e) => (e.id === id ? { ...e, done: !e.done } : e)));
  }

  openNew(date: string): void {
    this._editing.set(null);
    this._draftDate.set(date);
    this._modalOpen.set(true);
  }

  openDetails(event: CalEvent): void {
    this._editing.set(event);
    this._modalOpen.set(true);
  }

  setModalOpen(open: boolean): void {
    this._modalOpen.set(open);
    if (!open) this._editing.set(null);
  }

  cursorISO(): string {
    const c = this._cursor();
    return toISO(c.y, c.m, c.d);
  }

  private static shift(c: Cursor, view: CalView, dir: 1 | -1): Cursor {
    const dt = new Date(c.y, c.m, c.d);
    if (view === 'month') dt.setMonth(dt.getMonth() + dir);
    else if (view === 'week') dt.setDate(dt.getDate() + 7 * dir);
    else dt.setDate(dt.getDate() + dir);
    return { y: dt.getFullYear(), m: dt.getMonth(), d: dt.getDate() };
  }
}
