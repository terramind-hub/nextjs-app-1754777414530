export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  images?: string[];
  stock: number;
  rating: number;
  reviews?: number;
  brand?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface ProductFilters {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  minRating?: number;
  inStock?: boolean;
  brand?: string;
  sortBy?: 'price-low' | 'price-high' | 'rating' | 'name' | 'newest';
}

export interface CartItem {
  id: string;
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  role?: 'user' | 'admin';
  createdAt?: string;
}

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  createdAt: string;
  updatedAt?: string;
  shippingAddress?: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
}