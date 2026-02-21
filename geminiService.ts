// આ ફાઈલ ગુગલ જેમિની (Google Gemini AI) સાથે વાતચીત કરવાનું કામ કરે છે.
// આપણે AI ને સૂચના (Prompt) આપી છે કે તે માત્ર 'વૈદ્યગુરુ' તરીકે જ વર્તે અને 
// આયુર્વેદ, શ્લોકો અને સંસ્કૃત ટર્મિનોલોજીનો જ ઉપયોગ કરે.

import { GoogleGenerativeAI } from "@google/generative-ai";
import { FilePart, User, Book, Language, Adhyaya, CustomSource, DailyQuote } from "./types";

// API કી મેળવવાનું ફંક્શન
const getAIClient = () => {
  const apiKey = import.meta.env.VITE_API_KEY; 
  if (!apiKey) {
    throw new Error("API_KEY missing!");
  }
  return new GoogleGenerativeAI(apiKey);
};

// ભાષાંતર કરવા માટે
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

// AI નું વ્યક્તિત્વ (Persona) હવે ૧૦૦% આયુર્વેદિક જ રહેશે
const getPersonaPrompt = () => {
  return "You are 'VaidyaGuru', an elite Ayurvedic Acharya and clinical expert. Always use relevant Sanskrit Shlokas from texts like Charaka Samhita, Sushruta Samhita, or Ashtanga Hridaya. Explain concepts using Tridosha, Saptadhatu, and Panchamahabhuta theories. Respond with a mix of Gujarati and English. Always speak the absolute truth based on Ayurvedic principles. Start your response with 'Jay Dhanvantari 🙏'.";
};

// બુક રીડરમાં AI ને પ્રશ્ન પૂછવા માટે
export const getBookContextResponse = async (query: string, book: Book, adhyaya: Adhyaya, user: User): Promise<string> => {
  const ai = getAIClient();
  const context = adhyaya.content[user.preferredLanguage] || adhyaya.content[Language.ENGLISH] || adhyaya.content[Language.GUJARATI] || "";
  const persona = getPersonaPrompt();
  const systemInstruction = `${persona} You are helping an Ayurveda Scholar study "${book.title}", Chapter ${adhyaya.number}: "${adhyaya.title}". Use the provided chapter context to answer exactly.`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-1.5-flash",
      contents: [{ role: 'user', parts: [{ text: `Chapter Context:\n${context}\n\nUser Question: ${query}` }] }],
      config: { systemInstruction }
    });
    return response.text || "હું અત્યારે જવાબ આપી શકું તેમ નથી. કૃપા કરીને ફરી પ્રયાસ કરો.";
  } catch (error) {
    return "જ્ઞાન ભંડાર સાથે કનેક્ટ થવામાં ભૂલ આવી રહી છે.";
  }
};

// રોજનો સુવિચાર (હવે માત્ર આયુર્વેદિક શ્લોક જ આવશે)
export const generateDailyQuote = async (): Promise<DailyQuote> => {
  const ai = getAIClient();
  const dateStr = new Date().toISOString().split('T')[0];
  const prompt = "Generate a highly meaningful and authentic Sanskrit Shloka from an Ayurvedic Granth (like Charaka or Ashtanga Hridaya) related to health, mind, or life. Provide its exact translations in English, Gujarati, and Hindi. Return as strict JSON format.";

  try {
    const response = await ai.models.generateContent({
      model: "gemini-1.5-flash",
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
      config: {
        responseMimeType: "application/json",
      }
    });
    const data = JSON.parse(response.text || "{}");
    return { ...data, date: dateStr };
  } catch (error) {
    // જો ભૂલ આવે તો આ ડીફોલ્ટ શ્લોક દેખાશે
    return {
      original: "स्वस्थस्य स्वास्थ्यरक्षणमातुरस्य विकारप्रशमनं च॥",
      translations: {
        [Language.ENGLISH]: "To maintain the health of the healthy and to cure the disease of the diseased.",
        [Language.GUJARATI]: "સ્વસ્થ વ્યક્તિના સ્વાસ્થ્યનું રક્ષણ કરવું અને રોગીના રોગનું નિવારણ કરવું.",
        [Language.HINDI]: "स्वस्थ व्यक्ति के स्वास्थ्य की रक्षा करना और रोगी के रोग का निवारण करना।"
      },
      date: dateStr
    };
  }
};

