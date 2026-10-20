import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { DashPage } from '../../shared/dash-page/dash-page';
import { ViewToolbar } from '../../shared/view-toolbar/view-toolbar';
import { ViewCard } from '../../shared/view-card/view-card';
import { CardGrid } from '../../shared/card-grid/card-grid';
import { ProjectViewMode } from '../../shared/view-toggle/view-toggle';
import { Pagination } from '../../shared/pagination/pagination';
import { ContactsSidebar } from '../contacts-sidebar';
import { ContactAvatar } from '../contact-avatar';
import { OVERVIEW_B, fullName, progressColor } from '../contacts-data';
import { ContactsStore } from '../contacts-store';

@Component({
  selector: 'app-contacts-grid-02',
  standalone: true,
  imports: [DashPage, ContactsSidebar, ContactAvatar, ViewToolbar, ViewCard, CardGrid, Pagination],
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
