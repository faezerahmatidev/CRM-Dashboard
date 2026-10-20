import { Component, ElementRef, EventEmitter, HostListener, Input, OnChanges, Output, SimpleChanges, ViewChild, inject } from '@angular/core';
import { CatalogThumb } from '../shared/catalog-thumb/catalog-thumb';
import { PURCHASES } from '../products-data';
import { ProductsStore } from '../products-store';

@Component({
  selector: 'app-sale-modal',
  standalone: true,
  imports: [CatalogThumb],
  templateUrl: './sale-modal.html',
  styleUrl: './sale-modal.scss',
})
export class SaleModal implements OnChanges {
  private store = inject(ProductsStore);

  @Input() open = false;
  @Output() openChange = new EventEmitter<boolean>();

  @ViewChild('dialog') dialog?: ElementRef<HTMLElement>;

  purchases = PURCHASES;
  private lastFocused: Element | null = null;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['open']?.currentValue === true) {
      this.lastFocused = document.activeElement;
      setTimeout(() => this.dialog?.nativeElement.focus());
    }
  }

  close(): void {
    this.open = false;
    this.openChange.emit(false);
    this.store.setSaleOpen(false);
    if (this.lastFocused instanceof HTMLElement) this.lastFocused.focus();
  }

  trapTab(ev: Event): void {
    if (!(ev instanceof KeyboardEvent)) return;
    const root = this.dialog?.nativeElement;
    if (!root) return;
    const items = [...root.querySelectorAll<HTMLElement>('button, input, select, textarea, a[href]')].filter(
      (el) => !el.hasAttribute('disabled') && el.tabIndex >= 0,
    );
    if (!items.length) return;
    const first = items[0];
    const last = items[items.length - 1];
    const active = document.activeElement as HTMLElement | null;
    if (ev.shiftKey && (active === first || active === root)) {
      last.focus();
      ev.preventDefault();
    } else if (!ev.shiftKey && active === last) {
      first.focus();
      ev.preventDefault();
    }
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    if (this.open) this.close();
  }
}
