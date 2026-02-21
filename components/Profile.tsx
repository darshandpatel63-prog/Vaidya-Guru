// અહીં યુઝરની પ્રોફાઈલ (નામ, ફોટો વગેરે) દેખાય છે અને એડિટ થાય છે.
// આપણે Medical Field નો એડિટ ઓપ્શન કાઢી નાખ્યો છે અને માત્ર BAMS દેખાશે.

import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../AuthContext';
import { Language, Gender, Role, CourseLevel } from '../types';
import { RewardedAd, InterstitialAd, BannerAd, BannerAdSize, TestIds } from './BannerAd';

const UI_TEXT = {
  [Language.ENGLISH]: {
    header: "Personal info", desc: "Info about you and your preferences across VaidyaGuru.",
    basicInfo: "Basic info", academicInfo: "Academic info", contactInfo: "Contact info",
    preferences: "Preferences", save: "Save", cancel: "Cancel", logout: "Sign out",
    watchAd: "Watch Ad to Save", name: "Name", gender: "Gender", role: "Profession",
    field: "Medical Field", level: "Course Level", lang: "Language", links: "Social Links",
    pic: "Profile Picture", changePic: "A photo helps personalize your account",
    adPrompt: "Changes require watching a short ad.", install: "Install App",
    installDesc: "Install VaidyaGuru on your home screen for quick access."
  },
  [Language.GUJARATI]: {
    header: "વ્યક્તિગત માહિતી", desc: "વૈદ્યગુરુ સેવાઓમાં તમારા વિશેની માહિતી.",
    basicInfo: "મૂળભૂત માહિતી", academicInfo: "શૈક્ષણિક માહિતી", contactInfo: "સંપર્ક માહિતી",
    preferences: "પસંદગીઓ", save: "સાચવો", cancel: "રદ કરો", logout: "સાઇન આઉટ",
    watchAd: "સેવ કરવા જાહેરાત જુઓ", name: "નામ", gender: "જાતિ", role: "વ્યવસાય",
    field: "ક્ષેત્ર", level: "અભ્યાસ સ્તર", lang: "ભાષા", links: "સોશિયલ લિંક્સ",
    pic: "પ્રોફાઇલ ચિત્ર", changePic: "ફોટો એકાઉન્ટને વ્યક્તિગત બનાવે છે",
    adPrompt: "ફેરફારો સેવ કરવા ટૂંકી જાહેરાત જોવી પડશે.", install: "એપ ઇન્સ્ટોલ કરો",
    installDesc: "ઝડપી ઉપયોગ માટે હોમ સ્ક્રીન પર ઇન્સ્ટોલ કરો."
  },
  [Language.HINDI]: {
    header: "व्यक्तिगत जानकारी", desc: "वैद्यगुरु सेवाओं में आपके बारे में जानकारी।",
    basicInfo: "मूलभूत जानकारी", academicInfo: "शैक्षणिक जानकारी", contactInfo: "संपर्क जानकारी",
    preferences: "प्राथमिकताएं", save: "सहेजें", cancel: "रद्द करें", logout: "साइन आउट",
    watchAd: "सेव करने के लिए विज्ञापन देखें", name: "नाम", gender: "लिंग", role: "पेशा",
    field: "क्षेत्र", level: "स्तर", lang: "भाषा", links: "लिंक",
    pic: "प्रोफ़ाइल चित्र", changePic: "फोटो खाते को निजीकृत करता है",
    adPrompt: "परिवर्तनों के लिए विज्ञापन देखना आवश्यक है।", install: "ऐप इंस्टॉल करें",
    installDesc: "त्वरित पहुंच के लिए इंस्टॉल करें।"
  }
};

