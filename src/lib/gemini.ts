const GEMINI_API_KEY = 'AIzaSyCgQKOecZ2d2c4R9un9S_PkaJP1afI7Qr0';
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/text-bison-001:generateContent?key=${GEMINI_API_KEY}`;

export const callGeminiAPI = async (input: string, type: 'tour' | 'lang'): Promise<string> => {
  const prompt =
    type === 'lang'
      ? `Translate the following phrase to Nepali. Only return the Nepali translation, no explanation, no romanization, no English, just the Nepali text:\n\n"${input}"`
      : `You are an expert Nepal trekking tour planner. Generate a detailed, day-by-day itinerary for the following request. Be concise and use clear formatting.\n\n${input}`;

  const res = await fetch(GEMINI_API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
    }),
  });

  if (!res.ok) {
    const errData = await res.json().catch(() => null);
    const message = errData?.error?.message || res.statusText;
    throw new Error(`Gemini API error: ${message}`);
  }

  const data = await res.json();
  return data?.candidates?.[0]?.content?.parts?.[0]?.text || 'No response.';
};
