import { Component, Input } from '@angular/core';

export interface Message {
  name: string;
  text: string;
  time: string;
  initials: string;
  color: string;
}

@Component({
  selector: 'app-messages-list',
  standalone: true,
  template: `
    <section>
      <h3 class="widget-title">Messages
        @if (count !== null) {
          <span class="msg-count">{{ count }}</span>
        }
        @if (viewAll) {
          <button class="msg-view-all" type="button">View all</button>
        }
      </h3>
      <ul class="messages-list">
        @for (m of messages; track m.name) {
          <li>
            <span class="avatar" [style.background]="m.color">{{ m.initials }}<i></i></span>
            <span class="mbody">
              <span class="mhead"><b>{{ m.name }}</b><span class="mtime">{{ m.time }}</span></span>
              <span class="mtext">{{ m.text }}</span>
            </span>
          </li>
        }
      </ul>
    </section>
  `,
  styles: [`
    .messages-list li {
      display: flex;
      gap: 10px;
      padding: 9px 0;
      border-top: 1px solid var(--outline);
    }
    .messages-list li:first-child { border-top: 0; }
    .avatar {
      position: relative;
      width: 34px; height: 34px; flex: 0 0 34px;
      border-radius: 50%;
      color: #fff; font-size: 11px; font-weight: 900;
      display: grid; place-items: center;
    }
    .avatar i {
      position: absolute; right: 0; bottom: 0;
      width: 9px; height: 9px; border-radius: 50%;
      background: #34b26b; border: 2px solid #fff;
    }
    .mbody { flex: 1; min-width: 0; font-size: 11px; }
    .mhead { display: flex; justify-content: space-between; gap: 8px; }
    .mhead b { font-size: 11px; }
    .mtime { color: var(--primary-grey); font-size: 10px; white-space: nowrap; }
    .mtext { display: block; color: var(--primary-grey); font-size: 10px; margin-top: 2px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
    .widget-title { display: flex; align-items: center; gap: 8px; }
    .msg-count {
      font-size: 10px; font-weight: 700; color: #34b26b;
      background: #e4f8ec; border-radius: 9px; padding: 2px 8px;
    }
    .msg-view-all {
      margin-left: auto; border: 0; background: transparent; cursor: pointer;
      font-size: 11px; color: var(--primary); padding: 0;
    }
  `],
})
export class MessagesList {
  @Input() count: number | null = null;
  @Input() viewAll = false;
  @Input() messages: Message[] = [
    { name: 'Nicholas Gordon', text: 'Moreover the striking, brilliant and vivid colors', time: '10m', initials: 'NG', color: 'linear-gradient(135deg,#f4be5e,#ff808b)' },
    { name: 'Nina Perkins', text: 'In the history of modern astronomy, there is small', time: '1hr', initials: 'NP', color: 'linear-gradient(135deg,#5e81f4,#9698d6)' },
    { name: 'Daniel Holland', text: 'Advertising on a budget with a monthly frequency', time: '2hr', initials: 'DH', color: 'linear-gradient(135deg,#34b26b,#7ce7ac)' },
    { name: 'Franklin Thomas', text: 'In the history of modern astronomy, there is small', time: '3hrs', initials: 'FT', color: 'linear-gradient(135deg,#ff808b,#f4be5e)' },
  ];
}
