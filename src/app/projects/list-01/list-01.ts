import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { DashPage } from '../../shared/dash-page/dash-page';
import { PanelHeader } from '../../shared/panel-header/panel-header';
import { MessagesList } from '../../dashboard/widgets/messages-list';
import { ConversionBars } from '../../dashboard/widgets/conversion-bars';
import { ViewToggle, ProjectViewMode } from '../../shared/view-toggle/view-toggle';
import { SortControl } from '../../shared/sort-control/sort-control';
import { Pagination } from '../../shared/pagination/pagination';
import { ProjectBrand } from '../../shared/project-brand/project-brand';
import { AvatarStack } from '../../shared/avatar-stack/avatar-stack';
import { DotsMenu } from '../../shared/dots-menu/dots-menu';
import { PROJECT_MESSAGES, Project } from '../projects-data';
import { ProjectsStore } from '../projects-store';

@Component({
  selector: 'app-projects-list-01',
  standalone: true,
  imports: [DashPage, PanelHeader, MessagesList, ConversionBars, ViewToggle, SortControl, Pagination, ProjectBrand, AvatarStack, RouterLink, DotsMenu],
  templateUrl: './list-01.html',
  styleUrl: './list-01.scss',
})
export class ProjectsList01 {
  private router = inject(Router);
  private store = inject(ProjectsStore);

  messages = PROJECT_MESSAGES;
  sortAsc = true;
  page = 1;

  sortedProjects(): Project[] {
    return [...this.store.projects()]
      .filter((p) => !p.hiddenFromList)
      .sort((a, b) =>
        this.sortAsc ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name),
      );
  }

  onEdit(p: Project): void {
    this.store.openEdit(p);
  }

  onRemove(p: Project): void {
    this.store.remove(p.name);
  }

  onViewChange(mode: ProjectViewMode): void {
    if (mode === 'grid') this.router.navigate(['/projects/grid-01'], { replaceUrl: true });
  }
}
