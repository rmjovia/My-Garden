import { GoogleGenAI, Type } from '@google/genai';
import { FarmProfile } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const SYSTEM_INSTRUCTION = `You are a senior agricultural extension officer in Uganda. 
Your goal is to help smallholder farmers increase their yields and stop wasting money on fake seeds or wrong crops for their land.
Keep it simple (use everyday words, NO jargon). Be very encouraging and kind.
ALWAYS provide a short summary at the end in the farmer's local language based on their region:
- Central Region: Luganda
- Eastern Region: Lusoga or Ateso
- Northern Region: Luo
- Western Region: Runyankole

If the farmer's region is known, greet them in that language at the start, and summarize in that language at the end.`;

export async function getFarmingAdvice(profile: FarmProfile) {
  const prompt = `
    The farmer is from the ${profile.region} region of Uganda.
    They have ${profile.landSize} of land.
    They want to plant ${profile.crop}.
    Their irrigation method is ${profile.irrigation}.
    
    Provide short, direct advice (1-2 sentences max per field).
    If the crop isn't suitable, provide a warning and alternative.
    Always provide a summary in the local language of the ${profile.region} region.
  `;

  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: prompt,
    config: { 
      systemInstruction: SYSTEM_INSTRUCTION,
      responseMimeType: 'application/json',
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          spacing: { type: Type.STRING, description: "Spacing advice in simple terms" },
          plantingSeason: { type: Type.STRING, description: "Best months to plant" },
          soilSuitability: { type: Type.STRING, description: "Soil suitability" },
          marketDemand: { type: Type.STRING, description: "Market demand" },
          riskAssessment: { type: Type.STRING, description: "Risk assessment" },
          warningsAndAlternatives: { type: Type.STRING, description: "Warnings and alternatives if unsuitable" },
          companionCrops: { type: Type.STRING, description: "Suggested companion crops" },
          summary: { type: Type.STRING, description: "Summary in the local language" }
        },
        required: ["spacing", "plantingSeason", "soilSuitability", "marketDemand", "riskAssessment", "companionCrops", "summary"]
      }
    },
  });

  return response.text;
}

export async function getYieldOptimization(profile: FarmProfile) {
  const prompt = `
    The farmer is growing ${profile.crop} with a spacing of ${profile.spacing} in the ${profile.region} region.
    
    Please provide an optimization plan covering:
    1. Confirm if their spacing is good.
    2. Fertilizer timing and type (simple terms).
    3. Pest calendar (when to look out for pests and what to do).
    4. Mention intercropping options.
    5. Give 3 pro tips to get a bigger harvest than their neighbors (e.g., mulch, organic manure).
  `;

  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: prompt,
    config: { systemInstruction: SYSTEM_INSTRUCTION },
  });

  return response.text;
}

export async function analyzePlantImage(imageBase64: string, mimeType: string, profile: FarmProfile, currentStage: string, userMessage?: string) {
  const prompt = `
    The farmer is growing ${profile.crop} in the ${profile.region} region.
    The plant is currently supposed to be in the "${currentStage}" stage.
    ${userMessage ? `The farmer says: "${userMessage}"` : ''}
    
    Analyze the provided image of their plant.
    1. Compare their actual plant's progress with optimal standards for the ${currentStage} stage.
    2. Explain what the crop should look like at the end of this month.
    3. Tell them how to better the yield or what to do next based on the image.
  `;

  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: {
      parts: [
        { text: prompt },
        { inlineData: { data: imageBase64.split(',')[1] || imageBase64, mimeType } }
      ]
    },
    config: { systemInstruction: SYSTEM_INSTRUCTION },
  });

  return response.text;
}

export async function getSeasonCalendar(region: string) {
  const prompt = `
    Provide a season calendar for the ${region} region of Uganda.
    Return a JSON array of 12 objects, one for each month from January to December.
    Each object must have:
    - "month": The month name (e.g., "January")
    - "season": Strictly one of "Rainy", "Dry", or "Moderate"
    - "activities": A short 1-sentence advice on what farmers should do this month.
  `;

  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: prompt,
    config: { 
      systemInstruction: SYSTEM_INSTRUCTION,
      responseMimeType: 'application/json',
      responseSchema: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            month: { type: Type.STRING },
            season: { type: Type.STRING },
            activities: { type: Type.STRING }
          },
          required: ["month", "season", "activities"]
        }
      }
    },
  });

  return response.text;
}

export async function chatWithOfficer(message: string, profile: FarmProfile) {
  const prompt = `
    The farmer is from the ${profile.region} region, growing ${profile.crop}.
    They asked: "${message}"
    
    Answer their question simply and encouragingly.
  `;

  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: prompt,
    config: { systemInstruction: SYSTEM_INSTRUCTION },
  });

  return response.text;
}
