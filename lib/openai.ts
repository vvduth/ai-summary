import { cons } from './../node_modules/effect/src/List';
import { SUMMARY_SYSTEM_PROMPT } from "@/utils/prompt";
import OpenAI from "openai";
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function summarizeTextFromOpenAI(text: string) {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: SUMMARY_SYSTEM_PROMPT,
        },
        {
          role: "user",

          content: `Transform this document into an engaging, easy-to-read summary with contextually relevant emojis and proper markdown 
          formatting:\n\n${text}`,
        },
      ],
      temperature: 0.7,
      max_tokens: 1500,
    });
    console.log("openai response", response);
    return response.choices[0].message;
  } catch (error: any) {
    if (error?.status === 429) {
      throw new Error("Rate limit exceeded. Please try again later.");
    }
    console.error("Error occurred while summarizing text: ", error);
  }
}
