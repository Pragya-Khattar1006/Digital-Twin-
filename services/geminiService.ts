import { GoogleGenAI } from "@google/genai";
import { DWTInput, DWTOutput } from '../types';
import { SYSTEM_INSTRUCTION } from '../constants';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function processDWTRequest(input: DWTInput): Promise<DWTOutput> {
  const model = "gemini-2.5-flash";
  
  // Inject the specific owner name into the system instruction for personalization
  const dynamicSystemInstruction = SYSTEM_INSTRUCTION.replace("{{owner_name}}", input.owner_name);

  try {
    const response = await ai.models.generateContent({
      model: model,
      contents: [
        {
          role: "user",
          parts: [{ text: JSON.stringify(input) }]
        }
      ],
      config: {
        systemInstruction: dynamicSystemInstruction,
        responseMimeType: "application/json",
        temperature: 0.3, // Lower temperature for more deterministic/structured output
      },
    });

    const text = response.text;
    if (!text) {
      throw new Error("Empty response from Gemini");
    }

    const jsonResponse = JSON.parse(text) as DWTOutput;
    return jsonResponse;

  } catch (error) {
    console.error("DWT Processing Error:", error);
    throw error;
  }
}