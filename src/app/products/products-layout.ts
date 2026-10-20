import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs';
import { AppShell } from '../shared/app-shell/app-shell';
import { ProductModal } from './product-modal/product-modal';
import { SaleModal } from './sale-modal/sale-modal';
import { ProductsStore } from './products-store';

@Component({
  selector: 'app-products-layout',
  standalone: true,
  imports: [RouterOutlet, AppShell, ProductModal, SaleModal],
  template: `
    <app-shell title="{{ title }}" activeIcon="products" actionIcon="plus" (action)="store.openNew()" [showBack]="showBack" (back)="goList()">
      <router-outlet />
    </app-shell>
    <app-product-modal [open]="store.modalOpen()" (openChange)="store.setModalOpen($event)" />
    <app-sale-modal [open]="store.saleOpen()" (openChange)="store.setSaleOpen($event)" />
  `,
})
export class ProductsLayout implements OnInit {
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  protected store = inject(ProductsStore);

  title = 'Products';
  showBack = false;

  ngOnInit(): void {
    this.updateTitle();
    this.router.events
      .pipe(filter((e): e is NavigationEnd => e instanceof NavigationEnd))
      .subscribe(() => this.updateTitle());
  }

  goList(): void {
    this.router.navigate(['/products/list-01'], { replaceUrl: true });
  }

  private updateTitle(): void {
    let snap: ActivatedRouteSnapshot | null = this.route.snapshot.firstChild;
    while (snap) {
      const dataTitle: unknown = snap.data?.['title'];
      if (typeof dataTitle === 'string') this.title = dataTitle;
      snap = snap.firstChild;
    }
    this.showBack = this.router.url.startsWith('/products/item');
  }
}
