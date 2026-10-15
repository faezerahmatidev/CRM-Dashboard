import { Component, ElementRef, EventEmitter, HostListener, Input, OnChanges, Output, SimpleChanges, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AvatarStack, StackMember } from '../../shared/avatar-stack/avatar-stack';
import { UserAvatar } from '../../shared/user-avatar/user-avatar';
import { Project, blankProject } from '../projects-data';
import { avatar } from '../../shared/avatar';

export interface SavePayload {
  original: string | null;
  project: Project;
}

const ROSTER: StackMember[] = [
  avatar('NG', 0), avatar('DP', 1), avatar('HR', 2),
  avatar('PR', 3), avatar('WH', 4), avatar('AT', 5),
];

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const DEFAULT_DUE_ISO = '2018-08-14';

interface PickedFile {
  name: string;
  size: string;
}

@Component({
  selector: 'app-project-modal',
  standalone: true,
  imports: [FormsModule, AvatarStack, UserAvatar],
  templateUrl: './project-modal.html',
  styleUrl: './project-modal.scss',
})
export class ProjectModal implements OnChanges {
  /** Null = create mode, set = edit mode. */
  @Input() editProject: Project | null = null;
  @Input() open = false;
  @Output() openChange = new EventEmitter<boolean>();
  @Output() save = new EventEmitter<SavePayload>();

  name = '';
  comment = '';
  assignees: StackMember[] = [];
  roster = ROSTER;
  pickerOpen = false;
  dueIso = DEFAULT_DUE_ISO;
  files: PickedFile[] = [];
  private originalName: string | null = null;
  private lastFocused: Element | null = null;

  @ViewChild('dialog') dialog?: ElementRef<HTMLElement>;

  get isEdit(): boolean {
    return this.editProject !== null;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['open']?.currentValue === true) this.prefill();
  }

  get dueLabel(): string {
    const [y, m, d] = this.dueIso.split('-').map(Number);
    if (!y || !m || !d) return this.dueIso;
    return `${String(d).padStart(2, '0')} ${MONTHS[m - 1]} ${y}`;
  }

  isAssigned(member: StackMember): boolean {
    return this.assignees.some((a) => a.initials === member.initials);
  }

  toggleAssignee(member: StackMember): void {
    this.assignees = this.isAssigned(member)
      ? this.assignees.filter((a) => a.initials !== member.initials)
      : [...this.assignees, member];
  }

  pickFiles(ev: Event): void {
    const input = ev.target as HTMLInputElement;
    const picked = [...(input.files ?? [])].map((f) => ({ name: f.name, size: ProjectModal.formatSize(f.size) }));
    this.files = [...this.files, ...picked];
    input.value = '';
  }

  removeFile(index: number): void {
    this.files = this.files.filter((_, i) => i !== index);
  }

  close(): void {
    this.open = false;
    this.openChange.emit(false);
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

  submit(): void {
    const name = this.name.trim() || 'New Project';
    if (this.editProject) {
      this.save.emit({
        original: this.originalName,
        project: { ...this.editProject, name, due: this.dueLabel, members: this.assignees },
      });
    } else {
      this.save.emit({
        original: null,
        project: {
          ...blankProject(name),
          due: this.dueLabel,
          members: this.assignees,
        },
      });
    }
    this.reset();
    this.close();
  }

  private prefill(): void {
    this.lastFocused = document.activeElement;
    setTimeout(() => this.dialog?.nativeElement.focus());
    this.files = [];
    this.comment = '';
    this.pickerOpen = false;
    if (this.editProject) {
      this.originalName = this.editProject.name;
      this.name = this.editProject.name;
      this.dueIso = ProjectModal.parseDue(this.editProject.due);
      this.assignees = this.editProject.members.map((m) => ({ ...m }));
    } else {
      this.originalName = null;
      this.name = '';
      this.dueIso = DEFAULT_DUE_ISO;
      this.assignees = [avatar('NG', 0), avatar('DP', 1), avatar('HR', 2), avatar('PR', 3)];
    }
  }

  private reset(): void {
    this.name = '';
    this.comment = '';
    this.files = [];
    this.pickerOpen = false;
  }

  private static parseDue(due: string): string {
    const m = due.match(/(\d{1,2})\s+([A-Za-z]{3})\s+(\d{4})/);
    if (!m) return DEFAULT_DUE_ISO;
    const month = MONTHS.findIndex((x) => x.toLowerCase() === m[2].toLowerCase()) + 1;
    if (!month) return DEFAULT_DUE_ISO;
    return `${m[3]}-${String(month).padStart(2, '0')}-${String(Number(m[1])).padStart(2, '0')}`;
  }

  private static formatSize(bytes: number): string {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    if (bytes < 1024 * 1024 * 1024) return `${(bytes / (1024 * 1024)).toFixed(1)} Mb`;
    return `${(bytes / (1024 * 1024 * 1024)).toFixed(2)} Gb`;
  }
}
