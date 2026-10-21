import { Injectable, effect, signal } from '@angular/core';
import { hasStringKey, loadList, saveList } from '../shared/storage/storage';
import { PRODUCTS, Product, ProductGroup } from './products-data';

export type ProductSortKey = 'name' | 'sales' | 'price' | 'rating';

function clone(list: Product[]): Product[] {
  return list.map((p) => ({ ...p }));
}

function seedProducts(): Product[] {
  return clone(PRODUCTS);
}

function keyOf(p: Product, key: ProductSortKey): string {
  return key === 'name' ? p.name : key === 'sales' ? p.sales : key === 'price' ? p.price : p.rating;
}

/** Products state shared by the list/grid views and the product dialog. */
@Injectable({ providedIn: 'root' })
export class ProductsStore {
  private static readonly STORAGE_KEY = 'crm-dashboard-products-v1';

  private readonly _products = signal<Product[]>(ProductsStore.load());
  readonly products = this._products.asReadonly();

  private readonly _sortKey = signal<ProductSortKey>('name');
  readonly sortKey = this._sortKey.asReadonly();

  private readonly _sortDir = signal<'asc' | 'desc'>('asc');
  readonly sortDir = this._sortDir.asReadonly();

  private readonly _selectedIds = signal<string[]>(['p-a1', 'p-a2']);
  readonly selectedIds = this._selectedIds.asReadonly();

  private readonly _page = signal(2);
  readonly page = this._page.asReadonly();

  private readonly _modalOpen = signal(false);
  readonly modalOpen = this._modalOpen.asReadonly();

  private readonly _saleOpen = signal(false);
  readonly saleOpen = this._saleOpen.asReadonly();

  constructor() {
    effect(() => saveList(ProductsStore.STORAGE_KEY, this._products()));
  }

  private static load(): Product[] {
    return loadList(ProductsStore.STORAGE_KEY, seedProducts, hasStringKey('id'));
  }

  visible(group: ProductGroup): Product[] {
    const key = this._sortKey();
    const dir = this._sortDir();
    return this._products()
      .filter((p) => p.group === group)
      .sort((a, b) =>
        dir === 'asc'
          ? keyOf(a, key).localeCompare(keyOf(b, key))
          : keyOf(b, key).localeCompare(keyOf(a, key)),
      );
  }

  isSelected(id: string): boolean {
    return this._selectedIds().includes(id);
  }

  toggleSortKey(key: ProductSortKey): void {
    if (this._sortKey() === key) {
      this._sortDir.update((d) => (d === 'asc' ? 'desc' : 'asc'));
    } else {
      this._sortKey.set(key);
      this._sortDir.set('asc');
    }
  }

  toggleSelect(id: string, checked: boolean): void {
    this._selectedIds.update((ids) =>
      checked ? [...new Set([...ids, id])] : ids.filter((s) => s !== id),
    );
  }

  setPage(p: number): void {
    this._page.set(p);
  }

  add(name: string, price: string): Product | null {
    if (!name.trim()) return null;
    const created: Product = {
      id: `p-${Date.now()}`,
      name: name.trim(),
      sku: `SKU 345-${100 + this._products().length}`,
      sales: '0',
      qty: '0',
      rating: '0.0',
      price: price.trim() || '$0',
      category: 'Electronics',
      kind: 'Laptop',
      group: 'A',
      icon: 'laptop',
      palette: 'linear-gradient(135deg,#5e81f4,#9698d6)',
    };
    this._products.update((list) => [created, ...list]);
    return created;
  }

  remove(id: string): void {
    this._products.update((list) => list.filter((p) => p.id !== id));
  }

  openNew(): void {
    this._modalOpen.set(true);
  }

  setModalOpen(open: boolean): void {
    this._modalOpen.set(open);
  }

  openSale(): void {
    this._saleOpen.set(true);
  }

  setSaleOpen(open: boolean): void {
    this._saleOpen.set(open);
  }
}
