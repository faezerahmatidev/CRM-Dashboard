import { Component } from '@angular/core';

@Component({
  selector: 'app-conversion-area',
  standalone: true,
  template: `
    <section>
      <h3 class="widget-title">Conversion history</h3>
      <p class="conv-sub">Week to week performance</p>
      <img class="area" src="assets/dash-wave.png" width="656" height="364" alt="Week to week performance chart" />
    </section>
  `,
  styles: [`
    .conv-sub { font-size: 10px; color: var(--primary-grey); margin: 2px 0 8px; }
    .area { width: 100%; height: auto; display: block; border-radius: 0 0 10px 10px; }
  `],
})
export class ConversionArea {}
