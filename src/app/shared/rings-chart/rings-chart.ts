import { Component, Input } from '@angular/core';

export interface RingSegment {
  color: string;
  /** Visible arc length in SVG dash units. */
  dash: string;
  radius: number;
  width: number;
  rotate: number;
}

/** Concentric ring chart with a center total and a sales/spendings footer. */
@Component({
  selector: 'app-rings-chart',
  standalone: true,
  template: `
    <section>
      <h3 class="widget-title">{{ title }}</h3>
      <p class="conv-sub">{{ sub }}</p>
      <svg class="rings" viewBox="0 0 200 190" role="img" [attr.aria-label]="title + ' total ' + total">
        @for (r of rings; track $index) {
          <circle cx="100" cy="95" [attr.r]="r.radius" fill="none" stroke="#eef0f6" [attr.stroke-width]="r.width" />
          <circle
            cx="100" cy="95" [attr.r]="r.radius" fill="none" [attr.stroke]="r.color"
            [attr.stroke-width]="r.width" stroke-linecap="round"
            [attr.stroke-dasharray]="r.dash" [attr.transform]="'rotate(' + r.rotate + ' 100 95)'"
          />
        }
        <text x="100" y="103" text-anchor="middle" class="rings-total">{{ total }}</text>
      </svg>
      <div class="sales-row">
        <span><b>{{ sales }}</b><span>Total sales</span></span>
        <span><b>{{ spendings }}</b><span>Spendings</span></span>
      </div>
    </section>
  `,
  styles: [`
    .conv-sub { font-size: 10px; color: var(--primary-grey); margin: 2px 0 8px; line-height: 1.5; }
    .rings { width: 100%; height: auto; display: block; }
    .rings-total { font-size: 22px; font-weight: 900; fill: var(--primary-dark); }
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
export class RingsChart {
  @Input() title = 'Conversion history';
  @Input() sub = 'Week to week performance';
  @Input() total = '$85k';
  @Input() sales = '$342.000';
  @Input() spendings = '$200.000';
  @Input() rings: RingSegment[] = [
    { color: '#5e81f4', dash: '367 490', radius: 78, width: 7, rotate: -210 },
    { color: '#8181a5', dash: '250 390', radius: 62, width: 6, rotate: -190 },
    { color: '#f0566b', dash: '170 296', radius: 47, width: 6, rotate: -200 },
  ];
}
