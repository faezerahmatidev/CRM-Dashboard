import { Component } from '@angular/core';
import { PanelHeader } from '../shared/panel-header/panel-header';

/** Left search panel for the tickets views. */
@Component({
  selector: 'app-tickets-sidebar',
  standalone: true,
  imports: [PanelHeader],
  template: `
    <app-panel-header logo="C" title="CRAFTUI LLC" sub="8484 Ross Wells" />

    <section class="search-faq">
      <h3 class="widget-title">Search for a question</h3>
      <p class="conv-sub">Type your question or search keyword</p>
      <div class="search-box">
        <span>Start typing...</span>
        <svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="6"/><path d="m15.5 15.5 4 4"/></svg>
      </div>
    </section>

    <section class="links">
      <h3 class="widget-title">Getting started</h3>
      <ul>
        <li><button type="button">Account with Card</button></li>
        <li><button type="button">Withdraw to Bank</button></li>
        <li><button type="button">Bank Accounts</button></li>
        <li><button type="button">How Do I Reset My Password?</button></li>
        <li><button type="button">How to get paid with Payoneer</button></li>
      </ul>
    </section>
  `,
  styles: [`
    .widget-title { font-size: 12px; font-weight: 900; margin: 0 0 4px; }
    .conv-sub { font-size: 10px; color: var(--primary-grey); margin: 0 0 12px; }
    .search-box {
      display: flex; align-items: center; justify-content: space-between; gap: 10px;
      background: var(--bg-light); border-radius: 10px; padding: 13px 16px;
      font-size: 12px; color: var(--primary-grey);
    }
    .search-box svg {
      width: 15px; height: 15px; flex: 0 0 15px;
      stroke: currentColor; fill: none; stroke-width: 1.8; stroke-linecap: round;
    }
    .links ul { list-style: none; margin: 10px 0 0; padding: 0; display: flex; flex-direction: column; gap: 12px; }
    .links button {
      border: 0; background: transparent; cursor: pointer; padding: 0;
      font-size: 11.5px; color: var(--primary-grey); font-family: inherit; text-align: left;
    }
    .links button:hover { color: var(--primary); }
  `],
})
export class TicketsSidebar {}
