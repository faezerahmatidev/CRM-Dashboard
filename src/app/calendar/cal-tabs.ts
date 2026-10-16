import { Component, Input, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CalView } from './calendar-data';
import { CalendarStore } from './calendar-store';

/** Month/Week/Day tabs + Today + prev/next arrows shared by the calendar views. */
@Component({
  selector: 'app-cal-tabs',
  standalone: true,
  template: `
    <div class="cal-toolbar">
      <div class="view-tabs" role="tablist" aria-label="Calendar view">
        <button type="button" [class.active]="store.view() === 'month'" (click)="go('month')">Month</button>
        <button type="button" [class.active]="store.view() === 'week'" (click)="go('week')">Week</button>
        <button type="button" [class.active]="store.view() === 'day'" (click)="go('day')">Day</button>
      </div>
      <button class="today-btn" type="button" (click)="store.today()">Today</button>
    </div>
    <div class="cal-title-row">
      <h2>{{ title }}</h2>
      <div class="nav-arrows">
        <button type="button" aria-label="Previous" (click)="store.prev()">
          <svg viewBox="0 0 24 24"><path d="M15 5.5 8.5 12l6.5 6.5" /></svg>
        </button>
        <button type="button" aria-label="Next" (click)="store.next()">
          <svg viewBox="0 0 24 24"><path d="m9 5.5 6.5 6.5L9 18.5" /></svg>
        </button>
      </div>
    </div>
  `,
  styles: [`
    .cal-toolbar { display: flex; align-items: center; justify-content: space-between; gap: 12px; }
    .view-tabs { display: inline-flex; gap: 18px; align-items: center; }
    .view-tabs button {
      border: 1px solid transparent;
      background: transparent;
      cursor: pointer;
      font-size: 12px;
      font-weight: 400;
      color: var(--primary-grey);
      padding: 9px 22px;
      border-radius: 8px;
    }
    .view-tabs button.active {
      background: #fff;
      border-color: var(--outline);
      color: var(--primary-dark);
      font-weight: 900;
      box-shadow: 0 1px 3px rgb(28 29 33 / 0.08);
    }
    .today-btn {
      border: 0;
      background: transparent;
      cursor: pointer;
      font-size: 12px;
      font-weight: 700;
      color: var(--primary-grey);
      padding: 6px 4px;
    }
    .today-btn:hover { color: var(--primary); }
    .cal-title-row { display: flex; align-items: center; justify-content: space-between; gap: 12px; margin: 14px 0; }
    .cal-title-row h2 { font-size: 17px; font-weight: 900; margin: 0; }
    .nav-arrows { display: inline-flex; gap: 8px; }
    .nav-arrows button {
      width: 38px;
      height: 38px;
      border: 1px solid var(--outline);
      background: #fff;
      border-radius: 9px;
      cursor: pointer;
      display: grid;
      place-items: center;
      color: var(--primary-grey);
    }
    .nav-arrows button:hover { color: var(--primary); border-color: var(--primary); }
    .nav-arrows svg { width: 15px; height: 15px; stroke: currentColor; fill: none; stroke-width: 2; stroke-linecap: round; stroke-linejoin: round; }
  `],
})
export class CalTabs {
  protected store = inject(CalendarStore);
  private router = inject(Router);

  @Input() title = '';

  go(v: CalView): void {
    this.store.setView(v);
    this.router.navigate(['/calendar', v], { replaceUrl: true });
  }
}
