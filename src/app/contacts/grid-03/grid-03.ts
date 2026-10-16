import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { DashPage } from '../../shared/dash-page/dash-page';
import { ViewToggle, ProjectViewMode } from '../../shared/view-toggle/view-toggle';
import { SortControl } from '../../shared/sort-control/sort-control';
import { Pagination } from '../../shared/pagination/pagination';
import { ContactsSidebar } from '../contacts-sidebar';
import { ContactAvatar } from '../contact-avatar';
import { OVERVIEW_B, fullName } from '../contacts-data';
import { ContactsStore } from '../contacts-store';

@Component({
  selector: 'app-contacts-grid-03',
  standalone: true,
  imports: [DashPage, ContactsSidebar, ContactAvatar, ViewToggle, SortControl, Pagination],
  templateUrl: './grid-03.html',
  styleUrl: './grid-03.scss',
})
export class ContactsGrid03 {
  private router = inject(Router);
  protected store = inject(ContactsStore);

  stats = OVERVIEW_B;
  nameOf = fullName;

  onViewChange(mode: ProjectViewMode): void {
    if (mode === 'list') this.router.navigate(['/contacts/list-03'], { replaceUrl: true });
  }
}
