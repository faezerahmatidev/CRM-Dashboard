import { Component, EventEmitter, Input, Output } from '@angular/core';

export type FilterIcon = 'list' | 'done' | 'pending';

export interface FilterOption {
  value: string;
  label: string;
  icon?: FilterIcon;
}

/** Pill tab switch (ALL / DONE / PENDING style) with optional leading icons. */
@Component({
  selector: 'app-filter-tabs',
  standalone: true,
  template: `
    <div class="filter-tabs" role="tablist" [attr.aria-label]="ariaLabel">
      @for (o of options; track o.value) {
        <button
          type="button"
          role="tab"
          [class.active]="o.value === active"
          [attr.aria-selected]="o.value === active"
          (click)="pick(o.value)"
        >
          @if (o.icon === 'list') {
            <svg viewBox="0 0 24 24"><path d="M8.5 6.5H20M8.5 12H20M8.5 17.5H20" /><circle cx="5" cy="6.5" r="1" /><circle cx="5" cy="12" r="1" /><circle cx="5" cy="17.5" r="1" /></svg>
          } @else if (o.icon === 'done') {
            <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="8" /><path d="m9 12.5 2 2 4-4.5" /></svg>
          } @else if (o.icon === 'pending') {
            <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="8" /><path d="M12 8v4l2.5 2.5" /></svg>
          }
          {{ o.label }}
        </button>
      }
    </div>
  `,
  styles: [`
    .filter-tabs { display: inline-flex; gap: 8px; }
    .filter-tabs button {
      display: inline-flex;
      align-items: center;
      gap: 7px;
      border: 0;
      border-radius: 8px;
      background: var(--bg-light);
      color: var(--primary);
      font-size: 10.5px;
      font-weight: 900;
      letter-spacing: 0.3px;
      padding: 9px 16px;
      cursor: pointer;
      font-family: inherit;
    }
    .filter-tabs button svg {
      width: 14px;
      height: 14px;
      stroke: currentColor;
      fill: none;
      stroke-width: 1.8;
      stroke-linecap: round;
      stroke-linejoin: round;
    }
    .filter-tabs button.active { background: var(--primary); color: #fff; }
  `],
})
export class FilterTabs {
  @Input() options: FilterOption[] = [];
  @Input() active = '';
  @Input() ariaLabel = 'Filter';
  @Output() activeChange = new EventEmitter<string>();

  pick(value: string): void {
    this.active = value;
    this.activeChange.emit(value);
  }
}
