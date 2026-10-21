import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DashPage } from '../../shared/dash-page/dash-page';
import { PanelHeader } from '../../shared/panel-header/panel-header';
import { ConversionBars } from '../../dashboard/widgets/conversion-bars';
import { ViewToolbar } from '../../shared/view-toolbar/view-toolbar';
import { ViewCard } from '../../shared/view-card/view-card';
import { FilterOption, FilterTabs } from '../../shared/filter-tabs/filter-tabs';
import { UserAvatar } from '../../shared/user-avatar/user-avatar';
import { Fab } from '../../shared/fab/fab';
import { TASK_OVERVIEW } from '../tasks-data';
import { TaskFilter, TasksStore } from '../tasks-store';

@Component({
  selector: 'app-tasks-list-01',
  standalone: true,
  imports: [FormsModule, DashPage, PanelHeader, ConversionBars, ViewToolbar, ViewCard, FilterTabs, UserAvatar, Fab],
  templateUrl: './list-01.html',
  styleUrl: './list-01.scss',
})
export class TasksList01 {
  protected store = inject(TasksStore);

  overview = TASK_OVERVIEW;
  draft = '';
  filterOptions: FilterOption<TaskFilter>[] = [
    { value: 'ALL', label: 'ALL', icon: 'list' },
    { value: 'DONE', label: 'DONE', icon: 'done' },
    { value: 'PENDING', label: 'PENDING', icon: 'pending' },
  ];

  setFilter(f: TaskFilter): void {
    this.store.setFilter(f);
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
    this.store.add(this.draft);
    this.draft = '';
  }
}
