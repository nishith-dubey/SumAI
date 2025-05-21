// lib/gemini.ts
console.log('yaha tak to chala')
import { GoogleGenerativeAI } from "@google/generative-ai";

export async function generateSummaryFromGemini(text: string) {
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const prompt = `
    Transform this document into engaging, easy-to-read summary with contextually relevant emojis and proper markdown formatting.\n
    Text: ${text}
  `;

  try {
    const result = await model.generateContent(prompt);
    return result.response.text();
  } catch (error) {
    console.error("Gemini error:", error);
    throw error;
  }
}