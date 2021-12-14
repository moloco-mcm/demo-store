import { Product } from './product';

export type Order = {
  userId: string;
  items: {
    product: Product;
    quantity: number;
  }[];
  createdAt: number;
};
