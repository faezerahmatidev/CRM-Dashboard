import { Component, inject } from '@angular/core';
import { DashPage } from '../../shared/dash-page/dash-page';
import { ViewToolbar } from '../../shared/view-toolbar/view-toolbar';
import { ViewCard } from '../../shared/view-card/view-card';
import { NewButton } from '../../shared/new-button/new-button';
import { ActionsButton } from '../../shared/actions-button/actions-button';
import { Pagination } from '../../shared/pagination/pagination';
import { Fab } from '../../shared/fab/fab';
import { DataTable, TableCell, TableColumn } from '../../shared/data-table/data-table';
import { TicketsSidebar } from '../tickets-sidebar';
import { Ticket } from '../help-data';
import { HelpStore } from '../help-store';

@Component({
  selector: 'app-help-tickets',
  standalone: true,
  imports: [DashPage, TicketsSidebar, ViewToolbar, ViewCard, NewButton, ActionsButton, Pagination, Fab, DataTable],
  templateUrl: './tickets.html',
  styleUrl: './tickets.scss',
})
export class HelpTickets {
  protected store = inject(HelpStore);

  grid = 'auto minmax(0,1.2fr) minmax(0,1.6fr) auto auto auto';
  columns: TableColumn[] = [
    { key: 'ticket', label: '', kind: 'product' },
    { key: 'subject', label: '', kind: 'text' },
    { key: 'attach', label: '', kind: 'custom' },
    { key: 'time', label: '', kind: 'text' },
  ];

  rows(): Array<{ id: string; selected: boolean; cells: Record<string, TableCell> }> {
    return this.store.visibleTickets().map((t: Ticket) => ({
      id: t.id,
      selected: t.checked,
      cells: {
        ticket: { text: t.number, icon: 'doc', palette: '#eef2fe', color: '#5e81f4' },
        subject: { text: t.subject },
        attach: { text: '' },
        time: { text: t.time },
      },
    }));
  }
}
