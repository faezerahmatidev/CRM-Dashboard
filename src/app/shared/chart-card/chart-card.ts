import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DashCard } from '../dash-card/dash-card';

export interface ChartLine {
  d: string;
  color: string;
  width?: number;
  dash?: string;
}

export interface ChartMarker {
  x: number;
  y: number;
  color: string;
  label?: string;
  value?: string;
}

export interface ChartSet {
  lines: ChartLine[];
  marker?: ChartMarker;
}

@Component({
  selector: 'app-chart-card',
  standalone: true,
  imports: [DashCard],
  templateUrl: './chart-card.html',
  styleUrl: './chart-card.scss',
})
export class ChartCard {
  @Input() title = '';
  @Input() tabs?: string[];
  @Input() tab = '';
  @Output() tabChange = new EventEmitter<string>();
  @Input() calendar = false;

  @Input() bigNumber?: string;
  @Input() showTrend = false;
  @Input() bigSub?: string;

  /** Chart data keyed by tab name. Use key '' when the card has no tabs. */
  @Input() sets: Record<string, ChartSet> = {};
  /** Key of the active set; defaults to the bound tab, falls back to ''. */
  get set(): ChartSet {
    return this.sets[this.tab] ?? this.sets[''] ?? { lines: [] };
  }

  @Input() xLabels: string[] = [];
  @Input() viewBox = '0 0 560 230';
  @Input() labelY = 214;
  @Input() labelStartX = 30;
  @Input() labelStepX = 83;
  @Input() tipX = 238;
  @Input() tipY = 34;
  @Input() tipWidth = 86;
}
