import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { Order, OrderItem } from '@/types';

// Mock database - in production, use a real database
let orders: Order[] = [
  {
    id: '1',
    userId: 'user1',
    items: [
      {
        id: '1',
        productId: '1',
        quantity: 2,
        price: 29.99,
        name: 'Wireless Bluetooth Headphones',
        image: '/images/headphones.jpg'
      }
    ],
    total: 59.98,
    status: 'completed',
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15'),
    shippingAddress: {
      street: '123 Main St',
      city: 'New York',
      state: 'NY',
      zipCode: '10001',
      country: 'US'
    },
    paymentMethod: 'card',
    paymentStatus: 'paid'
  },
  {
    id: '2',
    userId: 'user1',
    items: [
      {
        id: '2',
        productId: '2',
        quantity: 1,
        price: 199.99,
        name: 'Smart Fitness Watch',
        image: '/images/watch.jpg'
      }
    ],
    total: 199.99,
    status: 'processing',
    createdAt: new Date('2024-01-20'),
    updatedAt: new Date('2024-01-20'),
    shippingAddress: {
      street: '456 Oak Ave',
      city: 'Los Angeles',
      state: 'CA',
      zipCode: '90210',
      country: 'US'
    },
    paymentMethod: 'card',
    paymentStatus: 'paid'
  }
];

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    const status = searchParams.get('status');
    const limit = searchParams.get('limit');

    let filteredOrders = orders;

    // Filter by user ID if provided (for user-specific orders)
    if (userId) {
      filteredOrders = filteredOrders.filter(order => order.userId === userId);
    } else {
      // If no userId specified, return orders for the current user
      filteredOrders = filteredOrders.filter(order => order.userId === session.user.id);
    }

    // Filter by status if provided
    if (status) {
      filteredOrders = filteredOrders.filter(order => order.status === status);
    }

    // Apply limit if provided
    if (limit) {
      const limitNum = parseInt(limit, 10);
      if (!isNaN(limitNum) && limitNum > 0) {
        filteredOrders = filteredOrders.slice(0, limitNum);
      }
    }

    // Sort by creation date (newest first)
    filteredOrders.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    return NextResponse.json({
      orders: filteredOrders,
      total: filteredOrders.length
    });
  } catch (error) {
    console.error('Error fetching orders:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { items, shippingAddress, paymentMethod } = body;

    // Validate required fields
    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        { error: 'Items are required' },
        { status: 400 }
      );
    }

    if (!shippingAddress || !shippingAddress.street || !shippingAddress.city) {
      return NextResponse.json(
        { error: 'Valid shipping address is required' },
        { status: 400 }
      );
    }

    if (!paymentMethod) {
      return NextResponse.json(
        { error: 'Payment method is required' },
        { status: 400 }
      );
    }

    // Calculate total
    const total = items.reduce((sum: number, item: OrderItem) => {
      return sum + (item.price * item.quantity);
    }, 0);

    // Create new order
    const newOrder: Order = {
      id: Date.now().toString(),
      userId: session.user.id,
      items: items.map((item: OrderItem) => ({
        ...item,
        id: Date.now().toString() + Math.random().toString(36).substr(2, 9)
      })),
      total: Math.round(total * 100) / 100, // Round to 2 decimal places
      status: 'pending',
      createdAt: new Date(),
      updatedAt: new Date(),
      shippingAddress,
      paymentMethod,
      paymentStatus: 'pending'
    };

    // Add to mock database
    orders.push(newOrder);

    return NextResponse.json({
      order: newOrder,
      message: 'Order created successfully'
    }, { status: 201 });
  } catch (error) {
    console.error('Error creating order:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { orderId, status, paymentStatus } = body;

    if (!orderId) {
      return NextResponse.json(
        { error: 'Order ID is required' },
        { status: 400 }
      );
    }

    // Find the order
    const orderIndex = orders.findIndex(order => order.id === orderId);
    
    if (orderIndex === -1) {
      return NextResponse.json(
        { error: 'Order not found' },
        { status: 404 }
      );
    }

    const order = orders[orderIndex];

    // Check if user owns the order or is admin (for now, just check ownership)
    if (order.userId !== session.user.id) {
      return NextResponse.json(
        { error: 'Forbidden' },
        { status: 403 }
      );
    }

    // Update order
    const updatedOrder = {
      ...order,
      ...(status && { status }),
      ...(paymentStatus && { paymentStatus }),
      updatedAt: new Date()
    };

    orders[orderIndex] = updatedOrder;

    return NextResponse.json({
      order: updatedOrder,
      message: 'Order updated successfully'
    });
  } catch (error) {
    console.error('Error updating order:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}