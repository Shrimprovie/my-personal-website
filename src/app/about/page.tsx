'use client';

import Navigation from '@/components/Navigation';
import { useSession } from 'next-auth/react';

export default function About() {
  const { data: session } = useSession();

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <main className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">About Me</h1>
          <p className="text-xl text-gray-600">
            Welcome to my personal website!
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-8">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="w-32 h-32 bg-gray-200 rounded-full flex items-center justify-center">
              <span className="text-4xl">👤</span>
            </div>
            <div className="text-center md:text-left">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">About This Site</h2>
              <p className="text-gray-600 mb-4">
                This is my personal website where I share my products, content, and connect with my community.
              </p>
              <p className="text-gray-600">
                Feel free to explore the shop, read my blog posts, and don't hesitate to reach out!
              </p>
            </div>
          </div>
        </div>

        {session && (
          <div className="mt-12 bg-green-50 p-6 rounded-xl border border-green-200">
            <h3 className="text-xl font-semibold text-green-800 mb-2">Welcome back, {session?.user?.name}!</h3>
            <p className="text-green-700">
              Thanks for being a registered user! Your support means everything to me.
            </p>
          </div>
        )}
      </main>
    </div>
  );
}