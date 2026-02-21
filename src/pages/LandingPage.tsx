// આ પેજ આપણું 'Front Door' (લેન્ડિંગ પેજ) છે.
// ગુગલ એડસેન્સના બોટને અપ્રુવલ આપવા માટે અહીં પૂરતું આયુર્વેદિક કન્ટેન્ટ રાખેલ છે.
// સાથે જ મોડર્ન ડિઝાઇન અને 'Enter App' નું બટન પણ છે.

import React from 'react';
import { BannerAd, BannerAdSize, TestIds } from '../../components/BannerAd';

interface LandingPageProps {
  onEnterApp: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onEnterApp }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f8f5f0] to-[#e6f0e9] font-sans selection:bg-green-200">
      
      {/* હેડર સેક્શન */}
      <header className="pt-16 pb-12 text-center px-4">
        <div className="w-24 h-24 mx-auto bg-white rounded-full p-2 shadow-xl mb-6 animate-bounce rotate-3">
          <img src="assets/logo.png" className="w-full h-full object-cover rounded-full" alt="Vaidya Guru Logo" />
        </div>
        <h1 className="text-5xl md:text-6xl font-bold text-green-900 mb-4 serif-font drop-shadow-sm">Vaidya Guru</h1>
        <p className="text-lg md:text-xl text-stone-600 font-medium max-w-2xl mx-auto">
          The Ultimate Ancient Wisdom Portal & AI Clinical Companion for Ayurveda Scholars.
        </p>
      </header>

      <main className="max-w-4xl mx-auto px-4 pb-20">
        
        {/* મુખ્ય આર્ટિકલ - ગુગલ બોટ માટે કન્ટેન્ટ */}
        <article className="bg-white/80 backdrop-blur-xl rounded-[2.5rem] shadow-[0_20px_50px_-12px_rgba(0,0,0,0.1)] p-8 md:p-12 mb-10 border border-white">
          <h2 className="text-3xl font-bold text-stone-800 mb-6 serif-font border-b-2 border-green-100 pb-4">
            આયુર્વેદનો મૂળભૂત ઉદ્દેશ્ય (Fundamental Purpose of Ayurveda)
          </h2>
          <p className="text-stone-700 mb-8 text-lg leading-relaxed font-medium">
            આયુર્વેદ એ માત્ર એક ચિકિત્સા પદ્ધતિ નથી, પરંતુ તે બ્રહ્માંડના નિયમો સાથે જોડાઈને જીવન જીવવાનું એક સંપૂર્ણ વિજ્ઞાન છે. મહર્ષિ ચરક દ્વારા રચિત ચરક સંહિતામાં આયુર્વેદનો મુખ્ય હેતુ ખૂબ જ સચોટ રીતે સમજાવવામાં આવ્યો છે:
          </p>
          
          <div className="bg-gradient-to-r from-green-50 to-amber-50 p-8 rounded-[2rem] border-l-8 border-green-800 mb-10 text-center shadow-inner relative overflow-hidden">
            <div className="absolute top-0 right-0 text-9xl opacity-5">🕉️</div>
            <p className="text-2xl md:text-3xl font-bold text-green-900 mb-4 leading-normal relative z-10">
              स्वस्थस्य स्वास्थ्यरक्षणमातुरस्य विकारप्रशमनं च॥
            </p>
            <p className="text-md text-stone-500 font-bold tracking-widest uppercase relative z-10">
              (ચરક સંહિતા, સૂત્રસ્થાન ૩૦:૨૬)
            </p>
          </div>

          <h3 className="text-2xl font-bold text-stone-800 mb-6 serif-font">Word-by-Word Description & Sanskrit Grammar:</h3>
          <div className="bg-stone-50 p-8 rounded-[2rem] mb-10 border border-stone-200 shadow-sm">
            <ul className="space-y-4 text-stone-700 font-medium">
              <li className="flex gap-3"><span className="text-green-700 font-bold">स्वस्थस्य:</span> <span>'સ્વસ્થ' મૂળ શબ્દ + 'સ્ય' પ્રત્યય (ષષ્ઠી વિભક્તિ, એકવચન). અર્થ: સ્વસ્થ વ્યક્તિના (Of the healthy person).</span></li>
              <li className="flex gap-3"><span className="text-green-700 font-bold">स्वास्थ्य:</span> <span>સ્વાસ્થ્યનું / તંદુરસ્તીનું (Health).</span></li>
              <li className="flex gap-3"><span className="text-green-700 font-bold">रक्षणम्:</span> <span>'રક્ષણ' મૂળ શબ્દ + 'અમ્' પ્રત્યય (દ્વિતીયા વિભક્તિ, એકવચન). અર્થ: રક્ષણ કરવું (To protect).</span></li>
              <li className="flex gap-3"><span className="text-green-700 font-bold">आतुरस्य:</span> <span>'આતુર' (બીમાર) મૂળ શબ્દ + 'સ્ય' પ્રત્યય (ષષ્ઠી વિભક્તિ, એકવચન). અર્થ: રોગી વ્યક્તિના (Of the sick person).</span></li>
              <li className="flex gap-3"><span className="text-green-700 font-bold">विकार:</span> <span>રોગ અથવા શારીરિક/માનસિક દોષોનું અસંતુલન (Disease/Disorder).</span></li>
              <li className="flex gap-3"><span className="text-green-700 font-bold">प्रशमनं:</span> <span>'પ્રશમન' મૂળ શબ્દ + 'અમ્' પ્રત્યય (દ્વિતીયા વિભક્તિ, એકવચન). અર્થ: મટાડવું અથવા શાંત કરવું (To pacify or cure).</span></li>
              <li className="flex gap-3"><span className="text-green-700 font-bold">च:</span> <span>અવ્યય (Indeclinable). અર્થ: અને (And).</span></li>
            </ul>
          </div>

          {/* કન્ટેન્ટની બરાબર વચ્ચે ગુગલ એડસેન્સની એડ (Ad Banner) */}
          <div className="my-12 flex justify-center bg-stone-100/50 py-4 rounded-2xl border border-dashed border-stone-300">
            <BannerAd unitId={TestIds.BANNER} size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER} />
          </div>

          <div className="bg-red-50/80 p-8 rounded-[2rem] border border-red-100 shadow-sm">
            <h3 className="text-xl font-bold text-red-900 mb-4 flex items-center gap-2">
              <span className="text-2xl">⚠️</span> સ્વાસ્થ્ય અંગેની ચેતવણી (Health Disclaimer)
            </h3>
            <ul className="space-y-3 text-sm md:text-base text-stone-800 font-medium">
              <li><span className="font-bold text-green-800 bg-green-100 px-2 py-1 rounded">ફાયદા:</span> આયુર્વેદિક દિનચર્યા અને ઋતુચર્યાનું પાલન કરવાથી રોગપ્રતિકારક શક્તિ (Immunity) વધે છે, મન શાંત રહે છે.</li>
              <li><span className="font-bold text-blue-800 bg-blue-100 px-2 py-1 rounded">કોણે ન કરવું?:</span> ગંભીર બીમારીવાળા દર્દીઓએ, સગર્ભા સ્ત્રીઓએ કે બાળકોએ પોતાની પ્રકૃતિ જાણ્યા વિના કોઈ જાતે અખતરા કરવા નહીં.</li>
              <li className="font-bold text-red-700 mt-6 pt-4 border-t border-red-200">
                નોંધ: આ એપની માહિતી માત્ર શૈક્ષણિક હેતુ અને સામાન્ય જ્ઞાન માટે છે. કોઈપણ પ્રયોગ કરતાં પહેલાં રજિસ્ટર્ડ આયુર્વેદિક ચિકિત્સક (વૈદ્ય) ની સલાહ લેવી ફરજિયાત છે.
              </li>
            </ul>
          </div>
        </article>

        {/* એપમાં એન્ટર થવાનું મોડર્ન બટન */}
        <div className="text-center py-8">
          <button 
            onClick={onEnterApp} 
            className="group relative inline-flex items-center justify-center px-10 py-5 font-bold text-white transition-all duration-300 bg-gradient-to-r from-green-900 to-green-700 rounded-full shadow-[0_15px_30px_-5px_rgba(20,83,45,0.4)] hover:shadow-[0_20px_40px_-5px_rgba(20,83,45,0.6)] hover:-translate-y-1 overflow-hidden"
          >
            <span className="absolute w-0 h-0 transition-all duration-500 ease-out bg-white rounded-full group-hover:w-full group-hover:h-56 opacity-10"></span>
            <span className="relative text-xl flex items-center gap-3">
              Open Vaidya Guru App 
              <svg className="w-6 h-6 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
            </span>
          </button>
        </div>
        
      </main>
    </div>
  );
};
