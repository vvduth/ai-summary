import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_API_KEY!, {});

export const POST = async (req: NextRequest) => {
  const payload = await req.text();
  const sig = req.headers.get("stripe-signature") || "";
  let event;
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!;

  try {
    event = stripe.webhooks.constructEvent(payload, sig, endpointSecret);
    switch (event.type) {
      case "checkout.session.completed":
        const session = event.data.object;
        // Handle the checkout.session.completed event
        console.log("Payment was successful!", session);
        break;
      default:
        console.log(`Unhandled event type ${event.type}`);
        break;
    }
  } catch (err: any) {
    NextResponse.json(
      {
        error: `Webhook Error: ${err.message}`,
      },
      { status: 400 }
    );
    return;
  }
  return NextResponse.json({
    status: "success",
  });
};
