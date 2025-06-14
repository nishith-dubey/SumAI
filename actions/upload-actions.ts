"use server";

import { getDBConnection } from "../lib/db";
import { generateSummaryFromGemini } from "@/lib/gemini";
import { fetchAndExtractPdfText } from "@/lib/langchain";
import { generateSummaryFromOpenAI } from "@/lib/openai";
import { formatFileNameAsTitle } from "@/utils/format-utils";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export async function generateSummary(uploadResponse: {
  serverData: {
    userId: string;
    file: {
      url: string;
      name: string;
    };
  };
}) {
  if (!uploadResponse) {
    return {
      success: false,
      message: "File upload failed: Invalid response",
      data: null,
    };
  }

  const {
    serverData: {
      userId,
      file: { url: pdfUrl, name: fileName },
    },
  } = uploadResponse[0];

  if (!pdfUrl) {
    return {
      success: false,
      message: "File upload failed: Invalid response",
      data: null,
    };
  }

  try {
    console.log("📄 Fetching and extracting text from:", pdfUrl);
    const pdfText = await fetchAndExtractPdfText(pdfUrl);
    console.log("✅ Extracted PDF text length:", pdfText.length);

    // const summary = await generateSummaryFromOpenAI(pdfText);
    const summary = await generateSummaryFromGemini(pdfText);
    console.log("🧠 Generated summary");

    if (!summary) {
      return {
        success: false,
        message: "Failed to generate summary",
        data: null,
      };
    }

    const formattedFileName = formatFileNameAsTitle(fileName || "Untitled PDF");
    console.log(fileName);
    console.log(formattedFileName);
    return {
      success: true,
      message: "PDF processed successfully",
      data: { userId, summary, formattedFileName },
    };
  } catch (error) {
    console.error("PDF processing error:", error);
    return {
      success: false,
      message: "Invalid file UR111L",
      data: null,
    };
  }
}

export async function savePdfSummary({
  userId,
  fileUrl,
  summary,
  title,
  fileName,
}: {
  userId: string;
  fileUrl: string;
  summary: string;
  title: string;
  fileName: string;
}) {
  //sql inserting pdf summary
  try {
    if (!userId || !fileUrl || !summary || !title || !fileName) {
      throw new Error(
        "One or more required fields are missing before inserting into the database"
      );
    }
    console.log("Saving summary with values:", {
      userId,
      fileUrl,
      summary,
      title,
      fileName,
    });

    const sql = await getDBConnection();
    await sql`INSERT INTO pdf_summaries (
      user_id,
      original_file_url,
      summary_text,
      title,
      file_name
    ) VALUES (
      ${userId},
      ${fileUrl},
      ${summary},
      ${title},
      ${fileName}
    );`;
  } catch (error) {
    console.error("error saving pdf summary", error);
    throw error;
  }
}

export async function storePdfSummaryAction({
  fileUrl,
  summary,
  title,
  fileName,
}: {
  fileUrl: string;
  summary: string;
  title: string;
  fileName: string;
}) {
  // make sure user is logged in and has an userid

  //savepdfsummary
  let savedPdfSummary: any;
  try {
    const { userId } = await auth();
    if (!userId) {
      return {
        success: false,
        message: "User not found",
      };
    }

    savedPdfSummary = await savePdfSummary({
      userId,
      fileUrl,
      summary,
      title,
      fileName,
    });
    if (!savedPdfSummary) {
      return {
        success: false,
        message: "Failed to save pdf summary, please try again",
      };
    }

    // return {
    //   success: true,
    //   message: "PDF summary saved successfully!",
    // };
  } catch (error) {
    return {
      success: false,
      message:
        error instanceof Error ? error.message : "Error saving pdf summary",
    };
  }

  //revalidate our cache
  revalidatePath(`/summaries/${savedPdfSummary.id}`)

  return {
    success: true,
    message: "PDF summary saved successfully!",
    data:{
      id: savedPdfSummary.id
    }
  };
}
