
import React, { useState, useRef, useEffect } from 'react';
import { Book, Language, Adhyaya, Sthana, Message } from '../types';
import { InterstitialAd, BannerAd, BannerAdSize, TestIds } from './BannerAd';
import { useAuth } from '../AuthContext';
import { getBookContextResponse } from '../geminiService';

interface BookReaderProps {
  book: Book;
  onClose: () => void;
}

type HighlightColor = 'yellow' | 'green' | 'blue';

export const BookReader: React.FC<BookReaderProps> = ({ book, onClose }) => {
  const { user } = useAuth();
  const [view, setView] = useState<'sthana' | 'adhyaya' | 'reader'>('sthana');
  const [selectedSthana, setSelectedSthana] = useState<Sthana | null>(null);
  const [currentAdhyaya, setCurrentAdhyaya] = useState<Adhyaya | null>(null);
  const [currentLanguage, setCurrentLanguage] = useState<Language>(user?.preferredLanguage || Language.ENGLISH);
  const [highlights, setHighlights] = useState<Map<number, HighlightColor>>(new Map());
  const [activeColor, setActiveColor] = useState<HighlightColor>('yellow');
  
  // AI Assistant State
  const [isAssistantOpen, setIsAssistantOpen] = useState(false);
  const [chatInput, setChatInput] = useState('');
  const [chatMessages, setChatMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages, isTyping]);

  const handleBack = () => {
    if (view === 'reader') {
        setView('adhyaya');
        setIsAssistantOpen(false);
        setChatMessages([]);
    } else if (view === 'adhyaya') {
      setView('sthana');
    } else {
      // Exit Book Logic - Show Interstitial Every 5th Time PER BOOK
      const closeCountKey = `vaidyaguru_book_close_count_${book.id}`;
      let count = parseInt(localStorage.getItem(closeCountKey) || '0', 10);
      count++;
      localStorage.setItem(closeCountKey, count.toString());

      if (count % 5 === 0) {
          InterstitialAd.show(() => {
              onClose();
          });
      } else {
          onClose();
      }
    }
  };

  const toggleHighlight = (idx: number) => {
    const next = new Map(highlights);
    if (next.has(idx) && next.get(idx) === activeColor) next.delete(idx);
    else next.set(idx, activeColor);
    setHighlights(next);
  };

  const getHighlightClass = (color?: HighlightColor) => {
    switch(color) {
      case 'yellow': return 'bg-yellow-200';
      case 'green': return 'bg-green-200';
      case 'blue': return 'bg-blue-200';
      default: return '';
    }
  };

  const handleAskAI = async () => {
    if (!chatInput.trim() || !currentAdhyaya || !user) return;

    const userMsg: Message = { role: 'user', content: chatInput, timestamp: Date.now() };
    setChatMessages(prev => [...prev, userMsg]);
    setChatInput('');
    setIsTyping(true);

    try {
      const response = await getBookContextResponse(chatInput, book, currentAdhyaya, user);
      const assistantMsg: Message = { role: 'assistant', content: response, timestamp: Date.now() };
      setChatMessages(prev => [...prev, assistantMsg]);
    } catch (e) {
      setChatMessages(prev => [...prev, { role: 'assistant', content: "Error connecting to wisdom base.", timestamp: Date.now() }]);
    } finally {
      setIsTyping(false);
    }
  };

  const toggleLanguage = () => {
    if (currentLanguage === Language.ENGLISH) setCurrentLanguage(Language.GUJARATI);
    else if (currentLanguage === Language.GUJARATI) setCurrentLanguage(Language.HINDI);
    else setCurrentLanguage(Language.ENGLISH);
  };

  return (
    <div className="fixed inset-0 bg-white z-[10000] flex flex-col overflow-hidden animate-in fade-in zoom-in duration-300">
      <header className="p-4 border-b flex justify-between items-center bg-white shadow-sm z-[10001]">
        <div className="flex items-center gap-2 md:gap-3 flex-1 min-w-0">
          <button onClick={handleBack} className="p-2 hover:bg-stone-100 rounded-full transition-colors text-stone-600 flex-shrink-0">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" /></svg>
          </button>
          <h2 className="text-sm font-bold text-stone-800 serif-font truncate">{book.title}</h2>
        </div>

        {view === 'reader' && (
          <div className="flex items-center gap-2 md:gap-4 flex-shrink-0">
            {/* Language Switcher */}
            <button onClick={toggleLanguage} className="px-3 py-1.5 bg-stone-100 rounded-lg text-xs font-bold text-stone-700 hover:bg-stone-200 border border-stone-200 flex items-center gap-1">
              <span>🌐</span>
              <span>{currentLanguage === Language.ENGLISH ? 'EN' : currentLanguage === Language.GUJARATI ? 'GU' : 'HI'}</span>
            </button>

            <div className="hidden sm:flex items-center gap-2 bg-stone-100 p-1 rounded-full">
              {(['yellow', 'green', 'blue'] as HighlightColor[]).map(c => (
                <button key={c} onClick={() => setActiveColor(c)} className={`w-6 h-6 rounded-full border-2 transition-all ${activeColor === c ? 'border-stone-800 scale-110 shadow-sm' : 'border-transparent opacity-50'} ${getHighlightClass(c)}`} />
              ))}
            </div>
            <button onClick={() => setIsAssistantOpen(!isAssistantOpen)} className={`p-2 rounded-xl flex items-center gap-2 transition-all ${isAssistantOpen ? 'bg-green-900 text-white shadow-md' : 'bg-green-50 text-green-800 hover:bg-green-100'}`}>
               <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" /></svg>
               <span className="text-xs font-bold hidden md:inline">Ask AI</span>
            </button>
          </div>
        )}

        <button onClick={onClose} className="p-2 text-stone-400 ml-2 flex-shrink-0"><svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" /></svg></button>
      </header>

      <div className="flex-1 flex overflow-hidden bg-stone-50">
        <div className={`flex-1 overflow-y-auto no-scrollbar transition-all duration-500 ${isAssistantOpen ? 'hidden lg:block' : 'block'}`}>
          {view === 'sthana' && (
            <div className="max-w-2xl mx-auto p-8 space-y-4">
              <BannerAd unitId={TestIds.BANNER} size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER} />
              {book.sthanas.map(s => (
                <button key={s.id} onClick={() => { setSelectedSthana(s); setView('adhyaya'); }} className="w-full p-6 bg-white rounded-3xl border shadow-sm hover:border-green-800 text-left transition-all active:scale-95">
                  <h4 className="font-bold text-stone-800">{s.title}</h4>
                  <p className="text-xs text-stone-400 mt-1">{s.adhyayas.length} Chapters</p>
                </button>
              ))}
            </div>
          )}

          {view === 'adhyaya' && selectedSthana && (
            <div className="max-w-2xl mx-auto p-8 space-y-3">
               <BannerAd unitId={TestIds.BANNER} size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER} />
               {selectedSthana.adhyayas.map(a => (
                 <button key={a.id} onClick={() => { setCurrentAdhyaya(a); setView('reader'); }} className="w-full p-5 bg-white rounded-2xl border flex items-center gap-4 hover:shadow-md transition-all text-left active:scale-95">
                    <div className="w-10 h-10 bg-stone-100 rounded-lg flex items-center justify-center font-black text-stone-400">{a.number}</div>
                    <h4 className="font-bold text-stone-800">{a.title}</h4>
                 </button>
               ))}
            </div>
          )}

          {view === 'reader' && currentAdhyaya && (
            <div className="max-w-2xl mx-auto px-6 py-10 md:py-16 pb-64">
              <div className="mb-10 text-center">
                <p className="text-[10px] text-green-900 font-black uppercase tracking-[0.4em] mb-2">Adhyaya {currentAdhyaya.number}</p>
                <h1 className="text-3xl font-bold text-stone-900 serif-font">{currentAdhyaya.title}</h1>
              </div>

              <article className="prose prose-stone max-w-none text-[#1a1a1a] leading-relaxed text-xl serif-font">
                {(currentAdhyaya.content[currentLanguage] || "Content not available in this language.").split('\n').map((line, idx) => (
                  <p key={idx} onClick={() => toggleHighlight(idx)} className={`mb-6 cursor-pointer transition-colors p-1 rounded ${highlights.has(idx) ? getHighlightClass(highlights.get(idx)) : 'hover:bg-stone-100'}`}>
                    {line}
                  </p>
                ))}
              </article>
              
              <div className="mt-12">
                 <BannerAd unitId={TestIds.BANNER} size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER} />
              </div>
            </div>
          )}
        </div>

        {/* AI Assistant Sidebar / Overlay */}
        {isAssistantOpen && (
          <div className="w-full lg:w-[400px] border-l bg-white flex flex-col animate-in slide-in-from-right duration-300 shadow-2xl z-[10002]">
             <div className="p-4 border-b bg-green-900 text-white flex justify-between items-center">
                <div className="flex items-center gap-3">
                   <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">🩺</div>
                   <h3 className="font-bold serif-font">VaidyaGuru Assistant</h3>
                </div>
                <button onClick={() => setIsAssistantOpen(false)} className="lg:hidden p-2"><svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg></button>
             </div>
             
             <div className="flex-1 overflow-y-auto p-4 space-y-4 no-scrollbar bg-stone-50">
                {chatMessages.length === 0 && (
                  <div className="h-full flex flex-col items-center justify-center text-center p-6 opacity-40">
                     <svg className="w-12 h-12 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
                     <p className="text-sm font-bold">Ask me anything about this chapter.</p>
                  </div>
                )}
                {chatMessages.map((m, i) => (
                  <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[90%] p-4 rounded-2xl text-sm shadow-sm ${m.role === 'user' ? 'bg-green-900 text-white rounded-tr-none' : 'bg-white border text-stone-800 rounded-tl-none'}`}>
                      {m.content}
                    </div>
                  </div>
                ))}
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-white border p-4 rounded-2xl rounded-tl-none shadow-sm flex gap-1">
                      <div className="w-1.5 h-1.5 bg-green-800 rounded-full animate-bounce"></div>
                      <div className="w-1.5 h-1.5 bg-green-800 rounded-full animate-bounce delay-75"></div>
                      <div className="w-1.5 h-1.5 bg-green-800 rounded-full animate-bounce delay-150"></div>
                    </div>
                  </div>
                )}
                <div ref={chatEndRef} />
             </div>

             <div className="p-4 border-t bg-white">
                <div className="flex gap-2 items-end bg-stone-100 p-2 rounded-2xl">
                   <textarea 
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), handleAskAI())}
                    placeholder="Type your question..."
                    rows={1}
                    className="flex-1 bg-transparent p-2 outline-none text-sm resize-none max-h-32"
                   />
                   <button onClick={handleAskAI} className="p-3 bg-green-900 text-white rounded-xl shadow-lg active:scale-95 transition-transform"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg></button>
                </div>
             </div>
          </div>
        )}
      </div>
    </div>
  );
};
