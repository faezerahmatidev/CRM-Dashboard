import { DataTable, TableColumn, TableRow } from './data-table';

describe('DataTable', () => {
  const columns: TableColumn[] = [
    { key: 'name', label: 'Name', sortable: true, kind: 'text' },
    { key: 'price', label: 'Price', kind: 'price' },
  ];
  const rows: TableRow[] = [{ id: 'p1', cells: { name: { text: 'Macbook' } } }];

  function setup(): DataTable {
    const table = new DataTable();
    table.columns = columns;
    table.rows = rows;
    return table;
  }

  it('should emit sortChange only for sortable headers', () => {
    const table = setup();
    const emitted: string[] = [];
    table.sortChange.subscribe((k: string) => emitted.push(k));

    table.headerClick(columns[0]);
    table.headerClick(columns[1]);
    expect(emitted).toEqual(['name']);
  });

  it('should emit selectChange with id and checked state', () => {
    const table = setup();
    const emitted: Array<{ id: string; checked: boolean }> = [];
    table.selectChange.subscribe((e) => emitted.push({ id: e.id, checked: e.checked }));

    table.onCheck('p1', true);
    expect(emitted).toEqual([{ id: 'p1', checked: true }]);
  });

  it('should return null for columns without a custom cell template', () => {
    expect(setup().templateFor('members')).toBeNull();
  });
});
