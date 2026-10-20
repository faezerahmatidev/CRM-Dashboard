import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SortControl } from '../sort-control/sort-control';
import { ViewToggle, ProjectViewMode } from '../view-toggle/view-toggle';

/**
 * Standard toolbar for list/grid views: optional LIST/GRID switch on the left,
 * optional SORT control plus projected actions on the right.
 * Set `mode`/`sortValue` to null to hide that control.
 */
@Component({
  selector: 'app-view-toolbar',
  standalone: true,
  imports: [ViewToggle, SortControl],
  template: `
    <div class="view-toolbar">
      <span class="vt-group">
        <ng-content select="[toolbar-start]" />
        @if (mode !== null) {
          <app-view-toggle [mode]="mode" (modeChange)="modeChange.emit($event)" />
        }
      </span>
      <span class="vt-group">
        @if (sortValue !== null) {
          <app-sort-control [prefix]="sortPrefix" [value]="sortValue" (toggled)="sortToggle.emit()" />
        }
        <ng-content select="[toolbar-end]" />
      </span>
    </div>
  `,
  styles: [`
    .view-toolbar {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      margin-bottom: 12px;
    }
    .vt-group { display: inline-flex; align-items: center; gap: 12px; min-width: 0; }
  `],
})
export class ViewToolbar {
  @Input() mode: ProjectViewMode | null = 'list';
  @Input() sortValue: string | null = 'A-Z';
  @Input() sortPrefix = 'SORT:';
  @Output() modeChange = new EventEmitter<ProjectViewMode>();
  @Output() sortToggle = new EventEmitter<void>();
}
