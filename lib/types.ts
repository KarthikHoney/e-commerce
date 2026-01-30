export interface Product {
  id: number;
  title: string;
  slug: string;
  price: number;
  rating: number;
  image: string;
  images: string[];
  specs: string[];
  reviewCount:number;
  originalPrice:number;
  brand:string;
  category:string[];
  discount:number;
  colors:string[];
  storageOptions:string[];
}