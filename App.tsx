// આ ફાઈલ આપણી એપનું મુખ્ય પેજ (Main Entry Point) છે. 
// અહીંથી એપ શરૂ થાય છે અને બધા અલગ-અલગ પેજ અહીં દેખાય છે.

import React, { useState, useEffect } from 'react';
import { VaidyaGuru } from './components/VaidyaGuru';
import { BookReader } from './components/BookReader';
import { Profile } from './components/Profile';
import { StudyDesk } from './components/StudyDesk';
import { BulletinBoard } from './components/BulletinBoard';
import { ExamPortal } from './components/ExamPortal';
import { Scheduler } from './components/Scheduler';
import { AdminPanel } from './components/AdminPanel';
import { DoctorConnect } from './components/DoctorConnect';
import { MaterialLibrary } from './components/MaterialLibrary';
import PrivacyPolicy from './components/PrivacyPolicy';

import { MOCK_BOOKS } from './constants';
// નીચે મુજબના ટાઈપ્સ આપણે types.ts માંથી લાવીએ છીએ
import { Book, CourseLevel, Language, Role, Gender, MedicalField, DailyQuote } from './types';
import { AuthProvider, useAuth } from './AuthContext';
import { BannerAd, BannerAdSize, TestIds, RewardedAd } from './components/BannerAd';
import { generateDailyQuote, checkFestiveTheme } from './geminiService';

// અહીં આપણે ભાષા મુજબના અલગ-અલગ શબ્દો (Dictionary) બનાવ્યા છે.
// યુઝર જે ભાષા પસંદ કરશે, તે મુજબ આ શબ્દો સ્ક્રીન પર દેખાશે.
const UI_TEXT = {
  [Language.ENGLISH]: {
    lib: "Library", guru: "VaidyaGuru", desk: "Study Desk", board: "Bulletin", exam: "Exams", 
    schedule: "Schedule", connect: "Connect", admin: "Admin", prof: "Profile", material: "Extra Material",
    privacyTitle: "Dedication & Terms", privacyAccept: "I Agree & Begin", back: "Back", finish: "Begin My Journey", 
    selectRole: "Select Profession", selectGender: "Select Gender", enterName: "Enter Your Name",
    searchPlaceholder: "Search Shastras...", 
    roleScholar: "Ayurveda Scholar (Student/Teacher)", roleNormal: "Normal Person"
  },
  [Language.GUJARATI]: {
    lib: "પુસ્તકાલય", guru: "વૈદ્યગુરુ", desk: "અભ્યાસ ડેસ્ક", board: "નોટિસ બોર્ડ", exam: "પરીક્ષા", 
    schedule: "સમયપત્રક", connect: "સંપર્ક", admin: "એડમિન", prof: "પ્રોફાઇલ", material: "વધારાનું સાહિત્ય",
    privacyTitle: "સમર્પણ અને સુરક્ષા", privacyAccept: "હું સંમત છું", back: "પાછળ", finish: "મુસાફરી શરૂ કરો", 
    selectRole: "વ્યવસાય પસંદ કરો", selectGender: "જાતિ પસંદ કરો", enterName: "તમારું નામ લખો",
    searchPlaceholder: "શાસ્ત્રો શોધો...",
    roleScholar: "આયુર્વેદ અધ્યેતા (વિદ્યાર્થી/શિક્ષક)", roleNormal: "સામાન્ય વ્યક્તિ"
  },
  [Language.HINDI]: {
    lib: "पुस्तकालय", guru: "वैद्यगुरु", desk: "अध्ययन डेस्क", board: "नोटिस बोर्ड", exam: "परीक्षा", 
    schedule: "समय सारिणी", connect: "संपर्क", admin: "एडमिन", prof: "प्रोफाइल", material: "अतिरिक्त सामग्री",
    privacyTitle: "समर्पण और सुरक्षा", privacyAccept: "मैं सहमत हूँ", back: "पीछे", finish: "शुरू करें", 
    selectRole: "पेशा चुनें", selectGender: "लिंग चुनें", enterName: "अपना नाम दर्ज करें",
    searchPlaceholder: "शास्त्र खोजें...",
    roleScholar: "आयुर्वेद अध्येता (छात्र/शिक्षक)", roleNormal: "सामान्य व्यक्ति"
  }
};

