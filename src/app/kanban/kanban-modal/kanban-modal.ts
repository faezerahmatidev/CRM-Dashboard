import { Component, ElementRef, EventEmitter, HostListener, Input, OnChanges, Output, SimpleChanges, ViewChild, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserAvatar } from '../../shared/user-avatar/user-avatar';
import { KanbanCard, KanbanColumn } from '../kanban-data';
import { KanbanStore } from '../kanban-store';

@Component({
  selector: 'app-kanban-modal',
  standalone: true,
  imports: [FormsModule, UserAvatar],
  templateUrl: './kanban-modal.html',
  styleUrl: './kanban-modal.scss',
})
export class KanbanModal implements OnChanges {
  private store = inject(KanbanStore);

  /** Null = add-new mode, set = description mode. */
  @Input() card: KanbanCard | null = null;
  @Input() column: KanbanColumn = 'todo';
  @Input() open = false;
  @Output() openChange = new EventEmitter<boolean>();

  @ViewChild('dialog') dialog?: ElementRef<HTMLElement>;

  title = '';
  description = '';
  checklistDraft = '';
  comment = '';
  checklistDone: boolean[] = [];
  markComplete = false;
  private lastFocused: Element | null = null;

  get isNew(): boolean {
    return this.card === null;
  }

  get createdLabel(): string {
    return this.card?.created ?? '07 Jun 2019';
  }

  get dueLabel(): string {
    return this.card?.due ?? '14 Aug 2018';
  }

  get tagLabel(): string {
    return this.card?.tag ?? 'Spotify';
  }

  get doneCount(): number {
    return this.checklistDone.filter(Boolean).length;
  }

  get totalCount(): number {
    return Math.max(this.checklistDone.length, 1);
  }

  get progressPct(): number {
    return Math.round((this.doneCount / this.totalCount) * 100);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['open']?.currentValue === true) this.prefill();
  }

  toggleCheck(i: number): void {
    this.checklistDone = this.checklistDone.map((d, idx) => (idx === i ? !d : d));
  }

  addChecklistItem(): void {
    const v = this.checklistDraft.trim();
    if (!v || !this.card) return;
    const next = [...this.card.checklist, { title: v, done: false }];
    this.store.update(this.card.id, { checklist: next });
    this.card = { ...this.card, checklist: next };
    this.checklistDone = [...this.checklistDone, false];
    this.checklistDraft = '';
  }

  toggleMarkComplete(): void {
    this.markComplete = !this.markComplete;
    if (this.card) {
      this.store.move(this.card.id, this.markComplete ? 'done' : 'progress');
      this.card = { ...this.card, column: this.markComplete ? 'done' : 'progress' };
    }
  }

  submit(): void {
    if (this.isNew) {
      const name = this.title.trim();
      if (name) this.store.addTo(this.column, name);
    } else if (this.card && this.title.trim()) {
      this.store.update(this.card.id, { title: this.title.trim(), description: this.description });
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
    this.comment = '';
    this.checklistDraft = '';
    if (this.card) {
      this.title = this.card.title;
      this.description = this.card.description;
      this.checklistDone = this.card.checklist.map((c) => c.done);
      this.markComplete = this.card.column === 'done';
    } else {
      this.title = '';
      this.description = '';
      this.checklistDone = [];
      this.markComplete = false;
    }
  }
}
