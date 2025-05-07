import { getDbConnection } from "@/actions/db-actions";

export async function getSummaryByUserId(userId: string ) {
    const sql = await getDbConnection()
    const summaries = await sql`SELECT * FROM pdf_summaries WHERE user_id = ${userId}
    order by created_at desc`;
    return summaries
}