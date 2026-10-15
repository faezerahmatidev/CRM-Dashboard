import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { DashSales } from './sales';

describe('DashSales donut segments', () => {
  let component: DashSales;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashSales],
      providers: [provideRouter([])],
    }).compileComponents();
    component = TestBed.createComponent(DashSales).componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should convert channel shares into ring arcs', () => {
    const circ = 2 * Math.PI * 70;
    const segs = component.donutSegs([34.2, 28.9, 13.1, 23.8]);

    expect(segs.length).toBe(4);
    // First arc starts at the top (offset 0) minus the gap.
    expect(segs[0].off).toBe(0);
    expect(segs[0].len).toBeCloseTo((34.2 / 100) * circ - 4, 1);
    // Each following arc starts where the previous one ended.
    expect(segs[1].off).toBeCloseTo(-((34.2 / 100) * circ), 1);
    // Arc lengths plus gaps cover the full ring.
    const total = segs.reduce((sum, s) => sum + s.len, 0);
    expect(total).toBeCloseTo(circ - 4 * 4, 0);
  });

  it('should clamp tiny shares to a visible minimum', () => {
    const segs = component.donutSegs([99.9, 0.1, 0, 0]);
    expect(segs.every((s) => s.len >= 2)).toBeTrue();
  });
});
