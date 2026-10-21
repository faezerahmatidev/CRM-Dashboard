import { Component, Input } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { RouterLink } from '@angular/router';
import { DashCard } from '../dash-card/dash-card';
import type { DashEvent } from '../dashboard-charts';

/** Latest-events card: icon rows with values plus a "View all" action. */
@Component({
  selector: 'app-events-card',
  standalone: true,
  imports: [NgTemplateOutlet, RouterLink, DashCard],
  template: `
    <section class="dash-card" app-dash-card title="Latest Events">
      <a card-action class="mini-btn" [routerLink]="linkAll" replaceUrl>View all</a>
      <div class="events-head"><span>Event</span><span>Details</span></div>
      <ul class="event-rows">
        @for (e of events; track e.title) {
          <li>
            @if (e.link) {
              <a class="row-link" [routerLink]="e.link" replaceUrl [title]="e.title">
                <ng-container *ngTemplateOutlet="rowBody; context: { $implicit: e }" />
              </a>
            } @else {
              <span class="row-static">
                <ng-container *ngTemplateOutlet="rowBody; context: { $implicit: e }" />
              </span>
            }
          </li>
        }
      </ul>
    </section>
    <ng-template #rowBody let-e>
      <span class="soft-icon">
        @switch (e.icon) {
          @case ('invoice') {
            <svg viewBox="0 0 24 24"><path d="M7 3.5h7l4 4V20a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4.5a1 1 0 0 1 1-1Z"/><path d="M14 3.5V8h4M9.5 12h5m-5 3.5h5"/></svg>
          }
          @case ('client') {
            <svg viewBox="0 0 24 24"><circle cx="12" cy="8.5" r="3.2"/><path d="M5.5 19.5c1.4-3 3.7-4.5 6.5-4.5s5.1 1.5 6.5 4.5"/></svg>
          }
          @case ('meeting') {
            <svg viewBox="0 0 24 24"><rect x="4.5" y="6" width="15" height="13" rx="2"/><path d="M4.5 10h15M8.5 3.5V7M15.5 3.5V7"/></svg>
          }
        }
      </span>
      <span class="grow"><b>{{ e.title }}</b><span>{{ e.sub }}</span></span>
      <span class="evalue">{{ e.value }}</span>
    </ng-template>
  `,
  styles: [`
    .events-head {
      display: flex;
      justify-content: space-between;
      font-size: 10.5px;
      color: var(--primary-grey);
      padding: 6px 0 2px;
    }
    .event-rows { list-style: none; margin: 0; padding: 0; }
    .event-rows li {
      padding: 11px 0;
      border-top: 1px solid var(--outline);
    }
    .row-link, .row-static {
      display: flex;
      align-items: center;
      gap: 12px;
      color: inherit;
      text-decoration: none;
      border-radius: 6px;
    }
    .row-link:focus-visible { outline: 1.5px solid var(--primary); outline-offset: 2px; }
    .event-rows .grow {
      flex: 1;
      min-width: 0;
      display: flex;
      flex-direction: column;
      gap: 2px;
    }
    .event-rows .grow b {
      font-size: 11.5px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .event-rows .grow span {
      font-size: 10.5px;
      color: var(--primary-grey);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .evalue { font-size: 11px; font-weight: 700; white-space: nowrap; }
  `],
})
export class EventsCard {
  @Input() events: DashEvent[] = [];
  @Input() linkAll = '/dashboard/orders';
}
