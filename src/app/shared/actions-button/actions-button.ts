import { Component, EventEmitter, Input, Output } from '@angular/core';

/** "... LABEL" text action used at the end of catalog toolbars. */
@Component({
  selector: 'app-actions-button',
  standalone: true,
  template: `
    <button class="actions-btn" type="button" (click)="pressed.emit()">
      <svg viewBox="0 0 24 24"><circle cx="6" cy="12" r="1.2"/><circle cx="12" cy="12" r="1.2"/><circle cx="18" cy="12" r="1.2"/></svg>
      {{ label }}
    </button>
  `,
  styles: [`
    .actions-btn {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      border: 0;
      background: transparent;
      cursor: pointer;
      font-size: 10.5px;
      font-weight: 900;
      color: var(--primary-dark);
      font-family: inherit;
      padding: 6px 4px;
      white-space: nowrap;
    }
    .actions-btn:hover { color: var(--primary); }
    .actions-btn svg { width: 16px; height: 16px; fill: currentColor; }
  `],
})
export class ActionsButton {
  @Input() label = 'ALL ACTIONS';
  @Output() pressed = new EventEmitter<void>();
}
