import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DashCard } from '../shared/dash-card/dash-card';

export interface AreaLine {
  d: string;
  color: string;
  width?: number;
  dash?: string;
  /** Closed fill shape + gradient for the area under the line. */
  area?: { d: string; from: string; to: string };
}

export interface AreaMarker {
  x: number;
  y: number;
  color: string;
  label?: string;
  value?: string;
}

export interface AreaSet {
  lines: AreaLine[];
  marker?: AreaMarker;
}

export interface AreaLegend {
  label: string;
  color: string;
}

/**
 * Area/line chart card (reports): gradient fills, marker tooltip,
 * x labels and an optional series legend.
 */
@Component({
  selector: 'app-area-chart',
  standalone: true,
  imports: [DashCard],
  template: `
    <app-dash-card
      [title]="title"
      [tabs]="tabs"
      [tab]="tab"
      (tabChange)="tabChange.emit($event)"
      [calendar]="calendar"
    >
      @if (legend.length) {
        <div class="chart-legend">
          @for (l of legend; track l.label) {
            <span><i [style.background]="l.color"></i>{{ l.label }}</span>
          }
        </div>
      }
      <svg class="chart" [attr.viewBox]="viewBox" role="img" [attr.aria-label]="title + ' chart'">
        <defs>
          @for (line of set.lines; track $index) {
            @if (line.area; as a) {
              <linearGradient [id]="'ag' + $index" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" [attr.stop-color]="a.from" stop-opacity="0.45" />
                <stop offset="1" [attr.stop-color]="a.to" stop-opacity="0.05" />
              </linearGradient>
            }
          }
        </defs>
        @for (line of set.lines; track $index) {
          @if (line.area; as a) {
            <path [attr.d]="a.d" [attr.fill]="'url(#ag' + $index + ')'" />
          }
          <path
            [attr.d]="line.d"
            fill="none"
            [attr.stroke]="line.color"
            [attr.stroke-width]="line.width ?? 2.5"
            [attr.stroke-dasharray]="line.dash"
            stroke-linecap="round"
          />
        }
        @if (set.marker; as m) {
          <circle [attr.cx]="m.x" [attr.cy]="m.y" r="5" [attr.fill]="m.color" stroke="#fff" stroke-width="2.5" />
          @if (m.label) {
            <g>
              <rect [attr.x]="tipX" [attr.y]="tipY" [attr.width]="tipWidth" height="44" rx="6" fill="#fff" stroke="#f0f0f3" />
              <text [attr.x]="tipX + tipWidth / 2" [attr.y]="tipY + 18" text-anchor="middle" font-size="10" fill="#8181a5">{{ m.label }}</text>
              <text [attr.x]="tipX + tipWidth / 2" [attr.y]="tipY + 34" text-anchor="middle" font-size="12" font-weight="bold" fill="#1c1d21">{{ m.value }}</text>
            </g>
          }
        }
        @for (label of xLabels; track $index) {
          <text
            [attr.x]="labelStartX + $index * labelStepX"
            [attr.y]="labelY"
            text-anchor="middle"
            font-size="10"
            fill="#9a9ab0"
          >{{ label }}</text>
        }
      </svg>
      <ng-content />
    </app-dash-card>
  `,
  styles: [`
    :host { display: block; height: 100%; }
    .chart-legend { display: flex; gap: 16px; margin: 2px 0 8px; }
    .chart-legend span { display: inline-flex; align-items: center; gap: 7px; font-size: 10px; color: var(--primary-grey); }
    .chart-legend i { width: 8px; height: 8px; border-radius: 50%; }
    .chart { width: 100%; height: auto; display: block; }
  `],
})
export class AreaChart {
  @Input() title = '';
  @Input() tabs?: string[];
  @Input() tab = '';
  @Output() tabChange = new EventEmitter<string>();
  @Input() calendar = false;
  @Input() legend: AreaLegend[] = [];

  /** Chart data keyed by tab name. Use key '' when the card has no tabs. */
  @Input() sets: Record<string, AreaSet> = {};
  /** Key of the active set; defaults to the bound tab, falls back to ''. */
  get set(): AreaSet {
    return this.sets[this.tab] ?? this.sets[''] ?? { lines: [] };
  }

  @Input() xLabels: string[] = [];
  @Input() viewBox = '0 0 560 200';
  @Input() labelY = 186;
  @Input() labelStartX = 30;
  @Input() labelStepX = 80;
  @Input() tipX = 238;
  @Input() tipY = 34;
  @Input() tipWidth = 86;
}
