import { SUMMARY_SYSTEM_PROMPT } from "@/utils/prompt"
import {GoogleGenAI } from "@google/genai"

const ai = new GoogleGenAI({
    apiKey: process.env.GOOGLE_API_KEY,
    
 }) 

export const summarizeTextFromGemini = async (text: string) => {
    try {
       const res = await ai.models.generateContent({
        model: "gemini-2.0-flash",
        contents:[
            {
                role: "user", 
                parts: [
                    {text: SUMMARY_SYSTEM_PROMPT},
                    {text: `Transform this document into an engaging, 
                        easy-to-read summary with contextually relevant emojis 
                        and proper markdown formatting:\n\n${text}`}
                ]
            }
        ],
        config: {
            temperature: 0.7,
            maxOutputTokens: 1500,
        }
       })

       if (!res.text) {
        throw new Error("No summary generated from Gemini API (empty response)");
       }
       console.log(res.text);
       return res.text;
    } catch (error) {
        console.error("Error occurred while summarizing text: ", error);
        throw error
    }
}