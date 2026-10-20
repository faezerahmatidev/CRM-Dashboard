import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { DashPage } from '../../shared/dash-page/dash-page';
import { ViewToolbar } from '../../shared/view-toolbar/view-toolbar';
import { ViewCard } from '../../shared/view-card/view-card';
import { ActionsButton } from '../../shared/actions-button/actions-button';
import { ProjectViewMode } from '../../shared/view-toggle/view-toggle';
import { Pagination } from '../../shared/pagination/pagination';
import { DataTable, TableCell, TableColumn } from '../../shared/data-table/data-table';
import { ProductsSidebar } from '../products-sidebar';
import { Product, ProductSortKey } from '../products-data';
import { ProductsStore } from '../products-store';

const SORT_MAP: Record<string, ProductSortKey> = {
  product: 'name',
  sales: 'sales',
  rating: 'rating',
  price: 'price',
};

@Component({
  selector: 'app-products-list-01',
  standalone: true,
  imports: [DashPage, ProductsSidebar, ViewToolbar, ViewCard, ActionsButton, Pagination, DataTable],
  templateUrl: './list-01.html',
  styleUrl: './list-01.scss',
})
export class ProductsList01 {
  private router = inject(Router);
  protected store = inject(ProductsStore);

  grid = 'auto minmax(0,1.5fr) minmax(0,0.7fr) minmax(0,0.7fr) minmax(0,0.8fr) minmax(0,0.7fr) minmax(0,0.8fr) auto';
  columns: TableColumn[] = [
    { key: 'product', label: 'Name', sortable: true, kind: 'product' },
    { key: 'sales', label: 'Sales', sortable: true, kind: 'number' },
    { key: 'qty', label: 'Qty.', sortable: true, kind: 'number' },
    { key: 'rating', label: 'Rating', sortable: true, kind: 'rating' },
    { key: 'price', label: 'Price', sortable: true, kind: 'price' },
    { key: 'tag', label: 'Tag', kind: 'pill' },
  ];

  rows(): Array<{ id: string; selected: boolean; cells: Record<string, TableCell> }> {
    return this.store.visible('A').map((p: Product) => ({
      id: p.id,
      selected: this.store.isSelected(p.id),
      cells: {
        product: { text: p.name, sub: p.sku, icon: p.icon, palette: p.palette },
        sales: { text: p.sales, sub: 'Sales' },
        qty: { text: p.qty, sub: 'Qty.' },
        rating: { text: p.rating, rating: p.rating },
        price: { text: p.price },
        tag: { text: p.category, tone: 'grey' as const },
      },
    }));
  }

  sortBy(col: string): void {
    const key = SORT_MAP[col];
    if (key) this.store.toggleSortKey(key);
  }

  get sortCol(): string {
    return this.store.sortKey() === 'name' ? 'product' : this.store.sortKey();
  }

  openItem(): void {
    this.router.navigate(['/products/item/overview'], { replaceUrl: true });
  }

  onViewChange(mode: ProjectViewMode): void {
    if (mode === 'grid') this.router.navigate(['/products/grid-01'], { replaceUrl: true });
  }
}
