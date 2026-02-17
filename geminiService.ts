
import { GoogleGenerativeAI } from "@google/generative-ai";
import { FilePart, User, Book, Language, Role, Adhyaya, CustomSource, MedicalField, DailyQuote } from "./types";

const getAIClient = () => {
  const apiKey = import.meta.env.VITE_API_KEY; 
  
  if (!apiKey) {
    throw new Error("API_KEY missing!");
  }
  return new GoogleGenerativeAI(apiKey);
};



export const translateContent = async (text: string, targetLanguage: Language): Promise<string> => {
  const ai = getAIClient();
  try {
    const response = await ai.models.generateContent({
      model: "gemini-1.5-flash",
      contents: [{ role: 'user', parts: [{ text: `Translate the following medical text into ${targetLanguage}. Maintain clinical accuracy: \n\n${text}` }] }],
    });
    return response.text || text;
  } catch (error) {
    console.error("Translation error:", error);
    return text;
  }
};

const getPersonaPrompt = (user: User) => {
  switch (user.medicalField) {
    case MedicalField.BAMS:
      return "You are 'VaidyaGuru', an elite Ayurvedic Acharya. Use Sanskrit Shlokas where relevant, explain Doshas, Dhatus, and traditional treatments. Respond with a mix of Gujarati and English. Start with 'Jay Dhanvantari 🙏'.";
    case MedicalField.MBBS:
      return "You are a 'Senior Clinical Consultant'. Focus on modern medicine, evidence-based research, pathology, and anatomy. Do NOT use Shlokas. Use clinical terminology. Respond with a mix of Gujarati and English. Start with 'Clinical Update: 👋'.";
    case MedicalField.BHMS:
      return "You are a 'Homeopathic Research Specialist'. Focus on the Organon of Medicine and Materia Medica. Respond with a mix of Gujarati and English. Start with 'Similia Similibus Curentur 🙏'.";
    case MedicalField.PHARMACY:
      return "You are a 'Pharmacology Expert'. Focus on drug interactions, pharmacokinetics, and pharmaceutical chemistry. Start with 'Pharm-Insight: 🧪'.";
    default:
      return `You are a professional medical assistant specialized in ${user.medicalField}. Provide accurate and helpful information based on current standards.`;
  }
};

export const getBookContextResponse = async (query: string, book: Book, adhyaya: Adhyaya, user: User): Promise<string> => {
  const ai = getAIClient();
  const context = adhyaya.content[user.preferredLanguage] || adhyaya.content[Language.ENGLISH] || adhyaya.content[Language.GUJARATI] || "";
  const persona = getPersonaPrompt(user);
  const systemInstruction = `${persona} You are helping the user study "${book.title}", Chapter ${adhyaya.number}: "${adhyaya.title}". Use the provided chapter context.`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-1.5-flash",
      contents: [{ role: 'user', parts: [{ text: `Chapter Context:\n${context}\n\nUser Question: ${query}` }] }],
      config: { systemInstruction }
    });
    return response.text || "I apologize, I cannot generate an answer at this moment.";
  } catch (error) {
    return "Error connecting to the knowledge base.";
  }
};

export const generateDailyQuote = async (userField: MedicalField): Promise<DailyQuote> => {
  const ai = getAIClient();
  const dateStr = new Date().toISOString().split('T')[0];
  const prompt = userField === MedicalField.BAMS 
    ? "Generate a meaningful Sanskrit Shloka from Charaka Samhita with translations in English, Gujarati, and Hindi. Return as JSON."
    : "Generate a medical clinical fact (anatomy, physiology or pathology) with translations in English, Gujarati, and Hindi. Return as JSON.";

  try {
    const response = await ai.models.generateContent({
      model: "gemini-1.5-flash",
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            original: { type: Type.STRING },
            translations: {
              type: Type.OBJECT,
              properties: {
                [Language.ENGLISH]: { type: Type.STRING },
                [Language.GUJARATI]: { type: Type.STRING },
                [Language.HINDI]: { type: Type.STRING }
              },
              required: [Language.ENGLISH, Language.GUJARATI, Language.HINDI]
            }
          },
          required: ["original", "translations"]
        }
      }
    });
    const data = JSON.parse(response.text || "{}");
    return { ...data, date: dateStr };
  } catch (error) {
    return {
      original: "Health is the greatest wealth.",
      translations: {
        [Language.ENGLISH]: "Preserve the health of the healthy.",
        [Language.GUJARATI]: "સ્વસ્થ વ્યક્તિના સ્વાસ્થ્યનું રક્ષણ કરવું.",
        [Language.HINDI]: "स्वस्थ व्यक्ति के स्वास्थ्य की रक्षा करना।"
      },
      date: dateStr
    };
  }
};

