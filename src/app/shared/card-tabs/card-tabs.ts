import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-card-tabs',
  standalone: true,
  template: `
    <div class="tabs">
      @for (o of options; track o) {
        <button type="button" [class.active]="o === active" (click)="select(o)">{{ o }}</button>
      }
    </div>
  `,
})
export class CardTabs {
  @Input() options: string[] = [];
  @Input() active = '';
  @Output() activeChange = new EventEmitter<string>();

  select(option: string): void {
    this.active = option;
    this.activeChange.emit(option);
  }
}
