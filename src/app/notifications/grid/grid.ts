import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { DashPage } from '../../shared/dash-page/dash-page';
import { ViewToolbar } from '../../shared/view-toolbar/view-toolbar';
import { ViewCard } from '../../shared/view-card/view-card';
import { ProjectViewMode } from '../../shared/view-toggle/view-toggle';
import { NotificationPanel } from '../notification-panel';
import { NotificationMembers } from '../notification-members';
import { PostCard } from '../post-card';
import { NotificationsStore } from '../notifications-store';

@Component({
  selector: 'app-notifications-grid',
  standalone: true,
  imports: [DashPage, NotificationPanel, NotificationMembers, PostCard, ViewToolbar, ViewCard],
  templateUrl: './grid.html',
  styleUrl: './grid.scss',
})
export class NotificationsGrid {
  private router = inject(Router);
  protected store = inject(NotificationsStore);

  onViewChange(mode: ProjectViewMode): void {
    if (mode === 'list') this.router.navigate(['/notifications/list'], { replaceUrl: true });
  }
}
