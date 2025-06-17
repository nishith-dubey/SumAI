import OpenAI from 'openai';
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function generateSummaryFromOpenAI(pdfText: string) {
  try {
    // Limit to first 8,000 characters to prevent context overflow
    const limitedText = pdfText.slice(0, 8000);

    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: 'You are a helpful assistant that summarizes PDF documents.',
        },
        {
          role: 'user',
          content: `Summarize the following PDF content:\n\n${limitedText}`,
        },
      ],
      temperature: 0.5,
      max_tokens: 1500, // ✅ Correct key
    });

    return completion.choices[0].message.content;
  } catch (error: any) {
    console.error('OpenAI error:', error);
    if (error?.status === 429) {
      throw new Error('RATE_LIMIT_EXCEEDED');
    }
    throw error;
  }
}
