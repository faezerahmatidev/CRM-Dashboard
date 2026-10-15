import { Component, Input } from '@angular/core';

/** Tinted brand glyph box used for projects, files and products. */
@Component({
  selector: 'app-project-brand',
  standalone: true,
  template: `
    <span class="soft-icon brand-box" [style.background]="tint" [style.color]="color">
      <b>{{ glyph }}</b>
    </span>
  `,
  styles: [`
    .brand-box { width: 44px; height: 44px; flex-basis: 44px; border-radius: 12px; }
    .brand-box b { font-size: 16px; font-weight: 900; }
  `],
})
export class ProjectBrand {
  @Input() glyph = '?';
  @Input() tint = '#eef2fe';
  @Input() color = '#5e81f4';
}
