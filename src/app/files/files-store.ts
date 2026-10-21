import { Injectable, computed, effect, signal } from '@angular/core';
import { hasStringKey, loadList, saveList } from '../shared/storage/storage';
import { FILES, SharedFile } from './files-data';

function clone(list: SharedFile[]): SharedFile[] {
  return list.map((f) => ({ ...f, badge: { ...f.badge }, shared: f.shared.map((m) => ({ ...m })) }));
}

function seedFiles(): SharedFile[] {
  return clone(FILES);
}

/** Files state shared by the grid/list views and the upload dialog. */
@Injectable({ providedIn: 'root' })
export class FilesStore {
  private static readonly STORAGE_KEY = 'crm-dashboard-files-v1';

  private readonly _files = signal<SharedFile[]>(FilesStore.load());
  readonly files = this._files.asReadonly();

  private readonly _sortAsc = signal(true);
  readonly sortAsc = this._sortAsc.asReadonly();

  private readonly _page = signal(2);
  readonly page = this._page.asReadonly();

  private readonly _modalOpen = signal(false);
  readonly modalOpen = this._modalOpen.asReadonly();

  private readonly _selectedId = signal('f1');
  readonly selectedId = this._selectedId.asReadonly();

  constructor() {
    effect(() => saveList(FilesStore.STORAGE_KEY, this._files()));
  }

  private static load(): SharedFile[] {
    return loadList(FilesStore.STORAGE_KEY, seedFiles, hasStringKey('id'));
  }

  readonly visible = computed((): SharedFile[] => {
    const asc = this._sortAsc();
    return [...this._files()].sort((a, b) =>
      asc ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name),
    );
  });

  selected(): SharedFile | undefined {
    const list = this._files();
    return list.find((f) => f.id === this._selectedId()) ?? (list.length ? list[0] : undefined);
  }

  select(id: string): void {
    this._selectedId.set(id);
  }

  toggleSort(): void {
    this._sortAsc.update((v) => !v);
  }

  setPage(p: number): void {
    this._page.set(p);
  }

  remove(id: string): void {
    const next = this._files().filter((f) => f.id !== id);
    this._files.set(next);
    if (id === this._selectedId() && next.length) this._selectedId.set(next[0].id);
  }

  openUpload(): void {
    this._modalOpen.set(true);
  }

  setModalOpen(open: boolean): void {
    this._modalOpen.set(open);
  }
}
