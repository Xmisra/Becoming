import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();

async function generateJourneyReflection(timelineText) {
    try{
        if (!process.env.GEMINI_API_KEY) {
            throw new Error("GEMINI_API_KEY is not configured");
        }

        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        const model = genAI.getGenerativeModel({
            model : process.env.GEMINI_MODEL || "gemini-2.5-flash"
        });

        const prompt = `You are an emotionally intelligent AI assistant.

        Analyze the following personal journey timeline.

        Focus on:
        - emotional progression
        - resilience
        - growth
        - learning patterns
        - turning points

        Generate:
        1. A concise reflective summary
        2. A motivational insight

        Keep the response meaningful,
        human, and under 200 words.

        Timeline:

        ${timelineText}`;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();
        return text;
    }
    catch(err)
    {
        console.error("AI reflection generation failed:", err.message);

        throw new Error(
            "AI reflection generation failed!!!"
        );
    }
}

export default generateJourneyReflection;
