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
import { MaterialLibrary } from './components/MaterialLibrary'; // Import new component
import { MOCK_BOOKS } from './constants';
import { Book, User, CourseLevel, Language, Role, Gender, MedicalField, DailyQuote } from './types';
import { AuthProvider, useAuth } from './AuthContext';
import { BannerAd, BannerAdSize, TestIds, InterstitialAd, RewardedAd } from './components/BannerAd';
import { generateDailyQuote, checkFestiveTheme } from './geminiService';

// Text constants
const UI_TEXT = {
  [Language.ENGLISH]: {
    lib: "Library", guru: "VaidyaGuru", desk: "Study Desk", board: "Bulletin", exam: "Exams", 
    schedule: "Schedule", connect: "Connect", admin: "Admin", prof: "Profile", material: "Extra Material",
    privacyTitle: "Dedication & Terms", privacyAccept: "I Agree & Begin", back: "Back", finish: "Begin My Journey", selectRole: "Select Profession",
    selectGender: "Select Gender", selectField: "Medical Field", selectLevel: "Course Level", enterName: "Enter Your Name",
    searchPlaceholder: "Search Shastras..."
  },
  [Language.GUJARATI]: {
    lib: "પુસ્તકાલય", guru: "વૈદ્યગુરુ", desk: "અભ્યાસ ડેસ્ક", board: "નોટિસ બોર્ડ", exam: "પરીક્ષા", 
    schedule: "સમયપત્રક", connect: "સંપર્ક", admin: "એડમિન", prof: "પ્રોફાઇલ", material: "વધારાનું સાહિત્ય",
    privacyTitle: "સમર્પણ અને સુરક્ષા", privacyAccept: "હું સંમત છું", back: "પાછળ", finish: "મુસાફરી શરૂ કરો", selectRole: "વ્યવસાય પસંદ કરો",
    selectGender: "જાતિ પસંદ કરો", selectField: "ક્ષેત્ર પસંદ કરો", selectLevel: "લેવલ પસંદ કરો", enterName: "તમારું નામ લખો",
    searchPlaceholder: "શાસ્ત્રો શોધો..."
  },
  [Language.HINDI]: {
    lib: "पुस्तकालय", guru: "वैद्यगुरु", desk: "अध्ययन डेस्क", board: "नोटिस बोर्ड", exam: "परीक्षा", 
    schedule: "समय सारिणी", connect: "संपर्क", admin: "एडमिन", prof: "प्रोफाइल", material: "अतिरिक्त सामग्री",
    privacyTitle: "समर्पण और सुरक्षा", privacyAccept: "मैं सहमत हूँ", back: "पीछे", finish: "शुरू करें", selectRole: "पेशा चुनें",
    selectGender: "लिंग चुनें", selectField: "क्षेत्र चुनें", selectLevel: "स्तर चुनें", enterName: "अपना नाम दर्ज करें",
    searchPlaceholder: "शास्त्र खोजें..."
  }
};

