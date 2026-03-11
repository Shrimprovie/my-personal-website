'use client';

import Navigation from '@/components/Navigation';
import { useSession } from 'next-auth/react';
import ProductCard from '@/components/ProductCard';

export default function Shop() {
  const { data: session } = useSession();

  // Mock products data
  const products = [
    {
      id: 1,
      name: "Premium T-Shirt",
      price: 29.99,
      image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300&q=80",
      category: "Apparel"
    },
    {
      id: 2,
      name: "Wireless Headphones",
      price: 89.99,
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300&q=80",
      category: "Electronics"
    },
    {
      id: 3,
      name: "Leather Wallet",
      price: 49.99,
      image: "https://images.unsplash.com/photo-1556900531-7a2bdf0b9b3f?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300&q=80",
      category: "Accessories"
    },
    {
      id: 4,
      name: "Coffee Mug Set",
      price: 24.99,
      image: "https://images.unsplash.com/photo-1587307510015-4a5aeaf3bf9f?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300&q=80",
      category: "Home"
    },
    {
      id: 5,
      name: "Desk Organizer",
      price: 34.99,
      image: "https://images.unsplash.com/photo-1600709212007-1fe4b69ef135?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300&q=80",
      category: "Office"
    },
    {
      id: 6,
      name: "Fitness Tracker",
      price: 129.99,
      image: "https://images.unsplash.com/photo-1576243362031-7b6fc4fd7a6d?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300&q=80",
      category: "Electronics"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <main className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900">Shop</h1>
          <div className="flex items-center space-x-4">
            <span className="text-gray-600">Sort by:</span>
            <select className="border border-gray-300 rounded-md px-3 py-1 text-sm">
              <option>Featured</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
              <option>Newest</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {session && (
          <div className="mt-12 bg-green-50 p-6 rounded-xl border border-green-200">
            <h3 className="text-xl font-semibold text-green-800 mb-2">Welcome back, {session?.user?.name}!</h3>
            <p className="text-green-700">
              As a registered user, you get exclusive access to member-only discounts and early product releases.
            </p>
          </div>
        )}
      </main>
    </div>
  );
}