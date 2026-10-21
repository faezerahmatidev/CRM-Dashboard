import { Component, inject } from '@angular/core';
import { DashPage } from '../../shared/dash-page/dash-page';
import { SortControl } from '../../shared/sort-control/sort-control';
import { NewButton } from '../../shared/new-button/new-button';
import { AvatarStack } from '../../shared/avatar-stack/avatar-stack';
import { UserAvatar } from '../../shared/user-avatar/user-avatar';
import { MessagesSidebar } from '../messages-sidebar';
import { ThreadList } from '../thread-list';
import { MessagesStore } from '../messages-store';
import { members } from '../../shared/avatar';

interface CheckRow {
  title: string;
  done: boolean;
}

@Component({
  selector: 'app-messages-about',
  standalone: true,
  imports: [DashPage, MessagesSidebar, ThreadList, UserAvatar, SortControl, AvatarStack, NewButton],
  templateUrl: './about.html',
  styleUrl: './about.scss',
})
export class MessagesAbout {
  protected store = inject(MessagesStore);

  stack = members(['SW', 'HC', 'PP', 'BH']);
  checks: CheckRow[] = [
    { title: 'Design new home page', done: true },
    { title: 'Send design samples to the customer', done: false },
    { title: 'Design few new mockups for my project', done: false },
  ];

  get doneCount(): number {
    return this.checks.filter((c) => c.done).length;
  }
}
