import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DashPage } from '../../../shared/dash-page/dash-page';
import { ProjectInfoPanel } from '../../../shared/project-info-panel/project-info-panel';
import { DetailsTabs } from '../../../shared/details-tabs/details-tabs';
import { SortControl } from '../../../shared/sort-control/sort-control';
import { UserAvatar } from '../../../shared/user-avatar/user-avatar';
import { Fab } from '../../../shared/fab/fab';
import { DETAILS_INFO, DETAILS_TASKS, DetailTask } from '../../details-data';

interface TaskRow extends DetailTask {
  done: boolean;
}

@Component({
  selector: 'app-project-tasks',
  standalone: true,
  imports: [FormsModule, DashPage, ProjectInfoPanel, DetailsTabs, SortControl, UserAvatar, Fab],
  templateUrl: './tasks.html',
  styleUrl: './tasks.scss',
})
export class ProjectTasks {
  info = DETAILS_INFO;
  tasks: TaskRow[] = DETAILS_TASKS.map((t) => ({ ...t, done: t.status === 'Done' }));
  draft = '';

  badgeOf(t: TaskRow): string {
    if (t.done) return 'badge-green';
    return t.status === 'Pending' ? 'badge-yellow' : 'badge-grey';
  }

  labelOf(t: TaskRow): string {
    if (t.done) return 'Done';
    return t.status;
  }

  addTask(): void {
    const title = this.draft.trim();
    if (!title) return;
    this.tasks.unshift({
      title, sub: '0/1', attach: 0, comments: 0, status: 'Pending',
      member: { initials: 'ME', color: 'linear-gradient(135deg,#5e81f4,#9698d6)' },
      done: false,
    });
    this.draft = '';
  }
}
