import { TestBed } from '@angular/core/testing';
import { CalendarStore } from './calendar-store';

describe('CalendarStore', () => {
  let store: CalendarStore;

  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({});
    store = TestBed.inject(CalendarStore);
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('should seed the demo events when storage is empty', () => {
    expect(store.events().length).toBe(11);
    expect(store.eventsOn('2018-09-07').length).toBe(2);
  });

  it('should switch views and navigate the cursor', () => {
    store.setView('week');
    expect(store.view()).toBe('week');
    expect(store.cursorISO()).toBe('2018-09-07');
    store.next();
    expect(store.cursorISO()).toBe('2018-09-14');
    store.prev();
    expect(store.cursorISO()).toBe('2018-09-07');
    store.setView('month');
    store.next();
    expect(store.cursorISO()).toBe('2018-10-07');
    store.today();
    expect(store.cursorISO()).toBe('2018-09-07');
  });

  it('should add events to a day', () => {
    store.add('2018-09-07', 'Demo review');
    const day = store.eventsOn('2018-09-07');
    expect(day.length).toBe(3);
    expect(day.some((e) => e.title === 'Demo review')).toBeTrue();
  });

  it('should toggle event completion', () => {
    const event = store.events()[0];
    store.toggleDone(event.id);
    expect(store.events().find((e) => e.id === event.id)?.done).toBeTrue();
  });

  it('should manage the dialog state machine', () => {
    expect(store.modalOpen()).toBeFalse();
    expect(store.editing()).toBeNull();
    store.openNew('2018-09-07');
    expect(store.modalOpen()).toBeTrue();
    expect(store.editing()).toBeNull();
    expect(store.draftDate()).toBe('2018-09-07');
    store.openDetails(store.events()[0]);
    expect(store.editing()?.id).toBe(store.events()[0].id);
    store.setModalOpen(false);
    expect(store.modalOpen()).toBeFalse();
    expect(store.editing()).toBeNull();
  });
});
