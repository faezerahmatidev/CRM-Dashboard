import { Component } from '@angular/core';
import { PanelHeader } from '../shared/panel-header/panel-header';
import { ConversionLines } from '../shared/conversion-lines/conversion-lines';
import { BREAKDOWN } from './invoices-data';

/** Left info panel shared by the invoices views. */
@Component({
  selector: 'app-invoices-sidebar',
  standalone: true,
  imports: [PanelHeader, ConversionLines],
  template: `
    <app-panel-header logo="C" title="CRAFTUI LLC" sub="8484 Ross Wells" />

    <section class="breakdown">
      <h3 class="widget-title">Invoices breakdown</h3>
      <p class="conv-sub">Learn more about invoices created</p>
      <ul class="bd-list">
        @for (b of rows; track b.label) {
          <li>
            <span class="bd-text"><b>{{ b.label }}</b><span>{{ b.sub }}</span></span>
            <b class="bd-value">{{ b.value }}</b>
            <span class="bd-bar"><span [style.width.%]="b.bar" [style.background]="b.color"></span></span>
          </li>
        }
      </ul>
    </section>

    <section class="conversion">
      <div class="conv-head">
        <span>
          <h3 class="widget-title">Conversion history</h3>
          <p class="conv-sub">Week to week performance</p>
        </span>
        <button class="mini-btn" type="button" aria-label="Expand chart">
          <svg viewBox="0 0 24 24"><path d="M9 4H4v5M15 4h5v5M9 20H4v-5M15 20h5v-5" /></svg>
        </button>
      </div>
      <app-conversion-lines />
    </section>
  `,
  styles: [`
    .conv-sub { font-size: 10px; color: var(--primary-grey); margin: 2px 0 12px; }
    .bd-list { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 14px; }
    .bd-text { display: flex; flex-direction: column; gap: 2px; margin-bottom: 6px; }
    .bd-text b { font-size: 12px; }
    .bd-text span span, .bd-text > span { font-size: 10px; color: var(--primary-grey); }
    .bd-value { font-size: 14px; font-weight: 900; }
    .bd-list li { display: grid; grid-template-columns: 1fr auto; align-items: end; gap: 2px 10px; }
    .bd-bar { grid-column: 1 / -1; height: 4px; border-radius: 2px; background: var(--outline); overflow: hidden; }
    .bd-bar span { display: block; height: 100%; border-radius: 2px; }
    .conv-head { display: flex; align-items: flex-start; justify-content: space-between; }
    .mini-btn {
      width: 28px; height: 28px; border: 0; border-radius: 8px;
      background: var(--bg-light); color: var(--primary-grey);
      cursor: pointer; display: grid; place-items: center;
    }
    .mini-btn svg { width: 14px; height: 14px; stroke: currentColor; fill: none; stroke-width: 1.8; stroke-linecap: round; stroke-linejoin: round; }
  `],
})
export class InvoicesSidebar {
  rows = BREAKDOWN;
}
