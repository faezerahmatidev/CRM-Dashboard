import { Component, Input } from '@angular/core';
import { PanelHeader } from '../shared/panel-header/panel-header';
import { AvatarStack } from '../shared/avatar-stack/avatar-stack';
import { members } from '../shared/avatar';
import { ITEM } from './products-data';

/** Left product info panel for the item overview/settings views. */
@Component({
  selector: 'app-product-panel',
  standalone: true,
  imports: [PanelHeader, AvatarStack],
  template: `
    <app-panel-header logo="C" [title]="item.name" [sub]="item.sku" />

    <section>
      <h3 class="p-title">Description</h3>
      <p class="p-text">{{ item.description }}</p>
    </section>

    <section>
      <h3 class="p-title">Created</h3>
      <app-avatar-stack [members]="creators" [size]="30" />
    </section>

    <section>
      <h3 class="p-title">Item details</h3>
      <ul class="details">
        <li>
          <svg viewBox="0 0 24 24"><rect x="4" y="9" width="16" height="9" rx="1.5"/><path d="M8 9V7.5A1.5 1.5 0 0 1 9.5 6h5A1.5 1.5 0 0 1 16 7.5V9M4 12.5h16" /></svg>
          {{ item.available }}
        </li>
        <li>
          <svg viewBox="0 0 24 24"><path d="M4 8.5 12 4l8 4.5v8L12 21l-8-4.5v-8Z"/><path d="M4 8.5 12 13l8-4.5M12 13v8" /></svg>
          {{ item.sold }}
        </li>
        <li>
          <svg viewBox="0 0 24 24"><rect x="6.5" y="3.5" width="11" height="17" rx="2"/><path d="M9.5 7.5h5" /></svg>
          {{ item.price }}
        </li>
      </ul>
    </section>

    <section>
      <h3 class="p-title">Categories</h3>
      <div class="pills">
        <span>Laptop</span>
        <span>Electronics</span>
      </div>
    </section>

    <section>
      <h3 class="p-title">Reviews</h3>
      <div class="reviews">
        <span class="rev-top"><span>Good</span><b>{{ item.rating }}</b></span>
        <span class="rev-bar"><span style="width: 84%"></span></span>
      </div>
    </section>

    <section>
      <h3 class="p-title">Views history</h3>
      <p class="conv-sub">Week to week performance</p>
      <svg class="area" viewBox="0 0 220 90" role="img" aria-label="Views history area chart">
        <defs>
          <linearGradient id="item-views" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stop-color="#5e81f4" stop-opacity="0.35" />
            <stop offset="1" stop-color="#5e81f4" stop-opacity="0.05" />
          </linearGradient>
        </defs>
        <path
          d="M 0,55 C 25,50 30,30 55,32 C 80,34 85,55 110,48 C 135,41 140,25 165,30 C 190,35 195,60 220,55 L 220,90 L 0,90 Z"
          fill="url(#item-views)"
        />
        <path
          d="M 0,55 C 25,50 30,30 55,32 C 80,34 85,55 110,48 C 135,41 140,25 165,30 C 190,35 195,60 220,55"
          fill="none" stroke="#5e81f4" stroke-width="2" stroke-linecap="round"
        />
      </svg>
    </section>
  `,
  styles: [`
    .p-title { font-size: 11.5px; font-weight: 900; margin: 0 0 8px; }
    .p-text { font-size: 10.5px; line-height: 1.7; color: var(--primary-grey); margin: 0; }
    .details { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 10px; }
    .details li { display: flex; align-items: center; gap: 10px; font-size: 11px; font-weight: 700; }
    .details svg {
      width: 15px; height: 15px; flex: 0 0 15px;
      stroke: var(--primary-grey); fill: none; stroke-width: 1.7;
      stroke-linecap: round; stroke-linejoin: round;
    }
    .pills { display: flex; gap: 8px; }
    .pills span {
      font-size: 10.5px; font-weight: 700; color: var(--primary-grey);
      background: var(--bg-light); border-radius: 7px; padding: 8px 16px;
    }
    .reviews { background: var(--bg-light); border-radius: 10px; padding: 12px 14px; display: flex; flex-direction: column; gap: 8px; }
    .rev-top { display: flex; justify-content: space-between; font-size: 10.5px; color: var(--primary-grey); }
    .rev-top b { color: var(--primary-dark); }
    .rev-bar { height: 4px; border-radius: 2px; background: var(--outline); overflow: hidden; }
    .rev-bar span { display: block; height: 100%; background: #7ce7ac; border-radius: 2px; }
    .conv-sub { font-size: 10px; color: var(--primary-grey); margin: 2px 0 8px; }
    .area { width: 100%; height: auto; display: block; }
  `],
})
export class ProductPanel {
  @Input() name = ITEM.name;
  @Input() sku = ITEM.sku;

  item = ITEM;
  creators = members(['SW', 'HC', 'PP']);
}
