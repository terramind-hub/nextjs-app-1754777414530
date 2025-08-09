import Stripe from 'stripe';

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('STRIPE_SECRET_KEY is not set in environment variables');
}

// Initialize Stripe with secret key
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2024-06-20',
  typescript: true,
});

// Create payment intent for checkout
export async function createPaymentIntent(amount: number, currency: string = 'usd') {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Convert to cents
      currency,
      automatic_payment_methods: {
        enabled: true,
      },
    });

    return paymentIntent;
  } catch (error) {
    console.error('Error creating payment intent:', error);
    throw new Error('Failed to create payment intent');
  }
}

// Create customer
export async function createCustomer(email: string, name?: string) {
  try {
    const customer = await stripe.customers.create({
      email,
      name,
    });

    return customer;
  } catch (error) {
    console.error('Error creating customer:', error);
    throw new Error('Failed to create customer');
  }
}

// Retrieve payment intent
export async function retrievePaymentIntent(paymentIntentId: string) {
  try {
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
    return paymentIntent;
  } catch (error) {
    console.error('Error retrieving payment intent:', error);
    throw new Error('Failed to retrieve payment intent');
  }
}

// Create product in Stripe
export async function createStripeProduct(name: string, description?: string) {
  try {
    const product = await stripe.products.create({
      name,
      description,
    });

    return product;
  } catch (error) {
    console.error('Error creating Stripe product:', error);
    throw new Error('Failed to create Stripe product');
  }
}

// Create price for product
export async function createPrice(productId: string, unitAmount: number, currency: string = 'usd') {
  try {
    const price = await stripe.prices.create({
      product: productId,
      unit_amount: Math.round(unitAmount * 100), // Convert to cents
      currency,
    });

    return price;
  } catch (error) {
    console.error('Error creating price:', error);
    throw new Error('Failed to create price');
  }
}

// Webhook signature verification
export function verifyWebhookSignature(payload: string, signature: string, secret: string) {
  try {
    return stripe.webhooks.constructEvent(payload, signature, secret);
  } catch (error) {
    console.error('Webhook signature verification failed:', error);
    throw new Error('Invalid webhook signature');
  }
}

// Format currency for display
export function formatCurrency(amount: number, currency: string = 'usd'): string {
  // Validate currency code (ISO 4217 format)
  const currencyRegex = /^[A-Z]{3}$/;
  const validCurrency = currencyRegex.test(currency.toUpperCase()) ? currency.toUpperCase() : 'USD';
  
  // Guard against non-number amounts
  const validAmount = typeof amount === 'number' && !isNaN(amount) ? amount : 0;
  
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: validCurrency,
  }).format(validAmount);
}