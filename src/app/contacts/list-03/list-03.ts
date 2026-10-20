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
import { Contact, OVERVIEW_B } from '../contacts-data';
import { ContactsStore } from '../contacts-store';

@Component({
  selector: 'app-contacts-list-03',
  standalone: true,
  imports: [DashPage, ContactsSidebar, ContactAvatar, ViewToolbar, ViewCard, Pagination, DataTable, CellDef],
  templateUrl: './list-03.html',
  styleUrl: './list-03.scss',
})
export class ContactsList03 {
  private router = inject(Router);
  protected store = inject(ContactsStore);

  stats = OVERVIEW_B;
  grid = 'minmax(0,1.5fr) minmax(0,1.4fr) minmax(0,1fr) minmax(0,0.7fr) minmax(0,0.8fr) auto';
  columns: TableColumn[] = [
    { key: 'person', label: 'Name', sortable: true, kind: 'custom' },
    { key: 'email', label: 'Email', kind: 'text' },
    { key: 'phone', label: 'Phone', kind: 'text' },
    { key: 'rate', label: 'Rate', kind: 'text' },
    { key: 'tag', label: 'Position', kind: 'pill' },
  ];

  rows(): Array<{ id: string; cells: Record<string, TableCell> }> {
    return this.store.inGroup('A').map((c) => ({
      id: c.id,
      cells: {
        person: { text: `${c.first} ${c.last}` },
        email: { text: c.email },
        phone: { text: c.phone },
        rate: { text: `$${c.rate} / hr` },
        tag: { text: c.tag, tone: 'grey' as const },
      },
    }));
  }

  contactOf(id: string): Contact | undefined {
    return this.store.contacts().find((c) => c.id === id);
  }

  openById(id: string): void {
    const c = this.contactOf(id);
    if (c) this.store.openDetails(c);
  }

  onViewChange(mode: ProjectViewMode): void {
    if (mode === 'grid') this.router.navigate(['/contacts/grid-03'], { replaceUrl: true });
  }
}