// ==========================================
// OnboardingFlow કમ્પોનન્ટ: જ્યારે યુઝર પહેલીવાર એપ ખોલે ત્યારે આ સ્ક્રીન દેખાશે.
// ==========================================
const OnboardingFlow: React.FC = () => {
  const { updateProfile, login, user } = useAuth(); // AuthContext માંથી યુઝરનો ડેટા લાવ્યા
  const [step, setStep] = useState(0); // કયું સ્ટેપ ચાલે છે તે યાદ રાખવા માટે (0 થી 5)
  const [selectedLang, setSelectedLang] = useState<Language>(Language.ENGLISH);
  const [name, setName] = useState("");
  const [role, setRole] = useState<Role>(Role.STUDENT); // ડીફોલ્ટ રોલ
  const [gender, setGender] = useState<Gender>(Gender.MALE); // ડીફોલ્ટ જાતિ

  // પસંદ કરેલી ભાષા મુજબ ટેક્સ્ટ સેટ કરીશું
  const t = UI_TEXT[selectedLang];

  // જ્યારે બધી માહિતી ભરાઈ જાય ત્યારે પ્રોફાઈલ સેવ કરવા માટેનું ફંક્શન
  const handleFinish = () => {
    updateProfile({
      role, 
      gender, 
      medicalField: MedicalField.BAMS, // એપ ક્રેશ ન થાય તે માટે બેકગ્રાઉન્ડમાં BAMS ફિક્સ કરી દીધું
      courseLevel: CourseLevel.UG1,    // ડીફોલ્ટ લેવલ
      isProfileComplete: true, 
      agreedToPrivacy: true, 
      preferredLanguage: selectedLang,
      socialLinks: { youtube: 'https://youtube.com/VaidyaGuru', facebook: 'https://facebook.com/VaidyaGuru' }
    });
  };

  // અલગ-અલગ સ્ટેપ (પેજ) બતાવવા માટેનું ફંક્શન
  const renderStep = () => {
    switch(step) {
      case 0: // સ્ટેપ 0: ભાષા પસંદગી
        return (
          <div className="space-y-6 animate-in zoom-in duration-500">
            <h2 className="text-3xl font-bold text-center text-green-900 serif-font drop-shadow-sm">ભાષા પસંદ કરો<br/><span className="text-xl text-stone-500">Select Language</span></h2>
            <div className="grid gap-4 mt-8">
              {/* અહીં મોડર્ન ગ્લાસ-ઇફેક્ટ અને હોવર એનિમેશન આપ્યું છે */}
              <button onClick={() => { setSelectedLang(Language.ENGLISH); setStep(1); }} className="p-5 bg-white/80 backdrop-blur-md border border-stone-200 rounded-[2rem] hover:bg-green-50 hover:border-green-600 font-bold text-lg transition-all hover:shadow-xl hover:-translate-y-1">English</button>
              <button onClick={() => { setSelectedLang(Language.GUJARATI); setStep(1); }} className="p-5 bg-white/80 backdrop-blur-md border border-stone-200 rounded-[2rem] hover:bg-green-50 hover:border-green-600 font-bold text-lg transition-all hover:shadow-xl hover:-translate-y-1">ગુજરાતી</button>
              <button onClick={() => { setSelectedLang(Language.HINDI); setStep(1); }} className="p-5 bg-white/80 backdrop-blur-md border border-stone-200 rounded-[2rem] hover:bg-green-50 hover:border-green-600 font-bold text-lg transition-all hover:shadow-xl hover:-translate-y-1">हिन्दी</button>
            </div>
          </div>
        );
      case 1: // સ્ટેપ 1: નામ લખો
        return (
          <div className="space-y-6 text-center animate-in slide-in-from-right duration-500">
            <div className="w-24 h-24 mx-auto bg-gradient-to-tr from-green-800 to-green-600 rounded-full p-1 shadow-2xl">
               <img src="assets/logo.png" className="w-full h-full object-cover rounded-full border-4 border-white" alt="Logo" />
            </div>
            <h2 className="text-2xl font-bold serif-font text-stone-800">{t.enterName}</h2>
            {/* નામ ટાઈપ કરવા માટેનું ઇનપુટ બોક્સ */}
            <input 
              type="text" 
              placeholder={t.enterName}
              className="w-full p-5 border-2 border-stone-100 rounded-[2rem] outline-none focus:border-green-600 font-bold bg-white/50 backdrop-blur shadow-inner text-center text-xl transition-all"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <button 
              onClick={() => { if(name.trim()) { login(selectedLang, { name }); setStep(2); } }} 
              className={`w-full p-5 bg-gradient-to-r from-green-900 to-green-700 text-white rounded-[2rem] font-bold text-lg shadow-xl transition-all ${!name.trim() ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-2xl hover:scale-105'}`}
              disabled={!name.trim()}
            >
              Next ➔
            </button>
          </div>
        );
      case 2: // સ્ટેપ 2: પ્રાઇવસી પોલિસી
        return (
          <div className="space-y-6 animate-in slide-in-from-right duration-500">
            <h2 className="text-2xl font-bold text-green-900 border-b-2 border-green-100 pb-3 serif-font">{t.privacyTitle}</h2>
            <div className="p-6 bg-white/60 backdrop-blur-sm border border-stone-100 rounded-[2rem] text-stone-700 font-medium text-sm leading-relaxed max-h-60 overflow-y-auto shadow-inner">
              <p>VaidyaGuru is an educational companion designed strictly for BAMS students, teachers, and Ayurveda enthusiasts.</p>
              <br/>
              <p>By using this app, you acknowledge that:</p>
              <ul className="list-disc ml-5 mt-3 space-y-2">
                <li>All clinical insights and Shlokas are for learning purposes only.</li>
                <li>This is <b>not</b> a substitute for professional medical advice.</li>
                <li>Your data is stored locally on your device for privacy.</li>
              </ul>
            </div>
            <button onClick={() => setStep(3)} className="w-full p-5 bg-gradient-to-r from-green-900 to-green-700 text-white rounded-[2rem] font-bold text-lg shadow-xl hover:scale-105 transition-all">{t.privacyAccept}</button>
          </div>
        );
      case 3: // સ્ટેપ 3: વ્યવસાય પસંદ કરો (રોલ)
        return (
          <div className="space-y-6 animate-in slide-in-from-right duration-500">
            <h2 className="text-2xl font-bold serif-font text-center text-stone-800">{t.selectRole}</h2>
            <div className="grid gap-4 mt-6">
              {/* અહીં આપણે BAMS ને લગતા બે જ ઓપ્શન આપ્યા છે */}
              <button onClick={() => { setRole(Role.STUDENT); setStep(4); }} className="p-5 bg-white/80 backdrop-blur-md border border-stone-200 rounded-[2rem] hover:border-green-600 hover:bg-green-50 font-bold text-lg transition-all shadow-sm hover:shadow-xl hover:-translate-y-1">{t.roleScholar}</button>
              <button onClick={() => { setRole(Role.NORMAL); setStep(4); }} className="p-5 bg-white/80 backdrop-blur-md border border-stone-200 rounded-[2rem] hover:border-green-600 hover:bg-green-50 font-bold text-lg transition-all shadow-sm hover:shadow-xl hover:-translate-y-1">{t.roleNormal}</button>
            </div>
          </div>
        );
      case 4: // સ્ટેપ 4: જાતિ પસંદ કરો
        return (
          <div className="space-y-6 animate-in slide-in-from-right duration-500">
            <h2 className="text-2xl font-bold serif-font text-center text-stone-800">{t.selectGender}</h2>
            <div className="grid grid-cols-2 gap-4 mt-6">
              {Object.values(Gender).map(g => (
                <button key={g} onClick={() => { setGender(g); setStep(5); }} className="p-6 bg-white/80 backdrop-blur-md border border-stone-200 rounded-[2rem] hover:border-green-600 hover:bg-green-50 font-bold text-xl transition-all shadow-sm hover:shadow-xl hover:-translate-y-1 flex flex-col items-center gap-3">
                  <span className="text-4xl">{g === Gender.MALE ? '👨‍⚕️' : '👩‍⚕️'}</span>
                  <span>{g === Gender.MALE ? (selectedLang === Language.GUJARATI ? 'પુરુષ' : g) : (selectedLang === Language.GUJARATI ? 'સ્ત્રી' : g)}</span>
                </button>
              ))}
            </div>
          </div>
        );
      case 5: // સ્ટેપ 5: સ્વાગત સ્ક્રીન
        return (
          <div className="space-y-8 text-center animate-in zoom-in duration-700">
            <div className="w-28 h-28 bg-green-100 text-green-900 rounded-[2.5rem] flex items-center justify-center mx-auto shadow-inner animate-bounce rotate-3">
               <svg className="w-14 h-14" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>
            </div>
            <div>
               <h2 className="text-3xl font-bold serif-font text-stone-800 mb-2">Welcome, {user?.name}!</h2>
               <p className="text-stone-500 font-medium">Your digital ancient wisdom awaits.</p>
            </div>
            {/* આ ફાઈનલ બટન છે, જે દબાવવાથી મુખ્ય એપ શરૂ થશે */}
            <button onClick={handleFinish} className="w-full p-5 bg-gradient-to-r from-green-900 to-green-700 text-white rounded-[2rem] font-bold text-lg shadow-[0_10px_25px_-5px_rgba(20,83,45,0.5)] hover:scale-105 transition-transform">{t.finish}</button>
          </div>
        );
      default: return null;
    }
  };

  // મોડર્ન બેકગ્રાઉન્ડ માટેની સ્ટાઈલ
  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-br from-[#f8f5f0] to-[#e6f0e9] overflow-hidden relative">
      {/* બેકગ્રાઉન્ડમાં બ્લર થયેલા ગોળ આકારો (Modern UI Design) */}
      <div className="absolute top-10 left-10 w-64 h-64 bg-green-200/40 rounded-full blur-3xl mix-blend-multiply"></div>
      <div className="absolute bottom-10 right-10 w-72 h-72 bg-amber-200/40 rounded-full blur-3xl mix-blend-multiply"></div>
      
      {/* મુખ્ય સફેદ કાર્ડ જ્યાં બધું દેખાશે */}
      <div className="w-full max-w-md bg-white/70 backdrop-blur-xl rounded-[3rem] p-10 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.1)] border border-white/50 relative z-10">
         {renderStep()}
      </div>
    </div>
  );
};

