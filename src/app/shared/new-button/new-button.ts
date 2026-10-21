import { Component, EventEmitter, Input, Output } from '@angular/core';

/** "＋ NEW ..." pill button opening a creation dialog. */
@Component({
  selector: 'app-new-button',
  standalone: true,
  template: `
    <button class="new-btn" type="button" (click)="pressed.emit()">
      <svg viewBox="0 0 24 24"><path d="M12 20h9M16.5 3.5a2.1 2.1 0 0 1 3 3L7.5 18.5 3.5 19.5l1-4L16.5 3.5Z" /></svg>
      {{ label }}
    </button>
  `,
  styles: [`
    .new-btn {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      border: 0;
      border-radius: 8px;
      background: var(--btn-rest-bg);
      color: var(--primary);
      font-size: 10.5px;
      font-weight: 900;
      padding: 10px 18px;
      cursor: pointer;
      font-family: inherit;
      white-space: nowrap;
    }
    .new-btn:hover { background: var(--primary); color: #fff; }
    .new-btn svg {
      width: 14px;
      height: 14px;
      stroke: currentColor;
      fill: none;
      stroke-width: 1.8;
      stroke-linecap: round;
      stroke-linejoin: round;
    }
  `],
})
export class NewButton {
  @Input() label = 'NEW CONVERSATION';
  @Output() pressed = new EventEmitter<void>();
}
