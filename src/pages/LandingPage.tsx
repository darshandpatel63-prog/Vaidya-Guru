import React from 'react';
import { BannerAd, BannerAdSize, TestIds } from '../components/BannerAd'; // રસ્તો ચેક કરી લેજો

interface LandingPageProps {
  onEnter: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onEnter }) => {
  return (
    <div className="min-h-screen bg-stone-50 flex flex-col font-sans">
      {/* Header */}
      <header className="bg-white shadow-sm p-6 text-center border-b-4 border-green-800">
        <h1 className="text-4xl md:text-5xl font-bold text-green-900 mb-2 font-serif">Vaidya Guru</h1>
        <p className="text-lg md:text-xl text-stone-600 font-medium">The Ultimate BAMS Study Portal & Ayurveda Knowledge Base</p>
      </header>

      {/* Main Article Content for Google AdSense Approval */}
      <main className="flex-grow max-w-4xl mx-auto p-6 md:p-10 w-full">
        <article className="bg-white rounded-3xl shadow-xl p-8 md:p-12 mb-10 border border-stone-100">
          
          <h2 className="text-3xl font-bold text-stone-800 mb-8 border-b-2 border-stone-100 pb-4 font-serif text-center md:text-left">
            આયુર્વેદનો મૂળભૂત ઉદ્દેશ્ય (Fundamental Purpose of Ayurveda)
          </h2>
          
          <p className="text-stone-700 mb-8 text-lg leading-relaxed text-justify">
            આયુર્વેદ એ માત્ર એક ચિકિત્સા પદ્ધતિ નથી, પરંતુ તે બ્રહ્માંડના નિયમો સાથે જોડાઈને જીવન જીવવાનું એક સંપૂર્ણ વિજ્ઞાન છે. 
            પ્રાચીન ભારતીય ઋષિમુનિઓ દ્વારા હજારો વર્ષો પહેલા રચાયેલા આ શાસ્ત્રનો મુખ્ય ઉદ્દેશ્ય માનવ જીવનને રોગમુક્ત અને દીર્ઘાયુ બનાવવાનો છે. 
            મહર્ષિ ચરક દ્વારા રચિત <strong>'ચરક સંહિતા'</strong> (Charaka Samhita) માં આયુર્વેદનો મુખ્ય હેતુ ખૂબ જ સચોટ રીતે સમજાવવામાં આવ્યો છે:
          </p>
          
          {/* Shloka Box */}
          <div className="bg-orange-50 p-8 rounded-2xl border-l-8 border-orange-500 mb-10 shadow-inner text-center">
            <p className="text-2xl md:text-3xl font-bold text-orange-900 mb-4 font-serif">स्वस्थस्य स्वास्थ्यरक्षणमातुरस्य विकारप्रशमनं च॥</p>
            <p className="text-md text-stone-600 font-bold uppercase tracking-wider">(ચરક સંહિતા, સૂત્રસ્થાન ૩૦:૨૬)</p>
          </div>

          <h3 className="text-2xl font-bold text-stone-800 mb-6 font-serif">Word-by-Word Description & Sanskrit Grammar:</h3>
          
          <div className="bg-stone-50 p-6 md:p-8 rounded-2xl mb-10 border border-stone-200">
            <ul className="space-y-4 text-stone-700 text-lg">
              <li className="flex flex-col md:flex-row gap-2 border-b border-stone-200 pb-3">
                <strong className="text-green-800 min-w-[180px]">स्वस्थस्य (Svasthasya):</strong> 
                <span>'સ્વસ્થ' મૂળ શબ્દ + 'સ્ય' પ્રત્યય (ષષ્ઠી વિભક્તિ, એકવચન). અર્થ: સ્વસ્થ વ્યક્તિના (Of the healthy person).</span>
              </li>
              <li className="flex flex-col md:flex-row gap-2 border-b border-stone-200 pb-3">
                <strong className="text-green-800 min-w-[180px]">स्वास्थ्य (Svasthya):</strong> 
                <span>સ્વાસ્થ્યનું / તંદુરસ્તીનું (Health).</span>
              </li>
              <li className="flex flex-col md:flex-row gap-2 border-b border-stone-200 pb-3">
                <strong className="text-green-800 min-w-[180px]">रक्षणम् (Rakshanam):</strong> 
                <span>'રક્ષણ' મૂળ શબ્દ + 'અમ્' પ્રત્યય (દ્વિતીયા વિભક્તિ, એકવચન). અર્થ: રક્ષણ કરવું (To protect).</span>
              </li>
              <li className="flex flex-col md:flex-row gap-2 border-b border-stone-200 pb-3">
                <strong className="text-green-800 min-w-[180px]">आतुरस्य (Aturasya):</strong> 
                <span>'આતુર' (બીમાર) મૂળ શબ્દ + 'સ્ય' પ્રત્યય (ષષ્ઠી વિભક્તિ, એકવચન). અર્થ: રોગી વ્યક્તિના (Of the sick person).</span>
              </li>
              <li className="flex flex-col md:flex-row gap-2 border-b border-stone-200 pb-3">
                <strong className="text-green-800 min-w-[180px]">विकार (Vikara):</strong> 
                <span>રોગ અથવા શારીરિક/માનસિક દોષોનું અસંતુલન (Disease/Disorder).</span>
              </li>
              <li className="flex flex-col md:flex-row gap-2 border-b border-stone-200 pb-3">
                <strong className="text-green-800 min-w-[180px]">प्रशमनं (Prashamanam):</strong> 
                <span>'પ્રશમન' મૂળ શબ્દ + 'અમ્' પ્રત્યય (દ્વિતીયા વિભક્તિ, એકવચન). અર્થ: મટાડવું અથવા શાંત કરવું (To pacify or cure).</span>
              </li>
              <li className="flex flex-col md:flex-row gap-2">
                <strong className="text-green-800 min-w-[180px]">च (Cha):</strong> 
                <span>અવ્યય (Indeclinable). અર્થ: અને (And).</span>
              </li>
            </ul>
          </div>

          <p className="text-stone-700 text-lg leading-relaxed mb-10 text-justify">
            આ શ્લોક સ્પષ્ટ કરે છે કે આયુર્વેદના બે મુખ્ય પ્રયોજન છે. પહેલું પ્રયોજન એ છે કે જે વ્યક્તિ સ્વસ્થ છે, તેના સ્વાસ્થ્યની જાળવણી કરવી, જેથી તે ભવિષ્યમાં બીમાર ન પડે. આ માટે દિનચર્યા, ઋતુચર્યા અને સદાચારનું પાલન કરવું જરૂરી છે. બીજું પ્રયોજન એ છે કે જે વ્યક્તિ રોગી છે (આતુર છે), તેના રોગ (વિકાર) ને શાંત કરવો અથવા મૂળમાંથી મટાડવો.
          </p>

          {/* AdSense Banner for Article content */}
          <div className="my-12 flex justify-center bg-stone-50 p-4 rounded-xl border border-dashed border-stone-300">
             <BannerAd unitId={TestIds.BANNER} size={BannerAdSize.MEDIUM_RECTANGLE} />
          </div>

          {/* Social Media & General Health Disclaimer Rule Applied Here */}
          <div className="bg-red-50 p-6 md:p-8 rounded-2xl border border-red-200">
            <h3 className="text-xl font-bold text-red-800 mb-4 flex items-center gap-2">
              <span className="text-2xl">⚠️</span> સ્વાસ્થ્ય અંગેની ચેતવણી (Health Disclaimer)
            </h3>
            <ul className="space-y-4 text-stone-800 text-md">
              <li><strong className="text-green-700 bg-green-100 px-2 py-1 rounded">ફાયદા (Benefits):</strong> આયુર્વેદિક દિનચર્યા અને ઋતુચર્યાનું પાલન કરવાથી રોગપ્રતિકારક શક્તિ (Immunity) વધે છે, શારીરિક દોષો (વાત, પિત્ત, કફ) સંતુલિત રહે છે, મન શાંત રહે છે અને લાંબુ નિરોગી આયુષ્ય પ્રાપ્ત થાય છે.</li>
              <li><strong className="text-blue-700 bg-blue-100 px-2 py-1 rounded">કોણે કરવું? (Who can follow):</strong> સ્વસ્થ જીવન જીવવાની ઈચ્છા ધરાવતા તમામ સામાન્ય લોકો આયુર્વેદના મૂળભૂત નિયમો (જેમ કે યોગ્ય આહાર, નિદ્રા અને બ્રહ્મચર્ય) અપનાવી શકે છે.</li>
              <li><strong className="text-orange-700 bg-orange-100 px-2 py-1 rounded">કોણે ન કરવું? (Who shouldn't):</strong> ગંભીર બીમારીવાળા દર્દીઓ, સગર્ભા સ્ત્રીઓ કે નાના બાળકોએ પોતાની પ્રકૃતિ જાણ્યા વિના સોશિયલ મીડિયા કે ઇન્ટરનેટ પરથી જોઈને જાતે કોઈ ઔષધિના અખતરા કરવા નહીં.</li>
              <li className="font-bold text-red-700 mt-6 pt-4 border-t border-red-200 text-sm md:text-base leading-relaxed">
                નોંધ: આ વેબસાઇટ અને એપની માહિતી માત્ર BAMS ના વિદ્યાર્થીઓના શૈક્ષણિક હેતુ (Educational Purpose) માટે છે. કોઈપણ ઔષધિ કે ઉપચારનો પ્રયોગ કરતાં પહેલાં રજિસ્ટર્ડ આયુર્વેદિક ચિકિત્સક (વૈદ્ય) ની રૂબરૂ સલાહ લેવી ફરજિયાત છે, જેથી કોઈ પણ પ્રકારની આડઅસર (Side effects) ન થાય.
              </li>
            </ul>
          </div>
          
        </article>

        {/* Enter App Button */}
        <div className="text-center pb-12">
          <button 
            onClick={onEnter} 
            className="inline-block bg-green-900 text-white font-bold text-xl md:text-2xl py-5 px-12 rounded-full shadow-2xl hover:bg-green-800 transform hover:-translate-y-2 transition-all duration-300 ring-4 ring-green-900/30"
          >
            Enter Vaidya Guru App 🚀
          </button>
          <p className="text-stone-500 mt-4 text-sm font-medium">Click to access study materials, notes, and exams.</p>
        </div>
      </main>

      {/* Footer Banner Ad */}
      <footer className="bg-white border-t p-2">
        <BannerAd unitId={TestIds.BANNER} size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER} />
      </footer>
    </div>
  );
};
