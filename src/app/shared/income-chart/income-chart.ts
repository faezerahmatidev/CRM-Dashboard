import { Component, Input } from '@angular/core';

/** Green income line chart with a March $48.200 marker (profile sales Figma). */
@Component({
  selector: 'app-income-chart',
  standalone: true,
  template: `
    <svg class="income" viewBox="0 0 320 130" role="img" aria-label="Income chart">
      <path
        d="M 0,20 C 40,25 55,95 95,90 C 135,85 145,55 185,62 C 225,69 235,20 275,18 C 295,17 305,28 320,34"
        fill="none"
        stroke="#7ce7ac"
        stroke-width="2"
        stroke-linecap="round"
      />
      <line x1="200" y1="58" x2="200" y2="118" stroke="#7ce7ac" stroke-width="1.5" stroke-dasharray="4 4" />
      <circle cx="200" cy="58" r="5" fill="#7ce7ac" stroke="#fff" stroke-width="2.5" />
      <g>
        <rect x="216" y="40" width="92" height="44" rx="8" fill="#fff" stroke="#f0f0f3" />
        <text x="228" y="58" class="tip-sub">March</text>
        <text x="228" y="75" class="tip-main">$48.200</text>
      </g>
    </svg>
  `,
  styles: [`
    .income { width: 100%; height: auto; display: block; }
    .tip-sub { font-size: 10px; fill: var(--primary-grey); }
    .tip-main { font-size: 12px; font-weight: 900; fill: var(--primary-dark); }
  `],
})
export class IncomeChart {
  @Input() marker = true;
}
