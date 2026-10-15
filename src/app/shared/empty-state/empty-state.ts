import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-empty-state',
  standalone: true,
  templateUrl: './empty-state.html',
  styleUrl: './empty-state.scss',
})
export class EmptyState {
  @Input() image = '';
  @Input() imageAlt = '';
  @Input() title = '';
  @Input() subtitle = '';
  @Input() text = '';
  @Input() actionLabel = '';
  @Output() action = new EventEmitter<void>();
}
