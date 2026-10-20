import { Component, Input } from '@angular/core';
import { PanelHeader } from '../shared/panel-header/panel-header';

interface MailFolder {
  title: string;
  sub: string;
  badge?: string;
  active?: boolean;
}

/** Left mailbox panel shared by the messages views. */
@Component({
  selector: 'app-messages-sidebar',
  standalone: true,
  imports: [PanelHeader],
  template: `
    <app-panel-header logo="C" title="CRAFTUI LLC" sub="8484 Ross Wells" />

    <nav class="folders" aria-label="Mailbox folders">
      @for (f of folders; track f.title) {
        <button type="button" [class.active]="f.title === active" (click)="pick(f.title)">
          <span class="f-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24"><path d="M4.5 7A1.5 1.5 0 0 1 6 5.5h5l2 2.5h5A1.5 1.5 0 0 1 19.5 9.5V16A1.5 1.5 0 0 1 18 17.5H6A1.5 1.5 0 0 1 4.5 16V7Z" /></svg>
          </span>
          <span class="f-titles">
            <b>{{ f.title }}</b>
            <span>{{ f.sub }}</span>
          </span>
          @if (f.badge) {
            <span class="f-badge">{{ f.badge }}</span>
          }
        </button>
      }
    </nav>

    <div class="labels">
      @for (l of labels; track l.title) {
        <button type="button">
          <span class="f-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24"><path d="M5 5.5h11.5L20 9l-3.5 3.5H5V5.5Z" /><circle cx="9" cy="9" r="1.2" /></svg>
          </span>
          <span class="f-titles">
            <b>{{ l.title }}</b>
            <span>{{ l.sub }}</span>
          </span>
        </button>
      }
    </div>
  `,
  styles: [`
    .folders, .labels { display: flex; flex-direction: column; gap: 8px; }
    .folders button, .labels button {
      display: flex; align-items: center; gap: 12px;
      border: 1px solid var(--outline); border-radius: 12px; background: #fff;
      padding: 13px 14px; cursor: pointer; text-align: left; font-family: inherit;
      color: inherit; width: 100%;
    }
    .folders button.active { border-color: var(--primary); box-shadow: 0 0 0 1px var(--primary); }
    .folders button:hover, .labels button:hover { border-color: var(--primary); }
    .f-icon {
      width: 34px; height: 34px; flex: 0 0 34px; border-radius: 9px;
      background: var(--bg-light); color: var(--primary-grey);
      display: grid; place-items: center;
    }
    .folders button.active .f-icon { color: var(--primary); }
    .f-icon svg {
      width: 16px; height: 16px; stroke: currentColor; fill: none;
      stroke-width: 1.7; stroke-linecap: round; stroke-linejoin: round;
    }
    .f-titles { flex: 1; min-width: 0; display: flex; flex-direction: column; gap: 2px; }
    .f-titles b { font-size: 11.5px; }
    .f-titles span span, .f-titles > span { font-size: 10px; color: var(--primary-grey); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
    .f-badge {
      font-size: 10.5px; font-weight: 900; color: #34b26b;
      background: #e4f8ec; border-radius: 50%;
      min-width: 22px; height: 22px; display: grid; place-items: center; padding: 0 5px;
    }
  `],
})
export class MessagesSidebar {
  @Input() active = 'All Inbox';

  folders: MailFolder[] = [
    { title: 'All Inbox', sub: 'All your messages unified', badge: '5' },
    { title: 'Starred', sub: 'Selected messages' },
    { title: 'Snoozed', sub: 'Will appear later', badge: '3' },
    { title: 'Drafts', sub: 'Re-edit your messages' },
    { title: 'Deleted', sub: 'Removed messages' },
  ];

  labels = [
    { title: 'Personal Conversations', sub: 'Messages marked as personal' },
    { title: 'Business Conversations', sub: 'Messages marked as business' },
    { title: 'Manage Labels', sub: 'Add or remove labels' },
  ];

  pick(title: string): void {
    this.active = title;
  }
}
