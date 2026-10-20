import { thumbPalette } from '../shared/catalog-thumb/thumb-palette';

export type ProductGroup = 'A' | 'B';
export type ProductKind = 'Laptop' | 'Music';

export interface Product {
  id: string;
  name: string;
  sku: string;
  /** Display sales, e.g. `1.368`. */
  sales: string;
  /** Display quantity, e.g. `4.890`. */
  qty: string;
  /** Rating value, e.g. `4.2`. */
  rating: string;
  /** Display price, e.g. `$2.700`. */
  price: string;
  category: string;
  kind: ProductKind;
  group: ProductGroup;
  icon: 'laptop' | 'audio';
  palette: string;
}

function product(
  id: string,
  name: string,
  sku: string,
  sales: string,
  qty: string,
  rating: string,
  price: string,
  kind: ProductKind,
  group: ProductGroup,
  icon: 'laptop' | 'audio',
  palette: number,
): Product {
  return {
    id, name, sku, sales, qty, rating, price,
    category: 'Electronics', kind, group, icon,
    palette: thumbPalette(palette),
  };
}

export const PRODUCTS: Product[] = [
  product('p-a1', "MacbookPro15'2019", 'SKU 345-091', '1.368', '4.890', '4.2', '$2.700', 'Laptop', 'A', 'laptop', 0),
  product('p-a2', "MacbookPro15'2018", 'SKU 345-092', '1.908', '970', '4.6', '$2.550', 'Laptop', 'A', 'laptop', 1),
  product('p-a3', "MacbookPro15'2017", 'SKU 345-093', '1.878', '1.560', '4.9', '$2.150', 'Laptop', 'A', 'laptop', 2),
  product('p-a4', "MacbookPro13'2019", 'SKU 345-094', '2.180', '670', '4.6', '$1.550', 'Laptop', 'A', 'laptop', 3),
  product('p-a5', 'Macbook2019', 'SKU 345-095', '1.680', '1.990', '4.5', '$1.150', 'Laptop', 'A', 'laptop', 4),
  product('p-a6', 'MicrosoftSurface', 'SKU 345-096', '1.790', '3.250', '4.8', '$1.950', 'Laptop', 'A', 'laptop', 5),
  product('p-a7', "MacbookAir11'2017", 'SKU 345-097', '1.550', '2.600', '4.9', '$1.250', 'Laptop', 'A', 'laptop', 0),
  product('p-b1', "Macbook Pro 15' 2019", 'SKU 345-091', '1.368', '4.890', '4.2', '$2.700', 'Laptop', 'B', 'laptop', 0),
  product('p-b2', 'Apple Wireless Airpods', 'SKU 345-092', '1.908', '970', '4.6', '$199', 'Music', 'B', 'audio', 1),
  product('p-b3', 'Tour Beats by Dr. Dre', 'SKU 345-093', '1.878', '1.560', '4.9', '$21.50', 'Music', 'B', 'audio', 2),
  product('p-b4', "Macbook Pro 13' 2019", 'SKU 345-094', '2.180', '670', '4.6', '$1.550', 'Laptop', 'B', 'laptop', 3),
  product('p-b5', 'Macbook 2019', 'SKU 345-095', '1.680', '1.990', '4.5', '$1.150', 'Laptop', 'B', 'laptop', 4),
  product('p-b6', 'Powerbeats Pro Wireless', 'SKU 345-096', '1.790', '3.250', '4.8', '$249', 'Music', 'B', 'audio', 5),
  product('p-b7', "Macbook Air 11' 2017", 'SKU 345-097', '1.550', '2.600', '4.9', '$1.250', 'Laptop', 'B', 'laptop', 0),
  product('p-b8', 'Microsoft Surface', 'SKU 345-099', '1.790', '3.250', '4.8', '$1.950', 'Laptop', 'B', 'laptop', 1),
  product('p-b9', "Macbook Air 11' 2017", 'SKU 345-124', '1.550', '2.600', '4.9', '$1.250', 'Laptop', 'B', 'laptop', 2),
];

export const CATEGORIES = [
  { value: '1.345', label: 'Electronics', icon: 'laptop' as const, tint: '#eef2fe', color: '#5e81f4' },
  { value: '1.042', label: 'Accessories', icon: 'audio' as const, tint: '#ffe9ec', color: '#f0566b' },
  { value: '980', label: 'Digital goods', icon: 'cube' as const, tint: '#f5f5fa', color: '#8181a5' },
];

export type SaleStatus = 'Paid' | 'Pending' | 'Cancelled';

export interface SaleRow {
  email: string;
  price: string;
  status: SaleStatus;
}

export const SALE_ROWS: SaleRow[] = [
  { email: 'solon.gerhold@yahoo.com', price: '$1.950', status: 'Paid' },
  { email: 'schultz.polly@yahoo.com', price: '$1.950', status: 'Pending' },
  { email: 'dallas_tillman@yahoo.com', price: '$1.950', status: 'Pending' },
  { email: 'jacklyn_stokes@gmail.com', price: '$1.950', status: 'Paid' },
  { email: 'hettie.stark@bednar.biz', price: '$1.950', status: 'Paid' },
  { email: 'devin_davis@colby.us', price: '$1.950', status: 'Cancelled' },
  { email: 'gulgowski_frederick@metz.us', price: '$1.950', status: 'Pending' },
  { email: 'will.blanda@yahoo.com', price: '$1.950', status: 'Paid' },
  { email: 'herminio_sporer@gmail.com', price: '$1.950', status: 'Pending' },
  { email: 'devin_davis@colby.us', price: '$1.950', status: 'Cancelled' },
];

export interface Purchase {
  name: string;
  sku: string;
  qty: string;
  date: string;
  price: string;
}

export const PURCHASES: Purchase[] = [
  { name: "Macbook Pro 15' 2019", sku: 'SKU 345-091', qty: '1 qty.', date: '18 Dec 2019', price: '$2.700' },
  { name: 'Microsoft Surface', sku: 'SKU 345-120', qty: '1 qty.', date: '10 Oct 2019', price: '$3.500' },
  { name: 'iPhone XS 64 GB', sku: 'SKU 345-003', qty: '1 qty.', date: '16 Mar 2019', price: '$1.350' },
  { name: "DELL XPS 15' 2019", sku: 'SKU 345-489', qty: '1 qty.', date: '30 Jan 2019', price: '$2.350' },
];

export const ITEM = {
  name: 'Macbook Pro 2019',
  sku: 'SKU 345-095',
  title: "Macbook Pro 2019 2.6GHz Processor 256GB Storage",
  description:
    'Color is so powerful that it can persuade, motivate, inspire and touch people\u2019s soft spot the heart. This is the reason why understanding colors is pretty crucial in relating.',
  available: '3.590 available',
  sold: '1.328 sold',
  price: '$1.950 current price',
  rating: '4.2 / 5',
};
