import { Product } from './product';

export type DecidedItem = {
  product: Product;
  impTrackers: string[];
  clickTrackers: string[];
};
