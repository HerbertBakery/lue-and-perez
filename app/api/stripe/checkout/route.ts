import Stripe from 'stripe'
export async function POST(req: Request){
  const { amount } = await req.json()
  if(!process.env.STRIPE_SECRET_KEY){
    return new Response(JSON.stringify({ error: 'Stripe not configured' }), { status: 400 })
  }
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2024-06-20' as any })
  const session = await stripe.checkout.sessions.create({
    mode: 'payment',
    line_items: [{
      price_data: { currency: 'usd', product_data: { name: 'Invoice Payment' }, unit_amount: Math.round((Number(amount)||0) * 100) },
      quantity: 1,
    }],
    success_url: process.env.STRIPE_SUCCESS_URL || 'http://localhost:3000/payments/usd?status=success',
    cancel_url: process.env.STRIPE_CANCEL_URL || 'http://localhost:3000/payments/usd?status=cancel',
  })
  return new Response(JSON.stringify({ url: session.url }), { status: 200 })
}
