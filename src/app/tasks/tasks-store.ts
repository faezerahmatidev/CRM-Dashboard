import { Injectable, effect, signal } from '@angular/core';
import { hasStringKey, loadList, saveList } from '../shared/storage/storage';
import { SEED_TASKS, TaskItem, blankTask } from './tasks-data';

export type TaskFilter = 'ALL' | 'DONE' | 'PENDING';

function seedTasks(): TaskItem[] {
  return SEED_TASKS.map((x) => ({ ...x, checklist: x.checklist.map((c) => ({ ...c })) }));
}

/** Tasks list state shared by the list view and the description / add-new dialog. */
@Injectable({ providedIn: 'root' })
export class TasksStore {
  private static readonly STORAGE_KEY = 'crm-dashboard-tasks-v1';

  private readonly _tasks = signal<TaskItem[]>(TasksStore.load());
  readonly tasks = this._tasks.asReadonly();

  private readonly _filter = signal<TaskFilter>('ALL');
  readonly filter = this._filter.asReadonly();

  private readonly _sortAsc = signal(true);
  readonly sortAsc = this._sortAsc.asReadonly();

  private readonly _modalOpen = signal(false);
  readonly modalOpen = this._modalOpen.asReadonly();

  /** Null = add-new mode, set = description/edit mode. */
  private readonly _editing = signal<TaskItem | null>(null);
  readonly editing = this._editing.asReadonly();

  constructor() {
    effect(() => saveList(TasksStore.STORAGE_KEY, this._tasks()));
  }

  private static load(): TaskItem[] {
    return loadList(TasksStore.STORAGE_KEY, seedTasks, hasStringKey('id'));
  }

  setFilter(f: TaskFilter): void {
    this._filter.set(f);
  }

  toggleSort(): void {
    this._sortAsc.update((v) => !v);
  }

  toggleDone(id: string): void {
    this._tasks.update((list) =>
      list.map((x) =>
        x.id === id
          ? { ...x, done: !x.done, status: !x.done ? 'Done' : x.status === 'Done' ? 'Pending' : x.status }
          : x,
      ),
    );
  }

  add(title: string): void {
    const name = title.trim();
    if (!name) return;
    this._tasks.update((list) => [blankTask(name), ...list]);
  }

  update(id: string, patch: Partial<TaskItem>): void {
    this._tasks.update((list) => list.map((x) => (x.id === id ? { ...x, ...patch } : x)));
  }

  openNew(): void {
    this._editing.set(null);
    this._modalOpen.set(true);
  }

  openDetails(task: TaskItem): void {
    this._editing.set(task);
    this._modalOpen.set(true);
  }

  setModalOpen(open: boolean): void {
    this._modalOpen.set(open);
    if (!open) this._editing.set(null);
  }

  visible(): TaskItem[] {
    const f = this._filter();
    const asc = this._sortAsc();
    const filtered =
      f === 'ALL' ? [...this._tasks()] : this._tasks().filter((x) => (f === 'DONE' ? x.done : !x.done));
    return filtered.sort((a, b) => (asc ? a.title.localeCompare(b.title) : b.title.localeCompare(a.title)));
  }
}
