import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { DashPage } from '../../shared/dash-page/dash-page';
import { PanelHeader } from '../../shared/panel-header/panel-header';
import { MessagesList } from '../../dashboard/widgets/messages-list';
import { ConversionBars } from '../../dashboard/widgets/conversion-bars';
import { EmptyState } from '../../shared/empty-state/empty-state';
import { PROJECT_MESSAGES } from '../projects-data';

@Component({
  selector: 'app-projects-empty',
  standalone: true,
  imports: [DashPage, PanelHeader, MessagesList, ConversionBars, EmptyState],
  templateUrl: './empty.html',
  styleUrl: './empty.scss',
})
export class ProjectsEmpty {
  private router = inject(Router);

  messages = PROJECT_MESSAGES;

  onSetup(): void {
    this.router.navigate(['/projects/list-01']);
  }
}
