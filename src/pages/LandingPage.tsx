import React, { useState } from 'react';
import { BannerAd, BannerAdSize, TestIds } from '../../components/BannerAd';

interface LandingPageProps {
  onEnterApp: () => void;
}

type LangType = 'en' | 'gu' | 'hi';

// ત્રણેય ભાષાઓનો ડેટા (Google Bot માટે English ડિફોલ્ટ છે)
const CONTENT = {
  en: {
    subtitle: "The Ultimate Ancient Wisdom Portal & AI Clinical Companion",
    purposeTitle: "Fundamental Purpose of Ayurveda",
    purposeDesc: "Ayurveda is not just a medical system, but a complete science of living in harmony with the laws of the universe. Maharishi Charaka has very precisely explained the main objective of Ayurveda in Charaka Samhita:",
    shlokaDesc: "Word-by-Word Description & Sanskrit Grammar:",
    words: [
      { w: "Svasthasya:", d: "Of the healthy person (Svastha + sya suffix)." },
      { w: "Svasthya:", d: "Health / Wellbeing." },
      { w: "Rakshanam:", d: "To protect / Maintain." },
      { w: "Aturasya:", d: "Of the sick or diseased person." },
      { w: "Vikara:", d: "Disease or imbalance of Doshas." },
      { w: "Prashamanam:", d: "To pacify or cure." },
      { w: "Cha:", d: "And (Indeclinable)." }
    ],
    disclaimerTitle: "Health Disclaimer",
    benefits: "Benefits: Following Ayurvedic daily and seasonal routines boosts immunity and brings mental peace.",
    avoid: "Caution: Pregnant women, children, and patients with severe illnesses should not try remedies without knowing their Prakriti.",
    note: "Note: This information is for educational purposes. Always consult a registered Ayurvedic practitioner (Vaidya).",
    btnText: "Open Vaidya Guru App",
    lifestyle: "Ayurvedic Lifestyle (Ritucharya)",
    seasons: [
      { icon: "🌸", t: "Spring (Vasant)", d: "Kapha dosha aggravates. Consume light, dry, and bitter-astringent foods. Exercise and Udvartana (massage) are highly recommended." },
      { icon: "☀️", t: "Summer (Grishma)", d: "Body strength decreases due to heat. Sweet, cold, and liquid diets are best. Avoid excessive sun exposure and heavy physical exertion." },
      { icon: "🌧️", t: "Monsoon (Varsha)", d: "Vata dosha aggravates and digestion weakens. Sour, salty, and unctuous foods are beneficial. Drinking boiled water is highly health-promoting." },
      { icon: "❄️", t: "Winter (Hemant & Shishir)", d: "Digestive fire (Jatharagni) is strongest. The body can digest heavy, sweet, and nourishing foods. Best time to build physical strength." }
    ],
    inspireTitle: "Inspiration & Purpose",
    scholars: "For Ayurveda Scholars",
    scholarsDesc: "\"You are not just studying a degree; you are keeping a 5000-year-old legacy alive. Your hands will heal, and your knowledge will guide the world's oldest life science. Keep learning, keep evolving.\"",
    seekers: "For Wellness Seekers",
    seekersDesc: "\"Health is not merely the absence of disease, but a state of complete physical, mental, and spiritual well-being. Embrace the Ayurvedic lifestyle to find absolute balance and inner peace.\""
  },
  gu: {
    subtitle: "આયુર્વેદ અધ્યેતાઓ માટે પ્રાચીન જ્ઞાન અને AI ક્લિનિકલ સાથી",
    purposeTitle: "આયુર્વેદનો મૂળભૂત ઉદ્દેશ્ય",
    purposeDesc: "આયુર્વેદ એ માત્ર એક ચિકિત્સા પદ્ધતિ નથી, પરંતુ તે બ્રહ્માંડના નિયમો સાથે જોડાઈને જીવન જીવવાનું એક સંપૂર્ણ વિજ્ઞાન છે. મહર્ષિ ચરક દ્વારા રચિત ચરક સંહિતામાં આયુર્વેદનો મુખ્ય હેતુ સચોટ રીતે સમજાવવામાં આવ્યો છે:",
    shlokaDesc: "વર્ડ-બાય-વર્ડ ડિસ્ક્રિપ્શન અને સંસ્કૃત વ્યાકરણ:",
    words: [
      { w: "स्वस्थस्य:", d: "'સ્વસ્થ' મૂળ શબ્દ + 'સ્ય' પ્રત્યય. અર્થ: સ્વસ્થ વ્યક્તિના." },
      { w: "स्वास्थ्य:", d: "સ્વાસ્થ્યનું / તંદુરસ્તીનું." },
      { w: "रक्षणम्:", d: "રક્ષણ કરવું." },
      { w: "आतुरस्य:", d: "'આતુર' (બીમાર) મૂળ શબ્દ + 'સ્ય' પ્રત્યય. અર્થ: રોગી વ્યક્તિના." },
      { w: "विकार:", d: "રોગ અથવા દોષોનું અસંતુલન." },
      { w: "प्रशमनं:", d: "મટાડવું અથવા શાંત કરવું." },
      { w: "च:", d: "અને (અવ્યય)." }
    ],
    disclaimerTitle: "સ્વાસ્થ્ય અંગેની ચેતવણી",
    benefits: "ફાયદા: આયુર્વેદિક દિનચર્યા અને ઋતુચર્યાનું પાલન કરવાથી રોગપ્રતિકારક શક્તિ (Immunity) વધે છે.",
    avoid: "કોણે ન કરવું?: ગંભીર બીમારીવાળા દર્દીઓએ કે સગર્ભા સ્ત્રીઓએ પ્રકૃતિ જાણ્યા વિના કોઈ અખતરા કરવા નહીં.",
    note: "નોંધ: આ માહિતી માત્ર શૈક્ષણિક હેતુ માટે છે. કોઈપણ પ્રયોગ કરતાં પહેલાં રજિસ્ટર્ડ વૈદ્યની સલાહ લેવી ફરજિયાત છે.",
    btnText: "Vaidya Guru એપ ખોલો",
    lifestyle: "આયુર્વેદિક જીવનશૈલી (ઋતુચર્યા)",
    seasons: [
      { icon: "🌸", t: "વસંત ઋતુ", d: "આ ઋતુમાં કફ દોષનો પ્રકોપ થાય છે. હળવો, સૂકો અને તીખો-કડવો આહાર લેવો જોઈએ. વ્યાયામ અને ઉદ્વર્તન કરવાથી શરીરની આળસ દૂર થાય છે." },
      { icon: "☀️", t: "ગ્રીષ્મ ઋતુ", d: "વાતાવરણમાં ઉષ્ણતા વધવાથી શારીરિક બળ ઘટે છે. મધુર, શીતળ અને પ્રવાહી આહાર શ્રેષ્ઠ છે. તડકામાં વધુ ફરવાનું ટાળવું જોઈએ." },
      { icon: "🌧️", t: "વર્ષા ઋતુ", d: "આ સમયે વાત દોષનો પ્રકોપ અને જઠરાગ્નિ મંદ હોય છે. ખાટો, ખારો અને સ્નિગ્ધ આહાર લેવો. ઉકાળેલું પાણી પીવું સ્વાસ્થ્યવર્ધક છે." },
      { icon: "❄️", t: "હેમંત અને શિશિર", d: "શિયાળામાં જઠરાગ્નિ પ્રબળ હોય છે. પૌષ્ટિક, મધુર અને સ્નિગ્ધ આહાર પચાવવાની ક્ષમતા વધે છે. આ ઋતુ બળ વધારવા માટે ઉત્તમ છે." }
    ],
    inspireTitle: "પ્રેરણા અને ઉદ્દેશ્ય",
    scholars: "આયુર્વેદ અધ્યેતાઓ માટે",
    scholarsDesc: "\"તમે માત્ર મેડિકલ ડિગ્રીનો અભ્યાસ નથી કરી રહ્યા; તમે ૫૦૦૦ વર્ષ જૂના વારસાને જીવંત રાખી રહ્યા છો. તમારા હાથ રોગો મટાડશે, શીખતા રહો, આગળ વધતા રહો.\"",
    seekers: "સામાન્ય વ્યક્તિઓ માટે",
    seekersDesc: "\"સ્વાસ્થ્ય એટલે માત્ર બીમારીનો અભાવ નહીં, પરંતુ શારીરિક, માનસિક અને આધ્યાત્મિક સુખાકારીની સંપૂર્ણ અવસ્થા. આંતરિક શાંતિ માટે આયુર્વેદિક જીવનશૈલી અપનાવો.\""
  },
  hi: {
    subtitle: "आयुर्वेद के छात्रों के लिए प्राचीन ज्ञान और AI क्लिनिकल साथी",
    purposeTitle: "आयुर्वेद का मूल उद्देश्य",
    purposeDesc: "आयुर्वेद केवल एक चिकित्सा पद्धति नहीं है, बल्कि ब्रह्मांड के नियमों के साथ सद्भाव में जीने का एक पूर्ण विज्ञान है। महर्षि चरक ने आयुर्वेद का मुख्य उद्देश्य स्पष्ट किया है:",
    shlokaDesc: "शब्द-दर-शब्द विवरण और संस्कृत व्याकरण:",
    words: [
      { w: "स्वस्थस्य:", d: "स्वस्थ व्यक्ति के (षष्ठी विभक्ति)।" },
      { w: "स्वास्थ्य:", d: "स्वास्थ्य की / तंदुरुस्ती की।" },
      { w: "रक्षणम्:", d: "रक्षा करना।" },
      { w: "आतुरस्य:", d: "रोगी व्यक्ति के (षष्ठी विभक्ति)।" },
      { w: "विकार:", d: "रोग या दोषों का असंतुलन।" },
      { w: "प्रशमनं:", d: "शांत करना या ठीक करना।" },
      { w: "च:", d: "और (अव्यय)।" }
    ],
    disclaimerTitle: "स्वास्थ्य चेतावनी",
    benefits: "लाभ: आयुर्वेदिक दिनचर्या और ऋतुचर्या का पालन करने से रोग प्रतिरोधक क्षमता बढ़ती है।",
    avoid: "सावधानी: गर्भवती महिलाओं और गंभीर रोगियों को बिना अपनी प्रकृति जाने कोई उपाय नहीं करना चाहिए।",
    note: "नोट: यह जानकारी केवल शैक्षिक उद्देश्य के लिए है। किसी भी उपाय से पहले हमेशा पंजीकृत वैद्य से सलाह लें।",
    btnText: "Vaidya Guru ऐप खोलें",
    lifestyle: "आयुर्वेदिक जीवनशैली (ऋतुचर्या)",
    seasons: [
      { icon: "🌸", t: "वसंत ऋतु", d: "कफ दोष का प्रकोप होता है। हल्का, रूखा और कड़वा-तीखा आहार लेना चाहिए। व्यायाम लाभकारी है।" },
      { icon: "☀️", t: "ग्रीष्म ऋतु", d: "गर्मी के कारण शारीरिक बल कम हो जाता है। मीठा, ठंडा और तरल आहार सर्वोत्तम है।" },
      { icon: "🌧️", t: "वर्षा ऋतु", d: "वात दोष का प्रकोप होता है और पाचन कमजोर होता है। खट्टा, नमकीन और स्निग्ध आहार लें।" },
      { icon: "❄️", t: "हेमंत और शिशिर", d: "पाचन अग्नि सबसे तेज होती है। पौष्टिक और भारी आहार आसानी से पच जाता है। यह बल बढ़ाने का उत्तम समय है।" }
    ],
    inspireTitle: "प्रेरणा और उद्देश्य",
    scholars: "आयुर्वेद छात्रों के लिए",
    scholarsDesc: "\"आप सिर्फ एक डिग्री नहीं पढ़ रहे हैं; आप 5000 साल पुरानी विरासत को जीवित रख रहे हैं। आपके हाथ रोग मिटाएंगे। सीखते रहें, आगे बढ़ते रहें।\"",
    seekers: "सामान्य व्यक्तियों के लिए",
    seekersDesc: "\"स्वास्थ्य का अर्थ केवल बीमारी का न होना नहीं है, बल्कि पूर्ण शारीरिक और मानसिक कल्याण है। संतुलन के लिए आयुर्वेद अपनाएं।\""
  }
};

