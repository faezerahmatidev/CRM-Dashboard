import { TestBed } from '@angular/core/testing';
import { ProductsStore } from './products-store';

describe('ProductsStore', () => {
  let store: ProductsStore;

  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({});
    store = TestBed.inject(ProductsStore);
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('should seed the demo products when storage is empty', () => {
    expect(store.products().length).toBe(16);
    expect(store.visible('A').length).toBe(7);
    expect(store.visible('B').length).toBe(9);
  });

  it('should sort by column key and flip direction on repeat', () => {
    store.toggleSortKey('price');
    expect(store.sortKey()).toBe('price');
    expect(store.sortDir()).toBe('asc');
    store.toggleSortKey('price');
    expect(store.sortDir()).toBe('desc');
  });

  it('should manage row selection', () => {
    expect(store.isSelected('p-a1')).toBeTrue();
    store.toggleSelect('p-a1', false);
    expect(store.isSelected('p-a1')).toBeFalse();
    store.toggleSelect('p-b1', true);
    expect(store.isSelected('p-b1')).toBeTrue();
  });

  it('should prepend added products to group A', () => {
    const created = store.add('Testbook', '$9');
    expect(created?.price).toBe('$9');
    expect(store.visible('A').length).toBe(8);
    expect(store.add('   ', '$1')).toBeNull();
  });

  it('should remove products by id', () => {
    store.remove('p-a1');
    expect(store.products().some((p) => p.id === 'p-a1')).toBeFalse();
  });

  it('should manage the add and sale dialogs', () => {
    store.openNew();
    expect(store.modalOpen()).toBeTrue();
    store.setModalOpen(false);
    expect(store.modalOpen()).toBeFalse();
    store.openSale();
    expect(store.saleOpen()).toBeTrue();
    store.setSaleOpen(false);
    expect(store.saleOpen()).toBeFalse();
  });
});