// 3D કે ક્લિનિકલ ઈમેજ બનાવવા માટે
export const generateAyurvedicImage = async (prompt: string): Promise<string | undefined> => {
  const ai = getAIClient();
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-1.5-flash-image',
      contents: {
        parts: [{ text: `High-quality, detailed, 3D anatomical and clinical illustration of: ${prompt}. Professional Ayurvedic medical educational style.` }],
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

// તહેવારોની થીમ માટે
export const checkFestiveTheme = async () => {
  const date = new Date();
  const day = date.getDate();
  const month = date.getMonth() + 1;
  if (month === 1 && day === 14) return { theme: 'kite', title: 'Makarsankranti' };
  if (month === 8 && day === 15) return { theme: 'independence', title: 'Independence Day' };
  if (month === 10 || month === 11) return { theme: 'festive', title: 'Deepavali Season' };
  return null;
};

// મુખ્ય વૈદ્યગુરુ ચેટ માટે
export const getVaidyaGuruResponse = async (
  prompt: string, 
  user: User,
  history: { role: 'user' | 'model'; parts: { text?: string; inlineData?: any }[] }[] = [],
  attachments: FilePart[] = [],
  useThinking: boolean = false
) => {
  const ai = getAIClient();
  const model = useThinking ? "gemini-1.5-flash" : "gemini-2.5-flash"; // મોડલ અપડેટ કર્યું
  const systemInstruction = getPersonaPrompt();

  const contents = [
    ...history, 
    { role: 'user', parts: [{ text: `User query: ${prompt}` }, ...attachments.map(att => ({ inlineData: { mimeType: att.mimeType, data: att.data } }))] }
  ];

  try {
    const response = await ai.models.generateContent({ model, contents, config: { systemInstruction, tools: [{ googleSearch: {} }] } });
    return { text: response.text || "હું આ ક્લિનિકલ ડેટા પર પ્રક્રિયા કરી રહ્યો છું.", grounding: response.candidates?.[0]?.groundingMetadata?.groundingChunks || [] };
  } catch (error: any) { throw error; }
};

// સ્ટડી ડેસ્ક (પીન કરેલા સોર્સ) માટે
export const getStudyDeskResponse = async (query: string, books: Book[], customSources: CustomSource[], user: User) => {
  const ai = getAIClient();
  const sources = books.map(b => b.title).join(", ");
  const systemInstruction = `You are an elite Ayurvedic Researcher. Answer based strictly on these pinned texts: (${sources}). Explain deeply with charts/diagrams structure if necessary. Use both English and Gujarati.`;
  try {
    const response = await ai.models.generateContent({
      model: "gemini-1.5-flash",
      contents: [{ role: 'user', parts: [{ text: query }] }],
      config: { systemInstruction }
    });
    return response.text || "સંશ્લેષણ ઉપલબ્ધ નથી.";
  } catch (error) { return "સંશ્લેષણ ઉપલબ્ધ નથી."; }
};

// પોડકાસ્ટ સ્ક્રિપ્ટ માટે
export const generatePodcastScript = async (books: Book[]) => {
  const ai = getAIClient();
  const sources = books.map(b => b.title).join(", ");
  const prompt = `Create an educational, deep Ayurvedic podcast dialogue script in English between two Acharyas discussing the core concepts of: ${sources}. Keep it profound and informative.`;
  try {
    const response = await ai.models.generateContent({ model: "gemini-2.5-flash", contents: [{ role: 'user', parts: [{ text: prompt }] }] });
    return response.text || "";
  } catch (error) { return ""; }
};

// ઓડિયો (Speech) જનરેટ કરવા માટે 
export const generateSpeech = async (text: string, voice: 'Kore' | 'Puck' = 'Kore') => {
  // નોંધ: Text-to-Speech API કોલ અહીં આવે છે
  throw new Error("Speech API requires specific Google Cloud setup. Currently running in text mode.");
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
