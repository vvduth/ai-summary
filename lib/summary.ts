import { getDbConnection } from "@/actions/db-actions";

export async function getSummaryByUserId(userId: string ) {
    const sql = await getDbConnection()
    const query  = `SELECT * FROM pdf_summaries WHERE user_id = $1 order by created_at desc`
    const params = [userId]
    const result = await sql.query(query, params)
    return result
}

export async function getUserUploadCount(userId: string) {
    const sql = await getDbConnection()
    try {
        const [count] = await sql`SELECT COUNT(*) FROM pdf_summaries WHERE user_id = ${userId}`;
        return parseInt(count.count, 10);
    } catch (error) {
        console.error("Error fetching user upload count", error);
        return 0;
    }
}