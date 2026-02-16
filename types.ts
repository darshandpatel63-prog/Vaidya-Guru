export enum Language {
  GUJARATI = 'gu',
  ENGLISH = 'en',
  HINDI = 'hi'
}

export enum Gender {
  MALE = 'Male',
  FEMALE = 'Female'
}

export enum Role {
  STUDENT = 'Student',
  PROFESSOR = 'Professor',
  TEACHER = 'Teacher',
  DOCTOR = 'Doctor',
  PATIENT = 'Patient',
  NORMAL = 'Normal Person'
}

export enum MedicalField {
  MBBS = 'MBBS',
  BDS = 'BDS',
  BAMS = 'BAMS',
  BHMS = 'BHMS',
  NURSING = 'Nursing',
  PT = 'Physiotherapy',
  PHARMACY = 'Pharmacy',
  GENERAL = 'General Health'
}

export enum CourseLevel {
  UG1 = '1st Year',
  UG2 = '2nd Year',
  UG3 = '3rd Year',
  UG4 = '4th Year',
  INTERN = 'Internship',
  MD = 'Post Graduate (MD/MS)',
  PHD = 'PhD / Research',
  NA = 'Not Applicable',
  COMING_SOON = 'Coming Soon'
}

export interface Adhyaya {
  id: string;
  number: number;
  title: string;
  content: {
    [key in Language]?: string;
  };
  wordMeanings?: string;
}

export interface Sthana {
  id: string;
  title: string;
  adhyayas: Adhyaya[];
}

export interface Book {
  id: string;
  title: string;
  author: string;
  subject: string;
  level: CourseLevel | 'General' | 'Coming Soon';
  language: Language;
  coverImage: string;
  sthanas: Sthana[];
}

export interface CustomSource {
  id: string;
  title: string;
  type: 'pdf' | 'image';
  data: string; // Base64
}

export interface User {
  id: string;
  name: string;
  email: string;
  profilePic: string;
  role: Role;
  gender: Gender;
  medicalField: MedicalField;
  courseLevel: CourseLevel;
  preferredLanguage: Language;
  isProfileComplete: boolean;
  agreedToPrivacy: boolean;
  socialLinks?: {
    youtube?: string;
    facebook?: string;
  };
}

export interface FilePart {
  mimeType: string;
  data: string;
}

export interface Message {
  role: 'user' | 'assistant';
  content: string;
  attachments?: FilePart[];
  grounding?: any[];
  timestamp: number;
}

export interface ChatSession {
  id: string;
  title: string;
  messages: Message[];
  lastModified: number;
}

export interface Notice {
  id: string;
  title: string;
  content: string;
  type: 'public' | 'private';
  attachment?: string;
  attachmentType?: 'image' | 'pdf';
  author: string;
  timestamp: number;
  pinnedPosition: { x: number; y: number };
}

export interface Question {
  id: string;
  text: string;
  options: string[];
  correctAnswer: number;
}

export interface Exam {
  id: string;
  title: string;
  subject: string;
  durationMinutes: number;
  questions: Question[];
  createdBy: string;
  createdAt: number;
  results?: { [userId: string]: number };
}

export interface DailyQuote {
  original: string;
  translations: { [key in Language]: string };
  date: string; // YYYY-MM-DD
}

// New Types for Extra Material
export type MaterialType = 'video' | 'photo' | 'ppt' | 'pdf';

export interface StudyMaterial {
  id: string;
  title: string;
  subject: string;
  type: MaterialType;
  url: string; // External Link (Drive/YouTube)
  thumbnail?: string;
  description?: string;
}
