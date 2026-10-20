import { Component, Input } from '@angular/core';
import type { FileBadge } from './files-data';

/** File-type badge: tinted rounded square with a glyph or letters. */
@Component({
  selector: 'app-file-badge',
  standalone: true,
  template: `
    <span
      class="fbadge"
      [style.background]="badge.tint"
      [style.color]="badge.color"
      [style.width.px]="size"
      [style.height.px]="size"
      [style.border-radius.px]="radius"
      [style.font-size.px]="size * 0.3"
      [title]="label"
    >
      @if (badge.kind === 'diamond') {
        <svg viewBox="0 0 24 24"><path d="M12 3.5 20 12l-8 8.5L4 12l8-8.5Z" /></svg>
      } @else if (badge.kind === 'pdf') {
        <svg viewBox="0 0 24 24"><path d="M6 3.5h8L19 8.5V20a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1v-16a1 1 0 0 1 1-1Z" /><path d="M13.5 3.5V9H19" /></svg>
      } @else if (badge.kind === 'folder') {
        <svg viewBox="0 0 24 24"><path d="M4.5 7A1.5 1.5 0 0 1 6 5.5h5l2 2.5h5A1.5 1.5 0 0 1 19.5 9.5V16A1.5 1.5 0 0 1 18 17.5H6A1.5 1.5 0 0 1 4.5 16V7Z" /></svg>
      } @else {
        {{ badge.text }}
      }
    </span>
  `,
  styles: [`
    .fbadge { flex: none; display: grid; place-items: center; font-weight: 900; }
    .fbadge svg {
      width: 45%; height: 45%;
      stroke: currentColor; fill: none;
      stroke-width: 1.8; stroke-linecap: round; stroke-linejoin: round;
    }
  `],
})
export class FileBadgeIcon {
  @Input() badge!: FileBadge;
  @Input() size = 44;
  @Input() radius = 11;
  @Input() label = '';
}
