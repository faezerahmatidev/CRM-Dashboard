import { TestBed } from '@angular/core/testing';
import { FilesStore } from './files-store';

describe('FilesStore', () => {
  let store: FilesStore;

  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({});
    store = TestBed.inject(FilesStore);
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('should seed the demo files when storage is empty', () => {
    expect(store.files().length).toBe(8);
    expect(store.selected().id).toBe('f1');
  });

  it('should sort files A-Z and Z-A', () => {
    const asc = store.visible().map((f) => f.name);
    expect(asc).toEqual([...asc].sort((a, b) => a.localeCompare(b)));
    store.toggleSort();
    const desc = store.visible().map((f) => f.name);
    expect(desc).toEqual([...desc].sort((a, b) => b.localeCompare(a)));
  });

  it('should select files by id', () => {
    store.select('f6');
    expect(store.selectedId()).toBe('f6');
    expect(store.selected().name).toBe('Logo and branding.ai');
  });

  it('should remove files by id', () => {
    store.remove('f1');
    expect(store.files().some((f) => f.id === 'f1')).toBeFalse();
  });

  it('should manage the upload dialog', () => {
    expect(store.modalOpen()).toBeFalse();
    store.openUpload();
    expect(store.modalOpen()).toBeTrue();
    store.setModalOpen(false);
    expect(store.modalOpen()).toBeFalse();
  });
});
