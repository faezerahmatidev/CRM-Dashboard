import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { DashPage } from '../../shared/dash-page/dash-page';
import { EmptyState } from '../../shared/empty-state/empty-state';
import { ViewCard } from '../../shared/view-card/view-card';
import { ProductsSidebar } from '../products-sidebar';

@Component({
  selector: 'app-products-empty',
  standalone: true,
  imports: [DashPage, ProductsSidebar, EmptyState, ViewCard],
  templateUrl: './empty.html',
  styleUrl: './empty.scss',
})
export class ProductsEmpty {
  private router = inject(Router);

  onSetup(): void {
    this.router.navigate(['/products/list-01'], { replaceUrl: true });
  }
}
