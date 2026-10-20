import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { DashPage } from '../../shared/dash-page/dash-page';
import { PanelHeader } from '../../shared/panel-header/panel-header';
import { MessagesList } from '../../dashboard/widgets/messages-list';
import { ConversionBars } from '../../dashboard/widgets/conversion-bars';
import { ViewToolbar } from '../../shared/view-toolbar/view-toolbar';
import { ViewCard } from '../../shared/view-card/view-card';
import { ProjectViewMode } from '../../shared/view-toggle/view-toggle';
import { Pagination } from '../../shared/pagination/pagination';
import { ProjectBrand } from '../../shared/project-brand/project-brand';
import { AvatarStack } from '../../shared/avatar-stack/avatar-stack';
import { DataTable, TableCell, TableColumn } from '../../shared/data-table/data-table';
import { CellDef } from '../../shared/data-table/cell-def';
import { PROJECT_MESSAGES, Project } from '../projects-data';
import { ProjectsStore } from '../projects-store';

@Component({
  selector: 'app-projects-list-01',
  standalone: true,
  imports: [DashPage, PanelHeader, MessagesList, ConversionBars, ViewToolbar, ViewCard, Pagination, ProjectBrand, AvatarStack, DataTable, CellDef],
  templateUrl: './list-01.html',
  styleUrl: './list-01.scss',
})
export class ProjectsList01 {
  private router = inject(Router);
  private store = inject(ProjectsStore);

  messages = PROJECT_MESSAGES;
  sortAsc = true;
  page = 1;

  grid = 'minmax(0,1.5fr) minmax(0,0.8fr) minmax(0,0.8fr) minmax(0,0.9fr) minmax(0,1.2fr) auto';
  columns: TableColumn[] = [
    { key: 'project', label: 'Projects', sortable: true, kind: 'custom' },
    { key: 'tasks', label: 'Tasks', sortable: true, kind: 'number' },
    { key: 'budget', label: 'Budget', sortable: true, kind: 'number' },
    { key: 'due', label: 'Due date', sortable: true, kind: 'number' },
    { key: 'members', label: 'Members', sortable: true, kind: 'custom' },
  ];

  rows(): Array<{ id: string; cells: Record<string, TableCell> }> {
    return this.sortedProjects().map((p) => ({
      id: p.name,
      cells: {
        project: { text: p.name, sub: p.category },
        tasks: { text: `${p.tasksDone} / ${p.tasksTotal}`, sub: 'Tasks' },
        budget: { text: p.budget, sub: 'Budget' },
        due: { text: p.due, sub: 'Due date' },
        members: { text: '' },
      },
    }));
  }

  sortedProjects(): Project[] {
    return [...this.store.projects()]
      .filter((p) => !p.hiddenFromList)
      .sort((a, b) =>
        this.sortAsc ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name),
      );
  }

  projectOf(name: string): Project | undefined {
    return this.store.projects().find((p) => p.name === name);
  }

  openDetails(): void {
    this.router.navigate(['/projects/details/tasks'], { replaceUrl: true });
  }

  onEditByName(name: string): void {
    const p = this.projectOf(name);
    if (p) this.store.openEdit(p);
  }

  onRemoveByName(name: string): void {
    const p = this.projectOf(name);
    if (p) this.store.remove(p.name);
  }

  onViewChange(mode: ProjectViewMode): void {
    if (mode === 'grid') this.router.navigate(['/projects/grid-01'], { replaceUrl: true });
  }
}
