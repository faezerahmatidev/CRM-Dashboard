import { TestBed } from '@angular/core/testing';
import { KanbanStore } from './kanban-store';

describe('KanbanStore', () => {
  let store: KanbanStore;

  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({});
    store = TestBed.inject(KanbanStore);
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('should seed the demo cards when storage is empty', () => {
    expect(store.cards().length).toBe(8);
    expect(store.inColumn('todo').length).toBe(3);
    expect(store.inColumn('progress').length).toBe(2);
    expect(store.inColumn('done').length).toBe(3);
  });

  it('should move cards between columns', () => {
    const card = store.inColumn('todo')[0];
    store.move(card.id, 'progress');
    expect(store.inColumn('todo').length).toBe(2);
    expect(store.inColumn('progress').length).toBe(3);
    expect(store.inColumn('progress').some((c) => c.id === card.id)).toBeTrue();
  });

  it('should append added cards to the target column', () => {
    store.addTo('done', 'Shipped feature');
    const done = store.inColumn('done');
    expect(done.length).toBe(4);
    expect(done[done.length - 1].title).toBe('Shipped feature');
  });

  it('should manage the dialog state machine', () => {
    expect(store.modalOpen()).toBeFalse();
    expect(store.selected()).toBeNull();
    store.openNew('progress');
    expect(store.modalOpen()).toBeTrue();
    expect(store.selected()).toBeNull();
    expect(store.pendingColumn()).toBe('progress');
    store.openDetails(store.cards()[0]);
    expect(store.selected()?.id).toBe(store.cards()[0].id);
    store.setModalOpen(false);
    expect(store.modalOpen()).toBeFalse();
    expect(store.selected()).toBeNull();
  });
});