// ==========================================
// MainApp કમ્પોનન્ટ: એપની મુખ્ય સ્ક્રીન જ્યાં લાઈબ્રેરી, ડેસ્ક વગેરે છે.
// ==========================================
const MainApp: React.FC = () => {
  const { user, loading: authLoading } = useAuth();
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  
  // કયું ટેબ (Tab) ચાલુ છે તે નક્કી કરવા માટે
  const [activeTab, setActiveTab] = useState<'library' | 'guru' | 'desk' | 'board' | 'exam' | 'schedule' | 'connect' | 'admin' | 'profile' | 'material'>('library');
  
  const [search, setSearch] = useState('');
  const [quote, setQuote] = useState<DailyQuote | null>(null);
  const [festive, setFestive] = useState<{ theme: string, title: string } | null>(null);

  // એપ ચાલુ થાય ત્યારે સુવિચાર અને તહેવારની માહિતી લાવવા માટે
  useEffect(() => {
    if (user && user.isProfileComplete) {
      generateDailyQuote(user.medicalField)
        .then(q => setQuote(q))
        .catch(e => console.error("Quote error", e));
      checkFestiveTheme()
        .then(f => setFestive(f))
        .catch(e => console.error("Festive error", e));
    }
  }, [user]);

  // પુસ્તક ખોલવા માટેનું ફંક્શન (જાહેરાત સાથે)
  const handleBookClick = (book: Book) => {
    const GLOBAL_UNLOCK_KEY = 'vaidyaguru_global_books_unlocked_timestamp';
    const unlockedTime = localStorage.getItem(GLOBAL_UNLOCK_KEY);
    const now = Date.now();
    const THREE_HOURS = 3 * 60 * 60 * 1000; 

    if (unlockedTime && (now - parseInt(unlockedTime, 10) < THREE_HOURS)) {
      setSelectedBook(book);
    } else {
      RewardedAd.show(() => {
        localStorage.setItem(GLOBAL_UNLOCK_KEY, now.toString());
        setSelectedBook(book);
      });
    }
  };

  // જો ડેટા લોડ થતો હોય તો લોડિંગ સ્ક્રીન બતાવો
  if (authLoading) return <div className="min-h-screen flex items-center justify-center bg-stone-50"><div className="flex flex-col items-center gap-4"><div className="w-12 h-12 border-4 border-green-900 border-t-transparent rounded-full animate-spin"></div><p className="font-bold serif-font text-stone-500">Loading Wisdom...</p></div></div>;
  
  // જો પ્રોફાઈલ પૂરી ન હોય તો OnboardingFlow બતાવો
  if (!user || !user.isProfileComplete) return <OnboardingFlow />;

  const t = UI_TEXT[user.preferredLanguage] || UI_TEXT[Language.ENGLISH];
  const filteredBooks = MOCK_BOOKS.filter(b => b.title.toLowerCase().includes(search.toLowerCase()));

  // થીમ કલર (હવે બધું BAMS એટલે કે લીલા રંગનું જ રહેશે)
  const themeColor = 'text-green-900 border-green-800';
  const themeBg = 'bg-gradient-to-r from-green-900 to-green-800';

  // નેવિગેશન માટેના બટનો
  const navItems = [
    { id: 'library', label: t.lib, icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /> },
    { id: 'material', label: t.material, icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 19a2 2 0 01-2-2V7a2 2 0 012-2h4l2 2h4a2 2 0 012 2v1M5 19h14a2 2 0 002-2v-5a2 2 0 00-2-2H9a2 2 0 00-2 2v5a2 2 0 01-2 2z" /> }, 
    { id: 'guru', label: t.guru, icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" /> },
    { id: 'desk', label: t.desk, icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /> },
    { id: 'board', label: t.board, icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /> },
    { id: 'exam', label: t.exam, icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /> },
    { id: 'schedule', label: t.schedule, icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /> },
    { id: 'connect', label: t.connect, icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /> },
    { id: 'admin', label: t.admin, icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /> },
    { id: 'privacy', label: "Privacy", icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /> },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#f8f5f0] transition-colors duration-500">
      
      {/* હેડર (ઉપરનો ભાગ) મોડર્ન અને ગ્લાસ ઇફેક્ટ વાળું */}
      <header className="bg-white/80 backdrop-blur-xl border-b border-stone-200/50 p-4 sticky top-0 z-50 flex justify-between items-center shadow-sm">
        <div className="flex items-center gap-3">
          <img src="assets/logo.png" className="w-10 h-10 object-contain drop-shadow-md" alt="Logo" />
          <h1 className={`font-bold serif-font text-2xl hidden sm:block ${themeColor}`}>VaidyaGuru</h1>
        </div>
        
        {/* મોબાઈલ નેવિગેશન - નીચેની તરફ સ્લાઈડ થતું લિસ્ટ */}
        <div className="lg:hidden w-full overflow-x-auto no-scrollbar flex gap-3 pl-4">
            {navItems.map(item => (
              <button key={item.id} onClick={() => setActiveTab(item.id as any)} className={`flex-shrink-0 p-3 rounded-[1.2rem] transition-all ${activeTab === item.id ? themeBg + ' text-white shadow-lg scale-105' : 'text-stone-500 bg-white border border-stone-200 shadow-sm'}`}>
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">{item.icon}</svg>
              </button>
            ))}
            <button onClick={() => setActiveTab('profile')} className={`flex-shrink-0 p-1 rounded-full border-2 transition-all shadow-sm ${activeTab === 'profile' ? 'border-green-600 scale-105' : 'border-stone-200'}`}>
              <img src={user.profilePic} className="w-10 h-10 rounded-full object-cover" alt="Profile" />
            </button>
        </div>
      </header>

      {/* મુખ્ય કન્ટેન્ટ એરિયા */}
      <main className="flex-1 max-w-7xl mx-auto w-full pb-32 overflow-y-auto no-scrollbar scroll-smooth">
        
        {/* જો લાઈબ્રેરી ટેબ ચાલુ હોય તો આ દેખાશે */}
        {activeTab === 'library' && (
          <div className="space-y-6 animate-in fade-in duration-500 pt-6">
            
            {/* સુવિચારનું કાર્ડ (મોડર્ન 3D લુક) */}
            {quote && (
              <div className={`${themeBg} text-white p-8 md:p-10 rounded-[2.5rem] shadow-[0_20px_40px_-15px_rgba(20,83,45,0.6)] relative overflow-hidden group mx-4 transition-all hover:-translate-y-2`}>
                <div className="absolute top-0 right-0 w-48 h-48 bg-white/20 blur-3xl rounded-full -mr-10 -mt-10"></div>
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-black/10 blur-2xl rounded-full -ml-5 -mb-5"></div>
                <p className="text-2xl md:text-3xl font-bold mb-6 italic serif-font leading-relaxed relative z-10 drop-shadow-md">"{quote.original}"</p>
                <div className="relative z-10 pl-5 border-l-4 border-amber-400">
                   <p className="text-base md:text-lg font-medium opacity-95 leading-relaxed">{quote.translations[user.preferredLanguage] || quote.translations[Language.ENGLISH]}</p>
                </div>
              </div>
            )}
            
            {/* સર્ચ બાર */}
            <div className="px-4 sticky top-[72px] z-40 py-2">
              <div className="relative">
                 <input type="text" placeholder={t.searchPlaceholder} className="w-full p-5 pl-14 rounded-[2rem] border-2 border-transparent outline-none focus:border-green-600 shadow-[0_8px_30px_rgb(0,0,0,0.04)] bg-white/80 backdrop-blur-xl font-medium text-lg transition-all focus:shadow-lg" value={search} onChange={e => setSearch(e.target.value)} />
                 <svg className="w-6 h-6 text-stone-400 absolute left-5 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
              </div>
            </div>
            
            {/* પુસ્તકોનું લિસ્ટ */}
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6 px-4 pb-24 mt-4">
              {filteredBooks.map((book) => (
                <div key={book.id} onClick={() => handleBookClick(book)} className="bg-white rounded-[2rem] overflow-hidden shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all cursor-pointer border border-stone-100 group relative">
                  <div className="aspect-[3/4] overflow-hidden relative">
                    <img src={book.coverImage} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={book.title} />
                    <div className="absolute inset-0 bg-gradient-to-t from-green-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-5">
                       <span className="text-white text-sm font-bold uppercase tracking-widest bg-white/20 backdrop-blur px-3 py-1 rounded-full">Read Book</span>
                    </div>
                  </div>
                  <div className="p-5">
                    <p className={`text-[10px] font-black uppercase tracking-widest mb-1 ${themeColor}`}>{book.subject}</p>
                    <h3 className="font-bold text-base text-stone-800 line-clamp-2 serif-font leading-snug">{book.title}</h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* અહીં બીજા પેજ કનેક્ટ કરેલા છે */}
        {activeTab === 'guru' && <VaidyaGuru user={user} />}
        {activeTab === 'desk' && <StudyDesk user={user} />}
        {activeTab === 'board' && <BulletinBoard user={user} />}
        {activeTab === 'exam' && <ExamPortal user={user} />}
        {activeTab === 'schedule' && <Scheduler user={user} />}
        {activeTab === 'connect' && <DoctorConnect user={user} />}
        {activeTab === 'admin' && <AdminPanel user={user} />}
        {activeTab === 'material' && <MaterialLibrary user={user} />}
        {activeTab === 'profile' && <Profile />}
        {activeTab === 'privacy' && <PrivacyPolicy />}
        
      </main>

      {/* નીચેની તરફ જાહેરાત બતાવવા માટે */}
      <div className="fixed bottom-0 left-0 right-0 z-[60] bg-white/90 backdrop-blur-md border-t border-stone-200/50 p-1 shadow-[0_-10px_30px_rgba(0,0,0,0.05)]">
        <BannerAd unitId={TestIds.BANNER} size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER} />
      </div>

      {selectedBook && <BookReader book={selectedBook} onClose={() => setSelectedBook(null)} />}
    </div>
  );
};

// ==========================================
// મુખ્ય એપને શરૂ કરવા માટે
// ==========================================
// અહીં આપણે LandingPage ને ઈમ્પોર્ટ કરીશું
import { LandingPage } from './src/pages/LandingPage';

const App: React.FC = () => {
  // એપ શરૂ થાય ત્યારે લેન્ડિંગ પેજ બતાવવું કે નહીં તે નક્કી કરવા માટે
  const [showLanding, setShowLanding] = useState(true);

  return (
    <AuthProvider>
      {showLanding ? (
        <LandingPage onEnterApp={() => setShowLanding(false)} />
      ) : (
        <MainApp />
      )}
    </AuthProvider>
  );
};

export default App;

