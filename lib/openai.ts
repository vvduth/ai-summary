import OpenAI from "openai";
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function summarizeTextFromOpenAI(text: string) {
    const response = await openai.chat.completions.create({
        model: "gpt-4.1",
        messages: [
          {
              role: "system",
              content: "You are a helpful assistant that summarizes text."
          }, {
              role: "user",
              content: ""
          }
        ],
        temperature: 0.7,
        max_tokens: 1500,
      });
}




