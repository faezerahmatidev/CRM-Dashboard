import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

interface DetailsTab {
  label: string;
  path: string;
  icon: 'tasks' | 'desk' | 'activity' | 'files' | 'reports' | 'settings';
}

@Component({
  selector: 'app-details-tabs',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  template: `
    <div class="details-tabs" role="tablist">
      @for (t of tabs; track t.path) {
        <a role="tab" [routerLink]="t.path" replaceUrl routerLinkActive="active" [routerLinkActiveOptions]="{ exact: true }">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            @switch (t.icon) {
              @case ('tasks') {
                <path d="M8.5 6.5H20M8.5 12H20M8.5 17.5H20" /><circle cx="5" cy="6.5" r="1" /><circle cx="5" cy="12" r="1" /><circle cx="5" cy="17.5" r="1" />
              }
              @case ('desk') {
                <rect x="4" y="4" width="7" height="7" rx="1.5" /><rect x="13" y="4" width="7" height="7" rx="1.5" /><rect x="4" y="13" width="7" height="7" rx="1.5" /><rect x="13" y="13" width="7" height="7" rx="1.5" />
              }
              @case ('activity') {
                <path d="M3 12h4l2.5-6 4 12 2.5-6H21" />
              }
              @case ('files') {
                <path d="M7 3.5h7l4 4V20a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4.5a1 1 0 0 1 1-1Z" /><path d="M14 3.5V8h4" />
              }
              @case ('reports') {
                <circle cx="12" cy="12" r="8" /><path d="M12 12V6.5M12 12l4 2.5" />
              }
              @case ('settings') {
                <circle cx="12" cy="12" r="3" /><path d="M12 3.5v2.5M12 18v2.5M3.5 12H6M18 12h2.5M6 6l1.8 1.8M16.2 16.2 18 18M18 6l-1.8 1.8M7.8 16.2 6 18" />
              }
            }
          </svg>
          {{ t.label }}
        </a>
      }
      <span class="tabs-spacer"></span>
      <ng-content />
    </div>
  `,
  styles: [`
    .details-tabs { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; }
    .details-tabs a {
      display: inline-flex; align-items: center; gap: 7px;
      font-size: 11px; font-weight: 900; letter-spacing: 0.4px;
      color: var(--primary-grey); background: var(--bg-light);
      border-radius: 9px; padding: 10px 16px; text-decoration: none; cursor: pointer;
    }
    .details-tabs a svg { width: 14px; height: 14px; stroke: currentColor; fill: none; stroke-width: 1.8; stroke-linecap: round; stroke-linejoin: round; }
    .details-tabs a.active { background: var(--primary); color: #fff; box-shadow: 0 3px 10px rgb(94 129 244 / 0.4); }
    .tabs-spacer { flex: 1; }
  `],
})
export class DetailsTabs {
  tabs: DetailsTab[] = [
    { label: 'TASKS', path: '/projects/details/tasks', icon: 'tasks' },
    { label: 'DESK', path: '/projects/details/desk', icon: 'desk' },
    { label: 'ACTIVITY', path: '/projects/details/activity', icon: 'activity' },
    { label: 'FILES', path: '/projects/details/files', icon: 'files' },
    { label: 'REPORTS', path: '/projects/details/reports', icon: 'reports' },
    { label: 'SETTINGS', path: '/projects/details/settings', icon: 'settings' },
  ];
}
