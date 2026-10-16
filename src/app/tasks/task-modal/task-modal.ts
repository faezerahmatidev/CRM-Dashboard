import { Component, ElementRef, EventEmitter, HostListener, Input, OnChanges, Output, SimpleChanges, ViewChild, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserAvatar } from '../../shared/user-avatar/user-avatar';
import { TaskItem } from '../tasks-data';
import { TasksStore } from '../tasks-store';

@Component({
  selector: 'app-task-modal',
  standalone: true,
  imports: [FormsModule, UserAvatar],
  templateUrl: './task-modal.html',
  styleUrl: './task-modal.scss',
})
export class TaskModal implements OnChanges {
  private store = inject(TasksStore);

  /** Null = add-new mode, set = description mode. */
  @Input() task: TaskItem | null = null;
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
  private taskId: string | null = null;

  get isNew(): boolean {
    return this.task === null;
  }

  get createdLabel(): string {
    return this.task?.created ?? '07 Jun 2019';
  }

  get dueLabel(): string {
    return this.task?.due ?? '14 Aug 2018';
  }

  get tagLabel(): string {
    return this.task?.tag ?? 'Spotify';
  }

  get checklist(): { title: string; done: boolean }[] {
    if (this.task) return this.task.checklist;
    return [];
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
    if (!v || !this.task) return;
    const next = [...this.task.checklist, { title: v, done: false }];
    this.store.update(this.task.id, { checklist: next });
    this.task = { ...this.task, checklist: next };
    this.checklistDone = [...this.checklistDone, false];
    this.checklistDraft = '';
  }

  toggleMarkComplete(): void {
    this.markComplete = !this.markComplete;
    if (this.task) {
      this.store.toggleDone(this.task.id);
      this.task = { ...this.task, done: this.markComplete };
    }
  }

  submit(): void {
    if (this.isNew) {
      const name = this.title.trim();
      if (name) this.store.add(name);
    } else if (this.task && this.title.trim()) {
      this.store.update(this.task.id, { title: this.title.trim(), description: this.description });
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
    if (this.task) {
      this.taskId = this.task.id;
      this.title = this.task.title;
      this.description = this.task.description;
      this.checklistDone = this.task.checklist.map((c) => c.done);
      this.markComplete = this.task.done;
    } else {
      this.taskId = null;
      this.title = '';
      this.description = '';
      this.checklistDone = [];
      this.markComplete = false;
    }
  }
}
