import { Component, Input } from '@angular/core';

/** Star rating readout: "★ 4.2 / 5.0" line plus an optional 5-star row. */
@Component({
  selector: 'app-rating-stars',
  standalone: true,
  template: `
    @if (mode === 'stars') {
      <span class="stars" role="img" [attr.aria-label]="'Rated ' + value + ' out of ' + max">
        @for (s of slots; track $index) {
          <svg viewBox="0 0 24 24" [class.lit]="$index < lit"><path d="M12 3.5l2.6 5.4 5.9.8-4.3 4.1 1 5.8-5.2-2.8-5.2 2.8 1-5.8L3.5 9.7l5.9-.8L12 3.5Z" /></svg>
        }
        <b>{{ value }} / {{ max }}.0</b>
      </span>
    } @else {
      <span class="row" role="img" [attr.aria-label]="'Rated ' + value + ' out of ' + max">
        <svg viewBox="0 0 24 24"><path d="M12 3.5l2.6 5.4 5.9.8-4.3 4.1 1 5.8-5.2-2.8-5.2 2.8 1-5.8L3.5 9.7l5.9-.8L12 3.5Z" /></svg>
        <b>{{ value }} / {{ max }}.0</b>
      </span>
    }
  `,
  styles: [`
    .row, .stars { display: inline-flex; align-items: center; gap: 6px; white-space: nowrap; }
    .row svg { width: 13px; height: 13px; fill: var(--primary); }
    .row b, .stars b { font-size: 11.5px; }
    .stars svg { width: 12px; height: 12px; fill: var(--outline); }
    .stars svg.lit { fill: var(--primary); }
  `],
})
export class RatingStars {
  @Input() value = '4.2';
  @Input() max = 5;
  @Input() mode: 'row' | 'stars' = 'row';

  get slots(): number[] {
    return Array.from({ length: this.max }, (_, i) => i);
  }

  get lit(): number {
    return Math.round(Number.parseFloat(this.value) || 0);
  }
}
