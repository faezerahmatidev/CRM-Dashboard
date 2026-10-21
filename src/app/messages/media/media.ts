import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DashPage } from '../../shared/dash-page/dash-page';
import { SortControl } from '../../shared/sort-control/sort-control';
import { NewButton } from '../../shared/new-button/new-button';
import { AvatarStack } from '../../shared/avatar-stack/avatar-stack';
import { MessagesSidebar } from '../messages-sidebar';
import { ThreadList } from '../thread-list';
import { MEDIA_FILES, PHOTO_GRADIENTS } from '../messages-data';
import { MessagesStore } from '../messages-store';
import { members } from '../../shared/avatar';

@Component({
  selector: 'app-messages-media',
  standalone: true,
  imports: [FormsModule, DashPage, MessagesSidebar, ThreadList, SortControl, AvatarStack, NewButton],
  templateUrl: './media.html',
  styleUrl: './media.scss',
})
export class MessagesMedia {
  protected store = inject(MessagesStore);

  files = MEDIA_FILES;
  gradients = PHOTO_GRADIENTS;
  stack = members(['SW', 'HC', 'PP', 'BH']);
  tabs = ['All', 'Files', 'Images', 'Videos', 'Archives'];
  activeTab = 'All';
  query = '';
}
