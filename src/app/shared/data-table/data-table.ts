import { Component, ContentChildren, EventEmitter, Input, Output, QueryList, TemplateRef } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { CatalogThumb } from '../catalog-thumb/catalog-thumb';
import { DotsMenu } from '../dots-menu/dots-menu';
import { RatingStars } from '../rating-stars/rating-stars';
import { CellDef, CellContext } from './cell-def';

export type TableCellKind = 'product' | 'text' | 'number' | 'rating' | 'price' | 'pill' | 'custom';
export type PillTone = 'grey' | 'blue' | 'red' | 'green' | 'yellow';

export interface TableColumn {
  key: string;
  label: string;
  sortable?: boolean;
  kind?: TableCellKind;
}

export interface TableCell {
  text: string;
  sub?: string;
  tone?: PillTone;
  rating?: string;
  icon?: 'laptop' | 'audio' | 'cube' | 'doc';
  palette?: string;
}

export interface TableRow {
  id: string;
  selected?: boolean;
  cells: Record<string, TableCell>;
}

export interface TableSelectEvent {
  id: string;
  checked: boolean;
}

/**
 * Generic card-style data table: sortable headers, row selection,
 * typed cell renderers and a trailing actions menu.
 * NOTE: `grid` must also reserve the leading selection column
 * (when `selectable`) and the trailing actions column, e.g.
 * `'auto minmax(0,1.6fr) auto auto'`.
 */
@Component({
  selector: 'app-data-table',
  standalone: true,
  imports: [NgTemplateOutlet, CatalogThumb, RatingStars, DotsMenu],
  templateUrl: './data-table.html',
  styleUrl: './data-table.scss',
})
export class DataTable {
  @Input() columns: TableColumn[] = [];
  @Input() rows: TableRow[] = [];
  @Input() grid = '';
  @Input() sortKey = '';
  @Input() sortDir: 'asc' | 'desc' = 'asc';
  @Input() selectable = true;
  @Input() emptyText = 'No rows found.';
  /** `cards` = bordered boxes (contacts/products), `rows` = plain separators (projects). */
  @Input() variant: 'cards' | 'rows' = 'cards';

  @Output() sortChange = new EventEmitter<string>();
  @Output() selectChange = new EventEmitter<TableSelectEvent>();
  @Output() open = new EventEmitter<string>();
  @Output() edit = new EventEmitter<string>();
  @Output() remove = new EventEmitter<string>();

  @ContentChildren(CellDef) cellDefs?: QueryList<CellDef>;

  headerClick(col: TableColumn): void {
    if (col.sortable) this.sortChange.emit(col.key);
  }

  onCheck(id: string, checked: boolean): void {
    this.selectChange.emit({ id, checked });
  }

  templateFor(key: string): TemplateRef<CellContext> | null {
    return this.cellDefs?.find((d) => d.key === key)?.template ?? null;
  }
}
