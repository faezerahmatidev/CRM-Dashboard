import { Component } from '@angular/core';

interface CalEvent {
  time: string;
  title: string;
  sub: string;
  tone?: '' | 'warn' | 'bad';
}

@Component({
  selector: 'app-upcoming-events',
  standalone: true,
  template: `
    <section>
      <h3 class="widget-title">Upcoming events</h3>
      <ul class="events-list">
        @for (e of events; track e.title) {
          <li [class]="e.tone">
            <span class="time">{{ e.time }}</span>
            <p class="etext">{{ e.title }}</p>
            <p class="esub">{{ e.sub }}</p>
          </li>
        }
      </ul>
    </section>
  `,
})
export class UpcomingEvents {
  events: CalEvent[] = [
    { time: '05:48AM', title: 'Meeting with a client', sub: 'Tell how to boost website traffic' },
    { time: '10:28AM', title: 'New project discussion', sub: 'Business Cards Does Your Business', tone: 'warn' },
    { time: '07:18PM', title: 'Financial data overview', sub: 'What Makes Flyers Unbeatable', tone: 'bad' },
  ];
}
