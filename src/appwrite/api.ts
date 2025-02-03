import { GoogleGenerativeAI,ChatSession } from "@google/generative-ai";
import { useEffect, useState } from "react";

interface CareerPreferences {
  domain: string;
  skills: string;
  careerExpectations: string;
  salarySeniority: string;
  salaryRange: { min: number; max: number };
  education: string;
  specialization: string;
  location: string;
}

interface QuizResults {
  sectionScores: number[];
  domainScore: number;
  technicalScore: number;
  trendsScore: number;
}

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY || process.env.VITE_GEMINI_API_KEY;

if (!API_KEY) {
  throw new Error("Gemini API key not found. Please set VITE_GEMINI_API_KEY in your .env file.");
}

const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

const generateCareerPrompt = (prefs: CareerPreferences, results: QuizResults): string => {
  return `Based on the input parameters:
- Domain: ${prefs.domain}
- Career Expectations: ${prefs.careerExpectations}
- Location: ${prefs.location}
- Salary Range: $${prefs.salaryRange.min}-${prefs.salaryRange.max}
- Experience Level: ${prefs.salarySeniority}
- Skills: ${prefs.skills}
- Education: ${prefs.education} in ${prefs.specialization}
- Domain Score: ${results.domainScore}/100
- Technical Score: ${results.technicalScore}/100
- Trends Awareness: ${results.trendsScore}/100

Please predict three suitable job roles tailored to this profile and provide structured, actionable guidelines.
Each job role's response must follow this structure:

1. **Core Skills and Technologies to Develop**
2. **Free Learning Resources**
3. **Recommended Certifications**
4. **Salary and Job Insights**
5. **Practical Projects to Demonstrate Skills**
6. **Networking and Industry Events**

Ensure responses are markdown-formatted, professional yet conversational, and tailored to bridge knowledge gaps while aligning with current industry trends. Format each job role as a separate section with clear headings.`;
};

export const generateCareerGuidelines = async (
  quizResults: QuizResults,
  careerPrefs: CareerPreferences
): Promise<string> => {
  const chat: ChatSession = model.startChat({
    generationConfig: {
      temperature: 0.7,
      topP: 1,
      topK: 40,
      maxOutputTokens: 2000,
    },
    history: [],
  });

  try {
    const prompt = generateCareerPrompt(careerPrefs, quizResults);
    const result = await chat.sendMessage(prompt);
    return result.response.text().trim();
  } catch (error) {
    console.error("Error generating guidelines:", error);
    throw new Error("Failed to generate career guidelines");
  }
};

export const useCareerGuidelines = () => {
  const [guidelines, setGuidelines] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchGuidelines = async () => {
      try {
        const quizResults = JSON.parse(localStorage.getItem("quizResults") || "");
        const careerPrefs = JSON.parse(localStorage.getItem("careerPreferenceData") || "");

        if (!quizResults || !careerPrefs) {
          throw new Error("Required data not found");
        }

        const generatedGuidelines = await generateCareerGuidelines(quizResults, careerPrefs);
        setGuidelines(generatedGuidelines);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An unknown error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchGuidelines();
  }, []);

  return { guidelines, loading, error };
};

export default {
  generateCareerGuidelines,
  useCareerGuidelines,
};