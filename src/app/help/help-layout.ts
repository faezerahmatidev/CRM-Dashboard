import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AppShell } from '../shared/app-shell/app-shell';
import { TicketModal } from './ticket-modal/ticket-modal';
import { HelpStore } from './help-store';

@Component({
  selector: 'app-help-layout',
  standalone: true,
  imports: [RouterOutlet, AppShell, TicketModal],
  template: `
    <app-shell title="Help Center" activeIcon="help" actionIcon="plus" (action)="store.openNew()">
      <router-outlet />
    </app-shell>
    <app-ticket-modal [open]="store.modalOpen()" (openChange)="store.setModalOpen($event)" />
  `,
})
export class HelpLayout {
  protected store = inject(HelpStore);
}
