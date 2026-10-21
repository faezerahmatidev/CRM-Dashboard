import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { DashPage } from '../../shared/dash-page/dash-page';
import { AvatarStack } from '../../shared/avatar-stack/avatar-stack';
import { UserAvatar } from '../../shared/user-avatar/user-avatar';
import { FilesSidebar } from '../files-sidebar';
import { FileBadgeIcon } from '../file-badge';
import { FILE_COMMENTS } from '../files-data';
import { FilesStore } from '../files-store';

@Component({
  selector: 'app-file-details',
  standalone: true,
  imports: [FormsModule, RouterLink, DashPage, FilesSidebar, FileBadgeIcon, AvatarStack, UserAvatar],
  templateUrl: './details.html',
  styleUrl: './details.scss',
})
export class FileDetails {
  protected store = inject(FilesStore);

  comments = FILE_COMMENTS;
  draft = '';

  send(): void {
    this.draft = '';
  }
}
