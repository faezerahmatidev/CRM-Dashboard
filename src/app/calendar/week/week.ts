import { Component, effect, inject } from '@angular/core';
import { DashPage } from '../../shared/dash-page/dash-page';
import { CalendarSidebar } from '../calendar-sidebar';
import { CalTabs } from '../cal-tabs';
import { addDaysISO, toISO } from '../calendar-data';
import { CalendarStore } from '../calendar-store';

interface WeekDay {
  iso: string;
  label: string;
}

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];
const ROW_PX = 64;

@Component({
  selector: 'app-cal-week',
  standalone: true,
  imports: [DashPage, CalendarSidebar, CalTabs],
  templateUrl: './week.html',
  styleUrl: './week.scss',
})
export class CalWeek {
  protected store = inject(CalendarStore);

  days: WeekDay[] = [];
  title = '';
  hours = [7, 8, 9, 10, 11, 12, 13, 14];

  constructor() {
    effect(() => {
      this.store.setView('week');
      const c = this.store.cursor();
      const dt = new Date(c.y, c.m, c.d);
      const monday = new Date(dt);
      monday.setDate(dt.getDate() - ((dt.getDay() + 6) % 7));
      this.days = Array.from({ length: 7 }, (_, i) => {
        const d = new Date(monday);
        d.setDate(monday.getDate() + i);
        const iso = toISO(d.getFullYear(), d.getMonth(), d.getDate());
        return { iso, label: `${['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i]} ${d.getDate()}` };
      });
      const sun = new Date(monday);
      sun.setDate(monday.getDate() + 6);
      const sameMonth = monday.getMonth() === sun.getMonth();
      this.title = sameMonth
        ? `${MONTHS[monday.getMonth()]} ${monday.getDate()} - ${sun.getDate()}, ${sun.getFullYear()}`
        : `${MONTHS[monday.getMonth()]} ${monday.getDate()} - ${MONTHS[sun.getMonth()]} ${sun.getDate()}, ${sun.getFullYear()}`;
    });
  }

  hourLabel(h: number): string {
    if (h < 12) return `${h}am`;
    if (h === 12) return '12am';
    return `${h - 12}pm`;
  }

  rowOf(startHour: number): number {
    return Math.floor(startHour) - 7 + 2;
  }

  topOf(startHour: number): number {
    return Math.round((startHour % 1) * ROW_PX);
  }

  spanOf(startHour: number, span: number): number {
    return Math.max(1, Math.ceil(span + (startHour % 1)));
  }

  isoPlus(iso: string, n: number): string {
    return addDaysISO(iso, n);
  }
}
