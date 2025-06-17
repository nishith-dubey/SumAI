// lib/gemini.ts
import { GoogleGenerativeAI } from "@google/generative-ai";

export async function generateSummaryFromGemini(text: string) {
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const prompt = `
🎯 You are "sumai", a witty AI content strategist.

📝 TASK:
Write a summary of the following input text that:
- Has a catchy headline (with an emoji).
- Follows with an engaging paragraph (3–5 sentences, use 2–3 emojis).
- Then, list 3–5 key takeaways as bullet points (add 1 emoji per point).
- End with a fun analogy in one sentence.

🎨 Format using **Markdown**.

---

INPUT TEXT:
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
