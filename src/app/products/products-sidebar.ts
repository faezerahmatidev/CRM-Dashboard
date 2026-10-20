import { Component, Input } from '@angular/core';
import { PanelHeader } from '../shared/panel-header/panel-header';
import { CatalogThumb } from '../shared/catalog-thumb/catalog-thumb';
import { RingsChart } from '../shared/rings-chart/rings-chart';
import { ConversionBars } from '../dashboard/widgets/conversion-bars';
import { CATEGORIES } from './products-data';

/** Left info panel shared by the products list/grid views. */
@Component({
  selector: 'app-products-sidebar',
  standalone: true,
  imports: [PanelHeader, CatalogThumb, RingsChart, ConversionBars],
  template: `
    <app-panel-header logo="C" title="CRAFTUI LLC" sub="8484 Ross Wells" />

    <section class="cats">
      <h3 class="widget-title">Popular categories</h3>
      <p class="conv-sub">Explore most popular product categories</p>
      <ul class="cat-list">
        @for (c of categories; track c.label) {
          <li>
            <span class="cat-text"><b>{{ c.value }}</b><span>{{ c.label }}</span></span>
            <span class="cat-icon" [style.background]="c.tint" [style.color]="c.color">
              <app-catalog-thumb [icon]="c.icon" [palette]="'transparent'" [color]="c.color" [size]="38" [radius]="10" [label]="c.label" />
            </span>
          </li>
        }
      </ul>
    </section>

    @if (chart === 'donut') {
      <app-rings-chart />
    } @else {
      <app-conversion-bars title="Conversion history" sub="Week to week performance" />
      <div class="sales-row">
        <span><b>$342.000</b><span>Total sales</span></span>
        <span><b>$200.000</b><span>Spendings</span></span>
      </div>
    }
  `,
  styles: [`
    .conv-sub { font-size: 10px; color: var(--primary-grey); margin: 2px 0 12px; }
    .cat-list { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 10px; }
    .cat-list li {
      display: flex; align-items: center; justify-content: space-between; gap: 12px;
      background: var(--bg-light); border-radius: 10px; padding: 12px 14px;
    }
    .cat-text { display: flex; flex-direction: column; gap: 2px; }
    .cat-text b { font-size: 15px; font-weight: 900; }
    .cat-text span span { font-size: 10px; color: var(--primary-grey); }
    .cat-icon {
      width: 38px; height: 38px; flex: 0 0 38px; border-radius: 10px;
      display: grid; place-items: center; overflow: hidden;
    }
    .sales-row {
      display: grid; grid-template-columns: 1fr 1fr;
      margin-top: 12px; padding-top: 12px; border-top: 1px solid var(--outline);
    }
    .sales-row > span { display: flex; flex-direction: column; align-items: center; gap: 2px; }
    .sales-row b { font-size: 13px; }
    .sales-row span span { font-size: 10px; color: var(--primary-grey); }
  `],
})
export class ProductsSidebar {
  @Input() chart: 'donut' | 'bars' = 'donut';

  categories = CATEGORIES;
}
