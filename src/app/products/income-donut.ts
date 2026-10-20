import { Component, Input } from '@angular/core';

export interface DonutSlice {
  label: string;
  value: string;
  color: string;
  /** Fraction of the circle, 0-1. */
  fraction: number;
}

/** Pie donut with a center total and a channel legend (income breakdown). */
@Component({
  selector: 'app-income-donut',
  standalone: true,
  template: `
    <svg class="pie" viewBox="0 0 200 190" role="img" [attr.aria-label]="total + ' income breakdown'">
      @for (s of arcs; track $index) {
        <circle
          cx="100" cy="95" r="70" fill="none" [attr.stroke]="s.color"
          stroke-width="26" [attr.stroke-dasharray]="s.dash + ' 440'"
          [attr.transform]="'rotate(' + (s.start - 90) + ' 100 95)'"
        />
      }
      <text x="100" y="103" text-anchor="middle" class="pie-total">{{ total }}</text>
    </svg>
    <ul class="legend">
      @for (s of slices; track s.label) {
        <li>
          <span class="lg-label"><i [style.background]="s.color"></i>{{ s.label }}</span>
          <b>{{ s.value }}</b>
        </li>
      }
    </ul>
  `,
  styles: [`
    .pie { width: 100%; height: auto; display: block; }
    .pie-total { font-size: 22px; font-weight: 900; fill: var(--primary-dark); }
    .legend { list-style: none; margin: 12px 0 0; padding: 12px 0 0; border-top: 1px solid var(--outline); display: grid; grid-template-columns: 1fr 1fr; gap: 10px 16px; }
    .legend li { display: flex; align-items: center; justify-content: space-between; gap: 8px; font-size: 10.5px; }
    .lg-label { display: inline-flex; align-items: center; gap: 7px; color: var(--primary-grey); }
    .lg-label i { width: 8px; height: 8px; border-radius: 50%; }
    .legend b { font-size: 11px; }
  `],
})
export class IncomeDonut {
  @Input() total = '$85k';
  @Input() slices: DonutSlice[] = [
    { label: 'Marketing Channels', value: '$22.0k', color: '#5e81f4', fraction: 0.16 },
    { label: 'Offline Channels', value: '$18.6k', color: '#f4be5e', fraction: 0.34 },
    { label: 'Direct Sales', value: '$8.4k', color: '#7ce7ac', fraction: 0.2 },
    { label: 'Other Channels', value: '$15.3k', color: '#ff808b', fraction: 0.3 },
  ];

  get arcs(): Array<{ color: string; dash: number; start: number }> {
    const unit = 2 * Math.PI * 70;
    let acc = 0;
    return this.slices.map((s) => {
      const arc = { color: s.color, dash: Math.max(s.fraction * unit - 2, 1), start: (acc / 1) * 360 };
      acc += s.fraction;
      return arc;
    });
  }
}
