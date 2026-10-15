import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CardTabs } from '../card-tabs/card-tabs';

@Component({
  // Section usage keeps .dash-card on the host so layout CSS applies unchanged.
  // Element usage gets the class through the host binding below.
  selector: 'app-dash-card, section[app-dash-card]',
  standalone: true,
  imports: [CardTabs],
  templateUrl: './dash-card.html',
  styleUrl: './dash-card.scss',
  host: { '[class.dash-card]': 'true' },
})
export class DashCard {
  @Input() title = '';
  @Input() tabs?: string[];
  @Input() tab = '';
  @Output() tabChange = new EventEmitter<string>();
  @Input() calendar = false;

  onTabChange(tab: string): void {
    // Keep working standalone (e.g. static Day/Week/Month tabs):
    // update locally and notify the parent when it listens.
    this.tab = tab;
    this.tabChange.emit(tab);
  }
}
