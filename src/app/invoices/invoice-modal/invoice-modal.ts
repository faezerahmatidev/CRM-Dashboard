import { Component, ElementRef, EventEmitter, HostListener, Input, OnChanges, Output, SimpleChanges, ViewChild, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ACTIVITIES, INVOICE_DETAIL, INVOICE_LINES } from '../invoices-data';
import { InvoicesStore } from '../invoices-store';

@Component({
  selector: 'app-invoice-modal',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './invoice-modal.html',
  styleUrl: './invoice-modal.scss',
})
export class InvoiceModal implements OnChanges {
  protected store = inject(InvoicesStore);

  @Input() open = false;
  @Output() openChange = new EventEmitter<boolean>();

  @ViewChild('dialog') dialog?: ElementRef<HTMLElement>;

  detail = INVOICE_DETAIL;
  lines = INVOICE_LINES;
  activities = ACTIVITIES;
  comment = '';
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
    this.store.closeDetails();
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
