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

export interface Category {
  id: number;
  name: string;
  slug: string;
  image: string;
  icon:React.ElementType;
  count:number;
  products: Product[];
}

export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  address: string;
  phone: string;
  role: string;
  token: string;
}

export interface Order {
  id: number;
}

export interface UICategory {
  id: number;
  name: string;
  icon: React.ElementType;
  count: number;
  color: string;
  slug:string;
  image: string;
  textColor: string;
  products: Product[];
}
