import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { DashPage } from '../../shared/dash-page/dash-page';
import { ViewToolbar } from '../../shared/view-toolbar/view-toolbar';
import { ViewCard } from '../../shared/view-card/view-card';
import { CardGrid } from '../../shared/card-grid/card-grid';
import { ProjectViewMode } from '../../shared/view-toggle/view-toggle';
import { Pagination } from '../../shared/pagination/pagination';
import { DotsMenu } from '../../shared/dots-menu/dots-menu';
import { FilesSidebar } from '../files-sidebar';
import { FileBadgeIcon } from '../file-badge';
import { FilesStore } from '../files-store';

@Component({
  selector: 'app-files-grid',
  standalone: true,
  imports: [DashPage, FilesSidebar, ViewToolbar, ViewCard, CardGrid, Pagination, DotsMenu, FileBadgeIcon],
  templateUrl: './grid.html',
  styleUrl: './grid.scss',
})
export class FilesGrid {
  private router = inject(Router);
  protected store = inject(FilesStore);

  openDetails(id: string): void {
    this.store.select(id);
    this.router.navigate(['/files/details'], { replaceUrl: true });
  }

  onViewChange(mode: ProjectViewMode): void {
    if (mode === 'list') this.router.navigate(['/files/list'], { replaceUrl: true });
  }
}
