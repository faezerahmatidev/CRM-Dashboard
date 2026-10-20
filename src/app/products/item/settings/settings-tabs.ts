import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CatalogThumb } from '../../../shared/catalog-thumb/catalog-thumb';
import { Toggle } from '../../../shared/toggle/toggle';
import { ITEM } from '../../products-data';

const FORM_CSS = `
  .set-form { display: flex; flex-direction: column; gap: 4px; }
  .form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 4px 28px; }
  .field { display: flex; flex-direction: column; padding: 10px 0; border-bottom: 1.5px solid var(--outline); }
  .field > span:first-child { font-size: 11px; color: var(--primary-grey); margin-bottom: 6px; }
  .field-wide { grid-column: 1 / -1; }
  .field-control { display: flex; align-items: center; gap: 10px; }
  .field-control input, .field-control select, .field-control textarea {
    flex: 1; border: 0; outline: none; background: transparent;
    font-size: 13px; font-weight: 700; font-family: inherit;
    color: var(--primary-dark); padding: 0; min-width: 0; appearance: none; resize: vertical;
  }
  .field-control input::placeholder, .field-control textarea::placeholder { color: var(--primary-grey); font-weight: 400; }
  .field-icon { width: 16px; height: 16px; flex: 0 0 16px; stroke: var(--primary-grey); fill: none; stroke-width: 1.7; stroke-linecap: round; stroke-linejoin: round; }
  .form-actions { display: flex; gap: 12px; margin-top: auto; padding-top: 26px; }
  .form-actions .btn { flex: none; min-width: 170px; }
  .set-title { font-size: 13px; font-weight: 900; margin: 14px 0 4px; }
`;

@Component({
  selector: 'app-product-settings-general',
  standalone: true,
  imports: [FormsModule, CatalogThumb],
  template: `
    <form class="set-form" (ngSubmit)="$event.preventDefault()">
      <div class="photos">
        @for (i of [0, 1, 2, 3]; track i) {
          <span class="photo" [style.background]="palettes[i]">
            <button class="mini-del" type="button" aria-label="Remove photo">
              <svg viewBox="0 0 24 24"><rect x="5" y="6.5" width="14" height="13" rx="2"/><path d="M4 6.5h16M10 10.5v6M14 10.5v6"/></svg>
            </button>
          </span>
        }
        <button class="photo-next" type="button" aria-label="Next photos">›</button>
      </div>
      <div class="form-grid">
        <label class="field field-wide"><span>Product's name</span><span class="field-control"><input [(ngModel)]="name" name="name" /></span></label>
        <label class="field"><span>Sku</span><span class="field-control"><input [(ngModel)]="sku" name="sku" placeholder="Start typing..." /></span></label>
        <label class="field"><span>Available quantity</span><span class="field-control"><input [(ngModel)]="qty" name="qty" placeholder="Start typing..." /></span></label>
        <label class="field"><span>Price</span><span class="field-control"><input [(ngModel)]="price" name="price" /></span></label>
        <label class="field"><span>Currency</span><span class="field-control">
          <select [(ngModel)]="currency" name="currency"><option>USD</option><option>EUR</option></select>
          <svg class="field-icon" viewBox="0 0 24 24"><path d="m6 9.5 6 6 6-6" /></svg>
        </span></label>
        <label class="field"><span>Category</span><span class="field-control">
          <select [(ngModel)]="category" name="category"><option>Select category</option><option>Electronics</option></select>
          <svg class="field-icon" viewBox="0 0 24 24"><path d="m6 9.5 6 6 6-6" /></svg>
        </span></label>
        <label class="field"><span>Subcategory</span><span class="field-control">
          <select [(ngModel)]="subcategory" name="subcategory"><option>Select subcategory</option><option>Laptop</option></select>
          <svg class="field-icon" viewBox="0 0 24 24"><path d="m6 9.5 6 6 6-6" /></svg>
        </span></label>
        <label class="field field-wide"><span>Item location</span><span class="field-control"><input [(ngModel)]="location" name="location" placeholder="Select store location" /></span></label>
      </div>
      <div class="form-actions">
        <button class="btn btn-primary" type="submit">Update Settings</button>
        <button class="btn btn-rest" type="button">Cancel</button>
      </div>
    </form>
  `,
  styles: [FORM_CSS + `
    .photos { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)) 28px; gap: 12px; align-items: center; margin-bottom: 10px; }
    .photo { position: relative; aspect-ratio: 16 / 10; border-radius: 10px; }
    .mini-del {
      position: absolute; top: 6px; left: 50%; transform: translateX(-50%);
      width: 24px; height: 24px; border: 0; border-radius: 7px;
      background: rgb(255 255 255 / 0.9); color: var(--primary-grey);
      cursor: pointer; display: grid; place-items: center;
    }
    .mini-del svg { width: 13px; height: 13px; stroke: currentColor; fill: none; stroke-width: 1.8; stroke-linecap: round; stroke-linejoin: round; }
    .photo-next { border: 0; background: transparent; cursor: pointer; font-size: 22px; color: var(--primary-grey); }
    .photo-next:hover { color: var(--primary); }
  `],
})
export class ProductSettingsGeneral {
  name = ITEM.title;
  sku = 'Start typing...';
  qty = 'Start typing...';
  price = '1.950';
  currency = 'USD';
  category = 'Select category';
  subcategory = 'Select subcategory';
  location = '';
  palettes = [
    'linear-gradient(135deg,#c9b8a8,#8a7a6a)',
    'linear-gradient(135deg,#7a8a9a,#4a5a6a)',
    'linear-gradient(135deg,#a8c8b8,#6a8a7a)',
    'linear-gradient(135deg,#d8c89a,#8a7a4a)',
  ];
}

