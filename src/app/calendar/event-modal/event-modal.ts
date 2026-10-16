import { Component, ElementRef, EventEmitter, HostListener, Input, OnChanges, Output, SimpleChanges, ViewChild, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CalEvent } from '../calendar-data';
import { CalendarStore } from '../calendar-store';

@Component({
  selector: 'app-event-modal',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './event-modal.html',
  styleUrl: './event-modal.scss',
})
export class EventModal implements OnChanges {
  private store = inject(CalendarStore);

  /** Null = add-new mode, set = details mode. */
  @Input() event: CalEvent | null = null;
  @Input() draftDate = '';
  @Input() open = false;
  @Output() openChange = new EventEmitter<boolean>();

  @ViewChild('dialog') dialog?: ElementRef<HTMLElement>;

  title = '';
  location = '';
  comment = '';
  markComplete = false;
  private lastFocused: Element | null = null;

  get isNew(): boolean {
    return this.event === null;
  }

  get dateLabel(): string {
    if (!this.event) return '14 Aug 2018';
    const [y, m, d] = this.event.date.split('-').map(Number);
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${String(d).padStart(2, '0')} ${months[m - 1]} ${y}`;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['open']?.currentValue === true) this.prefill();
  }

  toggleMarkComplete(): void {
    this.markComplete = !this.markComplete;
    if (this.event) this.store.toggleDone(this.event.id);
  }

  submit(): void {
    if (this.isNew) {
      this.store.add(this.draftDate, this.title);
    } else if (this.event && this.title.trim()) {
      this.store.update(this.event.id, { title: this.title.trim() });
    }
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
    this.location = '';
    this.comment = '';
    if (this.event) {
      this.title = this.event.title;
      this.markComplete = this.event.done;
    } else {
      this.title = '';
      this.markComplete = false;
    }
  }
}
