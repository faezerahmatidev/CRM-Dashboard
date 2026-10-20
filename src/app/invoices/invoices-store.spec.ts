import { TestBed } from '@angular/core/testing';
import { InvoicesStore } from './invoices-store';

describe('InvoicesStore', () => {
  let store: InvoicesStore;

  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({});
    store = TestBed.inject(InvoicesStore);
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('should seed the demo invoices when storage is empty', () => {
    expect(store.invoices().length).toBe(7);
    expect(store.visible().length).toBe(7);
    expect(store.selected()).toBeNull();
  });

  it('should filter by status tab', () => {
    store.setFilter('Paid');
    expect(store.visible().every((i) => i.status === 'Paid')).toBeTrue();
    expect(store.visible().length).toBe(4);
    store.setFilter('Draft');
    expect(store.visible().length).toBe(0);
    store.setFilter('All');
    expect(store.visible().length).toBe(7);
  });

  it('should sort by column key and flip direction on repeat', () => {
    store.toggleSortKey('amount');
    expect(store.sortKey()).toBe('amount');
    expect(store.sortAsc()).toBeTrue();
    store.toggleSortKey('amount');
    expect(store.sortAsc()).toBeFalse();
  });

  it('should remove invoices by id', () => {
    store.remove('i1');
    expect(store.invoices().some((i) => i.id === 'i1')).toBeFalse();
  });

  it('should manage the details dialog selection', () => {
    const first = store.invoices()[0];
    store.openDetails(first);
    expect(store.selected()?.id).toBe(first.id);
    store.closeDetails();
    expect(store.selected()).toBeNull();
  });
});
