import { getDBConnection } from "./db";

export async function getSummaries(userId: string) {
  try {
    const sql = await getDBConnection();
    const summaries = 
      await sql
      `SELECT * from pdf_summaries WHERE user_id=${userId} ORDER BY created_at DESC`;
    return summaries;
  } catch (error) {
    console.log(error)
    return {success: false}
  }
}

export async function getSummaryById(id: string) {
  try {
    const sql = await getDBConnection();
    const [summary] = 
      await sql
      `SELECT * from pdf_summaries WHERE id=${id}`;
    return summary;
  } catch (error) {
    console.log(error)
    return {success: false}
  }
}