'use server'

import { getDBConnection } from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export async function deleteSummaryAction({summaryId} : {
  summaryId : string
}) {
  try {
    const user = await currentUser();
    const userId = user?.id
    console.log(summaryId, userId)

    if(!userId){
      throw new Error("User not found!")
    }

    const sql = await getDBConnection()

    //delete from database
    const result = await sql
    `
    DELETE FROM pdf_summaries 
    WHERE id = ${summaryId} AND user_id = ${userId}
    RETURNING id;
    `;

    console.log(result)
    if(result.length > 0){
      revalidatePath('/dashboard');
      return {success: true};
    }
    else return {success: false};
  } catch (error) {
    console.log(error)
    return {success: false};
  }
}