import { getDbConnection } from "@/actions/db-actions";
import { getUserUploadCount } from "./summary";
import { plans } from "@/app/constants";
import { User } from "@clerk/nextjs/server";

export async function getPriceid(email:string) {
    const sql = await getDbConnection()
    const query = await sql`SELECT price_id FROM users WHERE email = ${email} AND status = 'active'`;

    return query?.[0]?.price_id || null;
}

export async function hasActivePlan(email:string) {
    const sql = await getDbConnection()
    const query = await sql`SELECT price_id FROM users WHERE email = ${email} AND status = 'active' AND price_id IS NOT NULL`;

    return query && query.length > 0;
}

export async function hasReachedUploadLimit(userId: string) {
    const uploadCount = await getUserUploadCount(userId)

    const priceId = await getPriceid(userId)

    const plan = plans.find((plan) => plan.priceId === priceId);

    const isPro = plan?.id === "pro" 

    const uploadLimit = isPro ? 1000: 5;
    return  {
        hasReachedLimit: uploadCount >= uploadLimit,
        uploadLimit,
        uploadCount,
    }
}

export async function getSubciptionStatus(user: User) {
    const hasSubscription = await hasActivePlan(user.emailAddresses[0].emailAddress)
    return hasSubscription
}