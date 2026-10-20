import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { DashPage } from '../../shared/dash-page/dash-page';
import { ViewToolbar } from '../../shared/view-toolbar/view-toolbar';
import { ViewCard } from '../../shared/view-card/view-card';
import { ProjectViewMode } from '../../shared/view-toggle/view-toggle';
import { Pagination } from '../../shared/pagination/pagination';
import { AvatarStack } from '../../shared/avatar-stack/avatar-stack';
import { DataTable, TableCell, TableColumn } from '../../shared/data-table/data-table';
import { CellDef } from '../../shared/data-table/cell-def';
import { FilesSidebar } from '../files-sidebar';
import { FileBadgeIcon } from '../file-badge';
import { SharedFile } from '../files-data';
import { FilesStore } from '../files-store';

@Component({
  selector: 'app-files-list',
  standalone: true,
  imports: [DashPage, FilesSidebar, ViewToolbar, ViewCard, Pagination, AvatarStack, DataTable, CellDef, FileBadgeIcon],
  templateUrl: './list.html',
  styleUrl: './list.scss',
})
export class FilesList {
  private router = inject(Router);
  protected store = inject(FilesStore);

  grid = 'minmax(0,1.5fr) minmax(0,0.7fr) minmax(0,0.9fr) minmax(0,1.2fr) auto';
  columns: TableColumn[] = [
    { key: 'file', label: 'Name', sortable: true, kind: 'custom' },
    { key: 'size', label: 'Size', sortable: true, kind: 'text' },
    { key: 'tag', label: 'Tag', kind: 'custom' },
    { key: 'shared', label: 'Shared with', kind: 'custom' },
  ];

  rows(): Array<{ id: string; cells: Record<string, TableCell> }> {
    return this.store.visible().map((f: SharedFile) => ({
      id: f.id,
      cells: {
        file: { text: f.name },
        size: { text: f.size },
        tag: { text: f.tag },
        shared: { text: '' },
      },
    }));
  }

  fileOf(id: string): SharedFile | undefined {
    return this.store.files().find((f) => f.id === id);
  }

  openDetails(id: string): void {
    this.store.select(id);
    this.router.navigate(['/files/details'], { replaceUrl: true });
  }

  onViewChange(mode: ProjectViewMode): void {
    if (mode === 'grid') this.router.navigate(['/files/grid'], { replaceUrl: true });
  }
}
