import { Injectable, effect, signal } from '@angular/core';
import { LIST_PROJECTS, Project } from './projects-data';

const GRID_EXTRAS: Record<string, { complete: string; progress: number; progressColor: string; gridExtra: number }> = {
  'Dribbble Website': { complete: '90 / 148', progress: 62, progressColor: '#7ce7ac', gridExtra: 5 },
  'Theme Development': { complete: '20 / 145', progress: 18, progressColor: '#ff808b', gridExtra: 2 },
  'Dropbox App Design': { complete: '90 / 110', progress: 80, progressColor: '#7ce7ac', gridExtra: 9 },
  'Airbnb Development': { complete: '50 / 150', progress: 34, progressColor: '#f4be5e', gridExtra: 3 },
  'Kickstarter Campaign': { complete: '80 / 270', progress: 30, progressColor: '#f4be5e', gridExtra: 7 },
  'Pinterest Promotion': { complete: '98 / 124', progress: 79, progressColor: '#7ce7ac', gridExtra: 6 },
  'Behance UI Presentation': { complete: '94 / 116', progress: 81, progressColor: '#7ce7ac', gridExtra: 5 },
};

const GOOGLE_PROJECT: Project = {
  name: 'Google Optimization',
  category: 'Marketing',
  tasksDone: 70,
  tasksTotal: 190,
  budget: '$0.0',
  due: '—',
  brand: { glyph: 'G', tint: '#fdf3e0', color: '#d99a2b' },
  members: [
    { initials: 'HR', color: 'linear-gradient(135deg,#f4be5e,#ff808b)' },
    { initials: 'DP', color: 'linear-gradient(135deg,#5e81f4,#9698d6)' },
    { initials: 'NG', color: 'linear-gradient(135deg,#34b26b,#7ce7ac)' },
  ],
  extra: 9,
  complete: '70 / 190',
  progress: 37,
  progressColor: '#ff808b',
  hiddenFromList: true,
};

function seed(): Project[] {
  const list = LIST_PROJECTS.map((p) => {
    const extras = GRID_EXTRAS[p.name] ?? { complete: `${p.tasksDone} / ${p.tasksTotal}`, progress: 0, progressColor: '#5e81f4', gridExtra: p.extra };
    return {
      ...p,
      brand: { ...p.brand },
      members: p.members.map((m) => ({ ...m })),
      complete: extras.complete,
      progress: extras.progress,
      progressColor: extras.progressColor,
      gridExtra: extras.gridExtra,
    };
  });
  return [...list, { ...GOOGLE_PROJECT, brand: { ...GOOGLE_PROJECT.brand }, members: GOOGLE_PROJECT.members.map((m) => ({ ...m })) }];
}

/** In-memory project list shared by the list views, grid views and the Add/Edit dialog. */
@Injectable({ providedIn: 'root' })
export class ProjectsStore {
  private static readonly STORAGE_KEY = 'crm-dashboard-projects-v1';

  private readonly _projects = signal<Project[]>(ProjectsStore.load());
  readonly projects = this._projects.asReadonly();

  private readonly _modalOpen = signal(false);
  readonly modalOpen = this._modalOpen.asReadonly();

  private readonly _editing = signal<Project | null>(null);
  readonly editing = this._editing.asReadonly();

  constructor() {
    effect(() => {
      try {
        localStorage.setItem(ProjectsStore.STORAGE_KEY, JSON.stringify(this._projects()));
      } catch {
        // Storage unavailable (private mode) — keep in-memory state.
      }
    });
  }

  private static load(): Project[] {
    try {
      const raw = localStorage.getItem(ProjectsStore.STORAGE_KEY);
      if (!raw) return seed();
      const parsed = JSON.parse(raw) as Project[];
      return Array.isArray(parsed) && parsed.length ? parsed : seed();
    } catch {
      return seed();
    }
  }

  remove(name: string): void {
    this._projects.update((ps) => ps.filter((p) => p.name !== name));
  }

  update(oldName: string, patch: Project): void {
    this._projects.update((ps) => ps.map((p) => (p.name === oldName ? { ...patch } : p)));
  }

  add(project: Project): void {
    this._projects.update((ps) => [project, ...ps]);
  }

  openNew(): void {
    this._editing.set(null);
    this._modalOpen.set(true);
  }

  openEdit(project: Project): void {
    this._editing.set(project);
    this._modalOpen.set(true);
  }

  setModalOpen(open: boolean): void {
    this._modalOpen.set(open);
    if (!open) this._editing.set(null);
  }
}
