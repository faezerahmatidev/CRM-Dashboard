import { hasStringKey, loadList, saveList } from './storage';

describe('storage helper', () => {
  const KEY = 'crm-dashboard-test-key';

  beforeEach(() => {
    localStorage.clear();
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('should return the seed when storage is empty', () => {
    expect(loadList(KEY, () => [{ id: 'a' }], hasStringKey('id'))).toEqual([{ id: 'a' }]);
  });

  it('should round-trip saved lists', () => {
    saveList(KEY, [{ id: 'a' }, { id: 'b' }]);
    expect(loadList<{ id: string }>(KEY, () => [], hasStringKey('id'))).toEqual([{ id: 'a' }, { id: 'b' }]);
  });

  it('should reseed on corrupt JSON', () => {
    localStorage.setItem(KEY, '{broken');
    expect(loadList(KEY, () => [{ id: 'seed' }], hasStringKey('id'))).toEqual([{ id: 'seed' }]);
  });

  it('should reseed on wrong item shape', () => {
    localStorage.setItem(KEY, JSON.stringify([{ nope: 1 }]));
    expect(loadList(KEY, () => [{ id: 'seed' }], hasStringKey('id'))).toEqual([{ id: 'seed' }]);
  });

  it('should reseed on an empty stored array', () => {
    localStorage.setItem(KEY, '[]');
    expect(loadList(KEY, () => [{ id: 'seed' }], hasStringKey('id'))).toEqual([{ id: 'seed' }]);
  });

  it('should not throw when storage writes fail', () => {
    spyOn(Storage.prototype, 'setItem').and.throwError('denied');
    expect(() => saveList(KEY, [{ id: 'a' }])).not.toThrow();
  });
});
