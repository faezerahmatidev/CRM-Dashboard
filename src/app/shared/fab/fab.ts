import { Component, EventEmitter, Output } from '@angular/core';

/** Floating action button pinned to a card corner. */
@Component({
  selector: 'app-fab',
  standalone: true,
  template: `
    <button class="fab" type="button" aria-label="Refresh" (click)="pressed.emit()">
      <ng-content />
    </button>
  `,
  styles: [`
    .fab {
      position: absolute;
      right: 22px;
      bottom: 22px;
      width: 44px;
      height: 44px;
      border: 0;
      border-radius: 12px;
      background: var(--primary);
      color: #fff;
      cursor: pointer;
      display: grid;
      place-items: center;
      box-shadow: 0 8px 20px rgb(94 129 244 / 0.45);
    }
    .fab:hover {
      background: var(--primary-hover);
    }
    .fab ::ng-deep svg {
      width: 19px;
      height: 19px;
      stroke: currentColor;
      fill: none;
      stroke-width: 2;
      stroke-linecap: round;
      stroke-linejoin: round;
    }
  `],
})
export class Fab {
  @Output() pressed = new EventEmitter<void>();
}
