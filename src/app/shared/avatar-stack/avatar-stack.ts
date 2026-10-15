import { Component, Input } from '@angular/core';

export interface StackMember {
  initials: string;
  color: string;
}

/** Overlapping member avatars with a "+N" overflow pill. */
@Component({
  selector: 'app-avatar-stack',
  standalone: true,
  template: `
    <span class="stack">
      @for (m of members; track $index) {
        <i [style.background]="m.color" [title]="m.initials">{{ m.initials }}</i>
      }
      @if (extra > 0) {
        <em>+{{ extra }}</em>
      }
    </span>
  `,
  styles: [`
    .stack { display: inline-flex; align-items: center; }
    .stack i {
      width: 30px; height: 30px; flex: 0 0 30px;
      border-radius: 50%; border: 2px solid #fff;
      color: #fff; font-size: 10px; font-weight: 900; font-style: normal;
      display: grid; place-items: center; margin-left: -9px;
    }
    .stack i:first-child { margin-left: 0; }
    .stack em {
      min-width: 30px; height: 30px; padding: 0 6px;
      border-radius: 15px; background: var(--bg-light);
      color: var(--primary-grey); font-size: 10px; font-weight: 700; font-style: normal;
      display: grid; place-items: center; margin-left: -9px; border: 2px solid #fff;
    }
  `],
})
export class AvatarStack {
  @Input() members: StackMember[] = [];
  @Input() extra = 0;
}
