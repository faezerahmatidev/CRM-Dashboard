import { Component } from '@angular/core';

@Component({
  selector: 'app-conversion-area',
  standalone: true,
  template: `
    <section>
      <h3 class="widget-title">Conversion history</h3>
      <p class="conv-sub">Week to week performance</p>
      <svg class="area" viewBox="0 0 220 90" role="img" aria-label="Week to week performance area chart">
        <path d="M0 62 C 25 60, 35 30, 60 34 S 95 58, 120 50 S 160 22, 185 30 S 210 40, 220 36 L220 90 L0 90 Z" fill="#5e81f4" opacity="0.16" />
        <path d="M0 62 C 25 60, 35 30, 60 34 S 95 58, 120 50 S 160 22, 185 30 S 210 40, 220 36" fill="none" stroke="#5e81f4" stroke-width="2.5" stroke-linecap="round" />
        <path d="M0 74 C 30 72, 45 52, 70 54 S 110 70, 135 64 S 175 44, 220 52 L220 90 L0 90 Z" fill="#5e81f4" />
      </svg>
    </section>
  `,
  styles: [`
    .conv-sub { font-size: 10px; color: var(--primary-grey); margin: 2px 0 8px; }
    .area { width: 100%; height: auto; display: block; border-radius: 0 0 10px 10px; }
  `],
})
export class ConversionArea {}
