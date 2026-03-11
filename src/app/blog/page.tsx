'use client';

import Navigation from '@/components/Navigation';
import { useSession } from 'next-auth/react';
import Link from 'next/link';

export default function Blog() {
  const { data: session } = useSession();

  // Mock blog posts data
  const posts = [
    {
      id: 1,
      title: "Getting Started with My Personal Website",
      excerpt: "Learn how to make the most of my personal website and all its features.",
      date: "March 11, 2026",
      readTime: "5 min read",
      image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80"
    },
    {
      id: 2,
      title: "Behind the Scenes: Building This Website",
      excerpt: "A deep dive into the technology stack and design decisions behind this site.",
      date: "March 10, 2026",
      readTime: "8 min read",
      image: "https://images.unsplash.com/photo-1553877522-43269d4ea984?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80"
    },
    {
      id: 3,
      title: "My Journey in E-commerce and Content Creation",
      excerpt: "Sharing my experiences and lessons learned in building online businesses.",
      date: "March 9, 2026",
      readTime: "12 min read",
      image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80"
    },
    {
      id: 4,
      title: "The Future of Personal Branding Online",
      excerpt: "Exploring trends and opportunities for personal brand development in 2026.",
      date: "March 8, 2026",
      readTime: "6 min read",
      image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <main className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Blog</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Insights, tutorials, and stories from my journey in building online businesses.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {posts.map((post) => (
            <article key={post.id} className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-shadow overflow-hidden">
              <div className="aspect-video bg-gray-200 relative">
                <img 
                  src={post.image} 
                  alt={post.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <div className="flex justify-between items-center text-sm text-gray-500 mb-3">
                  <span>{post.date}</span>
                  <span>{post.readTime}</span>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-3">
                  <Link href={`/blog/${post.id}`} className="hover:text-indigo-600 transition-colors">
                    {post.title}
                  </Link>
                </h2>
                <p className="text-gray-600 mb-4">{post.excerpt}</p>
                <Link 
                  href={`/blog/${post.id}`} 
                  className="text-indigo-600 font-medium hover:text-indigo-700 transition-colors"
                >
                  Read More →
                </Link>
              </div>
            </article>
          ))}
        </div>

        {session && (
          <div className="mt-12 bg-blue-50 p-6 rounded-xl border border-blue-200">
            <h3 className="text-xl font-semibold text-blue-800 mb-2">Welcome back, {session?.user?.name}!</h3>
            <p className="text-blue-700">
              As a registered user, you'll get notified when new content is published and can access exclusive member-only articles.
            </p>
          </div>
        )}
      </main>
    </div>
  );
}