import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { DashPage } from '../../shared/dash-page/dash-page';
import { EmptyState } from '../../shared/empty-state/empty-state';
import { ContactsSidebar } from '../contacts-sidebar';
import { OVERVIEW_A } from '../contacts-data';

@Component({
  selector: 'app-contacts-empty',
  standalone: true,
  imports: [DashPage, ContactsSidebar, EmptyState],
  templateUrl: './empty.html',
  styleUrl: './empty.scss',
})
export class ContactsEmpty {
  private router = inject(Router);

  stats = OVERVIEW_A;

  onSetup(): void {
    this.router.navigate(['/contacts/list-01'], { replaceUrl: true });
  }
}
