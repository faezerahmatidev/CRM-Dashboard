import { Component } from '@angular/core';

/** Horizontal paired-line chart from the Contacts list-02/03 Figma. */
@Component({
  selector: 'app-conversion-lines',
  standalone: true,
  template: `
    <section>
      <h3 class="widget-title">Conversion history</h3>
      <p class="conv-sub">Week to week performance</p>
      <svg class="lines" viewBox="0 0 220 150" role="img" aria-label="Weekly conversion lines chart">
        @for (row of rows; track $index) {
          <rect [attr.x]="0" [attr.y]="10 + $index * 24" [attr.width]="row[0]" height="4" rx="2" fill="#5e81f4" />
          <rect [attr.x]="0" [attr.y]="18 + $index * 24" [attr.width]="row[1]" height="4" rx="2" fill="#7ce7ac" />
        }
      </svg>
    </section>
  `,
  styles: [`
    .conv-sub { font-size: 10px; color: var(--primary-grey); margin: 2px 0 8px; }
    .lines { width: 100%; height: auto; display: block; }
  `],
})
export class ConversionLines {
  rows: Array<[number, number]> = [
    [110, 70], [150, 60], [130, 90], [100, 80], [140, 60], [120, 55],
  ];
}
