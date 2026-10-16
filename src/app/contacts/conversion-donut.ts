import { Component, Input } from '@angular/core';

/** Concentric $85k ring chart from the Contacts Figma (Conversion history). */
@Component({
  selector: 'app-conversion-donut',
  standalone: true,
  template: `
    <section>
      <h3 class="widget-title">Conversion history</h3>
      <p class="conv-sub">Week to week<br />performance</p>
      <svg class="donut" viewBox="0 0 200 190" role="img" aria-label="Conversion total 85 thousand dollars">
        <circle cx="100" cy="95" r="78" fill="none" stroke="#eef0f6" stroke-width="7" />
        <circle
          cx="100" cy="95" r="78" fill="none" stroke="#5e81f4" stroke-width="7" stroke-linecap="round"
          stroke-dasharray="367 490" transform="rotate(-210 100 95)"
        />
        <circle cx="100" cy="95" r="62" fill="none" stroke="#eef0f6" stroke-width="6" />
        <circle
          cx="100" cy="95" r="62" fill="none" stroke="#8181a5" stroke-width="6" stroke-linecap="round"
          stroke-dasharray="250 390" transform="rotate(-190 100 95)"
        />
        <circle cx="100" cy="95" r="47" fill="none" stroke="#eef0f6" stroke-width="6" />
        <circle
          cx="100" cy="95" r="47" fill="none" stroke="#f0566b" stroke-width="6" stroke-linecap="round"
          stroke-dasharray="170 296" transform="rotate(-200 100 95)"
        />
        <text x="100" y="103" text-anchor="middle" class="donut-total">$85k</text>
      </svg>
      <div class="sales-row">
        <span><b>$342.000</b><span>Total sales</span></span>
        <span><b>$200.000</b><span>Spendings</span></span>
      </div>
    </section>
  `,
  styles: [`
    .conv-sub { font-size: 10px; color: var(--primary-grey); margin: 2px 0 8px; line-height: 1.5; }
    .donut { width: 100%; height: auto; display: block; }
    .donut-total { font-size: 22px; font-weight: 900; fill: var(--primary-dark); }
    .sales-row {
      display: grid;
      grid-template-columns: 1fr 1fr;
      margin-top: 12px;
      padding-top: 12px;
      border-top: 1px solid var(--outline);
    }
    .sales-row > span { display: flex; flex-direction: column; align-items: center; gap: 2px; }
    .sales-row b { font-size: 13px; }
    .sales-row span span { font-size: 10px; color: var(--primary-grey); }
  `],
})
export class ConversionDonut {
  @Input() total = '$85k';
}
