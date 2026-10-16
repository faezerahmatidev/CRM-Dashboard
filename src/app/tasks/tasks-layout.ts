import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AppShell } from '../shared/app-shell/app-shell';
import { TaskModal } from './task-modal/task-modal';
import { TasksStore } from './tasks-store';

@Component({
  selector: 'app-tasks-layout',
  standalone: true,
  imports: [RouterOutlet, AppShell, TaskModal],
  template: `
    <app-shell title="Tasks" activeIcon="tasks" actionIcon="plus" (action)="store.openNew()">
      <router-outlet />
    </app-shell>
    <app-task-modal
      [open]="store.modalOpen()"
      (openChange)="store.setModalOpen($event)"
      [task]="store.editing()"
    />
  `,
})
export class TasksLayout {
  protected store = inject(TasksStore);
}
