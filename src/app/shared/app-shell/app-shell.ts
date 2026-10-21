import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterLink } from '@angular/router';

export type ShellIcon =
  | 'dashboard' | 'briefcase' | 'tasks' | 'kanban' | 'files' | 'calendar'
  | 'team' | 'messages' | 'products' | 'invoices' | 'reports' | 'map'
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
  /** Hide the topbar action button when the section has no create action. */
  @Input() showAction = true;
  /** Show a back button before the title. */
  @Input() showBack = false;
  @Output() action = new EventEmitter<void>();
  @Output() back = new EventEmitter<void>();
}
