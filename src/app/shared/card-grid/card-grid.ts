import { Component, Input } from '@angular/core';

/** Responsive card grid wrapper: N columns on desktop, 2 below the breakpoint. */
@Component({
  selector: 'app-card-grid',
  standalone: true,
  template: `
    <div class="card-grid-scroll">
      <div
        class="card-grid"
        [style.grid-template-columns]="'repeat(' + columns + ', minmax(0, 1fr))'"
        [class]="'collapse-' + collapseBelow"
      >
        <ng-content />
      </div>
    </div>
  `,
  styles: [`
    .card-grid-scroll { flex: 1; min-height: 0; overflow-y: auto; padding: 2px; }
    .card-grid { display: grid; gap: 14px; padding-bottom: 8px; }
    @media (max-width: 1100px) {
      .card-grid.collapse-1100 { grid-template-columns: repeat(2, minmax(0, 1fr)) !important; }
    }
    @media (max-width: 1500px) {
      .card-grid.collapse-1500 { grid-template-columns: repeat(2, minmax(0, 1fr)) !important; }
    }
  `],
})
export class CardGrid {
  @Input() columns = 4;
  @Input() collapseBelow: 1100 | 1500 = 1100;
}
