// Seed data for the ecommerce application
// This file provides realistic sample data for development and fallback scenarios

export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  category: string;
  stock: number;
  reviews: Review[];
  rating: number;
  featured?: boolean;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'user' | 'admin';
  avatar?: string;
  createdAt: Date;
}

export interface Order {
  id: string;
  userId: string;
  items: OrderItem[];
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  createdAt: Date;
  shippingAddress: Address;
  paymentMethod: string;
}

export interface OrderItem {
  productId: string;
  quantity: number;
  price: number;
  name: string;
}

export interface Review {
  id: string;
  productId: string;
  userId: string;
  rating: number;
  comment: string;
  createdAt: Date;
  userName: string;
}

export interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

// Sample categories
export const categories: Category[] = [
  {
    id: 'electronics',
    name: 'Electronics',
    slug: 'electronics',
    description: 'Latest gadgets and electronic devices'
  },
  {
    id: 'clothing',
    name: 'Clothing',
    slug: 'clothing',
    description: 'Fashion and apparel for all occasions'
  },
  {
    id: 'home',
    name: 'Home & Garden',
    slug: 'home-garden',
    description: 'Everything for your home and garden'
  },
  {
    id: 'books',
    name: 'Books',
    slug: 'books',
    description: 'Books, magazines, and educational materials'
  },
  {
    id: 'sports',
    name: 'Sports & Outdoors',
    slug: 'sports-outdoors',
    description: 'Sports equipment and outdoor gear'
  }
];

// Sample reviews
export const reviews: Review[] = [
  {
    id: 'rev1',
    productId: 'prod1',
    userId: 'user1',
    rating: 5,
    comment: 'Excellent product! Works perfectly and arrived quickly.',
    createdAt: new Date('2024-01-15'),
    userName: 'John Doe'
  },
  {
    id: 'rev2',
    productId: 'prod1',
    userId: 'user2',
    rating: 4,
    comment: 'Good quality, but could be improved in some areas.',
    createdAt: new Date('2024-01-20'),
    userName: 'Jane Smith'
  },
  {
    id: 'rev3',
    productId: 'prod2',
    userId: 'user1',
    rating: 5,
    comment: 'Amazing sound quality! Highly recommended.',
    createdAt: new Date('2024-01-18'),
    userName: 'John Doe'
  },
  {
    id: 'rev4',
    productId: 'prod3',
    userId: 'user3',
    rating: 4,
    comment: 'Comfortable and stylish. Great value for money.',
    createdAt: new Date('2024-01-22'),
    userName: 'Mike Johnson'
  }
];

// Sample products
export const products: Product[] = [
  {
    id: 'prod1',
    name: 'Wireless Bluetooth Headphones',
    price: 99.99,
    description: 'Premium wireless headphones with noise cancellation and 30-hour battery life. Perfect for music lovers and professionals.',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop',
    category: 'electronics',
    stock: 25,
    reviews: reviews.filter(r => r.productId === 'prod1'),
    rating: 4.5,
    featured: true
  },
  {
    id: 'prod2',
    name: 'Smart Fitness Watch',
    price: 249.99,
    description: 'Advanced fitness tracking with heart rate monitoring, GPS, and smartphone integration. Water-resistant design.',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=500&fit=crop',
    category: 'electronics',
    stock: 15,
    reviews: reviews.filter(r => r.productId === 'prod2'),
    rating: 4.8,
    featured: true
  },
  {
    id: 'prod3',
    name: 'Organic Cotton T-Shirt',
    price: 29.99,
    description: 'Comfortable and sustainable organic cotton t-shirt. Available in multiple colors and sizes.',
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&h=500&fit=crop',
    category: 'clothing',
    stock: 50,
    reviews: reviews.filter(r => r.productId === 'prod3'),
    rating: 4.2
  },
  {
    id: 'prod4',
    name: 'Professional Coffee Maker',
    price: 179.99,
    description: 'Programmable coffee maker with built-in grinder and thermal carafe. Makes perfect coffee every time.',
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=500&h=500&fit=crop',
    category: 'home',
    stock: 12,
    reviews: [],
    rating: 0
  },
  {
    id: 'prod5',
    name: 'Bestselling Novel Collection',
    price: 39.99,
    description: 'Collection of three bestselling novels from award-winning authors. Perfect for book lovers.',
    image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=500&h=500&fit=crop',
    category: 'books',
    stock: 30,
    reviews: [],
    rating: 0
  },
  {
    id: 'prod6',
    name: 'Yoga Mat Premium',
    price: 49.99,
    description: 'Non-slip premium yoga mat with extra cushioning. Eco-friendly materials and carrying strap included.',
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=500&h=500&fit=crop',
    category: 'sports',
    stock: 20,
    reviews: [],
    rating: 0,
    featured: true
  },
  {
    id: 'prod7',
    name: 'Wireless Gaming Mouse',
    price: 79.99,
    description: 'High-precision wireless gaming mouse with customizable RGB lighting and programmable buttons.',
    image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500&h=500&fit=crop',
    category: 'electronics',
    stock: 18,
    reviews: [],
    rating: 0
  },
  {
    id: 'prod8',
    name: 'Designer Jeans',
    price: 89.99,
    description: 'Premium designer jeans with perfect fit and comfort. Made from high-quality denim.',
    image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=500&h=500&fit=crop',
    category: 'clothing',
    stock: 35,
    reviews: [],
    rating: 0
  }
];

