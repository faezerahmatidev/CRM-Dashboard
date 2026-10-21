import { TestBed } from '@angular/core/testing';
import { MessagesStore } from './messages-store';

describe('MessagesStore', () => {
  let store: MessagesStore;

  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({});
    store = TestBed.inject(MessagesStore);
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('should seed the demo conversations when storage is empty', () => {
    expect(store.threads().length).toBe(9);
    expect(store.selected()?.id).toBe('m2');
  });

  it('should sort conversations A-Z and Z-A', () => {
    const asc = store.visible().map((c) => c.name);
    expect(asc).toEqual([...asc].sort((a, b) => a.localeCompare(b)));
    store.toggleSort();
    const desc = store.visible().map((c) => c.name);
    expect(desc).toEqual([...desc].sort((a, b) => b.localeCompare(a)));
  });

  it('should select conversations by id', () => {
    store.select('m4');
    expect(store.selectedId()).toBe('m4');
    expect(store.selected()?.name).toBe('Blake Howard');
  });

  it('should toggle the star flag', () => {
    expect(store.threads().find((c) => c.id === 'm1')?.starred).toBeFalse();
    store.toggleStar('m1');
    expect(store.threads().find((c) => c.id === 'm1')?.starred).toBeTrue();
  });

  it('should remove conversations by id', () => {
    store.remove('m1');
    expect(store.threads().some((c) => c.id === 'm1')).toBeFalse();
  });

  it('should reselect when the selected conversation is removed', () => {
    store.select('m1');
    store.remove('m1');
    expect(store.selected()?.id).toBe('m2');
    for (const t of store.threads().map((t) => t.id)) store.remove(t);
    expect(store.threads().length).toBe(0);
    expect(store.selected()).toBeUndefined();
  });

  it('should manage the compose dialog and draft', () => {
    expect(store.modalOpen()).toBeFalse();
    store.openNew();
    expect(store.modalOpen()).toBeTrue();
    store.setModalOpen(false);
    expect(store.modalOpen()).toBeFalse();
    store.setDraft('hello');
    store.sendDraft();
    expect(store.draft()).toBe('');
  });
});
