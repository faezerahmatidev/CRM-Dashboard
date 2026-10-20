import { Directive, Input, TemplateRef, inject } from '@angular/core';
import type { TableCell, TableRow } from './data-table';

export interface CellContext {
  $implicit: TableCell;
  row: TableRow;
}

/** Custom cell renderer for one `app-data-table` column: `<ng-template app-cell="members" let-cell let-row="row">`. */
@Directive({
  selector: 'ng-template[app-cell]',
  standalone: true,
})
export class CellDef {
  @Input('app-cell') key = '';

  readonly template = inject<TemplateRef<CellContext>>(TemplateRef);
}
