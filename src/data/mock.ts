import { Category, Product, Vendor, Review } from '../types';

export const CATEGORIES: Category[] = [
  { id: '1', name: 'Electronics', image: 'https://images.unsplash.com/photo-1498049860654-af1a5c5668ba?auto=format&fit=crop&w=500&q=60' },
  { id: '2', name: 'Fashion', image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=500&q=60' },
  { id: '3', name: 'Home & Living', image: 'https://images.unsplash.com/photo-1484101403633-562f891dc89a?auto=format&fit=crop&w=500&q=60' },
  { id: '4', name: 'Sports', image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=500&q=60' },
];

export const VENDORS: Vendor[] = [
  {
    id: 'v1',
    name: 'John Doe',
    email: 'john@techhaven.com',
    role: 'vendor',
    shopName: 'Tech Haven',
    shopDescription: 'Your one-stop shop for the latest gadgets.',
    followers: 120,
    isBlacklisted: false,
    logo: 'https://images.unsplash.com/photo-1531297461136-82lw9z1c?auto=format&fit=crop&w=100&q=60'
  },
  {
    id: 'v2',
    name: 'Jane Smith',
    email: 'jane@styleloft.com',
    role: 'vendor',
    shopName: 'Style Loft',
    shopDescription: 'Contemporary fashion for the modern soul.',
    followers: 85,
    isBlacklisted: false,
    logo: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=100&q=60'
  }
];

export const PRODUCTS: Product[] = [
  {
    id: 'p1',
    name: 'Wireless Noise Cancelling Headphones',
    description: 'Experience premium sound quality with active noise cancellation.',
    price: 299.99,
    originalPrice: 349.99,
    categoryId: '1',
    vendorId: 'v1',
    vendorName: 'Tech Haven',
    images: ['https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80'],
    stock: 50,
    rating: 4.8,
    reviewsCount: 124,
    attributes: { Color: 'Black', Connectivity: 'Bluetooth 5.0' },
    isFlashSale: true,
    createdAt: '2024-01-15T10:00:00Z'
  },
  {
    id: 'p2',
    name: 'Smart Watch Series 5',
    description: 'Track your fitness and stay connected on the go.',
    price: 199.99,
    categoryId: '1',
    vendorId: 'v1',
    vendorName: 'Tech Haven',
    images: ['https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80'],
    stock: 30,
    rating: 4.5,
    reviewsCount: 89,
    attributes: { Color: 'Silver', 'Strap Material': 'Silicone' },
    createdAt: '2024-02-01T10:00:00Z'
  },
  {
    id: 'p3',
    name: 'Classic Denim Jacket',
    description: 'A timeless classic for any wardrobe.',
    price: 89.99,
    categoryId: '2',
    vendorId: 'v2',
    vendorName: 'Style Loft',
    images: ['https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&w=800&q=80'],
    stock: 100,
    rating: 4.2,
    reviewsCount: 45,
    attributes: { Size: 'M', Material: 'Denim' },
    createdAt: '2024-02-10T10:00:00Z'
  },
  {
    id: 'p4',
    name: 'Minimalist Leather Backpack',
    description: 'Durable and stylish backpack for daily commute.',
    price: 120.00,
    originalPrice: 150.00,
    categoryId: '2',
    vendorId: 'v2',
    vendorName: 'Style Loft',
    images: ['https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80'],
    stock: 20,
    rating: 4.9,
    reviewsCount: 210,
    attributes: { Color: 'Brown', Material: 'Leather' },
    isFlashSale: true,
    createdAt: '2024-03-05T10:00:00Z'
  },
  {
    id: 'p5',
    name: 'Ergonomic Office Chair',
    description: 'Work in comfort with this fully adjustable chair.',
    price: 250.00,
    categoryId: '3',
    vendorId: 'v1', // Tech Haven sells furniture too? Let's assume yes for demo
    vendorName: 'Tech Haven',
    images: ['https://images.unsplash.com/photo-1505843490538-5133c6c7d0e1?auto=format&fit=crop&w=800&q=80'],
    stock: 15,
    rating: 4.6,
    reviewsCount: 32,
    attributes: { Color: 'Grey', Material: 'Mesh' },
    createdAt: '2024-03-10T10:00:00Z'
  }
];

export const REVIEWS: Review[] = [
  {
    id: 'r1',
    productId: 'p1',
    userId: 'u2',
    userName: 'Alice Wonderland',
    rating: 5,
    comment: 'Amazing sound quality! Worth every penny.',
    date: '2024-02-15'
  }
];
