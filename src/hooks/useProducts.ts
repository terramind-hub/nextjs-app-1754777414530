'use client';

import { useState, useEffect, useCallback } from 'react';
import useSWR from 'swr';
import { Product, ProductFilters } from '@/types';
import { products as seedProducts } from '@/lib/data';

interface UseProductsReturn {
  products: Product[];
  isLoading: boolean;
  error: any;
  searchProducts: (query: string) => Product[];
  filterProducts: (filters: ProductFilters) => Product[];
  getProductById: (id: string) => Product | undefined;
  refreshProducts: () => void;
}

const fetcher = async (url: string) => {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error('Failed to fetch products');
  }
  return res.json();
};

export const useProducts = (): UseProductsReturn => {
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilters, setActiveFilters] = useState<ProductFilters>({});

  const { data, error, isLoading, mutate } = useSWR<Product[]>(
    '/api/products',
    fetcher,
    {
      fallbackData: seedProducts,
      revalidateOnFocus: false,
      revalidateOnReconnect: true,
    }
  );

  const products = data || seedProducts;

  // Search products by name, description, or category
  const searchProducts = useCallback((query: string) => {
    if (!query.trim()) {
      return products;
    }

    const lowercaseQuery = query.toLowerCase();
    return products.filter(product =>
      product.name.toLowerCase().includes(lowercaseQuery) ||
      product.description.toLowerCase().includes(lowercaseQuery) ||
      product.category.toLowerCase().includes(lowercaseQuery)
    );
  }, [products]);

  // Filter products based on various criteria
  const filterProducts = useCallback((filters: ProductFilters) => {
    let filtered = [...products];

    // Filter by category
    if (filters.category && filters.category !== 'all') {
      filtered = filtered.filter(product => 
        product.category.toLowerCase() === filters.category?.toLowerCase()
      );
    }

    // Filter by price range
    if (filters.minPrice !== undefined) {
      filtered = filtered.filter(product => product.price >= filters.minPrice!);
    }

    if (filters.maxPrice !== undefined) {
      filtered = filtered.filter(product => product.price <= filters.maxPrice!);
    }

    // Filter by rating
    if (filters.minRating !== undefined) {
      filtered = filtered.filter(product => product.rating >= filters.minRating!);
    }

    // Filter by availability
    if (filters.inStock !== undefined) {
      filtered = filtered.filter(product => 
        filters.inStock ? product.stock > 0 : product.stock === 0
      );
    }

    // Filter by brand
    if (filters.brand) {
      filtered = filtered.filter(product => 
        product.brand?.toLowerCase() === filters.brand?.toLowerCase()
      );
    }

    // Sort products
    if (filters.sortBy) {
      filtered.sort((a, b) => {
        switch (filters.sortBy) {
          case 'price-low':
            return a.price - b.price;
          case 'price-high':
            return b.price - a.price;
          case 'rating':
            return b.rating - a.rating;
          case 'name':
            return a.name.localeCompare(b.name);
          case 'newest':
            return new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime();
          default:
            return 0;
        }
      });
    }

    return filtered;
  }, [products]);

  // Get product by ID
  const getProductById = useCallback((id: string) => {
    return products.find(product => product.id === id);
  }, [products]);

  // Refresh products data
  const refreshProducts = useCallback(() => {
    mutate();
  }, [mutate]);

  // Apply search and filters when products, search query, or filters change
  useEffect(() => {
    let result = products;

    // Apply search first
    if (searchQuery) {
      result = searchProducts(searchQuery);
    }

    // Then apply filters
    if (Object.keys(activeFilters).length > 0) {
      result = filterProducts(activeFilters);
    }

    setFilteredProducts(result);
  }, [products, searchQuery, activeFilters, searchProducts, filterProducts]);

  return {
    products: filteredProducts.length > 0 || searchQuery || Object.keys(activeFilters).length > 0 
      ? filteredProducts 
      : products,
    isLoading,
    error,
    searchProducts: (query: string) => {
      setSearchQuery(query);
      return searchProducts(query);
    },
    filterProducts: (filters: ProductFilters) => {
      setActiveFilters(filters);
      return filterProducts(filters);
    },
    getProductById,
    refreshProducts,
  };
};