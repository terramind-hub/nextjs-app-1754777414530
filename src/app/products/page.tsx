import type { Metadata } from 'next';
import { Suspense } from 'react';
import ProductGrid from '@/components/ProductGrid';
import SearchFilters from '@/components/SearchFilters';

export const metadata: Metadata = {
  title: 'Products - Shop All Items',
  description: 'Browse our complete collection of products with advanced filtering and search capabilities.',
};

interface ProductsPageProps {
  searchParams: {
    search?: string;
    category?: string;
    minPrice?: string;
    maxPrice?: string;
    sortBy?: string;
    page?: string;
  };
}

export default function ProductsPage({ searchParams }: ProductsPageProps) {
  const {
    search = '',
    category = '',
    minPrice = '',
    maxPrice = '',
    sortBy = 'name',
    page = '1'
  } = searchParams;

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            All Products
          </h1>
          <p className="text-lg text-muted-foreground">
            Discover our complete collection of premium products
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <aside className="lg:w-64 flex-shrink-0">
            <div className="sticky top-4">
              <Suspense fallback={
                <div className="bg-card rounded-lg border p-6">
                  <div className="animate-pulse space-y-4">
                    <div className="h-4 bg-muted rounded w-3/4"></div>
                    <div className="h-10 bg-muted rounded"></div>
                    <div className="h-4 bg-muted rounded w-1/2"></div>
                    <div className="space-y-2">
                      <div className="h-8 bg-muted rounded"></div>
                      <div className="h-8 bg-muted rounded"></div>
                      <div className="h-8 bg-muted rounded"></div>
                    </div>
                  </div>
                </div>
              }>
                <SearchFilters
                  initialSearch={search}
                  initialCategory={category}
                  initialMinPrice={minPrice}
                  initialMaxPrice={maxPrice}
                  initialSortBy={sortBy}
                />
              </Suspense>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            <Suspense fallback={
              <div className="space-y-6">
                {/* Results header skeleton */}
                <div className="flex justify-between items-center">
                  <div className="h-6 bg-muted rounded w-32 animate-pulse"></div>
                  <div className="h-10 bg-muted rounded w-48 animate-pulse"></div>
                </div>
                
                {/* Product grid skeleton */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {Array.from({ length: 12 }).map((_, i) => (
                    <div key={i} className="bg-card rounded-lg border overflow-hidden animate-pulse">
                      <div className="aspect-square bg-muted"></div>
                      <div className="p-4 space-y-2">
                        <div className="h-4 bg-muted rounded w-3/4"></div>
                        <div className="h-4 bg-muted rounded w-1/2"></div>
                        <div className="h-8 bg-muted rounded w-full"></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            }>
              <ProductGrid
                searchQuery={search}
                categoryFilter={category}
                minPrice={minPrice ? parseFloat(minPrice) : undefined}
                maxPrice={maxPrice ? parseFloat(maxPrice) : undefined}
                sortBy={sortBy}
                currentPage={parseInt(page)}
              />
            </Suspense>
          </main>
        </div>
      </div>
    </div>
  );
}