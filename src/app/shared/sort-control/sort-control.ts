import { Component, EventEmitter, Input, Output } from '@angular/core';

/** "SORT: A-Z" control used on top of project tables. */
@Component({
  selector: 'app-sort-control',
  standalone: true,
  template: `
    <button class="sort-btn" type="button" (click)="toggle.emit()">
      <svg viewBox="0 0 24 24"><path d="M4 7h12M4 12h8M4 17h5" /><path d="m17 9 3 3 3-3M20 12v7" /></svg>
      <span>{{ prefix }} <b>{{ value }}</b></span>
      <svg viewBox="0 0 24 24"><path d="m6 9.5 6 6 6-6" /></svg>
    </button>
  `,
  styles: [`
    .sort-btn {
      border: 0; background: transparent; cursor: pointer;
      display: inline-flex; align-items: center; gap: 7px;
      font-size: 11px; color: var(--primary-grey); padding: 6px 4px;
    }
    .sort-btn svg { width: 14px; height: 14px; stroke: currentColor; fill: none; stroke-width: 1.8; stroke-linecap: round; stroke-linejoin: round; }
    .sort-btn span { letter-spacing: 0.3px; }
    .sort-btn b { color: var(--primary-dark); }
    .sort-btn:hover { color: var(--primary); }
  `],
})
export class SortControl {
  @Input() prefix = 'SORT:';
  @Input() value = 'A-Z';
  @Output() toggle = new EventEmitter<void>();
}
