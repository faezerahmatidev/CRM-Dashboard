import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { DashPage } from '../../shared/dash-page/dash-page';
import { EmptyState } from '../../shared/empty-state/empty-state';
import { MessagesSidebar } from '../messages-sidebar';

@Component({
  selector: 'app-messages-empty',
  standalone: true,
  imports: [DashPage, MessagesSidebar, EmptyState],
  templateUrl: './empty.html',
  styleUrl: './empty.scss',
})
export class MessagesEmpty {
  private router = inject(Router);

  onSetup(): void {
    this.router.navigate(['/messages/list'], { replaceUrl: true });
  }
}
