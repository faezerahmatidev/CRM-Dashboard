import { Component, Input } from '@angular/core';

/** Small gradient product photo placeholder (no backend assets available). */
@Component({
  selector: 'app-catalog-thumb',
  standalone: true,
  template: `
    <span
      class="thumb"
      [style.background]="palette"
      [style.color]="color"
      [style.width.px]="size"
      [style.height.px]="size"
      [style.border-radius.px]="radius"
      [title]="label"
    >
      @if (icon === 'audio') {
        <svg viewBox="0 0 24 24"><path d="M4 14v-2a8 8 0 0 1 16 0v2" /><rect x="3" y="13.5" width="4" height="7" rx="1.5" /><rect x="17" y="13.5" width="4" height="7" rx="1.5" /></svg>
      } @else if (icon === 'doc') {
        <svg viewBox="0 0 24 24"><path d="M6 3.5h8L19 8.5V20a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1v-16a1 1 0 0 1 1-1Z" /><path d="M13.5 3.5V9H19" /></svg>
      } @else if (icon === 'cube') {
        <svg viewBox="0 0 24 24"><path d="M4 8.5 12 4l8 4.5v8L12 21l-8-4.5v-8Z" /><path d="M4 8.5 12 13l8-4.5M12 13v8" /></svg>
      } @else {
        <svg viewBox="0 0 24 24"><rect x="4" y="5" width="16" height="10" rx="1.5" /><path d="M2.5 19h19" /></svg>
      }
    </span>
  `,
  styles: [`
    .thumb { flex: none; display: grid; place-items: center; color: #fff; }
    .thumb svg {
      width: 45%; height: 45%;
      stroke: currentColor; fill: none;
      stroke-width: 1.8; stroke-linecap: round; stroke-linejoin: round;
    }
  `],
})
export class CatalogThumb {
  @Input() icon: 'laptop' | 'audio' | 'cube' | 'doc' = 'laptop';
  @Input() palette = 'linear-gradient(135deg,#5e81f4,#9698d6)';
  @Input() color = '#fff';
  @Input() size = 40;
  @Input() radius = 10;
  @Input() label = '';
}
