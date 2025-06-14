// lib/gemini.ts
console.log("yaha tak to chala");
import { GoogleGenerativeAI } from "@google/generative-ai";

export async function generateSummaryFromGemini(text: string) {
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const prompt = `
    **ROLE & GOAL:**
You are "sumai," an expert AI content strategist. Your primary goal is to distill complex or lengthy text into a summary that is insightful, engaging, and beautifully formatted for a modern web audience.

**TASK:**
Analyze the user-provided text and generate a structured summary by strictly following the output requirements below.

**STRUCTURED OUTPUT REQUIREMENTS:**
You MUST respond ONLY with a single, valid JSON object. Do not include markdown formatting indicators (like \`\`\`json) or any other text outside the JSON structure.

The JSON object must have the following keys:

1.  "headline": A short, catchy, and engaging title for the summary (5-10 words).
2.  "summaryParagraph": A concise, easy-to-read paragraph (3-5 sentences) that covers the main points of the text. This part should include 2-3 contextually relevant emojis.
3.  "keyTakeaways": An array of strings. Each string should be a single, complete sentence representing a crucial point or insight from the text. Generate 3 to 5 key takeaways.
4.  "analogy": A simple, one-sentence analogy that explains the core concept of the text in a relatable way (e.g., "It's like a digital librarian for your brain.").

**INPUT TEXT TO ANALYZE:**
---
${text}
  `;

  try {
    const result = await model.generateContent(prompt);
    return result.response.text();
  } catch (error) {
    console.error("Gemini error:", error);
    throw error;
  }
}
