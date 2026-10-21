import { TestBed } from '@angular/core/testing';
import { HelpStore } from './help-store';

describe('HelpStore', () => {
  let store: HelpStore;

  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({});
    store = TestBed.inject(HelpStore);
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('should seed the demo tickets when storage is empty', () => {
    expect(store.tickets().length).toBe(9);
    expect(store.visibleTickets().length).toBe(9);
  });

  it('should filter FAQs by query across all categories', () => {
    expect(store.results().length).toBe(5);
    store.setQuery('mastercard');
    expect(store.results().length).toBe(2);
    store.setQuery('zzz-no-match');
    expect(store.results().length).toBe(0);
    store.setQuery('');
    expect(store.results().length).toBe(5);
  });

  it('should toggle the expanded FAQ', () => {
    expect(store.expandedId()).toBe('f3');
    store.toggleExpanded('f1');
    expect(store.expandedId()).toBe('f1');
    store.toggleExpanded('f1');
    expect(store.expandedId()).toBeNull();
  });

  it('should toggle ticket checks and sort direction', () => {
    store.toggleCheck('t4', true);
    expect(store.tickets().find((t) => t.id === 't4')?.checked).toBeTrue();
    const asc = store.visibleTickets().map((t) => t.number);
    store.toggleSort();
    const desc = store.visibleTickets().map((t) => t.number);
    expect(desc).toEqual([...asc].reverse());
  });

  it('should remove tickets and manage the dialog', () => {
    store.remove('t1');
    expect(store.tickets().some((t) => t.id === 't1')).toBeFalse();
    store.openNew();
    expect(store.modalOpen()).toBeTrue();
    store.setModalOpen(false);
    expect(store.modalOpen()).toBeFalse();
  });
});
