import { handleCheckoutCompleted, handleSubscriptionDeleted } from "@/lib/payments";
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
        console.log("Payment was successful!");
        const sessionId = event.data.object.id;
        console.log("Session ID:", sessionId);
        const allSessions = await stripe.checkout.sessions.list({
          limit: 100,
          status: "complete",
        })
        console.log("All Sessions:", allSessions);
        const session = await stripe.checkout.sessions.retrieve(sessionId, {
            expand: ["line_items"],
        })

        await handleCheckoutCompleted({session,stripe});
        break;
      case "customer.subscription.deleted":
        console.log("Subscription was deleted!");
        const subscription = event.data.object;
        const subscriptionId = subscription.id;
        await handleSubscriptionDeleted({subscriptionId, stripe});
        break;
        
      default:
        console.log(`Unhandled event type ${event.type}`);
        break;
    }
  } catch (err: any) {
    return NextResponse.json(
      {
        error: `Webhook Error: ${err.message}`,
      },
      { status: 400 }
    );
  }
  return NextResponse.json({
    status: "success",
  });
};