export const LandingPage: React.FC<LandingPageProps> = ({ onEnterApp }) => {
  const [lang, setLang] = useState<LangType>('en'); // Default language is English
  const t = CONTENT[lang];

  return (
    <div className="min-h-screen bg-stone-50 text-stone-800 font-sans selection:bg-emerald-200">
      
      {/* Premium Top Navigation with Language Switcher */}
      <nav className="fixed top-0 left-0 right-0 p-4 flex justify-between items-center z-50 bg-white/70 backdrop-blur-xl border-b border-stone-200 shadow-sm">
        <div className="flex items-center gap-3">
          <img src="assets/logo.png" className="w-8 h-8 md:w-10 md:h-10 object-contain drop-shadow-md" alt="Vaidya Guru Logo" />
          <span className="font-bold serif-font text-lg md:text-xl text-emerald-900 hidden sm:block">VaidyaGuru</span>
        </div>
        <div className="flex gap-2 bg-stone-100 p-1 rounded-full border border-stone-200 shadow-inner">
          <button onClick={() => setLang('en')} className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${lang === 'en' ? 'bg-emerald-900 text-white shadow-md scale-105' : 'text-stone-500 hover:text-emerald-800'}`}>English</button>
          <button onClick={() => setLang('gu')} className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${lang === 'gu' ? 'bg-emerald-900 text-white shadow-md scale-105' : 'text-stone-500 hover:text-emerald-800'}`}>ગુજરાતી</button>
          <button onClick={() => setLang('hi')} className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${lang === 'hi' ? 'bg-emerald-900 text-white shadow-md scale-105' : 'text-stone-500 hover:text-emerald-800'}`}>हिन्दी</button>
        </div>
      </nav>

      {/* Hero Header Section */}
      <header className="pt-32 pb-16 text-center px-4 relative overflow-hidden flex flex-col items-center">
        {/* Abstract Background Elements */}
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-emerald-200/40 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[400px] h-[400px] bg-amber-200/30 rounded-full blur-[100px] pointer-events-none"></div>
        
        <div className="w-28 h-28 bg-white rounded-[2rem] p-2 shadow-2xl mb-8 border-2 border-emerald-50 relative z-10 rotate-3 hover:rotate-0 transition-all duration-500">
          <img src="assets/logo.png" className="w-full h-full object-cover rounded-2xl" alt="Logo" />
        </div>
        <h1 className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-950 to-emerald-700 mb-6 serif-font relative z-10 tracking-tight">Vaidya Guru</h1>
        <p className="text-lg md:text-2xl text-stone-600 font-medium max-w-3xl mx-auto relative z-10 leading-relaxed">
          {t.subtitle}
        </p>
      </header>

      <main className="max-w-5xl mx-auto px-4 pb-20 relative z-10">
        
        {/* Main Article Content for Google Bot */}
        <article className="bg-white rounded-[3rem] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] p-8 md:p-14 mb-12 border border-stone-100">
          <h2 className="text-3xl md:text-4xl font-bold text-emerald-950 mb-6 serif-font border-b border-emerald-100 pb-4">
            {t.purposeTitle}
          </h2>
          <p className="text-stone-600 mb-10 text-lg md:text-xl leading-relaxed font-medium">
            {t.purposeDesc}
          </p>
          
          <div className="bg-gradient-to-br from-emerald-900 via-emerald-800 to-teal-900 p-8 md:p-12 rounded-[2.5rem] border-l-8 border-amber-400 mb-12 text-center shadow-2xl relative overflow-hidden group">
            <div className="absolute -top-10 -right-10 text-[150px] opacity-[0.03] text-white group-hover:scale-110 transition-transform duration-700">ॐ</div>
            <p className="text-2xl md:text-4xl font-bold text-white mb-6 leading-relaxed relative z-10 serif-font drop-shadow-md">
              स्वस्थस्य स्वास्थ्यरक्षणमातुरस्य विकारप्रशमनं च॥
            </p>
            <p className="text-sm md:text-base text-emerald-200 font-bold tracking-widest uppercase relative z-10">
              (Charaka Samhita, Sutrasthana 30:26)
            </p>
          </div>

          <h3 className="text-2xl font-bold text-stone-800 mb-6 serif-font">{t.shlokaDesc}</h3>
          <div className="bg-stone-50 p-8 rounded-[2rem] mb-12 border border-stone-200">
            <ul className="space-y-4 text-stone-700 font-medium text-lg">
              {t.words.map((item, idx) => (
                <li key={idx} className="flex flex-col sm:flex-row sm:gap-4 border-b border-stone-200/60 pb-3 last:border-0 last:pb-0">
                  <span className="text-emerald-800 font-black min-w-[140px] text-xl mb-1 sm:mb-0">{item.w}</span> 
                  <span className="text-stone-600 leading-relaxed">{item.d}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* AdSense Banner positioned safely between content */}
          <div className="my-14 flex justify-center bg-stone-100 py-6 rounded-3xl border border-dashed border-stone-300">
            <BannerAd unitId={TestIds.BANNER} size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER} />
          </div>

          <div className="bg-red-50 p-8 rounded-[2rem] border border-red-100">
            <h3 className="text-xl font-bold text-red-900 mb-6 flex items-center gap-3">
              <span className="text-2xl">⚠️</span> {t.disclaimerTitle}
            </h3>
            <ul className="space-y-4 text-base md:text-lg text-stone-700 font-medium">
              <li className="flex items-start gap-3"><span className="text-emerald-600 mt-1">✓</span> <span>{t.benefits}</span></li>
              <li className="flex items-start gap-3"><span className="text-amber-600 mt-1">!</span> <span>{t.avoid}</span></li>
              <li className="font-bold text-red-700 mt-6 pt-6 border-t border-red-200/50">
                {t.note}
              </li>
            </ul>
          </div>
        </article>

        {/* The Action Button */}
        <div className="text-center py-10 relative z-20">
          <button 
            onClick={onEnterApp} 
            className="group relative inline-flex items-center justify-center px-10 py-6 font-bold text-white transition-all duration-300 bg-emerald-900 rounded-full shadow-[0_15px_40px_-10px_rgba(6,78,59,0.5)] hover:shadow-[0_20px_50px_-10px_rgba(6,78,59,0.7)] hover:-translate-y-2 overflow-hidden border border-emerald-700"
          >
            <span className="absolute w-0 h-0 transition-all duration-700 ease-out bg-amber-500 rounded-full group-hover:w-[400px] group-hover:h-[400px] opacity-20"></span>
            <span className="relative text-xl md:text-2xl flex items-center gap-4 uppercase tracking-wider">
              {t.btnText}
              <svg className="w-8 h-8 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
            </span>
          </button>
        </div>

        {/* Ritucharya Section */}
        <section className="mt-16 pt-16 border-t border-stone-200 relative">
          <h2 className="text-4xl font-bold text-center text-emerald-950 mb-14 serif-font">{t.lifestyle}</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
            {t.seasons.map((season, idx) => (
              <div key={idx} className="bg-white p-8 md:p-10 rounded-[2.5rem] border border-stone-100 shadow-[0_10px_30px_-15px_rgba(0,0,0,0.08)] hover:shadow-2xl transition-all duration-500 group hover:-translate-y-2">
                <div className="text-5xl mb-6 bg-stone-50 w-20 h-20 flex items-center justify-center rounded-2xl group-hover:scale-110 group-hover:rotate-6 transition-all">{season.icon}</div>
                <h3 className="text-2xl font-bold text-stone-800 mb-4 serif-font">{season.t}</h3>
                <p className="text-stone-600 font-medium leading-relaxed text-lg">{season.d}</p>
              </div>
            ))}
          </div>
          {/* ========================================================= */}
          {/* નવો ઉમેરેલો ત્રિદોષ સિદ્ધાંત આર્ટિકલ (Tridosha Section) */}
          {/* ========================================================= */}
          <section className="mt-16 mb-24 relative z-10">
            <h2 className="text-4xl font-bold text-center text-emerald-950 mb-6 serif-font">
              {lang === 'en' ? 'Tridosha Siddhanta (The 3 Bio-Energies)' : lang === 'gu' ? 'ત્રિદોષ સિદ્ધાંત (ત્રણ શારીરિક ઉર્જા)' : 'त्रिदोष सिद्धांत (तीन शारीरिक ऊर्जा)'}
            </h2>
            <p className="text-stone-600 text-center text-lg md:text-xl max-w-4xl mx-auto font-medium mb-12 leading-relaxed">
              {lang === 'en' ? 'According to Ayurveda, the human body is composed of three fundamental energies or Doshas: Vata, Pitta, and Kapha. Their perfect balance defines health, and their imbalance leads to disease.' : lang === 'gu' ? 'આયુર્વેદ અનુસાર, માનવ શરીર ત્રણ મૂળભૂત દોષોનું બનેલું છે: વાત, પિત્ત અને કફ. આ દોષોનું સંપૂર્ણ સંતુલન એ જ સ્વાસ્થ્ય છે અને તેમનું અસંતુલન રોગનું કારણ બને છે.' : 'आयुर्वेद के अनुसार, मानव शरीर तीन मूलभूत दोषों से बना है: वात, पित्त और कफ। इन दोषों का पूर्ण संतुलन ही स्वास्थ्य है और इनका असंतुलन रोग का कारण बनता है।'}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Vata */}
              <div className="bg-white p-8 rounded-[2.5rem] border-t-8 border-blue-400 shadow-lg hover:-translate-y-2 hover:shadow-2xl transition-all duration-500 group">
                <div className="text-6xl mb-6 bg-blue-50 w-20 h-20 flex items-center justify-center rounded-3xl group-hover:scale-110 transition-transform">💨</div>
                <h3 className="text-2xl font-bold text-stone-800 mb-4 serif-font">
                  {lang === 'en' ? 'Vata (Wind & Space)' : lang === 'gu' ? 'વાત દોષ (વાયુ અને આકાશ)' : 'वात दोष (वायु और आकाश)'}
                </h3>
                <p className="text-stone-600 font-medium leading-relaxed text-lg">
                  {lang === 'en' ? 'Controls movement, breathing, blood circulation, and the nervous system. When out of balance, it causes anxiety, joint pain, and dry skin.' : lang === 'gu' ? 'શરીરનું હલનચલન, શ્વાસોચ્છ્વાસ, રક્ત પરિભ્રમણ અને જ્ઞાનતંતુઓનું (Nervous System) નિયંત્રણ કરે છે. અસંતુલિત થવાથી સાંધાના દુખાવા, ચિંતા અને ચામડીનું સુકાવું થાય છે.' : 'शरीर की गति, श्वास, रक्त परिसंचरण और तंत्रिका तंत्र को नियंत्रित करता है। असंतुलित होने पर जोड़ों का दर्द, चिंता और रूखी त्वचा होती है।'}
                </p>
              </div>

              {/* Pitta */}
              <div className="bg-white p-8 rounded-[2.5rem] border-t-8 border-red-500 shadow-lg hover:-translate-y-2 hover:shadow-2xl transition-all duration-500 group">
                <div className="text-6xl mb-6 bg-red-50 w-20 h-20 flex items-center justify-center rounded-3xl group-hover:scale-110 transition-transform">🔥</div>
                <h3 className="text-2xl font-bold text-stone-800 mb-4 serif-font">
                  {lang === 'en' ? 'Pitta (Fire & Water)' : lang === 'gu' ? 'પિત્ત દોષ (અગ્નિ અને જળ)' : 'पित्त दोष (अग्नि और जल)'}
                </h3>
                <p className="text-stone-600 font-medium leading-relaxed text-lg">
                  {lang === 'en' ? 'Governs digestion, metabolism, energy production, and intelligence. Imbalance leads to acidity, anger, inflammation, and ulcers.' : lang === 'gu' ? 'પાચન, ચયાપચય (Metabolism), શરીરમાં ઉર્જા ઉત્પાદન અને બુદ્ધિનું સંચાલન કરે છે. અસંતુલિત થવાથી એસિડિટી, ક્રોધ, બળતરા અને અલ્સર થઈ શકે છે.' : 'पाचन, चयापचय, शरीर में ऊर्जा उत्पादन और बुद्धि का प्रबंधन करता है। असंतुलित होने से एसिडिटी, क्रोध, जलन और अल्सर हो सकता है।'}
                </p>
              </div>

              {/* Kapha */}
              <div className="bg-white p-8 rounded-[2.5rem] border-t-8 border-emerald-500 shadow-lg hover:-translate-y-2 hover:shadow-2xl transition-all duration-500 group">
                <div className="text-6xl mb-6 bg-emerald-50 w-20 h-20 flex items-center justify-center rounded-3xl group-hover:scale-110 transition-transform">🌍</div>
                <h3 className="text-2xl font-bold text-stone-800 mb-4 serif-font">
                  {lang === 'en' ? 'Kapha (Earth & Water)' : lang === 'gu' ? 'કફ દોષ (પૃથ્વી અને જળ)' : 'कफ दोष (पृथ्वी और जल)'}
                </h3>
                <p className="text-stone-600 font-medium leading-relaxed text-lg">
                  {lang === 'en' ? 'Provides physical structure, lubrication, immunity, and emotional calmness. Excess Kapha causes lethargy, weight gain, and congestion.' : lang === 'gu' ? 'શરીરને બંધારણ, સ્નિગ્ધતા (Lubrication), મજબૂત રોગપ્રતિકારક શક્તિ અને માનસિક શાંતિ આપે છે. વધવાથી આળસ, વજન વધવું અને શરદી-ખાંસી થાય છે.' : 'शरीर को संरचना, स्नेहन, मजबूत प्रतिरक्षा और मानसिक शांति प्रदान करता है। बढ़ने से आलस, वजन बढ़ना और सर्दी-खांसी होती है।'}
                </p>
              </div>
            </div>
          </section>
          {/* ========================================================= */}
          
          {/* Motivation Section */}
          <div className="bg-gradient-to-br from-stone-900 to-emerald-950 rounded-[3rem] p-8 md:p-16 text-white shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 blur-[80px] rounded-full -mr-20 -mt-20 pointer-events-none"></div>
            
            <h2 className="text-3xl md:text-4xl font-bold mb-12 serif-font text-center text-amber-400">{t.inspireTitle}</h2>
            
            <div className="grid md:grid-cols-2 gap-10 relative z-10">
              <div className="bg-white/5 p-8 md:p-10 rounded-[2rem] backdrop-blur-md border border-white/10 hover:bg-white/10 transition-colors">
                <h3 className="text-xl md:text-2xl font-bold text-white mb-6 flex items-center gap-3">
                  <span className="bg-emerald-800 p-2 rounded-xl text-xl">👨‍⚕️</span> {t.scholars}
                </h3>
                <p className="text-stone-300 leading-relaxed font-medium text-lg italic">{t.scholarsDesc}</p>
              </div>
              <div className="bg-white/5 p-8 md:p-10 rounded-[2rem] backdrop-blur-md border border-white/10 hover:bg-white/10 transition-colors">
                <h3 className="text-xl md:text-2xl font-bold text-white mb-6 flex items-center gap-3">
                  <span className="bg-amber-600 p-2 rounded-xl text-xl">🌿</span> {t.seekers}
                </h3>
                <p className="text-stone-300 leading-relaxed font-medium text-lg italic">{t.seekersDesc}</p>
              </div>
            </div>
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="w-full text-center py-12 border-t border-stone-200 bg-white">
        <div className="flex justify-center gap-8 text-sm font-bold text-stone-400 mb-6">
          <a href="/privacy.html" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-800 transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-emerald-800 transition-colors">Terms of Service</a>
        </div>
        <p className="text-xs text-stone-300 uppercase tracking-widest font-black">© 2026 Vaidya Guru. Dedicated to Ancient Wisdom.</p>
      </footer>
      
    </div>
  );
};
