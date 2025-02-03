import { GoogleGenerativeAI, GenerativeModel, ChatSession } from "@google/generative-ai";

interface GenerationConfig {
  temperature: number;
  topP: number;
  topK: number;
  maxOutputTokens: number;
}

interface ChatMessage {
  role: 'user' | 'bot';
  content: string;
  timestamp: number;
}

interface GuidancePrompt {
  type: CareerType;
  prompt: string;
}

type CareerType = 
  | 'data_science'
  | 'web_development'
  | 'mobile_development'
  | 'cybersecurity'
  | 'cloud_computing'
  | 'devops'
  | 'ai_ml'
  | 'game_development'
  | 'embedded_systems'
  | 'blockchain'
  | 'general';

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY || process.env.VITE_GEMINI_API_KEY;

if (!API_KEY) {
  throw new Error("Gemini API key not found. Please set VITE_GEMINI_API_KEY in your .env file.");
}

const genAI: GoogleGenerativeAI = new GoogleGenerativeAI(API_KEY);
const model: GenerativeModel = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

const generationConfig: GenerationConfig = {
  temperature: 0.7,
  topP: 1,
  topK: 40,
  maxOutputTokens: 300, // Reduced for faster responses
};

let chat: ChatSession;
let chatHistory: ChatMessage[] = [];
const careerGuidancePrompts: GuidancePrompt[] = [
  {
      type: "data_science",
      prompt: `Provide career guidance for Data Science in tech. Include:
      1. Required skills and qualifications
      2. Learning roadmap
      3. Job prospects and roles
      4. Industry demand and salary range
      5. Recommended resources for learning`
    },
    {
      type: "web_development",
      prompt: `Discuss career path in Web Development. Cover:
      1. Frontend vs Backend vs Full-stack
      2. Essential technologies and frameworks
      3. Career progression
      4. Market opportunities
      5. Portfolio building tips`
    },
    {
      type: "mobile_development",
      prompt: `Explain career opportunities in Mobile Development. Include:
      1. iOS vs Android vs Cross-platform
      2. Required technical skills
      3. Career growth path
      4. Industry trends
      5. Getting started guide`
    },
    {
      type: "cybersecurity",
      prompt: `Detail career path in Cybersecurity. Cover:
      1. Specializations available
      2. Certification roadmap
      3. Skills requirements
      4. Job roles and responsibilities
      5. Industry outlook`
    },
    {
      type: "cloud_computing",
      prompt: `Outline career in Cloud Computing. Include:
      1. Major platforms and certifications
      2. Technical requirements
      3. Career trajectories
      4. Industry demand
      5. Preparation strategies`
    },
    {
      type: "devops",
      prompt: `Describe career in DevOps. Cover:
      1. Required skillset
      2. Tools and technologies
      3. Career progression
      4. Industry adoption
      5. Learning resources`
    },
    {
      type: "ai_ml",
      prompt: `Detail career path in AI/ML. Include:
      1. Educational requirements
      2. Technical prerequisites
      3. Specialization options
      4. Industry applications
      5. Future prospects`
    },
    {
      type: "game_development",
      prompt: `Outline career in Game Development. Cover:
      1. Required skills and tools
      2. Industry segments
      3. Career paths
      4. Portfolio requirements
      5. Getting started guide`
    },
    {
      type: "embedded_systems",
      prompt: `Explain career in Embedded Systems. Include:
      1. Hardware/software requirements
      2. Industry domains
      3. Career progression
      4. Required certifications
      5. Learning pathway`
    },
    {
      type: "blockchain",
      prompt: `Detail career opportunities in Blockchain. Cover:
      1. Technical requirements
      2. Industry applications
      3. Career paths
      4. Market demand
      5. Skill development guide`
    },
    {
      type: "general",
      prompt: `Provide general tech career guidance. Include:
      1. Current industry trends
      2. Comparing different paths
      3. Skills assessment
      4. Career planning
      5. Professional development tips`
    }
];

const keywords: Record<Exclude<CareerType, 'general'>, string[]> = {
data_science: ['data science', 'data scientist', 'analytics', 'machine learning'],
web_development: ['web dev', 'frontend', 'backend', 'full stack'],
mobile_development: ['mobile dev', 'ios', 'android', 'app development'],
cybersecurity: ['cyber', 'security', 'infosec', 'penetration testing'],
cloud_computing: ['cloud', 'aws', 'azure', 'gcp'],
devops: ['devops', 'deployment', 'ci/cd', 'infrastructure'],
ai_ml: ['ai', 'artificial intelligence', 'ml', 'deep learning'],
game_development: ['game dev', 'game design', 'unity', 'unreal'],
embedded_systems: ['embedded', 'iot', 'firmware', 'hardware'],
blockchain: ['blockchain', 'crypto', 'web3', 'smart contracts']
};

