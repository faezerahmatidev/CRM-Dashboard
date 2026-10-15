import { Toggle } from './toggle/toggle';
import { Pagination } from './pagination/pagination';

describe('Toggle', () => {
  it('should flip checked state and emit on toggle', () => {
    const toggle = new Toggle();
    const emitted: boolean[] = [];
    toggle.checkedChange.subscribe((v: boolean) => emitted.push(v));

    expect(toggle.checked).toBeTrue();
    expect(toggle.isOn).toBeTrue();

    toggle.toggle();
    expect(toggle.checked).toBeFalse();
    expect(emitted).toEqual([false]);

    toggle.toggle();
    expect(toggle.checked).toBeTrue();
    expect(emitted).toEqual([false, true]);
  });
});

describe('Pagination', () => {
  it('should clamp navigation to the first and last page', () => {
    const pager = new Pagination();
    const emitted: number[] = [];
    pager.pageChange.subscribe((v: number) => emitted.push(v));

    pager.go(0);
    expect(pager.active).toBe(1);

    pager.go(99);
    expect(pager.active).toBe(5);

    pager.go(3);
    expect(pager.active).toBe(3);
    expect(emitted).toEqual([1, 5, 3]);
  });
});
