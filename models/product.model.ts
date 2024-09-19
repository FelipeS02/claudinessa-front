import { ExtraCategory } from './extra.model';

export type ProductPriceOptions = {
  id: number;
  name: string;
  price: number;
  offPrice: number;
  // Is the base price
  isDefault: boolean;
  productId: number;
};

export type Product = {
  id: number;
  // Total times the product is purchased
  purchases: number;
  name: string;
  description: string;
  img: string;
  isAvailable: boolean;
  isOnDiscount: boolean;
  // Product has more than 1 price option
  hasOptions: boolean;
  options: ProductPriceOptions[];
  extras?: ExtraCategory[];
};

export type ProductCategory = {
  id: number;
  name: string;
  products: Product[];
};
