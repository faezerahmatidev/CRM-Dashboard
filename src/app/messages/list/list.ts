import { Component, inject } from '@angular/core';
import { DashPage } from '../../shared/dash-page/dash-page';
import { SortControl } from '../../shared/sort-control/sort-control';
import { DotsMenu } from '../../shared/dots-menu/dots-menu';
import { Fab } from '../../shared/fab/fab';
import { UserAvatar } from '../../shared/user-avatar/user-avatar';
import { MessagesSidebar } from '../messages-sidebar';
import { MessagesStore } from '../messages-store';

@Component({
  selector: 'app-messages-list',
  standalone: true,
  imports: [DashPage, MessagesSidebar, UserAvatar, SortControl, DotsMenu, Fab],
  templateUrl: './list.html',
  styleUrl: './list.scss',
})
export class MessagesList {
  protected store = inject(MessagesStore);
}
