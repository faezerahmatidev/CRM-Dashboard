import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterLink } from '@angular/router';

export type ShellIcon =
  | 'dashboard' | 'briefcase' | 'tasks' | 'kanban' | 'files' | 'calendar'
  | 'team' | 'messages' | 'products' | 'reports' | 'map'
  | 'goals' | 'activity' | 'help';

@Component({
  selector: 'app-shell',
  standalone: true,
  imports: [RouterLink],
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
  /** Show a back button before the title. */
  @Input() showBack = false;
  @Output() action = new EventEmitter<void>();
  @Output() back = new EventEmitter<void>();
}
