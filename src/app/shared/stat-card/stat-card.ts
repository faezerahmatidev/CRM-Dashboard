import { Component, Input } from '@angular/core';

@Component({
  // Attribute selector: host keeps the page's tag and classes.
  selector: '[app-stat-card]',
  standalone: true,
  templateUrl: './stat-card.html',
  styleUrl: './stat-card.scss',
})
export class StatCard {
  @Input() label = '';
  @Input() value = '';
  @Input() sub = '';
  @Input() bar = '#5e81f4';
  @Input() barWidth = '50%';
}
