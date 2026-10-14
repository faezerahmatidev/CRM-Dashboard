import { Component } from '@angular/core';

interface Update {
  icon: 'sale' | 'lead' | 'upload' | 'mail';
  text: string;
  meta?: string;
  pos?: string;
}

@Component({
  selector: 'app-latest-updates',
  standalone: true,
  template: `
    <section>
      <h3 class="widget-title">Latest updates</h3>
      <ul class="updates-list">
        @for (u of updates; track u.text) {
          <li>
            <span class="soft-icon">
              @switch (u.icon) {
                @case ('sale') {
                  <svg viewBox="0 0 24 24"><path d="M5 8h14l-1.2 11a1.5 1.5 0 0 1-1.5 1.3H7.7A1.5 1.5 0 0 1 6.2 19L5 8Z"/><path d="M8.5 10V6.5a3.5 3.5 0 0 1 7 0V10"/></svg>
                }
                @case ('lead') {
                  <svg viewBox="0 0 24 24"><circle cx="12" cy="8.5" r="3.2"/><path d="M5.5 19.5c1.4-3 3.7-4.5 6.5-4.5s5.1 1.5 6.5 4.5"/></svg>
                }
                @case ('upload') {
                  <svg viewBox="0 0 24 24"><path d="M12 16V5m0 0-4.5 4.5M12 5l4.5 4.5"/><path d="M4.5 19.5h15"/></svg>
                }
                @case ('mail') {
                  <svg viewBox="0 0 24 24"><rect x="4" y="6" width="16" height="12" rx="2"/><path d="m4.5 7.5 7.5 5 7.5-5"/></svg>
                }
              }
            </span>
            <span class="grow">{{ u.text }}</span>
            @if (u.pos) {
              <span class="pos">{{ u.pos }}</span>
            }
            @if (u.meta) {
              <span class="meta">{{ u.meta }}</span>
            }
          </li>
        }
      </ul>
    </section>
  `,
})
export class LatestUpdates {
  updates: Update[] = [
    { icon: 'sale', text: 'Item sale #340-00', pos: '+$189.00' },
    { icon: 'lead', text: 'New lead created', meta: '30 min' },
    { icon: 'sale', text: 'Item sale #360-20', pos: '+$940.00' },
    { icon: 'upload', text: 'Items upload complete', meta: '45 min' },
    { icon: 'mail', text: 'Email notifications sent', meta: '2 hrs' },
  ];
}