const generalConversationPrompts = {
  greeting: `As a career mentor, help students explore tech careers. Keep responses under 100 words, be friendly but professional.
  - For greetings: Introduce as a tech career mentor
  - For general questions: Focus on career guidance perspective
  - For off-topic: Politely redirect to career discussions
  - Always maintain educational tone`,
  
  introduction: `I'm your dedicated Tech Career Mentor, specialized in guiding students and professionals through their technology career journey. I can help you:
  - Explore various tech career paths
  - Understand skill requirements
  - Plan your career progression
  - Learn about industry trends
  How can I assist with your tech career goals today?`,
  
  offtopic: `While I appreciate your interest, I'm specifically designed to help with technology career guidance. I'd be happy to discuss:
  - Different tech career paths
  - Required skills and qualifications
  - Career progression options
  - Industry trends and opportunities
  What aspects of tech careers interest you?`
};

const isGeneralQuery = (input: string): boolean => {
  const generalPatterns = [
    /^hi$/i, /^hello$/i, /^hey$/i,
    /how are you/i, /what are you/i,
    /who are you/i, /what do you do/i,
    /what is this/i, /what can you do/i
  ];
  return generalPatterns.some(pattern => pattern.test(input.trim()));
};

const isOffTopic = (input: string): boolean => {
  const techKeywords = [
    'career', 'job', 'tech', 'developer', 'engineer', 'programming',
    'software', 'IT', 'computer', 'code', 'development', 'study',
    'learn', 'skill', 'technology', 'certification', 'degree'
  ];
  return !techKeywords.some(keyword => 
    input.toLowerCase().includes(keyword.toLowerCase())
  );
};

const createContextualPrompt = (userInput: string): string => {
  // Handle general queries first
  if (isGeneralQuery(userInput)) {
    return `${generalConversationPrompts.greeting}

Current query: "${userInput}"

Remember to:
- Keep response under 100 tokens
- Be welcoming and professional
- Focus on career guidance
- Use clear, concise language`;
  }

  // Handle off-topic queries
  if (isOffTopic(userInput)) {
    return `${generalConversationPrompts.offtopic}

Current query: "${userInput}"

Remember to:
- Keep response under 100 tokens
- Politely redirect to career topics
- Maintain professional tone
- Suggest relevant career discussions`;
  }

  // Existing career-specific logic
  let selectedType: CareerType = 'general';
  const recentContext = chatHistory.slice(-3);
  
  for (const [type, typeKeywords] of Object.entries(keywords)) {
    if (typeKeywords.some(keyword => userInput.toLowerCase().includes(keyword))) {
      selectedType = type as CareerType;
      break;
    }
  }

  const selectedPrompt = careerGuidancePrompts.find(p => p.type === selectedType);
  const contextString = recentContext
    .map(msg => `${msg.role}: ${msg.content}`)
    .join('\n');

  return `You are a Career Guidance Expert specializing in computer science and technology fields.
Provide concise, structured advice using markdown formatting.
Recent conversation context:
${contextString}

Current query: "${userInput}"

${selectedPrompt?.prompt}

Response guidelines:
- Keep response between 100-300 tokens
- Use markdown headers (##) for main points
- Use bullet points (*) for key details
- Focus on most relevant information first
- Be direct and actionable`;
};


export const initializeChat = (): void => {
  chat = model.startChat({
    generationConfig,
    history: [],
  });
  chatHistory = [];
};

export const streamResponse = async (
  userInput: string,
  onChunk: (chunk: string) => void
): Promise<void> => {
  if (!chat) {
    initializeChat();
  }

  const prompt = createContextualPrompt(userInput);
  chatHistory.push({ 
    role: "user", 
    content: userInput, 
    timestamp: Date.now() 
  });

  try {
    const result = await chat.sendMessageStream(prompt);
    let fullResponse = '';
    
    for await (const chunk of result.stream) {
      const chunkText = chunk.text();
      fullResponse += chunkText;
      onChunk(chunkText);
    }

    chatHistory.push({ 
      role: "bot", 
      content: fullResponse, 
      timestamp: Date.now() 
    });

    if (chatHistory.length > 10) {
      chatHistory = chatHistory.slice(-10);
    }
  } catch (error) {
    console.error('Error streaming message:', error);
    onChunk("I apologize, but I encountered an error processing your request. Please try again later.");
  }
};

export const getChatHistory = (): ChatMessage[] => {
  return chatHistory;
};