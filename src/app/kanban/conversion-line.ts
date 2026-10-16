import { Component } from '@angular/core';

/** Smooth line/area chart from the Kanban Figma (Conversion history). */
@Component({
  selector: 'app-conversion-line',
  standalone: true,
  template: `
    <section>
      <h3 class="widget-title">Conversion history</h3>
      <p class="conv-sub">Week to week performance</p>
      <svg class="line" viewBox="0 0 220 120" role="img" aria-label="Weekly conversion line chart">
        <defs>
          <linearGradient id="kanban-area" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stop-color="#5e81f4" stop-opacity="0.16" />
            <stop offset="1" stop-color="#5e81f4" stop-opacity="0.02" />
          </linearGradient>
        </defs>
        <path
          d="M -4,86 C 20,74 34,90 58,84 C 82,78 92,50 122,45 C 150,40 162,60 190,62 C 200,63 210,61 224,58 L 224,120 L -4,120 Z"
          fill="url(#kanban-area)"
        />
        <path
          d="M -4,86 C 20,74 34,90 58,84 C 82,78 92,50 122,45 C 150,40 162,60 190,62 C 200,63 210,61 224,58"
          fill="none"
          stroke="#5e81f4"
          stroke-width="2"
          stroke-linecap="round"
        />
        <circle cx="122" cy="45" r="4.5" fill="#5e81f4" stroke="#fff" stroke-width="2.5" />
      </svg>
      <div class="sales-row">
        <span><b>$342.000</b><span>Total sales</span></span>
        <span><b>$200.000</b><span>Spendings</span></span>
      </div>
    </section>
  `,
  styles: [`
    .conv-sub { font-size: 10px; color: var(--primary-grey); margin: 2px 0 8px; }
    .line { width: 100%; height: auto; display: block; }
    .sales-row {
      display: grid;
      grid-template-columns: 1fr 1fr;
      margin-top: 12px;
      padding-top: 12px;
      border-top: 1px solid var(--outline);
    }
    .sales-row > span {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 2px;
    }
    .sales-row b { font-size: 13px; }
    .sales-row span span { font-size: 10px; color: var(--primary-grey); }
  `],
})
export class ConversionLine {}
