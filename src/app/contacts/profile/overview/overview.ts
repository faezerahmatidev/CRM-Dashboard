import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DashPage } from '../../../shared/dash-page/dash-page';
import { ViewToolbar } from '../../../shared/view-toolbar/view-toolbar';
import { ViewCard } from '../../../shared/view-card/view-card';
import { FilterOption, FilterTabs } from '../../../shared/filter-tabs/filter-tabs';
import { UserAvatar } from '../../../shared/user-avatar/user-avatar';
import { Fab } from '../../../shared/fab/fab';
import { ProfileSidebar } from '../../profile-sidebar';
import { TaskFilter, TasksStore } from '../../../tasks/tasks-store';

@Component({
  selector: 'app-profile-overview',
  standalone: true,
  imports: [FormsModule, DashPage, ProfileSidebar, ViewToolbar, ViewCard, FilterTabs, UserAvatar, Fab],
  templateUrl: './overview.html',
  styleUrl: './overview.scss',
})
export class ProfileOverview {
  protected tasks = inject(TasksStore);

  draft = '';
  filterOptions: FilterOption<TaskFilter>[] = [
    { value: 'ALL', label: 'ALL', icon: 'list' },
    { value: 'DONE', label: 'DONE', icon: 'done' },
    { value: 'PENDING', label: 'PENDING', icon: 'pending' },
  ];

  setFilter(f: TaskFilter): void {
    this.tasks.setFilter(f);
  }

  badgeOf(done: boolean, status: string): string {
    if (done) return 'badge-green';
    return status === 'Pending' ? 'badge-yellow' : 'badge-grey';
  }

  labelOf(done: boolean, status: string): string {
    if (done) return 'Done';
    return status;
  }

  addTask(): void {
    if (!this.draft.trim()) return;
    this.tasks.add(this.draft);
    this.draft = '';
  }
}
