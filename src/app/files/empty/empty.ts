import { Component, inject } from '@angular/core';
import { DashPage } from '../../shared/dash-page/dash-page';
import { EmptyState } from '../../shared/empty-state/empty-state';
import { ViewCard } from '../../shared/view-card/view-card';
import { FilesSidebar } from '../files-sidebar';
import { FilesStore } from '../files-store';

@Component({
  selector: 'app-files-empty',
  standalone: true,
  imports: [DashPage, FilesSidebar, EmptyState, ViewCard],
  templateUrl: './empty.html',
  styleUrl: './empty.scss',
})
export class FilesEmpty {
  protected store = inject(FilesStore);
}
