import { TestBed } from '@angular/core/testing';
import { NotificationsStore } from './notifications-store';

describe('NotificationsStore', () => {
  let store: NotificationsStore;

  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({});
    store = TestBed.inject(NotificationsStore);
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('should seed the demo posts when storage is empty', () => {
    expect(store.posts().length).toBe(4);
    expect(store.visible()[0].author).toBe('Elizabeth Cooper');
  });

  it('should toggle between newest-first and oldest-first', () => {
    expect(store.newestFirst()).toBeTrue();
    store.toggleSort();
    expect(store.newestFirst()).toBeFalse();
    expect(store.visible()[0].author).toBe('Johnny Bowers');
  });

  it('should remove posts by id', () => {
    store.removePost('n1');
    expect(store.posts().some((p) => p.id === 'n1')).toBeFalse();
  });

  it('should append comments to a post', () => {
    store.addComment('n2', 'Looks great!');
    const post = store.posts().find((p) => p.id === 'n2');
    expect(post?.comments.length).toBe(1);
    expect(post?.comments[0].text).toBe('Looks great!');
    store.addComment('n2', '   ');
    expect(post?.comments.length).toBe(1);
  });
});
