import { Component } from '@angular/core';

@Component({
  selector: 'app-conversion-bars',
  standalone: true,
  template: `
    <section>
      <h3 class="widget-title">Conversion history</h3>
      <p class="conv-sub">Week to week performance</p>
      <svg class="bars" viewBox="0 0 220 120" role="img" aria-label="Weekly conversion bar chart">
        @for (b of bars; track $index) {
          <rect [attr.x]="12 + $index * 17" [attr.y]="110 - b[0]" [attr.width]="5" [attr.height]="b[0]" rx="2.5" fill="#5e81f4" />
          <rect [attr.x]="12 + $index * 17" [attr.y]="110 - b[0] - b[1]" [attr.width]="5" [attr.height]="b[1]" rx="2.5" fill="#7ce7ac" />
        }
      </svg>
    </section>
  `,
  styles: [`
    .conv-sub { font-size: 10px; color: var(--primary-grey); margin: 2px 0 8px; }
    .bars { width: 100%; height: auto; display: block; }
  `],
})
export class ConversionBars {
  // [blue height, green top height]
  bars: Array<[number, number]> = [
    [52, 0], [70, 18], [44, 30], [62, 12], [38, 22], [74, 16],
    [50, 28], [66, 10], [42, 20], [58, 26], [48, 14], [68, 22],
  ];
}
