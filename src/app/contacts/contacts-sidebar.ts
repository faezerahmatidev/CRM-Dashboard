import { Component, Input } from '@angular/core';
import { PanelHeader } from '../shared/panel-header/panel-header';
import { ConversionDonut } from './conversion-donut';
import { ConversionLines } from './conversion-lines';

export interface OverviewStat {
  value: string;
  label: string;
  tint: string;
  color: string;
}

/** Left info panel shared by the contacts list/grid views. */
@Component({
  selector: 'app-contacts-sidebar',
  standalone: true,
  imports: [PanelHeader, ConversionDonut, ConversionLines],
  template: `
    <app-panel-header logo="C" title="CRAFTUI LLC" sub="8484 Ross Wells" />

    <section class="overview">
      <h3 class="widget-title">Contacts overview</h3>
      <p class="conv-sub">Your employees and clients details</p>
      <ul class="ov-list">
        @for (o of stats; track o.label) {
          <li>
            <span class="ov-text"><b>{{ o.value }}</b><span>{{ o.label }}</span></span>
            <span class="ov-icon" [style.background]="o.tint" [style.color]="o.color">
              <svg viewBox="0 0 24 24"><circle cx="9" cy="8.5" r="3"/><path d="M3.5 19.5c1-2.6 3-4 5.5-4 1 0 1.8.2 2.6.6"/><circle cx="16.5" cy="9.5" r="2.4"/><path d="M14.5 15.4c2.3.3 4 1.6 5 4"/></svg>
            </span>
          </li>
        }
      </ul>
    </section>

    @if (chart === 'donut') {
      <app-conversion-donut />
    } @else {
      <section class="conversion">
        <app-conversion-lines />
      </section>
    }
  `,
  styles: [`
    .conv-sub { font-size: 10px; color: var(--primary-grey); margin: 2px 0 12px; }
    .ov-list { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 10px; }
    .ov-list li {
      display: flex; align-items: center; justify-content: space-between; gap: 12px;
      background: var(--bg-light); border-radius: 10px; padding: 12px 14px;
    }
    .ov-text { display: flex; flex-direction: column; gap: 2px; }
    .ov-text b { font-size: 15px; font-weight: 900; }
    .ov-text span span { font-size: 10px; color: var(--primary-grey); }
    .ov-icon {
      width: 38px; height: 38px; flex: 0 0 38px; border-radius: 10px;
      display: grid; place-items: center;
    }
    .ov-icon svg {
      width: 17px; height: 17px; stroke: currentColor; fill: none;
      stroke-width: 1.8; stroke-linecap: round; stroke-linejoin: round;
    }
  `],
})
export class ContactsSidebar {
  @Input() stats: OverviewStat[] = [];
  @Input() chart: 'donut' | 'lines' = 'donut';
}
