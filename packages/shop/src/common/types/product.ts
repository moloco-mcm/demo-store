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
  thumbnailUrl: string;
  description?: string;
  adAccountId: string;
};
