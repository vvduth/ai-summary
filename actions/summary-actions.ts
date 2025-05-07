"use server";

import { currentUser } from "@clerk/nextjs/server";
import { getDbConnection } from "./db-actions";
import { revalidatePath } from "next/cache";

export async function deleteSummary({ id }: { id: string }) {
  try {
    const user = await currentUser();
    const userId = user?.id;
    if (!userId) {
      return {
        success: false,
        message: "User id not found",
        data: null,
      };
    }
    const sql = await getDbConnection();
    const query = `DELETE FROM pdf_summaries WHERE id = $1 AND user_id = $2;`;
    const params = [id, userId];

    const result = await sql.query(query, params);

    if (result) {
      revalidatePath("/dashboard");
      return {
        success: true,
        message: "Summary deleted successfully",
        data: null,
      };
    }

    return {
      success: false,
      message: "Summary not found",
      data: null,
    };
  } catch (error) {
    console.error("Error deleting summary:", error);
    return {
      success: false,
      message: "Error deleting summary",
      data: null,
    };
  }
}
