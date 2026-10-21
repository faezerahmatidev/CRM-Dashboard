import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DashPage } from '../../shared/dash-page/dash-page';
import { HelpSidebar } from '../help-sidebar';
import { HelpStore } from '../help-store';

@Component({
  selector: 'app-help-search',
  standalone: true,
  imports: [FormsModule, DashPage, HelpSidebar],
  templateUrl: './search.html',
  styleUrl: './search.scss',
})
export class HelpSearch {
  protected store = inject(HelpStore);

  draft = this.store.query();

  search(): void {
    this.store.setQuery(this.draft);
  }

  createTicket(): void {
    this.store.openNew();
  }
}
