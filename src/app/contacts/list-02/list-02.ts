import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { DashPage } from '../../shared/dash-page/dash-page';
import { ViewToolbar } from '../../shared/view-toolbar/view-toolbar';
import { ViewCard } from '../../shared/view-card/view-card';
import { ProjectViewMode } from '../../shared/view-toggle/view-toggle';
import { Pagination } from '../../shared/pagination/pagination';
import { ContactAvatar } from '../../shared/contact-avatar/contact-avatar';
import { DataTable, TableCell, TableColumn } from '../../shared/data-table/data-table';
import { CellDef } from '../../shared/data-table/cell-def';
import { ContactsSidebar } from '../contacts-sidebar';
import { Contact, OVERVIEW_B, progressColor } from '../contacts-data';
import { ContactsStore } from '../contacts-store';

@Component({
  selector: 'app-contacts-list-02',
  standalone: true,
  imports: [DashPage, ContactsSidebar, ContactAvatar, ViewToolbar, ViewCard, Pagination, DataTable, CellDef],
  templateUrl: './list-02.html',
  styleUrl: './list-02.scss',
})
export class ContactsList02 {
  private router = inject(Router);
  protected store = inject(ContactsStore);

  stats = OVERVIEW_B;
  grid = 'minmax(0,1.5fr) minmax(0,1.4fr) minmax(0,1fr) minmax(0,0.7fr) minmax(0,1.2fr) auto';
  columns: TableColumn[] = [
    { key: 'person', label: 'Name', sortable: true, kind: 'custom' },
    { key: 'email', label: 'Email', kind: 'text' },
    { key: 'phone', label: 'Phone', kind: 'text' },
    { key: 'rate', label: 'Rate', kind: 'text' },
    { key: 'progress', label: 'Progress', kind: 'custom' },
  ];

  rows(): Array<{ id: string; cells: Record<string, TableCell> }> {
    return this.store.inGroup('B').map((c) => ({
      id: c.id,
      cells: {
        person: { text: `${c.first} ${c.last}`, sub: c.role },
        email: { text: c.email, sub: 'Email' },
        phone: { text: c.phone, sub: 'Phone' },
        rate: { text: `$${c.rate} / hr`, sub: 'Rate' },
        progress: { text: `${c.progress}%`, sub: 'Job progress' },
      },
    }));
  }

  contactOf(id: string): Contact | undefined {
    return this.store.contacts().find((c) => c.id === id);
  }

  barOf(id: string): string {
    return progressColor(this.contactOf(id)?.progress ?? 0);
  }

  openById(id: string): void {
    const c = this.contactOf(id);
    if (c) this.store.openDetails(c);
  }

  onViewChange(mode: ProjectViewMode): void {
    if (mode === 'grid') this.router.navigate(['/contacts/grid-02'], { replaceUrl: true });
  }
}
