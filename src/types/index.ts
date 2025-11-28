export type Role = 'admin' | 'vendor' | 'user' | 'driver' | 'agent';

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  avatar?: string;
  phone?: string;
}

export interface Vendor extends User {
  shopName: string;
  shopDescription: string;
  logo?: string;
  followers: number;
  isBlacklisted: boolean;
}

export interface Category {
  id: string;
  name: string;
  image: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number; // For discounts
  categoryId: string;
  vendorId: string;
  vendorName: string;
  images: string[];
  stock: number;
  rating: number;
  reviewsCount: number;
  attributes: Record<string, string>;
  isFlashSale?: boolean;
  createdAt: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Review {
  id: string;
  productId: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}

export interface Order {
  id: string;
  userId: string;
  vendorId: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered';
  date: string;
}
