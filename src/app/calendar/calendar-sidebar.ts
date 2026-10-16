import { Component } from '@angular/core';
import { PanelHeader } from '../shared/panel-header/panel-header';
import { ConversionBars } from '../dashboard/widgets/conversion-bars';
import { UPCOMING } from './calendar-data';

/** Left info panel shared by the month/week/day views (Upcoming events + chart). */
@Component({
  selector: 'app-calendar-sidebar',
  standalone: true,
  imports: [PanelHeader, ConversionBars],
  template: `
    <app-panel-header logo="C" title="CRAFTUI LLC" sub="8484 Ross Wells" />

    <section class="upcoming">
      <h3 class="widget-title">Upcoming events</h3>
      <p class="conv-sub">Don&apos;t miss scheduled events</p>
      <ul class="ev-list">
        @for (u of upcoming; track u.title) {
          <li>
            <div class="ev-top">
              <span class="ev-time"><i class="dot" [class]="'dot-' + u.color"></i>{{ u.time }}</span>
              <button class="dots-btn" type="button" aria-label="Event options">...</button>
            </div>
            <b>{{ u.title }}</b>
            <span class="ev-sub">{{ u.sub }}</span>
          </li>
        }
      </ul>
    </section>

    <app-conversion-bars title="Conversion history" sub="Week to week performance" />
  `,
  styles: [`
    .conv-sub { font-size: 10px; color: var(--primary-grey); margin: 2px 0 12px; }
    .ev-list { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 10px; }
    .ev-list li {
      background: var(--bg-light);
      border-radius: 10px;
      padding: 12px 14px;
      display: flex;
      flex-direction: column;
      gap: 3px;
    }
    .ev-top { display: flex; align-items: center; justify-content: space-between; }
    .ev-time { display: inline-flex; align-items: center; gap: 7px; font-size: 10.5px; font-weight: 700; color: var(--primary); }
    .dot { width: 7px; height: 7px; border-radius: 50%; }
    .dot-blue { background: #5e81f4; }
    .dot-green { background: #34b26b; }
    .dot-red { background: #f0566b; }
    .dot-yellow { background: #d99a2b; }
    .ev-list b { font-size: 12px; }
    .ev-sub { font-size: 10px; color: var(--primary-grey); }
  `],
})
export class CalendarSidebar {
  upcoming = UPCOMING;
}
