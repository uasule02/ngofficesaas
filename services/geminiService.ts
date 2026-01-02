
import { GoogleGenAI } from "@google/genai";

export const getDashboardInsights = async (context: string) => {
  try {
    // Initialize inside the call to ensure the latest API key is used
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    // Using 'gemini-3-flash-preview' for basic text summarization/analysis
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `You are a SaaS Business Analyst. Based on this data: ${context}, provide 3 concise, actionable strategic insights for the dashboard owner. Keep it professional and brief.`,
    });

    // Access .text property directly as per latest SDK guidelines
    return response.text;
  } catch (error) {
    console.error("Gemini Insights Error:", error);
    return "Unable to load AI insights at this time.";
  }
};
