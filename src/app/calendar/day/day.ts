import { Component, effect, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DashPage } from '../../shared/dash-page/dash-page';
import { CalendarSidebar } from '../calendar-sidebar';
import { CalTabs } from '../cal-tabs';
import { CalendarStore } from '../calendar-store';

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];
const WEEKDAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const ROW_PX = 64;

@Component({
  selector: 'app-cal-day',
  standalone: true,
  imports: [FormsModule, DashPage, CalendarSidebar, CalTabs],
  templateUrl: './day.html',
  styleUrl: './day.scss',
})
export class CalDay {
  protected store = inject(CalendarStore);

  title = '';
  weekday = '';
  iso = '';
  hours = [7, 8, 9, 10, 11, 12, 13, 14];
  draft = '';

  constructor() {
    effect(() => {
      this.store.setView('day');
      const c = this.store.cursor();
      this.iso = `${c.y}-${String(c.m + 1).padStart(2, '0')}-${String(c.d).padStart(2, '0')}`;
      this.title = `${MONTHS[c.m]} ${c.d}, ${c.y}`;
      this.weekday = WEEKDAYS[new Date(c.y, c.m, c.d).getDay()];
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

  addHere(): void {
    this.store.add(this.iso, this.draft);
    this.draft = '';
  }
}
