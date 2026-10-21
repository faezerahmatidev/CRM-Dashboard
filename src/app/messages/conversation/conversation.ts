import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DashPage } from '../../shared/dash-page/dash-page';
import { SortControl } from '../../shared/sort-control/sort-control';
import { NewButton } from '../../shared/new-button/new-button';
import { AvatarStack } from '../../shared/avatar-stack/avatar-stack';
import { UserAvatar } from '../../shared/user-avatar/user-avatar';
import { MessagesSidebar } from '../messages-sidebar';
import { ThreadList } from '../thread-list';
import { THREAD } from '../messages-data';
import { MessagesStore } from '../messages-store';
import { members } from '../../shared/avatar';

@Component({
  selector: 'app-messages-conversation',
  standalone: true,
  imports: [FormsModule, DashPage, MessagesSidebar, ThreadList, UserAvatar, SortControl, AvatarStack, NewButton],
  templateUrl: './conversation.html',
  styleUrl: './conversation.scss',
})
export class MessagesConversation {
  protected store = inject(MessagesStore);

  thread = THREAD;
  stack = members(['SW', 'HC', 'PP', 'BH']);
}
