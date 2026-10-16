import { TestBed } from '@angular/core/testing';
import { TasksStore } from './tasks-store';

describe('TasksStore', () => {
  let store: TasksStore;

  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({});
    store = TestBed.inject(TasksStore);
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('should seed the demo tasks when storage is empty', () => {
    expect(store.tasks().length).toBe(10);
    expect(store.visible().length).toBe(10);
  });

  it('should filter done and pending tasks', () => {
    store.setFilter('DONE');
    expect(store.visible().every((t) => t.done)).toBeTrue();
    expect(store.visible().length).toBe(3);
    store.setFilter('PENDING');
    expect(store.visible().every((t) => !t.done)).toBeTrue();
    expect(store.visible().length).toBe(7);
  });

  it('should sort tasks A-Z and Z-A', () => {
    const asc = store.visible().map((t) => t.title);
    expect(asc).toEqual([...asc].sort((a, b) => a.localeCompare(b)));
    store.toggleSort();
    const desc = store.visible().map((t) => t.title);
    expect(desc).toEqual([...desc].sort((a, b) => b.localeCompare(a)));
  });

  it('should toggle a task to done', () => {
    const pending = store.tasks().find((t) => !t.done)!;
    store.toggleDone(pending.id);
    expect(store.tasks().find((t) => t.id === pending.id)?.done).toBeTrue();
  });

  it('should prepend added tasks', () => {
    store.add('Brand new task');
    expect(store.tasks()[0].title).toBe('Brand new task');
    expect(store.tasks().length).toBe(11);
  });

  it('should manage the dialog state machine', () => {
    expect(store.modalOpen()).toBeFalse();
    expect(store.editing()).toBeNull();
    store.openNew();
    expect(store.modalOpen()).toBeTrue();
    expect(store.editing()).toBeNull();
    store.openDetails(store.tasks()[0]);
    expect(store.editing()?.id).toBe(store.tasks()[0].id);
    store.setModalOpen(false);
    expect(store.modalOpen()).toBeFalse();
    expect(store.editing()).toBeNull();
  });
});
