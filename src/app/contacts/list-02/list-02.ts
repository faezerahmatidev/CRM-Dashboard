import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { DashPage } from '../../shared/dash-page/dash-page';
import { ViewToggle, ProjectViewMode } from '../../shared/view-toggle/view-toggle';
import { SortControl } from '../../shared/sort-control/sort-control';
import { Pagination } from '../../shared/pagination/pagination';
import { DotsMenu } from '../../shared/dots-menu/dots-menu';
import { ContactsSidebar } from '../contacts-sidebar';
import { ContactAvatar } from '../contact-avatar';
import { OVERVIEW_B, fullName, progressColor } from '../contacts-data';
import { ContactsStore } from '../contacts-store';

@Component({
  selector: 'app-contacts-list-02',
  standalone: true,
  imports: [DashPage, ContactsSidebar, ContactAvatar, ViewToggle, SortControl, Pagination, DotsMenu],
  templateUrl: './list-02.html',
  styleUrl: './list-02.scss',
})
export class ContactsList02 {
  private router = inject(Router);
  protected store = inject(ContactsStore);

  stats = OVERVIEW_B;
  nameOf = fullName;
  barColor = progressColor;

  onViewChange(mode: ProjectViewMode): void {
    if (mode === 'grid') this.router.navigate(['/contacts/grid-02'], { replaceUrl: true });
  }
}
