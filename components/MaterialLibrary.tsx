import React, { useState } from 'react';
import { MOCK_MATERIALS } from '../constants';
import { MaterialType, StudyMaterial, User, Language } from '../types';
import { InterstitialAd, RewardedAd, BannerAd, BannerAdSize, TestIds } from './BannerAd';

export const MaterialLibrary: React.FC<{ user: User }> = ({ user }) => {
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  const [selectedType, setSelectedType] = useState<MaterialType | null>(null);

  // Get Unique Subjects
  const subjects = Array.from(new Set(MOCK_MATERIALS.map(m => m.subject)));

  // UI Text based on Language
  const TEXT = {
    [Language.ENGLISH]: {
      title: "Extra Study Material",
      desc: "Curated videos, notes, and diagrams for deep learning.",
      selectSub: "Select Subject",
      selectType: "Select Content Type",
      back: "Back",
      open: "Open",
      noData: "No materials added for this category yet."
    },
    [Language.GUJARATI]: {
      title: "વધારાનું સાહિત્ય",
      desc: "ઊંડા અભ્યાસ માટે વિડિઓઝ, નોટ્સ અને આકૃતિઓ.",
      selectSub: "વિષય પસંદ કરો",
      selectType: "પ્રકાર પસંદ કરો",
      back: "પાછળ",
      open: "ખોલો",
      noData: "આ કેટેગરી માટે હજુ સુધી કોઈ સાહિત્ય નથી."
    },
    [Language.HINDI]: {
      title: "अतिरिक्त अध्ययन सामग्री",
      desc: "गहन अध्ययन के लिए वीडियो, नोट्स और चित्र।",
      selectSub: "विषय चुनें",
      selectType: "सामग्री प्रकार चुनें",
      back: "पीछे",
      open: "खोलें",
      noData: "इस श्रेणी के लिए अभी तक कोई सामग्री नहीं है।"
    }
  };

  const t = TEXT[user.preferredLanguage || Language.ENGLISH];

  // Helper to filter materials
  const filteredMaterials = MOCK_MATERIALS.filter(m => 
    m.subject === selectedSubject && m.type === selectedType
  );

  const getIcon = (type: MaterialType) => {
    switch(type) {
      case 'video': return '🎥';
      case 'pdf': return '📄';
      case 'ppt': return '📊';
      case 'photo': return '🖼️';
      default: return '📁';
    }
  };

  const getLabel = (type: MaterialType) => {
    switch(type) {
      case 'video': return 'Videos';
      case 'pdf': return 'PDF Notes';
      case 'ppt': return 'Presentations';
      case 'photo': return 'Diagrams/Images';
      default: return '';
    }
  };

  const openLink = (url: string) => {
    // GLOBAL unlock key for ALL materials
    const GLOBAL_MAT_KEY = 'vaidyaguru_global_material_unlock';
    const unlockedTime = localStorage.getItem(GLOBAL_MAT_KEY);
    const now = Date.now();
    const ONE_POINT_FIVE_HOURS = 1.5 * 60 * 60 * 1000; // 1.5 hours

    if (unlockedTime && (now - parseInt(unlockedTime, 10) < ONE_POINT_FIVE_HOURS)) {
       window.open(url, '_blank');
    } else {
       RewardedAd.show(() => {
          localStorage.setItem(GLOBAL_MAT_KEY, now.toString());
          window.open(url, '_blank');
       });
    }
  };

  // 1. View: Subject Selection
  if (!selectedSubject) {
    return (
      <div className="p-6">
        <BannerAd unitId={TestIds.BANNER} size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER} />
        <h2 className="text-3xl font-bold serif-font text-stone-800 mb-2 mt-4">{t.title}</h2>
        <p className="text-stone-500 mb-8">{t.desc}</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {subjects.map(sub => (
            <button 
              key={sub} 
              onClick={() => {
                InterstitialAd.show(() => setSelectedSubject(sub));
              }}
              className="bg-white p-6 rounded-[2rem] border border-stone-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all text-left group"
            >
              <div className="w-12 h-12 bg-amber-50 rounded-full flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform">
                📚
              </div>
              <h3 className="text-xl font-bold text-stone-800">{sub}</h3>
              <p className="text-xs text-stone-400 mt-2 font-bold uppercase tracking-wider">
                {MOCK_MATERIALS.filter(m => m.subject === sub).length} Resources
              </p>
            </button>
          ))}
        </div>
        <div className="mt-8">
           <BannerAd unitId={TestIds.BANNER} size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER} />
        </div>
      </div>
    );
  }

  // 2. View: Type Selection
  if (selectedSubject && !selectedType) {
    return (
      <div className="p-6">
         <button onClick={() => setSelectedSubject(null)} className="mb-6 flex items-center gap-2 text-stone-500 hover:text-stone-800 font-bold text-sm">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" /></svg>
            {t.back}
         </button>
         <h2 className="text-3xl font-bold serif-font text-stone-800 mb-2">{selectedSubject}</h2>
         <p className="text-stone-500 mb-8">{t.selectType}</p>

         <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {(['video', 'pdf', 'ppt', 'photo'] as MaterialType[]).map(type => (
               <button 
                key={type}
                onClick={() => setSelectedType(type)}
                className="bg-white p-6 rounded-3xl border border-stone-100 hover:border-amber-200 hover:bg-amber-50 transition-all flex flex-col items-center justify-center gap-3"
               >
                  <span className="text-4xl">{getIcon(type)}</span>
                  <span className="font-bold text-stone-700">{getLabel(type)}</span>
               </button>
            ))}
         </div>
         <div className="mt-8">
             <BannerAd unitId={TestIds.BANNER} size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER} />
         </div>
      </div>
    );
  }

  // 3. View: Material List
  return (
    <div className="p-6">
      <div className="flex items-center gap-4 mb-8">
        <button onClick={() => setSelectedType(null)} className="flex items-center gap-2 text-stone-500 hover:text-stone-800 font-bold text-sm">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" /></svg>
            {t.back}
         </button>
         <div>
            <h2 className="text-2xl font-bold serif-font text-stone-800">{getLabel(selectedType)}</h2>
            <p className="text-xs text-stone-400 font-bold uppercase">{selectedSubject}</p>
         </div>
      </div>
      
      <div className="mb-4">
         <BannerAd unitId={TestIds.BANNER} size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER} />
      </div>

      {filteredMaterials.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-stone-200 text-stone-400 font-medium">
           {t.noData}
        </div>
      ) : (
        <div className="grid gap-4">
           {filteredMaterials.map(item => (
             <div key={item.id} className="bg-white p-4 rounded-3xl border border-stone-100 flex gap-4 items-center hover:shadow-lg transition-all">
                {/* Thumbnail or Icon */}
                <div className="w-20 h-20 bg-stone-100 rounded-2xl flex-shrink-0 overflow-hidden flex items-center justify-center">
                   {item.thumbnail ? (
                     <img src={item.thumbnail} className="w-full h-full object-cover" alt="" />
                   ) : (
                     <span className="text-3xl">{getIcon(item.type)}</span>
                   )}
                </div>
                
                {/* Info */}
                <div className="flex-1 min-w-0">
                   <h4 className="font-bold text-stone-800 text-lg leading-tight mb-1">{item.title}</h4>
                   {item.description && <p className="text-xs text-stone-500 line-clamp-2">{item.description}</p>}
                </div>

                {/* Open Button */}
                <button onClick={() => openLink(item.url)} className="p-3 bg-amber-900 text-white rounded-xl shadow-lg hover:bg-amber-800 active:scale-95 transition-transform">
                   <span className="hidden md:inline text-xs font-bold mr-2">{t.open}</span>
                   <svg className="w-5 h-5 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                </button>
             </div>
           ))}
        </div>
      )}
      
      <div className="mt-8">
         <BannerAd unitId={TestIds.BANNER} size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER} />
      </div>
    </div>
  );
};
