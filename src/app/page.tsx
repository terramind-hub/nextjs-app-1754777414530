import type { Metadata } from 'next';
import Hero from '@/components/Hero';
import ProductGrid from '@/components/ProductGrid';
import SearchFilters from '@/components/SearchFilters';

export const metadata: Metadata = {
  title: 'Terramind Store - Premium Products & Electronics',
  description: 'Discover premium products and electronics at Terramind Store. Shop the latest gadgets, accessories, and more with fast shipping and excellent customer service.',
  keywords: 'ecommerce, electronics, gadgets, premium products, online shopping',
  openGraph: {
    title: 'Terramind Store - Premium Products & Electronics',
    description: 'Discover premium products and electronics at Terramind Store.',
    type: 'website',
    url: 'https://terramind-store.com',
  },
};

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <Hero />
      
      {/* Featured Products Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Featured Products
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Discover our handpicked selection of premium products and latest electronics
          </p>
        </div>
        
        {/* Search and Filters */}
        <div className="mb-8">
          <SearchFilters />
        </div>
        
        {/* Product Grid */}
        <ProductGrid featured={true} />
      </section>
      
      {/* Categories Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Shop by Category
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Browse our wide range of product categories
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                name: 'Electronics',
                description: 'Latest gadgets and devices',
                image: '/images/categories/electronics.jpg',
                href: '/products?category=electronics'
              },
              {
                name: 'Accessories',
                description: 'Premium accessories and add-ons',
                image: '/images/categories/accessories.jpg',
                href: '/products?category=accessories'
              },
              {
                name: 'Home & Garden',
                description: 'Smart home and garden solutions',
                image: '/images/categories/home-garden.jpg',
                href: '/products?category=home-garden'
              },
              {
                name: 'Sports & Fitness',
                description: 'Fitness gear and sports equipment',
                image: '/images/categories/sports.jpg',
                href: '/products?category=sports'
              }
            ].map((category) => (
              <a
                key={category.name}
                href={category.href}
                className="group relative overflow-hidden rounded-lg bg-white dark:bg-gray-800 shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                <div className="aspect-w-16 aspect-h-9 bg-gray-200 dark:bg-gray-700">
                  <div className="w-full h-48 bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                    <span className="text-white text-4xl font-bold">
                      {category.name.charAt(0)}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {category.name}
                  </h3>
                  <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                    {category.description}
                  </p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>
      
      {/* Newsletter Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Stay Updated
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
            Subscribe to our newsletter for the latest products, deals, and tech news
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:text-white"
            />
            <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}