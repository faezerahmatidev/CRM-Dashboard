import { TestBed } from '@angular/core/testing';
import { ContactsStore } from './contacts-store';

describe('ContactsStore', () => {
  let store: ContactsStore;

  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({});
    store = TestBed.inject(ContactsStore);
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('should seed the demo contacts when storage is empty', () => {
    expect(store.contacts().length).toBe(16);
    expect(store.inGroup('A').length).toBe(8);
    expect(store.inGroup('B').length).toBe(8);
  });

  it('should sort contacts A-Z and Z-A', () => {
    const asc = store.inGroup('A').map((c) => c.first);
    expect(asc).toEqual([...asc].sort((a, b) => a.localeCompare(b)));
    store.toggleSort();
    const desc = store.inGroup('A').map((c) => c.first);
    expect(desc).toEqual([...desc].sort((a, b) => b.localeCompare(a)));
  });

  it('should prepend added contacts to group A', () => {
    store.add('Ada', 'Lovelace');
    expect(store.contacts()[0].first).toBe('Ada');
    expect(store.inGroup('A').length).toBe(9);
  });

  it('should remove contacts by id', () => {
    const id = store.contacts()[0].id;
    store.remove(id);
    expect(store.contacts().some((c) => c.id === id)).toBeFalse();
  });

  it('should manage the dialog state machine', () => {
    expect(store.modalOpen()).toBeFalse();
    expect(store.selected()).toBeNull();
    store.openNew();
    expect(store.modalOpen()).toBeTrue();
    expect(store.selected()).toBeNull();
    store.openDetails(store.contacts()[0]);
    expect(store.selected()?.id).toBe(store.contacts()[0].id);
    store.setModalOpen(false);
    expect(store.modalOpen()).toBeFalse();
    expect(store.selected()).toBeNull();
  });
});
