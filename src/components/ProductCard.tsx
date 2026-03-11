'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import getStripe from '@/lib/stripe-client';

export default function ProductCard({ product }: { product: any }) {
  const { data: session } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    if (!session) {
      router.push('/api/auth/signin');
      return;
    }

    setLoading(true);
    
    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: [{ id: product.id, quantity: 1 }],
          customerEmail: session.user?.email
        })
      });

      const { sessionId } = await response.json();
      
      // Redirect to Stripe checkout
      const stripe = await getStripe();
      if (stripe) {
        // Use type assertion to force TypeScript to recognize the method
        await (stripe as any).redirectToCheckout({ sessionId });
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-shadow overflow-hidden">
      <div className="aspect-square bg-gray-200 relative">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-3 right-3 bg-indigo-600 text-white text-xs font-medium px-2 py-1 rounded">
          {product.category}
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">{product.name}</h3>
        <div className="flex justify-between items-center">
          <span className="text-2xl font-bold text-indigo-600">${product.price}</span>
          <button 
            onClick={handleCheckout}
            disabled={loading}
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors font-medium disabled:opacity-50"
          >
            {loading ? 'Processing...' : 'Buy Now'}
          </button>
        </div>
      </div>
    </div>
  );
}