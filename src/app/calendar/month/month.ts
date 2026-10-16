import { Component, effect, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DashPage } from '../../shared/dash-page/dash-page';
import { CalendarSidebar } from '../calendar-sidebar';
import { CalTabs } from '../cal-tabs';
import { toISO } from '../calendar-data';
import { CalendarStore } from '../calendar-store';

interface MonthCell {
  iso: string;
  day: number;
  inMonth: boolean;
}

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

@Component({
  selector: 'app-cal-month',
  standalone: true,
  imports: [FormsModule, DashPage, CalendarSidebar, CalTabs],
  templateUrl: './month.html',
  styleUrl: './month.scss',
})
export class CalMonth {
  protected store = inject(CalendarStore);

  cells: MonthCell[] = [];
  title = '';
  draft = '';
  weekdays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  constructor() {
    effect(() => {
      this.store.setView('month');
      this.store.cursor();
      this.build();
    });
  }

  build(): void {
    const c = this.store.cursor();
    this.title = `${MONTHS[c.m]} ${c.y}`;
    const offset = (new Date(c.y, c.m, 1).getDay() + 6) % 7;
    const days = new Date(c.y, c.m + 1, 0).getDate();
    const prevDays = new Date(c.y, c.m, 0).getDate();
    const total = Math.ceil((offset + days) / 7) * 7;
    this.cells = Array.from({ length: total }, (_, i) => {
      const n = i - offset + 1;
      if (n < 1) {
        const dt = new Date(c.y, c.m - 1, prevDays + n);
        return { iso: toISO(dt.getFullYear(), dt.getMonth(), dt.getDate()), day: prevDays + n, inMonth: false };
      }
      if (n > days) {
        const dt = new Date(c.y, c.m + 1, n - days);
        return { iso: toISO(dt.getFullYear(), dt.getMonth(), dt.getDate()), day: n - days, inMonth: false };
      }
      return { iso: toISO(c.y, c.m, n), day: n, inMonth: true };
    });
  }

  addOn(iso: string): void {
    this.store.add(iso, this.draft);
    this.draft = '';
  }
}