const OnboardingFlow: React.FC = () => {
  const { updateProfile, login, user } = useAuth();
  const [step, setStep] = useState(0); 
  const [selectedLang, setSelectedLang] = useState<Language>(Language.ENGLISH);
  const [name, setName] = useState("");
  const [role, setRole] = useState<Role>(Role.STUDENT);
  const [gender, setGender] = useState<Gender>(Gender.MALE);
  const [field, setField] = useState<MedicalField>(MedicalField.BAMS);
  const [level, setLevel] = useState<CourseLevel>(CourseLevel.UG1);

  const t = UI_TEXT[selectedLang];

  const handleFinish = () => {
    updateProfile({
      role, gender, medicalField: field, courseLevel: level,
      isProfileComplete: true, agreedToPrivacy: true, preferredLanguage: selectedLang,
      socialLinks: { youtube: 'https://youtube.com/VaidyaGuru', facebook: 'https://facebook.com/VaidyaGuru' }
    });
  };

  const renderStep = () => {
    switch(step) {
      case 0: return (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-center serif-font">Select Language / ભાષા પસંદ કરો</h2>
          <div className="grid gap-4">
            <button onClick={() => { setSelectedLang(Language.ENGLISH); setStep(1); }} className="p-4 bg-white border-2 rounded-2xl hover:border-green-800 font-bold transition-all hover:shadow-lg">English</button>
            <button onClick={() => { setSelectedLang(Language.GUJARATI); setStep(1); }} className="p-4 bg-white border-2 rounded-2xl hover:border-green-800 font-bold transition-all hover:shadow-lg">ગુજરાતી</button>
            <button onClick={() => { setSelectedLang(Language.HINDI); setStep(1); }} className="p-4 bg-white border-2 rounded-2xl hover:border-green-800 font-bold transition-all hover:shadow-lg">हिन्दी</button>
          </div>
        </div>
      );
      case 1: return (
        <div className="space-y-6 text-center">
          <img src="assets/logo.png" className="w-20 h-20 mx-auto object-contain" alt="Logo" />
          <h2 className="text-2xl font-bold serif-font">VaidyaGuru Login</h2>
          <input 
            type="text" 
            placeholder={t.enterName}
            className="w-full p-4 border-2 rounded-2xl outline-none focus:border-green-800 font-bold bg-white"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button 
            onClick={() => { if(name.trim()) { login(selectedLang, { name }); setStep(2); } }} 
            className={`w-full p-4 bg-green-900 text-white rounded-2xl font-bold shadow-lg transition-all ${!name.trim() ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105'}`}
            disabled={!name.trim()}
          >
            Sign In
          </button>
        </div>
      );
      case 2: return (
        <div className="space-y-6">
          <h2 className="text-xl font-bold text-green-900 border-b pb-2 serif-font">{t.privacyTitle}</h2>
          <div className="p-6 bg-stone-50 border rounded-2xl text-stone-700 italic text-sm leading-relaxed max-h-60 overflow-y-auto">
            <p>VaidyaGuru is an educational companion designed to assist BAMS students and professionals.</p>
            <br/>
            <p>By using this app, you acknowledge that:</p>
            <ul className="list-disc ml-5 mt-2 space-y-1">
              <li>All clinical insights are for learning purposes only.</li>
              <li>This is not a substitute for professional medical advice.</li>
              <li>Your data is stored locally on your device.</li>
            </ul>
          </div>
          <button onClick={() => setStep(3)} className="w-full p-4 bg-green-900 text-white rounded-2xl font-bold shadow-lg hover:bg-green-800 transition-colors">{t.privacyAccept}</button>
        </div>
      );
      case 3: return (
        <div className="space-y-6">
          <h2 className="text-xl font-bold serif-font">{t.selectRole}</h2>
          <div className="grid gap-2 overflow-y-auto max-h-64 pr-2">
            {Object.values(Role).map(r => <button key={r} onClick={() => { setRole(r); setStep(4); }} className="p-3 bg-white border-2 rounded-xl text-left hover:border-green-800 font-bold transition-all hover:bg-green-50">{r}</button>)}
          </div>
        </div>
      );
      case 4: return (
        <div className="space-y-6">
          <h2 className="text-xl font-bold serif-font">{t.selectGender}</h2>
          <div className="grid grid-cols-2 gap-4">
            {Object.values(Gender).map(g => <button key={g} onClick={() => { setGender(g); if (role === Role.NORMAL) setStep(7); else setStep(5); }} className="p-4 bg-white border-2 rounded-2xl hover:border-green-800 font-bold transition-all hover:bg-green-50">{g}</button>)}
          </div>
        </div>
      );
      case 5: return (
        <div className="space-y-6">
          <h2 className="text-xl font-bold serif-font">{t.selectField}</h2>
          <div className="grid grid-cols-2 gap-3">
            {Object.values(MedicalField).filter(f => f !== MedicalField.GENERAL).map(f => <button key={f} onClick={() => { setField(f); setStep(6); }} className="p-4 bg-white border-2 rounded-xl hover:border-green-800 font-bold transition-all hover:bg-green-50">{f}</button>)}
          </div>
        </div>
      );
      case 6: return (
        <div className="space-y-6">
          <h2 className="text-xl font-bold serif-font">{t.selectLevel}</h2>
          <div className="grid gap-2 overflow-y-auto max-h-60">
            {Object.values(CourseLevel).map(l => <button key={l} onClick={() => { setLevel(l); setStep(7); }} className="p-3 bg-white border-2 rounded-xl hover:border-green-800 font-bold transition-all hover:bg-green-50">{l}</button>)}
          </div>
        </div>
      );
      case 7: return (
        <div className="space-y-6 text-center">
          <div className="w-24 h-24 bg-green-100 text-green-900 rounded-full flex items-center justify-center mx-auto shadow-inner animate-bounce"><svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg></div>
          <h2 className="text-2xl font-bold serif-font text-stone-800">Welcome, {user?.name}!</h2>
          <p className="text-stone-500">Your digital ancient wisdom awaits.</p>
          <button onClick={handleFinish} className="w-full p-4 bg-green-900 text-white rounded-xl font-bold shadow-lg hover:scale-105 transition-transform">{t.finish}</button>
        </div>
      );
      default: return null;
    }
  };

  return <div className="min-h-screen bg-stone-50 flex items-center justify-center p-6"><div className="w-full max-w-md bg-white rounded-[2.5rem] p-10 shadow-2xl border border-stone-100">{renderStep()}</div></div>;
};

