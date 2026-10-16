import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AppShell } from '../shared/app-shell/app-shell';
import { KanbanModal } from './kanban-modal/kanban-modal';
import { KanbanStore } from './kanban-store';

@Component({
  selector: 'app-kanban-layout',
  standalone: true,
  imports: [RouterOutlet, AppShell, KanbanModal],
  template: `
    <app-shell title="Kanban Desk" activeIcon="kanban" actionIcon="plus" (action)="store.openNew()">
      <router-outlet />
    </app-shell>
    <app-kanban-modal
      [open]="store.modalOpen()"
      (openChange)="store.setModalOpen($event)"
      [card]="store.selected()"
      [column]="store.pendingColumn()"
    />
  `,
})
export class KanbanLayout {
  protected store = inject(KanbanStore);
}
