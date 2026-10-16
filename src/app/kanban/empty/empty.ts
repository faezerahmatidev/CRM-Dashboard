import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { DashPage } from '../../shared/dash-page/dash-page';
import { PanelHeader } from '../../shared/panel-header/panel-header';
import { ConversionLine } from '../conversion-line';
import { EmptyState } from '../../shared/empty-state/empty-state';
import { KANBAN_OVERVIEW } from '../kanban-data';

@Component({
  selector: 'app-kanban-empty',
  standalone: true,
  imports: [DashPage, PanelHeader, ConversionLine, EmptyState],
  templateUrl: './empty.html',
  styleUrl: './empty.scss',
})
export class KanbanEmpty {
  private router = inject(Router);

  overview = KANBAN_OVERVIEW;

  onSetup(): void {
    this.router.navigate(['/kanban/desk'], { replaceUrl: true });
  }
}