@Component({
  selector: 'app-product-settings-description',
  standalone: true,
  imports: [FormsModule],
  template: `
    <form class="set-form" (ngSubmit)="$event.preventDefault()">
      <h3 class="set-title">Item description</h3>
      <label class="field field-wide"><span>Full description</span><span class="field-control"><textarea [(ngModel)]="text" name="text" rows="6"></textarea></span></label>
      <label class="field field-wide"><span>Short excerpt</span><span class="field-control"><input [(ngModel)]="excerpt" name="excerpt" placeholder="Start typing..." /></span></label>
      <div class="form-actions">
        <button class="btn btn-primary" type="submit">Update Settings</button>
        <button class="btn btn-rest" type="button">Cancel</button>
      </div>
    </form>
  `,
  styles: [FORM_CSS],
})
export class ProductSettingsDescription {
  text = ITEM.description;
  excerpt = '';
}

@Component({
  selector: 'app-product-settings-shipping',
  standalone: true,
  imports: [FormsModule],
  template: `
    <form class="set-form" (ngSubmit)="$event.preventDefault()">
      <h3 class="set-title">Shipping rates</h3>
      <ul class="opt-rows">
        @for (o of options; track o.name) {
          <li><span class="grow">{{ o.name }}</span><b>{{ o.rate }}</b><button type="button">Update</button></li>
        }
      </ul>
      <div class="form-actions">
        <button class="btn btn-primary" type="submit">Update Settings</button>
        <button class="btn btn-rest" type="button">Cancel</button>
      </div>
    </form>
  `,
  styles: [FORM_CSS + `
    .opt-rows { list-style: none; margin: 0; padding: 0; border: 1px solid var(--outline); border-radius: 12px; }
    .opt-rows li { display: flex; align-items: center; gap: 14px; padding: 14px 16px; border-bottom: 1px solid var(--outline); font-size: 12px; }
    .opt-rows li:last-child { border-bottom: 0; }
    .opt-rows .grow { flex: 1; font-weight: 700; }
    .opt-rows b { white-space: nowrap; }
    .opt-rows button { border: 0; background: transparent; cursor: pointer; color: var(--primary); font-size: 11.5px; font-weight: 700; padding: 0; }
  `],
})
export class ProductSettingsShipping {
  options = [
    { name: 'Standard delivery (5-7 days)', rate: '$12.00' },
    { name: 'Express delivery (2-3 days)', rate: '$24.00' },
    { name: 'Overnight delivery', rate: '$39.00' },
  ];
}

@Component({
  selector: 'app-product-settings-discount',
  standalone: true,
  imports: [FormsModule],
  template: `
    <form class="set-form" (ngSubmit)="$event.preventDefault()">
      <h3 class="set-title">Discount codes</h3>
      <ul class="opt-rows">
        @for (d of codes; track d.code) {
          <li><span class="code">{{ d.code }}</span><span class="grow">{{ d.label }}</span><b>{{ d.off }}</b></li>
        }
      </ul>
      <div class="form-actions">
        <button class="btn btn-primary" type="submit">Update Settings</button>
        <button class="btn btn-rest" type="button">Cancel</button>
      </div>
    </form>
  `,
  styles: [FORM_CSS + `
    .opt-rows { list-style: none; margin: 0; padding: 0; border: 1px solid var(--outline); border-radius: 12px; }
    .opt-rows li { display: flex; align-items: center; gap: 14px; padding: 14px 16px; border-bottom: 1px solid var(--outline); font-size: 12px; }
    .opt-rows li:last-child { border-bottom: 0; }
    .opt-rows .code { font-weight: 900; color: var(--primary); background: var(--btn-rest-bg); border-radius: 7px; padding: 6px 12px; }
    .opt-rows .grow { flex: 1; font-weight: 700; }
    .opt-rows b { white-space: nowrap; }
  `],
})
export class ProductSettingsDiscount {
  codes = [
    { code: 'SAVE10', label: 'Spring campaign', off: '-10%' },
    { code: 'BUNDLE20', label: 'Macbook + accessories', off: '-20%' },
  ];
}

@Component({
  selector: 'app-product-settings-notifications',
  standalone: true,
  imports: [FormsModule, Toggle],
  template: `
    <form class="set-form" (ngSubmit)="$event.preventDefault()">
      <h3 class="set-title">Notifications</h3>
      @for (n of rows; track n.title) {
        <label class="notif-row">
          <span class="notif-text"><b>{{ n.title }}</b><span>{{ n.sub }}</span></span>
          <button app-toggle type="button" [checked]="n.on" (checkedChange)="n.on = $event" [attr.aria-label]="n.title"></button>
        </label>
      }
      <div class="form-actions">
        <button class="btn btn-primary" type="submit">Update Settings</button>
        <button class="btn btn-rest" type="button">Cancel</button>
      </div>
    </form>
  `,
  styles: [FORM_CSS + `
    .notif-row { display: flex; align-items: center; justify-content: space-between; gap: 16px; padding: 18px 0; border-bottom: 1px solid var(--outline); cursor: pointer; }
    .notif-text { display: flex; flex-direction: column; gap: 3px; }
    .notif-text b { font-size: 12.5px; }
    .notif-text span { font-size: 11px; color: var(--primary-grey); }
  `],
})
export class ProductSettingsNotifications {
  rows = [
    { title: 'Low stock alerts', sub: 'Notify when quantity drops below 50', on: true },
    { title: 'New orders', sub: 'Notify on every new purchase', on: true },
    { title: 'Price changes', sub: 'Weekly digest of competitor pricing', on: false },
  ];
}
