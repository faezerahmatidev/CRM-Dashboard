import { Component, EventEmitter, Input, Output } from '@angular/core';

export type ProjectViewMode = 'list' | 'grid';

/** LIST / GRID segmented switch used on top of project tables. */
@Component({
  selector: 'app-view-toggle',
  standalone: true,
  template: `
    <div class="view-toggle" role="tablist">
      <button type="button" role="tab" [class.active]="mode === 'list'" (click)="pick('list')">
        <svg viewBox="0 0 24 24"><path d="M8.5 6.5H20M8.5 12H20M8.5 17.5H20" /><circle cx="5" cy="6.5" r="1" /><circle cx="5" cy="12" r="1" /><circle cx="5" cy="17.5" r="1" /></svg>
        LIST
      </button>
      <button type="button" role="tab" [class.active]="mode === 'grid'" (click)="pick('grid')">
        <svg viewBox="0 0 24 24"><rect x="4" y="4" width="7" height="7" rx="1.5" /><rect x="13" y="4" width="7" height="7" rx="1.5" /><rect x="4" y="13" width="7" height="7" rx="1.5" /><rect x="13" y="13" width="7" height="7" rx="1.5" /></svg>
        GRID
      </button>
    </div>
  `,
  styles: [`
    .view-toggle { display: inline-flex; gap: 4px; background: var(--bg-light); border-radius: 10px; padding: 4px; }
    .view-toggle button {
      border: 0; background: transparent; cursor: pointer;
      display: inline-flex; align-items: center; gap: 7px;
      font-size: 11px; font-weight: 900; letter-spacing: 0.4px;
      color: var(--primary-grey); padding: 9px 16px; border-radius: 8px;
    }
    .view-toggle button svg { width: 14px; height: 14px; stroke: currentColor; fill: none; stroke-width: 2; stroke-linecap: round; stroke-linejoin: round; }
    .view-toggle button.active { background: var(--primary); color: #fff; box-shadow: 0 3px 10px rgb(94 129 244 / 0.4); }
  `],
})
export class ViewToggle {
  @Input() mode: ProjectViewMode = 'list';
  @Output() modeChange = new EventEmitter<ProjectViewMode>();

  pick(mode: ProjectViewMode): void {
    this.mode = mode;
    this.modeChange.emit(mode);
  }
}
