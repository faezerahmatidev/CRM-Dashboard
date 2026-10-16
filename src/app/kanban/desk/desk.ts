import { Component, inject } from '@angular/core';
import { DashPage } from '../../shared/dash-page/dash-page';
import { PanelHeader } from '../../shared/panel-header/panel-header';
import { ConversionLine } from '../conversion-line';
import { AvatarStack } from '../../shared/avatar-stack/avatar-stack';
import { KANBAN_OVERVIEW, KanbanCard, KanbanColumn } from '../kanban-data';
import { KanbanStore } from '../kanban-store';

interface DeskColumn {
  key: KanbanColumn;
  label: string;
}

@Component({
  selector: 'app-kanban-desk',
  standalone: true,
  imports: [DashPage, PanelHeader, ConversionLine, AvatarStack],
  templateUrl: './desk.html',
  styleUrl: './desk.scss',
})
export class KanbanDesk {
  protected store = inject(KanbanStore);

  overview = KANBAN_OVERVIEW;
  columns: DeskColumn[] = [
    { key: 'todo', label: 'To do' },
    { key: 'progress', label: 'In progress' },
    { key: 'done', label: 'Done' },
  ];

  draggingId: string | null = null;
  dragOverCol: KanbanColumn | null = null;

  pct(c: KanbanCard): number {
    return c.total ? Math.round((c.done / c.total) * 100) : 0;
  }

  onDragStart(id: string): void {
    this.draggingId = id;
  }

  onDragOver(ev: DragEvent, col: KanbanColumn): void {
    ev.preventDefault();
    this.dragOverCol = col;
  }

  onDrop(col: KanbanColumn): void {
    if (this.draggingId) this.store.move(this.draggingId, col);
    this.draggingId = null;
    this.dragOverCol = null;
  }

  onDragEnd(): void {
    this.draggingId = null;
    this.dragOverCol = null;
  }
}
