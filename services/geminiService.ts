
import { GoogleGenAI } from "@google/genai";

// Always use the API key directly from process.env.API_KEY
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getDashboardInsights = async (context: string) => {
  try {
    // Calling generateContent directly with the model and contents as per guidelines
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `You are a SaaS Business Analyst. Based on this data: ${context}, provide 3 concise, actionable strategic insights for the dashboard owner. Keep it professional and brief.`,
    });
    // Accessing .text as a property, not a method
    return response.text;
  } catch (error) {
    console.error("Gemini Insights Error:", error);
    return "Unable to load AI insights at this time.";
  }
};
