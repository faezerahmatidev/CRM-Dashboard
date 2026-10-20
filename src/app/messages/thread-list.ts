import { Component, inject } from '@angular/core';
import { UserAvatar } from '../shared/user-avatar/user-avatar';
import { PREVIEWS } from './messages-data';
import { MessagesStore } from './messages-store';

/** Left thread picker used by the conversation/media/about views. */
@Component({
  selector: 'app-thread-list',
  standalone: true,
  imports: [UserAvatar],
  template: `
    <ul class="threads">
      @for (t of store.visible(); track t.id) {
        <li
          [class.active]="t.id === store.selectedId()"
          (click)="store.select(t.id)"
          (keyup.enter)="store.select(t.id)"
          tabindex="0"
        >
          <button
            class="star"
            type="button"
            [class.on]="t.starred"
            (click)="store.toggleStar(t.id); $event.stopPropagation()"
            [attr.aria-label]="'Star ' + t.name"
            [attr.aria-pressed]="t.starred"
          >★</button>
          <app-user-avatar [initials]="t.member.initials" [color]="t.member.color" [size]="40" />
          <span class="t-body">
            <span class="t-top"><b>{{ t.name }}</b><span>{{ t.time }}</span></span>
            <span class="t-preview">{{ previews[t.id] || t.snippet }}</span>
          </span>
        </li>
      }
    </ul>
  `,
  styles: [`
    .threads { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 8px; }
    .threads li {
      display: flex; align-items: flex-start; gap: 10px;
      border: 1px solid var(--outline); border-radius: 12px;
      padding: 12px; background: #fff; cursor: pointer;
    }
    .threads li.active { border-color: var(--primary); box-shadow: 0 0 0 1px var(--primary); }
    .threads li:focus { outline: 1.5px solid var(--primary); outline-offset: 2px; }
    .star {
      border: 0; background: transparent; cursor: pointer; padding: 2px 0 0;
      color: var(--primary-grey); font-size: 13px; line-height: 1;
    }
    .star.on { color: var(--primary); }
    .t-body { flex: 1; min-width: 0; display: flex; flex-direction: column; gap: 4px; }
    .t-top { display: flex; align-items: baseline; justify-content: space-between; gap: 8px; }
    .t-top b { font-size: 11.5px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
    .t-top span { font-size: 10px; color: var(--primary-grey); white-space: nowrap; }
    .t-preview {
      font-size: 10.5px; color: var(--primary-grey); line-height: 1.6;
      display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;
    }
  `],
})
export class ThreadList {
  protected store = inject(MessagesStore);
  protected previews = PREVIEWS;
}
