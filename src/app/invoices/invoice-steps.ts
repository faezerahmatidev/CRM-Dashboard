import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

/** Right steps rail shared by the new-invoice pages. */
@Component({
  selector: 'app-invoice-steps',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  template: `
    <nav class="steps" aria-label="Invoice steps">
      <a routerLink="/invoices/new" routerLinkActive="active" [routerLinkActiveOptions]="{ exact: true }" replaceUrl>
        <span class="step-icon" aria-hidden="true">
          <svg viewBox="0 0 24 24"><rect x="6.5" y="3.5" width="11" height="17" rx="2"/><path d="M9.5 7.5h5" /></svg>
        </span>
        <span class="step-titles"><b>Bill To</b><span>Set your customer's details</span></span>
      </a>
      <a routerLink="/invoices/new" routerLinkActive="active" [routerLinkActiveOptions]="{ exact: true }" replaceUrl>
        <span class="step-icon" aria-hidden="true">
          <svg viewBox="0 0 24 24"><rect x="6.5" y="3.5" width="11" height="17" rx="2"/><path d="M9.5 7.5h5" /></svg>
        </span>
        <span class="step-titles"><b>From</b><span>Set your personal details</span></span>
      </a>
      <a routerLink="/invoices/new/items" routerLinkActive="active" replaceUrl>
        <span class="step-icon" aria-hidden="true">
          <svg viewBox="0 0 24 24"><rect x="6.5" y="3.5" width="11" height="17" rx="2"/><path d="M9.5 7.5h5" /></svg>
        </span>
        <span class="step-titles"><b>Description</b><span>Add products or items</span></span>
      </a>
    </nav>
    <div class="draft-card">
      <span class="step-icon" aria-hidden="true">
        <svg viewBox="0 0 24 24"><path d="M12 20h9M16.5 3.5a2.1 2.1 0 0 1 3 3L7.5 18.5 3.5 19.5l1-4L16.5 3.5Z" /></svg>
      </span>
      <span class="step-titles"><b>Save As A Draft</b><span>Edit and send this invoice later</span></span>
    </div>
    <div class="draft-card">
      <span class="step-icon" aria-hidden="true">
        <svg viewBox="0 0 24 24"><rect x="5" y="6.5" width="14" height="13" rx="2"/><path d="M4 6.5h16M10 10.5v6M14 10.5v6"/></svg>
      </span>
      <span class="step-titles"><b>Delete Invoice</b><span>Hide &amp; disable current invoice</span></span>
    </div>
  `,
  styles: [`
    .steps, .draft-card + .draft-card { margin-bottom: 0; }
    .steps {
      border: 1px solid var(--outline);
      border-radius: 12px;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      margin-bottom: 16px;
    }
    .steps a, .draft-card {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 14px 16px;
      text-decoration: none;
      color: inherit;
    }
    .steps a { border-bottom: 1px solid var(--outline); }
    .steps a:last-child { border-bottom: 0; }
    .steps a:hover { background: #f7f9ff; }
    .steps a.active .step-titles b { color: var(--primary); }
    .draft-card { border: 1px solid var(--outline); border-radius: 12px; margin-bottom: 16px; }
    .step-icon {
      width: 34px; height: 34px; flex: 0 0 34px; border-radius: 9px;
      background: var(--bg-light); color: var(--primary-grey);
      display: grid; place-items: center;
    }
    .step-icon svg {
      width: 16px; height: 16px; stroke: currentColor; fill: none;
      stroke-width: 1.7; stroke-linecap: round; stroke-linejoin: round;
    }
    .step-titles { display: flex; flex-direction: column; gap: 2px; min-width: 0; }
    .step-titles b { font-size: 11.5px; }
    .step-titles span { font-size: 10px; color: var(--primary-grey); }
  `],
})
export class InvoiceSteps {}
