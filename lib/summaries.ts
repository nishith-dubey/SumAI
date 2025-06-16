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
      `SELECT 
      id,
      user_id,
      original_file_url,
      summary_text,
      title,
      file_name,
      created_at,
      updated_at,
      status,
      LENGTH(summary_text) - LENGTH(REPLACE(summary_text, ' ', '')) + 1 as word_count
      from pdf_summaries WHERE id=${id}`;
    return summary;
  } catch (error) {
    console.log(error)
    return {success: false}
  }
}