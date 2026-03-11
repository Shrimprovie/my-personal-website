# My Personal Website

A comprehensive personal website with e-commerce, content sharing, and membership management built with Next.js.

## Features

- **E-commerce System**: Product catalog, shopping cart, Stripe payments, order tracking
- **Content Sharing**: Blog with articles, tags, SEO-friendly URLs
- **Membership Management**: User authentication, tiered membership system, role-based access
- **Admin Dashboard**: Content management, user management, analytics

## Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```env
# Required for NextAuth
NEXTAUTH_SECRET=your-super-secret-here
NEXTAUTH_URL=http://localhost:3000

# Database (SQLite by default)
DATABASE_URL=file:./prisma/dev.db

# Stripe (for e-commerce)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret

# Google OAuth (optional)
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
```

### Setup Instructions

1. Install dependencies:
```bash
npm install
```

2. Set up the database:
```bash
npx prisma db push
npx prisma generate
```

3. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

```
src/
├── app/                 # App Router pages
│   ├── api/            # API routes
│   ├── shop/           # E-commerce pages
│   ├── blog/           # Blog pages  
│   ├── membership/     # Membership pages
│   └── ...             # Other pages
├── components/         # Shared components
├── lib/               # Utilities and libraries
└── prisma/            # Database schema and migrations
```

## Deployment

This application can be deployed to Vercel, Netlify, or any Node.js hosting provider.

For production deployment, make sure to:
1. Update `NEXTAUTH_URL` to your production domain
2. Configure proper database connection
3. Set up Stripe webhook endpoints
4. Secure all environment variables

## Learn More

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Prisma Documentation](https://www.prisma.io/docs) - database ORM and migration tools
- [NextAuth.js Documentation](https://next-auth.js.org) - authentication library
- [Stripe Documentation](https://stripe.com/docs) - payment processing

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.
