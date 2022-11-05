export type Product = {
  id: string;
  title: string;
  price: {
    currency: string;
    amount: number;
  };
  salePrice?: {
    currency: string;
    amount: number;
  };
  rating?: number;
  reviewCount?: number;
  imageUrl: string;
  description?: string;
  adAccountId: string;
};
