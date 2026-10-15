import { Component, EventEmitter, Input, Output } from '@angular/core';

export type ShellIcon =
  | 'dashboard' | 'briefcase' | 'tasks' | 'files' | 'calendar'
  | 'team' | 'messages' | 'products' | 'reports' | 'map'
  | 'goals' | 'activity' | 'help';

@Component({
  selector: 'app-shell',
  standalone: true,
  templateUrl: './app-shell.html',
  styleUrl: './app-shell.scss',
})
export class AppShell {
  /** Page title shown in the topbar. */
  @Input() title = '';
  /** Rail icon highlighted as the current section (visual only). */
  @Input() activeIcon: ShellIcon = 'dashboard';
  /** Topbar action button glyph. */
  @Input() actionIcon: 'user' | 'plus' = 'user';
  @Output() action = new EventEmitter<void>();
}
