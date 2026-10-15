import { Component, Input } from '@angular/core';

@Component({
  // Attribute selector: host keeps the page's tag and classes.
  selector: '[app-spark-card]',
  standalone: true,
  templateUrl: './spark-card.html',
  styleUrl: './spark-card.scss',
})
export class SparkCard {
  @Input() value = '';
  @Input() sub = '';
  @Input() path = '';
  /** Marker dot as "x,y". Omit for no marker. */
  @Input() dot?: string;

  get dotX(): string {
    return this.dot?.split(',')[0] ?? '0';
  }

  get dotY(): string {
    return this.dot?.split(',')[1] ?? '0';
  }
}
