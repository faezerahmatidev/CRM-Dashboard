import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AppShell } from '../shared/app-shell/app-shell';
import { EventModal } from './event-modal/event-modal';
import { CalendarStore } from './calendar-store';

@Component({
  selector: 'app-calendar-layout',
  standalone: true,
  imports: [RouterOutlet, AppShell, EventModal],
  template: `
    <app-shell title="Calendar" activeIcon="calendar" actionIcon="plus" (action)="store.openNew(store.cursorISO())">
      <router-outlet />
    </app-shell>
    <app-event-modal
      [open]="store.modalOpen()"
      (openChange)="store.setModalOpen($event)"
      [event]="store.editing()"
      [draftDate]="store.draftDate()"
    />
  `,
})
export class CalendarLayout {
  protected store = inject(CalendarStore);
}
