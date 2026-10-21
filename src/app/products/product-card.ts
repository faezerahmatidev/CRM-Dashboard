import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CatalogThumb } from '../shared/catalog-thumb/catalog-thumb';
import { RatingStars } from '../shared/rating-stars/rating-stars';
import { Product } from './products-data';

/**
 * Product catalog card with two Figma variants (`01` centered, `02` photo-top).
 * Pure presentational inputs — promote to shared if another catalog needs it.
 */
@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CatalogThumb, RatingStars],
  template: `
    <article
      class="pcard"
      [class.photo-top]="variant === '02'"
      (click)="open.emit(product.id)"
      (keyup.enter)="open.emit(product.id)"
      tabindex="0"
    >
      @if (variant === '02') {
        <div class="photo" [style.background]="product.palette">
          <span class="pcheck" (click)="$event.stopPropagation()">
            <input
              type="checkbox"
              [checked]="selected"
              (change)="onCheck($event)"
              aria-label="Select product"
            />
          </span>
          <span class="pbadge">{{ product.category }}</span>
          <app-catalog-thumb [icon]="product.icon" [palette]="'transparent'" [size]="72" [radius]="0" [label]="product.name" />
        </div>
        <b class="pname">{{ product.name }}</b>
        <span class="psku">{{ product.sku }}</span>
      } @else {
        <span class="pcheck corner" (click)="$event.stopPropagation()">
          <input
            type="checkbox"
            [checked]="selected"
            (change)="onCheck($event)"
            aria-label="Select product"
          />
        </span>
        <button class="dots-btn card-menu" type="button" aria-label="Card options" (click)="menu.emit(product.id); $event.stopPropagation()">...</button>
        <app-catalog-thumb [icon]="product.icon" [palette]="product.palette" [size]="56" [radius]="12" [label]="product.name" />
        <b class="pname">{{ product.name }}</b>
        <span class="psku">{{ product.sku }}</span>
        <app-rating-stars [value]="product.rating" mode="stars" />
      }
      <div class="pfoot" (click)="$event.stopPropagation()">
        <span><b>{{ product.sales }}</b></span>
        <span><b>{{ product.price }}</b></span>
      </div>
    </article>
  `,
  styles: [`
    .pcard {
      position: relative;
      border: 1px solid var(--outline);
      border-radius: 12px;
      background: #fff;
      padding: 20px 14px 0;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 4px;
      overflow: hidden;
      cursor: pointer;
      min-width: 0;
    }
    .pcard:focus { outline: 1.5px solid var(--primary); outline-offset: 2px; }
    .pcard.photo-top { padding: 0 0 0; gap: 0; }
    .pcheck input { width: 17px; height: 17px; accent-color: var(--primary); cursor: pointer; }
    .pcheck.corner { position: absolute; top: 12px; left: 12px; }
    .card-menu { position: absolute; top: 12px; right: 12px; }
    .photo {
      position: relative;
      align-self: stretch;
      min-height: 150px;
      display: grid;
      place-items: center;
      color: #fff;
    }
    .photo .pcheck { position: absolute; top: 10px; left: 10px; }
    .photo .pcheck input { accent-color: var(--primary); }
    .pbadge {
      position: absolute;
      top: 10px;
      right: 10px;
      font-size: 10px;
      font-weight: 700;
      color: var(--primary-dark);
      background: #fff;
      border-radius: 7px;
      padding: 6px 12px;
    }
    .pname { font-size: 12px; margin-top: 8px; text-align: center; }
    .photo-top .pname { margin-top: 12px; padding: 0 10px; }
    .psku { font-size: 10px; color: var(--primary-grey); }
    .photo-top .psku { padding: 0 10px; }
    .pfoot {
      display: grid;
      grid-template-columns: 1fr 1fr;
      align-self: stretch;
      border-top: 1px solid var(--outline);
      margin: 12px -14px 0;
    }
    .photo-top .pfoot { margin: 12px 0 0; }
    .pfoot > span {
      display: grid;
      place-items: center;
      padding: 12px 0;
    }
    .pfoot > span + span { border-left: 1px solid var(--outline); }
    .pfoot b { font-size: 12px; }
  `],
})
export class ProductCard {
  @Input() product!: Product;
  @Input() variant: '01' | '02' = '01';
  @Input() selected = false;
  @Output() selectChange = new EventEmitter<{ id: string; checked: boolean }>();
  @Output() open = new EventEmitter<string>();
  @Output() menu = new EventEmitter<string>();

  onCheck(event: Event): void {
    const input = event.target as HTMLInputElement | null;
    this.selectChange.emit({ id: this.product.id, checked: !!input?.checked });
  }
}
