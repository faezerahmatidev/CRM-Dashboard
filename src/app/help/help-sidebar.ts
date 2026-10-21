import { Component } from '@angular/core';
import { PanelHeader } from '../shared/panel-header/panel-header';
import { RECENT_TICKETS } from './help-data';

/** Left tickets panel shared by the help center views. */
@Component({
  selector: 'app-help-sidebar',
  standalone: true,
  imports: [PanelHeader],
  template: `
    <app-panel-header logo="C" title="CRAFTUI LLC" sub="8484 Ross Wells" />

    <section class="recent">
      <div class="recent-head">
        <span>
          <h3 class="widget-title">Your recent tickets</h3>
        </span>
        <span class="count">5</span>
        <button class="view-all" type="button">View all</button>
      </div>
      <ul class="ticket-list">
        @for (t of tickets; track t.number) {
          <li>
            <span class="t-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24"><path d="M6 3.5h8l4 4V20a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1v-16a1 1 0 0 1 1-1Z"/><path d="M13.5 3.5V9H19" /></svg>
            </span>
            <span class="t-titles">
              <b>{{ t.number }}</b>
              <span>{{ t.text }}</span>
            </span>
          </li>
        }
      </ul>
    </section>

    <section class="help-card">
      <span class="help-icon" aria-hidden="true">?</span>
      <span class="help-text">
        <b>Do you still need our help?</b>
        <span>Send your request via email</span>
      </span>
      <button class="btn btn-primary" type="button">Contact Us</button>
    </section>
  `,
  styles: [`
    .recent-head { display: flex; align-items: baseline; gap: 8px; margin-bottom: 12px; }
    .widget-title { font-size: 12px; font-weight: 900; margin: 0; }
    .count {
      font-size: 10px; font-weight: 900; color: #34b26b;
      background: #e4f8ec; border-radius: 50%;
      min-width: 20px; height: 20px; display: inline-grid; place-items: center; padding: 0 5px;
    }
    .view-all {
      margin-left: auto; border: 0; background: transparent; cursor: pointer;
      font-size: 10.5px; font-weight: 700; color: var(--primary); font-family: inherit; padding: 0;
    }
    .ticket-list { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 10px; }
    .ticket-list li {
      display: flex; align-items: flex-start; gap: 10px;
      border: 1px solid var(--outline); border-radius: 10px; padding: 11px 12px; background: #fff;
    }
    .t-icon {
      width: 30px; height: 30px; flex: 0 0 30px; border-radius: 8px;
      background: var(--bg-light); color: var(--primary-grey);
      display: grid; place-items: center;
    }
    .t-icon svg {
      width: 14px; height: 14px; stroke: currentColor; fill: none;
      stroke-width: 1.7; stroke-linecap: round; stroke-linejoin: round;
    }
    .t-titles { display: flex; flex-direction: column; gap: 2px; min-width: 0; }
    .t-titles b { font-size: 11px; }
    .t-titles span { font-size: 10px; color: var(--primary-grey); line-height: 1.5; }
    .help-card {
      border-left: 2px solid var(--primary);
      background: #fff; border-radius: 10px;
      padding: 14px; margin-top: 16px;
      display: flex; flex-direction: column; gap: 8px;
    }
    .help-card .btn { align-self: flex-start; padding: 10px 28px; }
    .help-icon {
      width: 28px; height: 28px; border-radius: 8px; background: var(--btn-rest-bg);
      color: var(--primary); font-weight: 900; font-size: 14px;
      display: grid; place-items: center;
    }
    .help-text { display: flex; flex-direction: column; gap: 2px; }
    .help-text b { font-size: 12px; }
    .help-text span { font-size: 10px; color: var(--primary-grey); }
  `],
})
export class HelpSidebar {
  tickets = RECENT_TICKETS;
}
