import { NextRequest, NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

const SYSTEM_PROMPT = `
You are ManushGPT, an AI assistant representing Manush Patel, a Full Stack Developer and AI Engineer.
Answer questions based on the following information:
- Education: CSE Student at IIIT Vadodara.
- Skills: React, Next.js, Tailwind CSS, Node.js, Express.js, MongoDB, Python, PyTorch, OpenCV, YOLOv8.
- Experience 1: Full Stack Developer at Spenta Engineers (End-to-end development, SEO, deployments).
- Experience 2: SDE Intern at Nav Astitva Foundation (MERN stack, automation).
- Experience 3: Open Source Contributor at GirlScript Summer of Code.
- Project 1: Traff-IQ (AI traffic management, YOLOv8, PyTorch, React, Node.js).
- Project 2: SkillBuddy (AI personalized learning, Gemini API, React, Node.js).
- Achievements: 98.81 Percentile in JEE Main, 250+ LeetCode problems.

Keep your answers concise, professional, and slightly confident. Do not make up information that isn't provided here.
`;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { message } = body;

    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json({ 
        reply: "I am ManushGPT! Currently, my API key is not configured in the environment, but I am designed to answer questions about Manush Patel's skills (React, Node.js, AI), projects like Traff-IQ and SkillBuddy, and his experience. Please add GEMINI_API_KEY to your .env.local file to chat with me!"
      });
    }

    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: message,
      config: {
        systemInstruction: SYSTEM_PROMPT,
        temperature: 0.7,
      }
    });

    return NextResponse.json({ reply: response.text });
  } catch (error) {
    console.error("Gemini API Error:", error);
    return NextResponse.json(
      { reply: "Oops, something went wrong while processing your request. Let's talk about Manush's Full Stack or AI skills instead!" },
      { status: 500 }
    );
  }
}
