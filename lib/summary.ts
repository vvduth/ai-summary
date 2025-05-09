import { getDbConnection } from "@/actions/db-actions";

export async function getSummaryByUserId(userId: string ) {
    const sql = await getDbConnection()
    const query  = `SELECT * FROM pdf_summaries WHERE user_id = $1 order by created_at desc`
    const params = [userId]
    const result = await sql.query(query, params)
    return result
}