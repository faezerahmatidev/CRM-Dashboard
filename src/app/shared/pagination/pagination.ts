import { Component, EventEmitter, Input, Output } from '@angular/core';

/** Table pagination: boxed PREV / numbers / NEXT, optionally with page-size label. */
@Component({
  selector: 'app-pagination',
  standalone: true,
  template: `
    <div class="pager">
      @if (showPerPage) {
        <span class="per-page">ITEMS PER PAGE: <b>{{ perPage }}</b></span>
      } @else {
        <button class="page-btn prev" type="button" (click)="go(active - 1)" aria-label="Previous page">‹ PREV</button>
      }
      <span class="pages">
        @for (p of pages; track p) {
          <button type="button" [class.active]="p === active" (click)="go(p)">{{ p }}</button>
        }
      </span>
      @if (showPerPage) {
        <span class="arrows">
          <button type="button" (click)="go(active - 1)" aria-label="Previous page">‹</button>
          <button type="button" (click)="go(active + 1)" aria-label="Next page">›</button>
        </span>
      } @else {
        <button class="page-btn next" type="button" (click)="go(active + 1)" aria-label="Next page">NEXT ›</button>
      }
    </div>
  `,
  styles: [`
    .pager { display: flex; align-items: center; justify-content: space-between; gap: 12px; margin-top: 14px; }
    .pages { display: flex; align-items: center; gap: 6px; margin: 0 auto; }
    .pages button {
      min-width: 32px; height: 32px; padding: 0 8px;
      border: 0; border-radius: 8px; background: transparent;
      font-size: 12px; font-weight: 700; color: var(--primary-dark); cursor: pointer;
    }
    .pages button.active { background: var(--primary); color: #fff; }
    .page-btn {
      border: 0; border-radius: 8px; background: var(--bg-light);
      font-size: 11px; font-weight: 700; color: var(--primary-grey);
      padding: 9px 14px; cursor: pointer; letter-spacing: 0.3px;
    }
    .page-btn:hover { color: var(--primary); }
    .per-page { font-size: 10.5px; color: var(--primary-grey); letter-spacing: 0.3px; }
    .per-page b { color: var(--primary-dark); margin-left: 6px; }
    .arrows { display: flex; gap: 8px; }
    .arrows button {
      width: 32px; height: 32px; border: 0; border-radius: 8px; background: var(--bg-light);
      font-size: 15px; color: var(--primary-grey); cursor: pointer; line-height: 1;
    }
    .arrows button:hover { color: var(--primary); }
  `],
})
export class Pagination {
  @Input() pages = [1, 2, 3, 4, 5];
  @Input() active = 1;
  @Input() showPerPage = false;
  @Input() perPage = 15;
  @Output() pageChange = new EventEmitter<number>();

  go(page: number): void {
    const clamped = Math.min(Math.max(page, this.pages[0]), this.pages[this.pages.length - 1]);
    this.active = clamped;
    this.pageChange.emit(clamped);
  }
}
