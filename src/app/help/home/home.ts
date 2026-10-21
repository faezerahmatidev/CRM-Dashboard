import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { DashPage } from '../../shared/dash-page/dash-page';
import { FilterTabs } from '../../shared/filter-tabs/filter-tabs';
import { HelpSidebar } from '../help-sidebar';
import { HELP_CATEGORIES } from '../help-data';
import { HelpStore } from '../help-store';

@Component({
  selector: 'app-help-home',
  standalone: true,
  imports: [FormsModule, DashPage, FilterTabs, HelpSidebar],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class HelpHome {
  private router = inject(Router);
  protected store = inject(HelpStore);

  draft = '';
  categories = HELP_CATEGORIES;
  pillOptions = [
    { value: 'Personal', label: 'Personal' },
    { value: 'Business', label: 'Business' },
    { value: 'Payments', label: 'Payments' },
    { value: 'Invoices', label: 'Invoices' },
    { value: 'Settings', label: 'Settings' },
  ];

  search(): void {
    this.store.setQuery(this.draft);
    this.router.navigate(['/help/search'], { replaceUrl: true });
  }

  ask(link: string): void {
    this.store.setQuery(link);
    this.router.navigate(['/help/search'], { replaceUrl: true });
  }

  pickCategory(c: string): void {
    this.store.setCategory(c);
  }
}
