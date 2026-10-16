import { Component, inject } from '@angular/core';
import { DashPage } from '../../shared/dash-page/dash-page';
import { ViewToggle, ProjectViewMode } from '../../shared/view-toggle/view-toggle';
import { SortControl } from '../../shared/sort-control/sort-control';
import { Pagination } from '../../shared/pagination/pagination';
import { DotsMenu } from '../../shared/dots-menu/dots-menu';
import { ContactsSidebar } from '../contacts-sidebar';
import { ContactAvatar } from '../contact-avatar';
import { OVERVIEW_A, fullName } from '../contacts-data';
import { ContactsStore } from '../contacts-store';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contacts-list-01',
  standalone: true,
  imports: [DashPage, ContactsSidebar, ContactAvatar, ViewToggle, SortControl, Pagination, DotsMenu],
  templateUrl: './list-01.html',
  styleUrl: './list-01.scss',
})
export class ContactsList01 {
  private router = inject(Router);
  protected store = inject(ContactsStore);

  stats = OVERVIEW_A;
  nameOf = fullName;

  onViewChange(mode: ProjectViewMode): void {
    if (mode === 'grid') this.router.navigate(['/contacts/grid-01'], { replaceUrl: true });
  }
}
