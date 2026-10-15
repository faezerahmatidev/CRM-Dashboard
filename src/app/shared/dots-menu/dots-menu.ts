import { Component, ElementRef, EventEmitter, HostListener, Output } from '@angular/core';

/** Dots button opening a small Edit/Delete popup (fixed-positioned, never clipped). */
@Component({
  selector: 'app-dots-menu',
  standalone: true,
  template: `
    <button class="dots-btn" type="button" aria-label="More actions" (click)="toggle($event)">···</button>
    @if (open) {
      <div class="dots-pop" [style.left.px]="popX" [style.top.px]="popY" (click)="$event.stopPropagation()">
        <button type="button" (click)="act('edit')">Edit</button>
        <button type="button" class="danger" (click)="act('remove')">Delete</button>
      </div>
    }
  `,
  styles: [`
    :host { display: inline-block; }
    .dots-btn {
      border: 1px solid var(--outline);
      background: #fff;
      border-radius: 8px;
      width: 34px;
      height: 34px;
      font-size: 14px;
      font-weight: 900;
      letter-spacing: 1px;
      color: var(--primary-grey);
      cursor: pointer;
      padding: 0 0 4px 1px;
    }
    .dots-btn:hover { color: var(--primary); border-color: var(--primary); }
    .dots-pop {
      position: fixed;
      z-index: 2000;
      width: 140px;
      background: #fff;
      border: 1px solid var(--outline);
      border-radius: 10px;
      box-shadow: 0 12px 32px rgb(28 29 33 / 0.16);
      padding: 6px;
      display: flex;
      flex-direction: column;
      gap: 2px;
    }
    .dots-pop button {
      border: 0;
      background: transparent;
      cursor: pointer;
      text-align: left;
      font-size: 12px;
      font-weight: 700;
      color: var(--primary-dark);
      border-radius: 7px;
      padding: 9px 12px;
    }
    .dots-pop button:hover { background: var(--bg-light); }
    .dots-pop button.danger { color: #f0566b; }
    .dots-pop button.danger:hover { background: #ffe9ec; }
  `],
})
export class DotsMenu {
  open = false;
  popX = 0;
  popY = 0;
  @Output() edit = new EventEmitter<void>();
  @Output() remove = new EventEmitter<void>();

  constructor(private el: ElementRef<HTMLElement>) {}

  toggle(ev: MouseEvent): void {
    ev.stopPropagation();
    if (this.open) {
      this.close();
      return;
    }
    const r = this.el.nativeElement.getBoundingClientRect();
    this.popX = Math.max(8, r.right - 140);
    this.popY = window.innerHeight - r.bottom < 130 ? Math.max(8, r.top - 100) : r.bottom + 6;
    this.open = true;
  }

  @HostListener('document:click')
  @HostListener('window:resize')
  @HostListener('document:keydown.escape')
  close(): void {
    this.open = false;
  }

  act(kind: 'edit' | 'remove'): void {
    this.close();
    (kind === 'edit' ? this.edit : this.remove).emit();
  }
}
