import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { DashPage } from '../../shared/dash-page/dash-page';
import { PanelHeader } from '../../shared/panel-header/panel-header';
import { MessagesList } from '../../dashboard/widgets/messages-list';
import { ConversionBars } from '../../dashboard/widgets/conversion-bars';
import { EmptyState } from '../../shared/empty-state/empty-state';
import { PROJECT_MESSAGES } from '../../projects/projects-data';

@Component({
  selector: 'app-tasks-empty',
  standalone: true,
  imports: [DashPage, PanelHeader, MessagesList, ConversionBars, EmptyState],
  templateUrl: './empty.html',
  styleUrl: './empty.scss',
})
export class TasksEmpty {
  private router = inject(Router);

  messages = PROJECT_MESSAGES;

  onSetup(): void {
    this.router.navigate(['/tasks/list-01'], { replaceUrl: true });
  }
}
