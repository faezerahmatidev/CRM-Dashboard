import { Component, Input } from '@angular/core';

/** Single user avatar circle with initials. */
@Component({
  selector: 'app-user-avatar',
  standalone: true,
  template: `<span class="uavatar" [style.background]="color" [style.width.px]="size" [style.height.px]="size" [style.flex-basis.px]="size" [style.font-size.px]="size * 0.32">{{ initials }}</span>`,
  styles: [`
    .uavatar {
      border-radius: 50%;
      color: #fff;
      font-weight: 900;
      display: grid;
      place-items: center;
      flex-shrink: 0;
    }
  `],
})
export class UserAvatar {
  @Input() initials = '';
  @Input() color = 'linear-gradient(135deg,#5e81f4,#9698d6)';
  @Input() size = 30;
}
