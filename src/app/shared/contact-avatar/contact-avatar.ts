import { Component, Input } from '@angular/core';

/** Contact photo placeholder: gradient initials with a green online dot. */
@Component({
  selector: 'app-contact-avatar',
  standalone: true,
  template: `
    <span
      class="cavatar"
      [style.background]="color"
      [style.width.px]="size"
      [style.height.px]="size"
      [style.font-size.px]="size * 0.32"
      [style.border-radius.px]="radius"
      [title]="initials"
    >{{ initials }}<i class="online"></i></span>
  `,
  styles: [`
    .cavatar {
      position: relative;
      flex: none;
      color: #fff;
      font-weight: 900;
      display: grid;
      place-items: center;
    }
    .online {
      position: absolute;
      right: 1px;
      bottom: 1px;
      width: 9px;
      height: 9px;
      border-radius: 50%;
      background: #34b26b;
      border: 2px solid #fff;
    }
  `],
})
export class ContactAvatar {
  @Input() initials = '';
  @Input() color = '';
  @Input() size = 44;
  @Input() radius = 12;
}
