import { Component } from '@angular/core';

/**
 * Attribute selector (like DashPage): standard flex-column card body shared by
 * every list/grid view. Per-view extras (gaps, FAB padding) stay in view CSS.
 */
@Component({
  selector: 'section[app-view-card]',
  standalone: true,
  template: `<ng-content />`,
  styles: [`
    :host {
      display: flex;
      flex-direction: column;
      min-height: 0;
      overflow: hidden;
      flex: 1;
    }
  `],
})
export class ViewCard {}
