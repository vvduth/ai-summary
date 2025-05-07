import { getDbConnection } from "@/actions/db-actions";

export async function getSummaryById(id: string) {
    try {
        const sql = await getDbConnection();
        const [summary] = await sql`SELECT * FROM pdf_summaries WHERE id = ${id};`;
        return summary;
    } catch (error) {
        console.error("Error fetching summary by id:", error);
        return null;
    }
}