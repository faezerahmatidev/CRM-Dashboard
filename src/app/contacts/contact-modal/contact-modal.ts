import { Component, ElementRef, EventEmitter, HostListener, Input, OnChanges, Output, SimpleChanges, ViewChild, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ContactAvatar } from '../../shared/contact-avatar/contact-avatar';
import { Contact, fullName } from '../contacts-data';
import { ContactsStore } from '../contacts-store';

interface CheckRow {
  title: string;
  done: boolean;
}

@Component({
  selector: 'app-contact-modal',
  standalone: true,
  imports: [FormsModule, ContactAvatar],
  templateUrl: './contact-modal.html',
  styleUrl: './contact-modal.scss',
})
export class ContactModal implements OnChanges {
  private store = inject(ContactsStore);

  /** Null = add-new mode, set = details mode. */
  @Input() contact: Contact | null = null;
  @Input() open = false;
  @Output() openChange = new EventEmitter<boolean>();

  @ViewChild('dialog') dialog?: ElementRef<HTMLElement>;

  first = '';
  last = '';
  email = '';
  phone = '';
  category = 'Developer';
  checks: CheckRow[] = [
    { title: 'Design new home page', done: true },
    { title: 'Send design samples to the customer', done: true },
    { title: 'Design few new mockups for my project', done: false },
    { title: 'Send design samples to the customer', done: false },
  ];
  private lastFocused: Element | null = null;

  nameOf = fullName;

  get isNew(): boolean {
    return this.contact === null;
  }

  get doneCount(): number {
    return this.checks.filter((c) => c.done).length;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['open']?.currentValue === true) this.prefill();
  }

  submit(): void {
    if (this.first.trim() || this.last.trim()) {
      this.store.add(this.first, this.last);
      if (this.email.trim() || this.phone.trim()) {
        const added = this.store.contacts()[0];
        this.store.update(added.id, {
          email: this.email.trim() || added.email,
          phone: this.phone.trim() || added.phone,
          role: this.category,
          tag: this.category,
        });
      }
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
    this.first = '';
    this.last = '';
    this.email = '';
    this.phone = '';
    this.category = 'Developer';
  }
}
