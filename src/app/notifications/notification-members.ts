import { Component } from '@angular/core';
import { ContactAvatar } from '../shared/contact-avatar/contact-avatar';
import { MEMBERS } from './notifications-data';

/** Right members panel shared by the notifications views. */
@Component({
  selector: 'app-notification-members',
  standalone: true,
  imports: [ContactAvatar],
  template: `
    <section class="dash-card members-card">
      <h3 class="dash-card-title">Members</h3>
      <ul class="members">
        @for (m of members; track m.email) {
          <li>
            <app-contact-avatar [initials]="m.member.initials" [color]="m.member.color" [size]="40" [radius]="12" />
            <span class="m-titles">
              <b>{{ m.name }}</b>
              <span>{{ m.email }}</span>
            </span>
          </li>
        }
      </ul>
      <button class="add-members" type="button">
        <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="8" /><path d="M12 8.5v7M8.5 12h7" /></svg>
        Add members
      </button>
    </section>
  `,
  styles: [`
    .members-card { min-width: 0; }
    .dash-card-title { margin-bottom: 12px; }
    .members { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 12px; }
    .members li { display: flex; align-items: center; gap: 12px; min-width: 0; }
    .m-titles { display: flex; flex-direction: column; gap: 2px; min-width: 0; }
    .m-titles b { font-size: 11.5px; white-space: nowrap; }
    .m-titles span { font-size: 10px; color: var(--primary-grey); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
    .add-members {
      display: inline-flex; align-items: center; gap: 8px;
      border: 0; background: transparent; cursor: pointer;
      font-size: 11px; font-weight: 900; color: var(--primary);
      padding: 12px 0 0; font-family: inherit;
    }
    .add-members svg {
      width: 16px; height: 16px; stroke: currentColor; fill: none;
      stroke-width: 1.8; stroke-linecap: round;
    }
  `],
})
export class NotificationMembers {
  members = MEMBERS;
}
