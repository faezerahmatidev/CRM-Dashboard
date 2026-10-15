import { Injectable, signal } from '@angular/core';
import { LIST_PROJECTS, Project } from './projects-data';

/** In-memory project list shared by the list views and the Add New dialog. */
@Injectable({ providedIn: 'root' })
export class ProjectsStore {
  private readonly _projects = signal<Project[]>(
    LIST_PROJECTS.map((p) => ({ ...p, brand: { ...p.brand }, members: p.members.map((m) => ({ ...m })) })),
  );
  readonly projects = this._projects.asReadonly();

  remove(name: string): void {
    this._projects.update((ps) => ps.filter((p) => p.name !== name));
  }

  rename(oldName: string, name: string): void {
    const next = name.trim();
    if (!next || next === oldName) return;
    this._projects.update((ps) => ps.map((p) => (p.name === oldName ? { ...p, name: next } : p)));
  }

  add(project: Project): void {
    this._projects.update((ps) => [project, ...ps]);
  }
}