const MainApp: React.FC = () => {
  const { user, loading: authLoading } = useAuth();
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  
  // Updated ActiveTab type to include new features
  const [activeTab, setActiveTab] = useState<'library' | 'guru' | 'desk' | 'board' | 'exam' | 'schedule' | 'connect' | 'admin' | 'profile' | 'material'>('library');
  
  const [search, setSearch] = useState('');
  const [quote, setQuote] = useState<DailyQuote | null>(null);
  const [festive, setFestive] = useState<{ theme: string, title: string } | null>(null);

  // Load dynamic content on startup
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

  // Handle Book Click with 2-Hour Unlock Logic
  const handleBookClick = (book: Book) => {
    const STORAGE_KEY_PREFIX = 'vaidyaguru_book_unlock_';
    const unlockKey = `${STORAGE_KEY_PREFIX}${book.id}`;
    const unlockedTime = localStorage.getItem(unlockKey);
    const now = Date.now();
    const TWO_HOURS = 2 * 60 * 60 * 1000;

    // Check if book is already unlocked and within valid time window
    if (unlockedTime && (now - parseInt(unlockedTime, 10) < TWO_HOURS)) {
      setSelectedBook(book);
    } else {
      // Show Rewarded Ad to unlock
      RewardedAd.show(() => {
        localStorage.setItem(unlockKey, now.toString());
        setSelectedBook(book);
      });
    }
  };

  if (authLoading) return <div className="min-h-screen flex items-center justify-center bg-stone-50"><div className="flex flex-col items-center gap-4"><div className="w-10 h-10 border-4 border-green-900 border-t-transparent rounded-full animate-spin"></div><p className="font-bold serif-font text-stone-500">Loading Wisdom...</p></div></div>;
  if (!user || !user.isProfileComplete) return <OnboardingFlow />;

  const t = UI_TEXT[user.preferredLanguage] || UI_TEXT[Language.ENGLISH];
  const filteredBooks = MOCK_BOOKS.filter(b => b.title.toLowerCase().includes(search.toLowerCase()));

  const isBAMS = user.medicalField === MedicalField.BAMS;
  const themeColor = isBAMS ? 'text-green-900 border-green-800' : 'text-blue-900 border-blue-800';
  const themeBg = isBAMS ? 'bg-green-900' : 'bg-blue-900';

  // Navigation Items
  const navItems = [
    { id: 'library', label: t.lib, icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /> },
    { id: 'material', label: t.material, icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 19a2 2 0 01-2-2V7a2 2 0 012-2h4l2 2h4a2 2 0 012 2v1M5 19h14a2 2 0 002-2v-5a2 2 0 00-2-2H9a2 2 0 00-2 2v5a2 2 0 01-2 2z" /> }, // New Icon for Material
    { id: 'guru', label: t.guru, icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" /> },
    { id: 'desk', label: t.desk, icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /> },
    { id: 'board', label: t.board, icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /> },
    { id: 'exam', label: t.exam, icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /> },
    { id: 'schedule', label: t.schedule, icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /> },
    { id: 'connect', label: t.connect, icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /> },
    { id: 'admin', label: t.admin, icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /> },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-stone-50 transition-colors duration-500">
      {/* Festive Banner */}
      {festive && (
        <div className="fixed top-0 left-0 right-0 z-[100] pointer-events-none p-4 flex justify-center">
           <div className="bg-amber-100/95 backdrop-blur px-6 py-2 rounded-full border border-amber-200 shadow-lg flex items-center gap-3 animate-in slide-in-from-top duration-500">
              <span className="text-xl">🪔</span>
              <span className="font-bold text-amber-900 text-xs md:text-sm">Celebrating: {festive.title}</span>
              <span className="text-xl">🪔</span>
           </div>
        </div>
      )}
      
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-md border-b p-4 sticky top-0 z-50 flex justify-between items-center shadow-sm">
        <div className="flex items-center gap-3">
          <img src="assets/logo.png" className="w-10 h-10 object-contain" alt="" />
          <h1 className={`font-bold serif-font text-xl hidden sm:block ${themeColor}`}>VaidyaGuru</h1>
        </div>
        
        {/* Desktop Navigation */}
        <div className="hidden lg:flex gap-2 overflow-x-auto no-scrollbar max-w-2xl">
          {navItems.map(item => (
            <button key={item.id} onClick={() => setActiveTab(item.id as any)} className={`text-[11px] font-black uppercase tracking-widest px-4 py-2 transition-all rounded-full whitespace-nowrap ${activeTab === item.id ? themeBg + ' text-white shadow-md' : 'text-stone-400 hover:bg-stone-100'}`}>
              {item.label}
            </button>
          ))}
          <button onClick={() => setActiveTab('profile')} className={`text-[11px] font-black uppercase tracking-widest px-4 py-2 transition-all rounded-full ${activeTab === 'profile' ? themeBg + ' text-white' : 'text-stone-400 hover:bg-stone-100'}`}>
            {t.prof}
          </button>
        </div>

        {/* Mobile Navigation - Scrollable List */}
        <div className="lg:hidden w-full overflow-x-auto no-scrollbar flex gap-2 pl-4">
            {navItems.map(item => (
              <button key={item.id} onClick={() => setActiveTab(item.id as any)} className={`flex-shrink-0 p-2 rounded-xl transition-all ${activeTab === item.id ? themeBg + ' text-white shadow-md' : 'text-stone-400 bg-stone-100'}`}>
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">{item.icon}</svg>
              </button>
            ))}
            <button onClick={() => setActiveTab('profile')} className={`flex-shrink-0 p-1 rounded-full border-2 transition-all ${activeTab === 'profile' ? (isBAMS ? 'border-green-800' : 'border-blue-800') : 'border-stone-200'}`}>
              <img src={user.profilePic} className="w-8 h-8 rounded-full object-cover" alt="" />
            </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl mx-auto w-full pb-32 overflow-y-auto no-scrollbar scroll-smooth">
        
        {activeTab === 'library' && (
          <div className="space-y-6 animate-in fade-in duration-500 pt-4">
            {/* Daily Quote Card */}
            {quote && (
              <div className={`${themeBg} text-white p-6 md:p-10 rounded-[2rem] md:rounded-[2.5rem] shadow-xl relative overflow-hidden group mx-4 transition-all hover:shadow-2xl`}>
                <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 blur-3xl rounded-full -mr-10 -mt-10"></div>
                <div className="absolute bottom-0 left-0 w-20 h-20 bg-white/5 blur-xl rounded-full -ml-5 -mb-5"></div>
                <p className="text-xl md:text-2xl font-bold mb-6 italic serif-font leading-relaxed relative z-10 drop-shadow-sm">"{quote.original}"</p>
                <div className="relative z-10 pl-4 border-l-4 border-white/30">
                   <p className="text-sm md:text-base font-medium opacity-90 leading-relaxed">{quote.translations[user.preferredLanguage] || quote.translations[Language.ENGLISH]}</p>
                </div>
                <div className="mt-6 flex gap-2 relative z-10">
                   {Object.keys(quote.translations).map(l => (
                     <span key={l} className="px-3 py-1 bg-white/10 rounded-full text-[9px] font-black uppercase tracking-widest">{l}</span>
                   ))}
                </div>
              </div>
            )}
            
            {/* Search Bar */}
            <div className="px-4 sticky top-0 z-40 py-2">
              <div className="relative">
                 <input type="text" placeholder={t.searchPlaceholder} className="w-full p-4 pl-12 rounded-[1.5rem] border-2 border-stone-100 outline-none focus:border-stone-400 shadow-sm bg-white/90 backdrop-blur font-medium transition-all focus:shadow-md" value={search} onChange={e => setSearch(e.target.value)} />
                 <svg className="w-5 h-5 text-stone-400 absolute left-4 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
              </div>
            </div>
            
            {/* Book Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 px-4 pb-24">
              {filteredBooks.map((book) => (
                <div key={book.id} onClick={() => handleBookClick(book)} className="bg-white rounded-[1.5rem] overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer border border-stone-100 group">
                  <div className="aspect-[3/4] overflow-hidden relative">
                    <img src={book.coverImage} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt={book.title} />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                       <span className="text-white text-xs font-bold">Read Now</span>
                    </div>
                  </div>
                  <div className="p-4">
                    <p className={`text-[9px] font-black uppercase tracking-widest mb-1 ${themeColor}`}>{book.subject}</p>
                    <h3 className="font-bold text-sm text-stone-800 line-clamp-2 serif-font leading-tight">{book.title}</h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {activeTab === 'guru' && <VaidyaGuru user={user} />}
        {activeTab === 'desk' && <StudyDesk user={user} />}
        {activeTab === 'board' && <BulletinBoard user={user} />}
        {activeTab === 'exam' && <ExamPortal user={user} />}
        {activeTab === 'schedule' && <Scheduler user={user} />}
        {activeTab === 'connect' && <DoctorConnect user={user} />}
        {activeTab === 'admin' && <AdminPanel user={user} />}
        {activeTab === 'material' && <MaterialLibrary user={user} />}
        {activeTab === 'profile' && <Profile />}
      </main>

      {/* Bottom Ad Banner */}
      <div className="fixed bottom-0 left-0 right-0 z-[60] bg-white border-t p-1 shadow-[0_-5px_15px_rgba(0,0,0,0.05)]">
        <BannerAd unitId={TestIds.BANNER} size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER} />
      </div>

      {/* Book Reader Overlay */}
      {selectedBook && <BookReader book={selectedBook} onClose={() => setSelectedBook(null)} />}
    </div>
  );
};

const App: React.FC = () => <AuthProvider><MainApp /></AuthProvider>;
export default App;
            