// Sample users
export const users: User[] = [
  {
    id: 'user1',
    email: 'john.doe@example.com',
    name: 'John Doe',
    role: 'user',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
    createdAt: new Date('2024-01-01')
  },
  {
    id: 'user2',
    email: 'jane.smith@example.com',
    name: 'Jane Smith',
    role: 'user',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face',
    createdAt: new Date('2024-01-05')
  },
  {
    id: 'user3',
    email: 'mike.johnson@example.com',
    name: 'Mike Johnson',
    role: 'user',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
    createdAt: new Date('2024-01-10')
  },
  {
    id: 'admin1',
    email: 'admin@example.com',
    name: 'Admin User',
    role: 'admin',
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&h=100&fit=crop&crop=face',
    createdAt: new Date('2023-12-01')
  }
];

// Sample orders
export const orders: Order[] = [
  {
    id: 'order1',
    userId: 'user1',
    items: [
      {
        productId: 'prod1',
        quantity: 1,
        price: 99.99,
        name: 'Wireless Bluetooth Headphones'
      },
      {
        productId: 'prod3',
        quantity: 2,
        price: 29.99,
        name: 'Organic Cotton T-Shirt'
      }
    ],
    total: 159.97,
    status: 'delivered',
    createdAt: new Date('2024-01-10'),
    shippingAddress: {
      street: '123 Main St',
      city: 'New York',
      state: 'NY',
      zipCode: '10001',
      country: 'USA'
    },
    paymentMethod: 'Credit Card'
  },
  {
    id: 'order2',
    userId: 'user2',
    items: [
      {
        productId: 'prod2',
        quantity: 1,
        price: 249.99,
        name: 'Smart Fitness Watch'
      }
    ],
    total: 249.99,
    status: 'shipped',
    createdAt: new Date('2024-01-15'),
    shippingAddress: {
      street: '456 Oak Ave',
      city: 'Los Angeles',
      state: 'CA',
      zipCode: '90210',
      country: 'USA'
    },
    paymentMethod: 'PayPal'
  },
  {
    id: 'order3',
    userId: 'user3',
    items: [
      {
        productId: 'prod4',
        quantity: 1,
        price: 179.99,
        name: 'Professional Coffee Maker'
      },
      {
        productId: 'prod6',
        quantity: 1,
        price: 49.99,
        name: 'Yoga Mat Premium'
      }
    ],
    total: 229.98,
    status: 'processing',
    createdAt: new Date('2024-01-20'),
    shippingAddress: {
      street: '789 Pine St',
      city: 'Chicago',
      state: 'IL',
      zipCode: '60601',
      country: 'USA'
    },
    paymentMethod: 'Credit Card'
  }
];

// Export aliases for consistency
export { products as seedProducts };
export { categories as seedCategories };
export { users as seedUsers };
export { orders as seedOrders };
export { reviews as seedReviews };

// Helper functions
export function getProductById(id: string): Product | undefined {
  return products.find(product => product.id === id);
}

export function getProductsByCategory(categorySlug: string): Product[] {
  return products.filter(product => product.category === categorySlug);
}

export function getFeaturedProducts(): Product[] {
  return products.filter(product => product.featured);
}

export function getOrdersByUserId(userId: string): Order[] {
  return orders.filter(order => order.userId === userId);
}

export function getReviewsByProductId(productId: string): Review[] {
  return reviews.filter(review => review.productId === productId);
}

export function calculateAverageRating(productId: string): number {
  const productReviews = getReviewsByProductId(productId);
  if (productReviews.length === 0) return 0;
  
  const sum = productReviews.reduce((acc, review) => acc + review.rating, 0);
  return Math.round((sum / productReviews.length) * 10) / 10;
}

export function searchProducts(query: string): Product[] {
  const lowercaseQuery = query.toLowerCase();
  return products.filter(product =>
    product.name.toLowerCase().includes(lowercaseQuery) ||
    product.description.toLowerCase().includes(lowercaseQuery) ||
    product.category.toLowerCase().includes(lowercaseQuery)
  );
}

export function filterProducts(filters: {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  inStock?: boolean;
}): Product[] {
  return products.filter(product => {
    if (filters.category && product.category !== filters.category) {
      return false;
    }
    if (filters.minPrice && product.price < filters.minPrice) {
      return false;
    }
    if (filters.maxPrice && product.price > filters.maxPrice) {
      return false;
    }
    if (filters.inStock && product.stock <= 0) {
      return false;
    }
    return true;
  });
}