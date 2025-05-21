import { getDbConnection } from "@/actions/db-actions";
import Stripe from "stripe";

export async function handleCheckoutCompleted({
  session,
  stripe,
}: {
  session: Stripe.Checkout.Session;
  stripe: Stripe;
}) {
  const customerId = session.customer as string;
  const customer = await stripe.customers.retrieve(customerId);
  const priceId = session.line_items?.data[0]?.price?.id;

  if ("email" in customer && priceId) {
    const { email, name } = customer;
    const user = await createOrUpdateUser({
      email: email as string,
      full_name: name as string,
      customer_id: customerId,
      price_id: priceId,
      status: "active",
    });

    await createPayment({
        session,
        priceId,
        userEmail: email as string,
    })
  }
}

async function createOrUpdateUser({
  email,
  full_name,
  customer_id,
  price_id,
  status,
}: {
  email: string;
  full_name: string;
  customer_id: string;
  price_id: string;
  status: string;
}) {
  try {
    const sql = await getDbConnection();

    const user = await sql`SELECT * from users where email = ${email}`;
    if (user.length === 0) {
      const newUser =
        await sql`INSERT INTO users (email, full_name, customer_id, price_id, status) VALUES (${email}, 
            ${full_name}, ${customer_id}, ${price_id}, ${status}) RETURNING *`;
      return newUser[0];
    } else {
      return user[0];
    }
  } catch (error) {
    console.error("Error creating or updating user", error);
  }
}

async function createPayment({
  session,
  priceId,
  userEmail,
}: {
  session: Stripe.Checkout.Session;
  priceId: string;
  userEmail: string;
}) {
  try {
    const sql = await getDbConnection();
    const { amount_total, id, status } = session;
    await sql`INSERT INTO payments ( amount, status, stripe_payment_id, price_id , user_email) VALUES (${amount_total}, ${status}, ${id}, ${priceId},
    ${userEmail})`;
  } catch (error) {
    console.log("Error creating payment", error);
  }
}
