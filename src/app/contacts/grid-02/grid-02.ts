import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { DashPage } from '../../shared/dash-page/dash-page';
import { ViewToggle, ProjectViewMode } from '../../shared/view-toggle/view-toggle';
import { SortControl } from '../../shared/sort-control/sort-control';
import { Pagination } from '../../shared/pagination/pagination';
import { ContactsSidebar } from '../contacts-sidebar';
import { ContactAvatar } from '../contact-avatar';
import { OVERVIEW_B, fullName, progressColor } from '../contacts-data';
import { ContactsStore } from '../contacts-store';

@Component({
  selector: 'app-contacts-grid-02',
  standalone: true,
  imports: [DashPage, ContactsSidebar, ContactAvatar, ViewToggle, SortControl, Pagination],
  templateUrl: './grid-02.html',
  styleUrl: './grid-02.scss',
})
export class ContactsGrid02 {
  private router = inject(Router);
  protected store = inject(ContactsStore);

  stats = OVERVIEW_B;
  nameOf = fullName;
  barColor = progressColor;

  onViewChange(mode: ProjectViewMode): void {
    if (mode === 'list') this.router.navigate(['/contacts/list-02'], { replaceUrl: true });
  }
}
