import { NextRequest, NextResponse } from 'next/server';
import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth';
import { prisma } from '@/lib/prisma';

// In production, use your actual Stripe keys
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);
  
  if (!session || !session.user?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { items } = await request.json();

    // Create order in database using email instead of id
    const orderItems = items.map((item: any) => ({
      productId: item.id,
      quantity: item.quantity,
      price: 0 // Will be updated with actual price
    }));

    const order = await prisma.order.create({
      data: {
        userEmail: session.user.email,
        total: 0, // Will be calculated
        status: 'pending',
        items: {
          create: orderItems
        }
      },
      include: {
        items: true
      }
    });

    // Create Stripe checkout session
    const checkoutSession = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: items.map((item: any) => ({
        price_data: {
          currency: 'usd',
          product_data: {
            name: `Product ${item.id}`,
          },
          unit_amount: 2999, // $29.99 in cents (mock value)
        },
        quantity: item.quantity,
      })),
      mode: 'payment',
      success_url: `${process.env.NEXTAUTH_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXTAUTH_URL}/shop`,
      customer_email: session.user.email,
      metadata: {
        orderId: order.id
      }
    });

    // Update order with Stripe session ID
    await prisma.order.update({
      where: { id: order.id },
      data: { stripeSessionId: checkoutSession.id }
    });

    return NextResponse.json({ sessionId: checkoutSession.id });
  } catch (error) {
    console.error('Error creating checkout session:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}