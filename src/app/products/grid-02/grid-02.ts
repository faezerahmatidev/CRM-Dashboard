import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { DashPage } from '../../shared/dash-page/dash-page';
import { ViewToolbar } from '../../shared/view-toolbar/view-toolbar';
import { ViewCard } from '../../shared/view-card/view-card';
import { CardGrid } from '../../shared/card-grid/card-grid';
import { ActionsButton } from '../../shared/actions-button/actions-button';
import { ProjectViewMode } from '../../shared/view-toggle/view-toggle';
import { Pagination } from '../../shared/pagination/pagination';
import { ProductsSidebar } from '../products-sidebar';
import { ProductCard } from '../product-card';
import { ProductsStore } from '../products-store';

@Component({
  selector: 'app-products-grid-02',
  standalone: true,
  imports: [DashPage, ProductsSidebar, ViewToolbar, ViewCard, CardGrid, ActionsButton, Pagination, ProductCard],
  templateUrl: './grid-02.html',
})
export class ProductsGrid02 {
  private router = inject(Router);
  protected store = inject(ProductsStore);

  openItem(): void {
    this.router.navigate(['/products/item/overview'], { replaceUrl: true });
  }

  onViewChange(mode: ProjectViewMode): void {
    if (mode === 'list') this.router.navigate(['/products/list-02'], { replaceUrl: true });
  }
}
