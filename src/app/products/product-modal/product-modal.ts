import { Component, ElementRef, EventEmitter, HostListener, Input, OnChanges, Output, SimpleChanges, ViewChild, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProductsStore } from '../products-store';

@Component({
  selector: 'app-product-modal',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './product-modal.html',
  styleUrl: './product-modal.scss',
})
export class ProductModal implements OnChanges {
  private store = inject(ProductsStore);

  @Input() open = false;
  @Output() openChange = new EventEmitter<boolean>();

  @ViewChild('dialog') dialog?: ElementRef<HTMLElement>;

  name = '';
  sku = '';
  qty = '';
  price = '';
  category = 'Select category';
  private lastFocused: Element | null = null;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['open']?.currentValue === true) this.prefill();
  }

  submit(): void {
    this.store.add(this.name, this.price);
    this.close();
  }

  close(): void {
    this.open = false;
    this.openChange.emit(false);
    this.store.setModalOpen(false);
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

  private prefill(): void {
    this.lastFocused = document.activeElement;
    setTimeout(() => this.dialog?.nativeElement.focus());
    this.name = '';
    this.sku = '';
    this.qty = '';
    this.price = '';
    this.category = 'Select category';
  }
}