export const Profile: React.FC = () => {
  const { user, logout, updateProfile } = useAuth();
  const [editingField, setEditingField] = useState<string | null>(null);
  const [installPrompt, setInstallPrompt] = useState<any>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState({
    name: "", gender: Gender.MALE, role: Role.STUDENT, courseLevel: CourseLevel.UG1, youtube: "", facebook: ""
  });

  useEffect(() => {
    const handler = (e: any) => { e.preventDefault(); setInstallPrompt(e); };
    window.addEventListener('beforeinstallprompt', handler);
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  if (!user) return null;
  const t = UI_TEXT[user.preferredLanguage] || UI_TEXT[Language.ENGLISH];

  const handleInstall = () => {
    if (!installPrompt) return;
    installPrompt.prompt();
    installPrompt.userChoice.then((choiceResult: any) => {
      setInstallPrompt(null);
    });
  };

  const initEdit = (field: string) => {
    setFormData({
      name: user.name, gender: user.gender, role: user.role, courseLevel: user.courseLevel,
      youtube: user.socialLinks?.youtube || "", facebook: user.socialLinks?.facebook || ""
    });
    setEditingField(field);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        if (ev.target?.result) {
          const newPic = ev.target!.result as string;
          RewardedAd.show(() => { updateProfile({ profilePic: newPic }); });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const saveChanges = () => {
    RewardedAd.show(() => {
      updateProfile({
        name: formData.name, gender: formData.gender, role: formData.role, courseLevel: formData.courseLevel,
        socialLinks: { youtube: formData.youtube, facebook: formData.facebook }
      });
      setEditingField(null);
    });
  };

  const handleLogout = () => { InterstitialAd.show(() => { logout(); }); };

  const changeLanguage = (lang: Language) => {
    if (lang === user.preferredLanguage) return;
    RewardedAd.show(() => { updateProfile({ preferredLanguage: lang }); });
  };

  const RowItem = ({ label, value, fieldKey, isLast = false, isImage = false }: { label: string, value: React.ReactNode, fieldKey: string, isLast?: boolean, isImage?: boolean }) => {
    const isEditing = editingField === fieldKey;
    
    // જો ફીલ્ડ 'મેડિકલ ફિલ્ડ' હોય, તો તેને એડિટ ન કરવા દેવું
    const canEdit = fieldKey !== 'none' && fieldKey !== 'medicalField';

    return (
      <div className={`flex flex-col md:flex-row md:items-center py-4 px-6 hover:bg-stone-50 transition-colors ${canEdit ? 'cursor-pointer' : ''} ${isLast ? '' : 'border-b border-stone-200'}`} onClick={() => canEdit && !isEditing && initEdit(fieldKey)}>
        <div className="w-full md:w-1/3 mb-2 md:mb-0">
          <span className="text-xs font-medium text-stone-500 uppercase tracking-wide">{label}</span>
        </div>
        <div className="flex-1 text-stone-800 font-normal text-lg flex justify-between items-center">
          {isEditing ? (
            <div className="w-full pr-4" onClick={e => e.stopPropagation()}>
              {fieldKey === 'name' && <input value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full p-2 border rounded" autoFocus />}
              {fieldKey === 'gender' && <select value={formData.gender} onChange={e => setFormData({...formData, gender: e.target.value as Gender})} className="w-full p-2 border rounded bg-white">{Object.values(Gender).map(g => <option key={g} value={g}>{g}</option>)}</select>}
              {fieldKey === 'role' && <select value={formData.role} onChange={e => setFormData({...formData, role: e.target.value as Role})} className="w-full p-2 border rounded bg-white">{Object.values(Role).map(r => <option key={r} value={r}>{r}</option>)}</select>}
              {fieldKey === 'courseLevel' && <select value={formData.courseLevel} onChange={e => setFormData({...formData, courseLevel: e.target.value as CourseLevel})} className="w-full p-2 border rounded bg-white">{Object.values(CourseLevel).map(l => <option key={l} value={l}>{l}</option>)}</select>}
              {fieldKey === 'social' && (
                <div className="grid gap-2">
                  <input value={formData.youtube} onChange={e => setFormData({...formData, youtube: e.target.value})} placeholder="YouTube URL" className="w-full p-2 border rounded" />
                  <input value={formData.facebook} onChange={e => setFormData({...formData, facebook: e.target.value})} placeholder="Facebook URL" className="w-full p-2 border rounded" />
                </div>
              )}
              <div className="flex gap-2 mt-4 justify-end">
                <button onClick={() => setEditingField(null)} className="px-4 py-1.5 text-sm font-bold text-stone-500 hover:bg-stone-200 rounded">{t.cancel}</button>
                <button onClick={saveChanges} className="px-4 py-1.5 text-sm font-bold bg-green-700 text-white rounded shadow-sm hover:bg-green-800">{t.watchAd}</button>
              </div>
              <p className="text-[10px] text-stone-400 mt-2">{t.adPrompt}</p>
            </div>
          ) : (
            <>
              {isImage ? (
                <div className="flex items-center justify-between w-full">
                  <span className="text-sm text-stone-500">{t.changePic}</span>
                  <img src={user.profilePic} className="w-16 h-16 rounded-full object-cover border border-stone-200" alt="Profile" />
                </div>
              ) : (
                <span className="truncate pr-4 font-semibold text-stone-700">{value}</span>
              )}
              {!isImage && canEdit && <svg className="w-5 h-5 text-stone-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>}
            </>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-3xl mx-auto pb-32 animate-in fade-in slide-in-from-bottom-4 px-4 pt-6">
      <div className="text-center py-6 mb-4">
        <h1 className="text-4xl font-bold serif-font text-stone-800 mb-2">{t.header}</h1>
        <p className="text-stone-500">{t.desc}</p>
      </div>

      <div className="space-y-6">
        {installPrompt && (
          <div className="bg-gradient-to-r from-green-900 to-green-800 rounded-2xl shadow-lg overflow-hidden text-white p-6 flex justify-between items-center animate-bounce">
            <div>
              <h2 className="text-xl font-bold mb-1">{t.install}</h2>
              <p className="text-green-100 text-sm">{t.installDesc}</p>
            </div>
            <button onClick={handleInstall} className="bg-white text-green-900 px-6 py-2 rounded-full font-bold shadow hover:bg-green-50 transition-colors">Install</button>
          </div>
        )}

        {/* Basic Info */}
        <div className="bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-stone-100 bg-stone-50/50">
            <h2 className="text-xl font-bold text-stone-800 serif-font">{t.basicInfo}</h2>
          </div>
          <div className="flex flex-col md:flex-row md:items-center py-4 px-6 hover:bg-stone-50 transition-colors cursor-pointer border-b border-stone-200" onClick={() => fileInputRef.current?.click()}>
            <div className="w-full md:w-1/3 mb-2 md:mb-0"><span className="text-xs font-medium text-stone-500 uppercase tracking-wide">{t.pic}</span></div>
            <div className="flex-1 flex justify-between items-center">
              <span className="text-sm text-stone-500">{t.changePic}</span>
              <img src={user.profilePic} className="w-16 h-16 rounded-full object-cover border-2 border-green-800/20 shadow-sm" alt="Profile" />
            </div>
            <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept="image/*" />
          </div>
          <RowItem label={t.name} value={user.name} fieldKey="name" />
          <RowItem label={t.gender} value={user.gender} fieldKey="gender" />
          <RowItem label={t.role} value={user.role} fieldKey="role" isLast />
        </div>

        <BannerAd unitId={TestIds.BANNER} size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER} />

        {/* Academic Info */}
        <div className="bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-stone-100 bg-stone-50/50">
            <h2 className="text-xl font-bold text-stone-800 serif-font">{t.academicInfo}</h2>
          </div>
          {/* મેડિકલ ફિલ્ડ હવે BAMS તરીકે ફિક્સ જ દેખાશે, એડિટ નહીં થાય */}
          <RowItem label={t.field} value={<span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-bold border border-green-200">BAMS</span>} fieldKey="medicalField" />
          <RowItem label={t.level} value={user.courseLevel} fieldKey="courseLevel" isLast />
        </div>

        {/* Contact Info */}
        <div className="bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-stone-100 bg-stone-50/50">
            <h2 className="text-xl font-bold text-stone-800 serif-font">{t.contactInfo}</h2>
          </div>
          <RowItem label="Email" value={user.email} fieldKey="none" />
          <RowItem label={t.links} value={
            <div className="flex gap-4">
              {user.socialLinks?.youtube && <span className="text-red-600 font-bold text-sm">YouTube</span>}
              {user.socialLinks?.facebook && <span className="text-blue-600 font-bold text-sm">Facebook</span>}
              {(!user.socialLinks?.youtube && !user.socialLinks?.facebook) && <span className="text-stone-400 italic">Not set</span>}
            </div>
          } fieldKey="social" isLast />
        </div>

        {/* Preferences */}
        <div className="bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden p-6">
          <h2 className="text-xl font-bold text-stone-800 mb-6 serif-font">{t.preferences}</h2>
          <div className="flex flex-wrap gap-4 mb-6">
            {[Language.ENGLISH, Language.GUJARATI, Language.HINDI].map(lang => (
              <button key={lang} onClick={() => changeLanguage(lang)} className={`px-6 py-3 rounded-xl border text-sm font-bold transition-all shadow-sm ${user.preferredLanguage === lang ? 'bg-green-100 text-green-900 border-green-300 scale-105' : 'border-stone-200 text-stone-600 hover:bg-stone-50 hover:border-stone-300'}`}>
                {lang === Language.ENGLISH ? 'English' : lang === Language.GUJARATI ? 'ગુજરાતી' : 'हिन्दी'}
              </button>
            ))}
          </div>
          <p className="text-xs text-stone-400 mb-8 font-medium">* {t.adPrompt}</p>
          <div className="border-t border-stone-100 pt-8 flex justify-center">
            <button onClick={handleLogout} className="px-10 py-3 border-2 border-red-100 bg-red-50 rounded-2xl text-red-700 font-bold hover:bg-red-100 transition-colors shadow-sm">{t.logout}</button>
          </div>
        </div>

        <div className="text-center pb-10">
          <p className="text-xs font-bold text-stone-400 flex justify-center gap-4">
            <a href="/privacy.html" target="_blank" rel="noopener noreferrer" className="hover:text-stone-600 transition-colors">Privacy Policy</a>
            <a href="/terms.html" className="hover:text-stone-600 transition-colors">Terms of Service</a>
          </p>
          <p className="text-[10px] text-stone-300 mt-4 uppercase tracking-widest">VaidyaGuru ID: {user.id}</p>
        </div>
      </div>
    </div>
  );
};
