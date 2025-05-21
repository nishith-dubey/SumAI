'use server'

import { generateSummaryFromGemini } from "@/lib/gemini";
import { fetchAndExtractPdfText } from "@/lib/langchain";
import { generateSummaryFromOpenAI } from "@/lib/openai";

export async function generateSummary(uploadResponse: {
  serverData: {
    userId: string,
    file: {
      url: string,
      name: string,
    };
  };
}) {
  if (!uploadResponse) {
    return {
      success: false,
      message: 'File upload failed: Invalid response',
      data: null,
    };
  }

  const { 
    serverData: {
      userId,
      file: { url: pdfUrl, name: fileName},
    } } = uploadResponse[0];

  if (!pdfUrl) {
    return {
      success: false,
      message: 'File upload failed: Invalid response',
      data: null,
    };
  }


  try {
    console.log('📄 Fetching and extracting text from:', pdfUrl);
  const pdfText = await fetchAndExtractPdfText(pdfUrl);
  console.log('✅ Extracted PDF text length:', pdfText.length);

  // const summary = await generateSummaryFromOpenAI(pdfText);
  const summary = await generateSummaryFromGemini(pdfText);
  console.log('🧠 Generated summary');


    return {
      success: true,
      message: 'PDF processed successfully',
      data: { userId, fileName, summary },
    };
  } catch (error) {
    console.error('PDF processing error:', error);
    return {
      success: false,
      message: 'Invalid file UR111L',
      data: null,
    };
  }
}