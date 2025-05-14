// models/Product.ts

export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string; // Added based on API response, though not explicitly in requirements to display
  image: string;
  rating: { // Added based on API response
    rate: number;
    count: number;
  };
}
