import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { DashPage } from '../../shared/dash-page/dash-page';
import { ViewToolbar } from '../../shared/view-toolbar/view-toolbar';
import { ViewCard } from '../../shared/view-card/view-card';
import { ActionsButton } from '../../shared/actions-button/actions-button';
import { ProjectViewMode } from '../../shared/view-toggle/view-toggle';
import { Pagination } from '../../shared/pagination/pagination';
import { DataTable, PillTone, TableCell, TableColumn } from '../../shared/data-table/data-table';
import { ProductsSidebar } from '../products-sidebar';
import { Product, ProductKind, ProductSortKey } from '../products-data';
import { ProductsStore } from '../products-store';

const SORT_MAP: Record<string, ProductSortKey> = {
  name: 'name',
  sales: 'sales',
  rating: 'rating',
  price: 'price',
};

const KIND_TONES: Record<ProductKind, PillTone> = { Laptop: 'blue', Music: 'red' };

@Component({
  selector: 'app-products-list-02',
  standalone: true,
  imports: [DashPage, ProductsSidebar, ViewToolbar, ViewCard, ActionsButton, Pagination, DataTable],
  templateUrl: './list-02.html',
})
export class ProductsList02 {
  private router = inject(Router);
  protected store = inject(ProductsStore);

  grid = 'auto minmax(0,1.3fr) minmax(0,1fr) minmax(0,0.7fr) minmax(0,0.8fr) minmax(0,0.8fr) minmax(0,0.8fr) minmax(0,0.9fr) auto';
  columns: TableColumn[] = [
    { key: 'name', label: 'Name', sortable: true, kind: 'text' },
    { key: 'sku', label: 'Sku', sortable: true, kind: 'text' },
    { key: 'sales', label: 'Sales', sortable: true, kind: 'text' },
    { key: 'rating', label: 'Rating', sortable: true, kind: 'rating' },
    { key: 'price', label: 'Price', sortable: true, kind: 'price' },
    { key: 'kind', label: '', kind: 'pill' },
    { key: 'tag', label: 'Tag', kind: 'pill' },
  ];

  rows(): Array<{ id: string; selected: boolean; cells: Record<string, TableCell> }> {
    return this.store.visible('B').map((p: Product) => ({
      id: p.id,
      selected: this.store.isSelected(p.id),
      cells: {
        name: { text: p.name },
        sku: { text: p.sku },
        sales: { text: p.sales },
        rating: { text: p.rating, rating: p.rating },
        price: { text: p.price },
        kind: { text: p.kind, tone: KIND_TONES[p.kind] },
        tag: { text: p.category, tone: 'grey' as const },
      },
    }));
  }

  sortBy(col: string): void {
    const key = SORT_MAP[col];
    if (key) this.store.toggleSortKey(key);
  }

  openItem(): void {
    this.router.navigate(['/products/item/overview'], { replaceUrl: true });
  }

  onViewChange(mode: ProjectViewMode): void {
    if (mode === 'grid') this.router.navigate(['/products/grid-02'], { replaceUrl: true });
  }
}
