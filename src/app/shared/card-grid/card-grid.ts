import { Component, Input } from '@angular/core';

/** Responsive card grid wrapper: N columns on desktop, 2 under 1100px. */
@Component({
  selector: 'app-card-grid',
  standalone: true,
  template: `
    <div class="card-grid-scroll">
      <div
        class="card-grid"
        [style.grid-template-columns]="'repeat(' + columns + ', minmax(0, 1fr))'"
      >
        <ng-content />
      </div>
    </div>
  `,
  styles: [`
    .card-grid-scroll { flex: 1; min-height: 0; overflow-y: auto; }
    .card-grid { display: grid; gap: 14px; padding-bottom: 8px; }
    @media (max-width: 1100px) {
      .card-grid { grid-template-columns: repeat(2, minmax(0, 1fr)) !important; }
    }
  `],
})
export class CardGrid {
  @Input() columns = 4;
}
