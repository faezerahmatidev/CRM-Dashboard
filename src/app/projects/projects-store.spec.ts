import { TestBed } from '@angular/core/testing';
import { ProjectsStore } from './projects-store';

describe('ProjectsStore', () => {
  let store: ProjectsStore;

  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({});
    store = TestBed.inject(ProjectsStore);
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('should seed the demo projects when storage is empty', () => {
    expect(store.projects().length).toBe(8);
    expect(store.projects()[0].name).toBe('Dribbble Website');
  });

  it('should load projects previously saved in localStorage', () => {
    localStorage.setItem(
      'crm-dashboard-projects-v1',
      JSON.stringify([{ name: 'Stored', category: 'Development' }]),
    );
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({});
    const fresh = TestBed.inject(ProjectsStore);
    expect(fresh.projects().length).toBe(1);
    expect(fresh.projects()[0].name).toBe('Stored');
  });

  it('should fall back to seeds when storage holds corrupt data', () => {
    localStorage.setItem('crm-dashboard-projects-v1', 'not-json{{{');
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({});
    const fresh = TestBed.inject(ProjectsStore);
    expect(fresh.projects().length).toBe(8);
  });

  it('should prepend added projects', () => {
    store.add({
      name: 'Added',
      category: 'Development',
      tasksDone: 0,
      tasksTotal: 1,
      budget: '$0.0',
      due: '—',
      brand: { glyph: 'A', tint: '#e9eefe', color: '#5e81f4' },
      members: [],
      extra: 0,
    });
    expect(store.projects()[0].name).toBe('Added');
    expect(store.projects().length).toBe(9);
  });

  it('should remove projects by name', () => {
    store.remove('Dribbble Website');
    expect(store.projects().some((p) => p.name === 'Dribbble Website')).toBeFalse();
  });

  it('should patch projects on update', () => {
    const original = store.projects()[0];
    store.update(original.name, { ...original, budget: '$9.9' });
    expect(store.projects()[0].budget).toBe('$9.9');
    expect(store.projects()[0].name).toBe(original.name);
  });

  it('should manage the dialog state machine', () => {
    expect(store.modalOpen()).toBeFalse();
    expect(store.editing()).toBeNull();
    store.openNew();
    expect(store.modalOpen()).toBeTrue();
    expect(store.editing()).toBeNull();
    store.openEdit(store.projects()[0]);
    expect(store.editing()?.name).toBe(store.projects()[0].name);
    store.setModalOpen(false);
    expect(store.modalOpen()).toBeFalse();
    expect(store.editing()).toBeNull();
  });
});
