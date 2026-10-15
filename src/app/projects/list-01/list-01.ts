import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DashPage } from '../../shared/dash-page/dash-page';
import { PanelHeader } from '../../shared/panel-header/panel-header';
import { MessagesList } from '../../dashboard/widgets/messages-list';
import { ConversionBars } from '../../dashboard/widgets/conversion-bars';
import { ViewToggle, ProjectViewMode } from '../../shared/view-toggle/view-toggle';
import { SortControl } from '../../shared/sort-control/sort-control';
import { Pagination } from '../../shared/pagination/pagination';
import { ProjectBrand } from '../../shared/project-brand/project-brand';
import { AvatarStack } from '../../shared/avatar-stack/avatar-stack';
import { LIST_PROJECTS, PROJECT_MESSAGES, Project } from '../projects-data';

@Component({
  selector: 'app-projects-list-01',
  standalone: true,
  imports: [DashPage, PanelHeader, MessagesList, ConversionBars, ViewToggle, SortControl, Pagination, ProjectBrand, AvatarStack],
  templateUrl: './list-01.html',
  styleUrl: './list-01.scss',
})
export class ProjectsList01 {
  messages = PROJECT_MESSAGES;
  sortAsc = true;
  page = 1;

  constructor(private router: Router) {}

  sortedProjects(): Project[] {
    return [...LIST_PROJECTS].sort((a, b) =>
      this.sortAsc ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name),
    );
  }

  onViewChange(mode: ProjectViewMode): void {
    if (mode === 'grid') this.router.navigate(['/projects/grid-01'], { replaceUrl: true });
  }
}