export const generateAyurvedicImage = async (prompt: string): Promise<string | undefined> => {
  const ai = getAIClient();
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-1.5-flash-image',
      contents: {
        parts: [{ text: `High-quality clinical illustration of: ${prompt}. Professional medical educational style.` }],
      },
    });
    for (const part of response.candidates?.[0]?.content?.parts || []) {
      if (part.inlineData) {
        return `data:image/png;base64,${part.inlineData.data}`;
      }
    }
  } catch (error) {
    console.error("Image generation error:", error);
  }
  return undefined;
};

export const checkFestiveTheme = async () => {
  const date = new Date();
  const day = date.getDate();
  const month = date.getMonth() + 1;
  if (month === 1 && day === 14) return { theme: 'kite', title: 'Uttarayan' };
  if (month === 8 && day === 15) return { theme: 'independence', title: 'Independence Day' };
  if (month === 10 || month === 11) return { theme: 'festive', title: 'Deepavali Season' };
  return null;
};

export const getVaidyaGuruResponse = async (
  prompt: string, 
  user: User,
  history: { role: 'user' | 'model'; parts: { text?: string; inlineData?: any }[] }[] = [],
  attachments: FilePart[] = [],
  useThinking: boolean = false
) => {
  const ai = getAIClient();
  const model = useThinking ? "gemini-1.5-flash" : "gemini-3-flash-preview";
  const systemInstruction = getPersonaPrompt(user);

  const contents = [
    ...history, 
    { role: 'user', parts: [{ text: `User query: ${prompt}` }, ...attachments.map(att => ({ inlineData: { mimeType: att.mimeType, data: att.data } }))] }
  ];

  try {
    const response = await ai.models.generateContent({ model, contents, config: { systemInstruction, tools: [{ googleSearch: {} }] } });
    return { text: response.text || "I am processing your clinical query.", grounding: response.candidates?.[0]?.groundingMetadata?.groundingChunks || [] };
  } catch (error: any) { throw error; }
};

export const getStudyDeskResponse = async (query: string, books: Book[], customSources: CustomSource[], user: User) => {
  const ai = getAIClient();
  const sources = books.map(b => b.title).join(", ");
  const systemInstruction = `You are a Senior Medical Researcher. Answer based on these sources: (${sources}). User is in field: ${user.medicalField}.`;
  try {
    const response = await ai.models.generateContent({
      model: "gemini-1.5-flash",
      contents: [{ role: 'user', parts: [{ text: query }] }],
      config: { systemInstruction }
    });
    return response.text || "Synthesis unavailable.";
  } catch (error) { return "Synthesis unavailable."; }
};

export const generatePodcastScript = async (books: Book[]) => {
  const ai = getAIClient();
  const sources = books.map(b => b.title).join(", ");
  const prompt = `Create an educational medical dialogue script between two professors discussing the contents of: ${sources}.`;
  try {
    const response = await ai.models.generateContent({ model: "gemini-3-flash-preview", contents: [{ role: 'user', parts: [{ text: prompt }] }] });
    return response.text || "";
  } catch (error) { return ""; }
};

export const generateSpeech = async (text: string, voice: 'Kore' | 'Puck' = 'Kore') => {
  const ai = getAIClient();
  try {
    const response = await ai.models.generateContent({
      model: "gemini-1.5-flash-preview-tts",
      contents: [{ parts: [{ text }] }],
      config: { responseModalities: [Modality.AUDIO], speechConfig: { voiceConfig: { prebuiltVoiceConfig: { voiceName: voice } } } },
    });
    return response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
  } catch (error) { throw error; }
};

export function encode(bytes: Uint8Array) {
  let binary = '';
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

export function decode(base64: string) {
  const binaryString = atob(base64);
  const bytes = new Uint8Array(binaryString.length);
  for (let i = 0; i < binaryString.length; i++) bytes[i] = binaryString.charCodeAt(i);
  return bytes;
}

export async function decodeAudioData(data: Uint8Array, ctx: AudioContext, sampleRate: number, numChannels: number): Promise<AudioBuffer> {
  const dataInt16 = new Int16Array(data.buffer);
  const frameCount = dataInt16.length / numChannels;
  const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);
  for (let channel = 0; channel < numChannels; channel++) {
    const channelData = buffer.getChannelData(channel);
    for (let i = 0; i < frameCount; i++) channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
  }
  return buffer;
                                                     }
