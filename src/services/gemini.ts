import { GoogleGenAI, Type } from "@google/genai";
import { ResumeAnalysis } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

const ANALYSIS_SCHEMA = {
  type: Type.OBJECT,
  properties: {
    suitabilityScore: {
      type: Type.NUMBER,
      description: "A score from 0 to 100 representing how well the resume is structured and presented.",
    },
    skills: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "List of key technical and soft skills identified.",
    },
    experienceSummary: {
      type: Type.STRING,
      description: "A brief summary of the professional experience found.",
    },
    strengths: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "List of key strengths found in the resume.",
    },
    improvements: {
      type: Type.STRING,
      description: "Detailed suggestions for improvement in Markdown format.",
    },
    suggestedRoles: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "Potential job roles that match this resume.",
    },
  },
  required: ["suitabilityScore", "skills", "experienceSummary", "strengths", "improvements", "suggestedRoles"],
};

export async function analyzeResume(content: string | { data: string; mimeType: string }): Promise<ResumeAnalysis> {
  const model = "gemini-3.1-pro-preview";
  
  let parts: any[] = [];
  if (typeof content === 'string') {
    parts.push({ text: `Analyze the following resume text and provide a detailed evaluation:\n\n${content}` });
  } else {
    parts.push({
      inlineData: {
        data: content.data,
        mimeType: content.mimeType
      }
    });
    parts.push({ text: "Analyze the resume in this image and provide a detailed evaluation." });
  }

  const response = await ai.models.generateContent({
    model,
    contents: [{ parts }],
    config: {
      responseMimeType: "application/json",
      responseSchema: ANALYSIS_SCHEMA,
      systemInstruction: "You are an expert HR manager and resume screener. Your goal is to provide honest, constructive, and detailed feedback on resumes. Focus on clarity, impact, and relevance of skills.",
    },
  });

  return JSON.parse(response.text);
}
