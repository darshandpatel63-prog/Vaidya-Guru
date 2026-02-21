// આ ફાઈલમાં આપણી એપનો બધો ડેટા (પુસ્તકો, વિડીયો, PDF લિંક્સ) છે.
// અહીંથી MBBS, BHMS અને નર્સિંગના પુસ્તકો કાઢીને માત્ર BAMS નો જ ડેટા રાખ્યો છે.

import { Book, CourseLevel, Language, StudyMaterial } from './types';

// ==========================================
// EXTRA STUDY MATERIALS (વધારાનું સાહિત્ય)
// ==========================================
export const MOCK_MATERIALS: StudyMaterial[] = [
  // 1. SAMHITA ADHYAYAN
  {
    id: 'samhita-1',
    title: 'Astanga Hridaya Sutrasthana Ch 1',
    subject: 'Samhita Adhyayan',
    type: 'video',
    url: '#', 
    description: 'Ayushkamiya Adhyaya explanation.'
  },
  {
    id: 'samhita-2',
    title: 'Charaka Samhita Intro Notes',
    subject: 'Samhita Adhyayan',
    type: 'pdf',
    url: '#', 
    description: 'Notes on Sutrasthana basics.'
  },

  // 2. SANSKRITAM
  {
    id: 'sanskrit-1',
    title: 'Maheshwar Sutra (Grammar)',
    subject: 'Sanskrit',
    type: 'video',
    url: '#',
    description: 'Basic grammar rules video.'
  },
  {
    id: 'sanskrit-2',
    title: 'Sanskrit_Grammar_Cases_and_Roles',
    subject: 'Sanskrit',
    type: 'pdf',
    url: 'https://drive.google.com/file/d/1ftL29mBE-LfBfuKdAAICrMizHp9kAsNj/view?usp=drivesdk',
    description: 'Sanskrit_Grammar_Cases_and_Roles.'
  },

  // 3. PADARTHA VIJNANA
  {
    id: 'padartha-1',
    title: 'shrishti utpati kram short note',
    subject: 'Padartha Vijnana',
    type: 'photo',
    url: 'http://youtube.com/post/UgkxqxJH_DHAQ1B3evDapj551vcUQOXWTEGb?si=TQZdt6S_-f8fVzmd',
    description: 'shrishti utpati kram short notes.'
  },
  {
    id: 'padartha-2',
    title: 'According to ayurveda Shrishti utpati cram',
    subject: 'Padartha Vijnana',
    type: 'video',
    url: 'https://youtu.be/pJ6Ypf6MGsk?si=jHuaznaSe60AWKdj',
    description: 'in detail Study of Shrishti utpati kram in youtube.'
  },

  // 4. KRIYA SHARIRA (Physiology)
  {
    id: 'kriya-1',
    title: 'Tridosha Concept Video',
    subject: 'Kriya Sharira',
    type: 'video',
    url: '#',
    description: 'Vata Pitta Kapha explained.'
  },
  {
    id: 'Kriya Sharira-pdf-1',         
    title:'(PA-1)Elements_Doshas_Health ',
    subject: 'Kriya sharira',  
    type: 'pdf',           
    url: 'https://drive.google.com/file/d/1-VcxvKHGGkqoIIQIKN0fvENEfVDBCXE3/view?usp=drivesdk',  
    description: 'Pa-1 short notes'
  },

  // 5. RACHANA SHARIR (Anatomy)
  {
    id: 'rachana-1',
    title: 'Bone Skeletons Images',
    subject: 'Rachana Sharir',
    type: 'photo',
    url: '#',
    description: 'Human skeleton labeling.'
  }
];

// ==========================================
// BAMS BOOKS (માત્ર આયુર્વેદના જ પુસ્તકો)
// ==========================================
export const MOCK_BOOKS: Book[] = [
  // 1st Year (પ્રથમ વર્ષ)
  {
    id: 'bams1-padartha',
    title: 'Padartha Vigyan (પદાર્થ વિજ્ઞાન)',
    author: 'Acharya Ravi',
    subject: 'Fundamental Principles',
    level: CourseLevel.UG1,
    language: Language.GUJARATI,
    coverImage: 'https://images.unsplash.com/photo-1606293926075-69a00fb88808?auto=format&fit=crop&q=80&w=400',
    sthanas: [
      {
        id: 'pv-s1',
        title: 'Ayurveda Nirupana',
        adhyayas: [
          {
            id: 'pv-a1',
            number: 1,
            title: 'Lakshana of Ayu (આયુનાં લક્ષણો)',
            content: {
              [Language.GUJARATI]: `અધ્યાય ૧: આયુર્વેદ નિરૂપણ\nશરીર, ઇન્દ્રિય, સત્વ (મન) અને આત્માના સંયોગને 'આયુ' કહેવાય છે.\nઆયુર્વેદનું પ્રયોજન: ૧. સ્વસ્થ વ્યક્તિના સ્વાસ્થ્યનું રક્ષણ કરવું. ૨. રોગીના રોગનું નિવારણ કરવું.`,
              [Language.ENGLISH]: `Chapter 1: Definition of Ayu\nAyu (Life) is the combination of Sharira (Body), Indriya (Senses), Satva (Mind), and Atma (Soul).\nAim: To maintain health of the healthy and cure the diseased.`,
              [Language.HINDI]: `अध्याय १: आयुर्वेद निरूपण\nशरीर, इन्द्रिय, सत्व (मन) और आत्मा के संयोग को 'आयु' कहते हैं।\nप्रयोजन: १. स्वस्थ व्यक्ति के स्वास्थ्य की रक्षा करना। २. रोगी के रोग का निवारण करना।`
            }
          }
        ]
      }
    ]
  },
  {
    id: 'bams1-kriya',
    title: 'Kriya Sharir (ક્રિયા શારીર)',
    author: 'Vagbhata',
    subject: 'Human Physiology',
    level: CourseLevel.UG1,
    language: Language.GUJARATI,
    coverImage: 'https://images.unsplash.com/photo-1579684385180-1ea55f9f8d55?auto=format&fit=crop&q=80&w=400',
    sthanas: [
      {
        id: 'ks-s1',
        title: 'Dosha Vigyan',
        adhyayas: [
          {
            id: 'ks-a1',
            number: 1,
            title: 'Tridosha (ત્રિદોષ)',
            content: {
              [Language.GUJARATI]: `અધ્યાય ૧: ત્રિદોષ સિદ્ધાંત\nવાત, પિત્ત અને કફ - આ ત્રણ શારીરિક દોષો છે. તે શરીરને ધારણ કરે છે.`,
              [Language.ENGLISH]: `Chapter 1: Tridosha Theory\nVata, Pitta, and Kapha are the three humors that sustain the body.`,
              [Language.HINDI]: `अध्याय १: त्रिदोष सिद्धांत\nवात, पित्त और कफ - ये तीन शारीरिक दोष हैं जो शरीर को धारण करते हैं।`
            }
          }
        ]
      }
    ]
  },
  {
    id: 'bams1-rachana',
    title: 'Rachana Sharir (રચના શારીર)',
    author: 'Sushruta',
    subject: 'Human Anatomy',
    level: CourseLevel.UG1,
    language: Language.GUJARATI,
    coverImage: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&q=80&w=400',
    sthanas: [
      {
        id: 'rs-s1',
        title: 'Asthi & Marma',
        adhyayas: [
          {
            id: 'rs-a1',
            number: 1,
            title: 'Marma Sharir (મર્મ શારીર)',
            content: {
              [Language.GUJARATI]: `અધ્યાય ૧: મર્મ વિજ્ઞાન\nશરીરમાં ૧૦૭ મર્મ સ્થાનો છે જ્યાં પ્રાણ વસે છે. શિર, હૃદય અને બસ્તિ મુખ્ય છે.`,
              [Language.ENGLISH]: `Chapter 1: Marma Points\nThere are 107 Marma points where life energy resides. Head, Heart, and Bladder are vital.`,
              [Language.HINDI]: `अध्याय १: मर्म विज्ञान\nशरीर में १०७ मर्म स्थान होते हैं जहाँ प्राण बसते हैं। शिर, हृदय और बस्ति मुख्य मर्म हैं।`
            }
          }
        ]
      }
    ]
  },

  // 2nd Year (દ્વિતીય વર્ષ)
  {
    id: 'bams2-dg',
    title: 'Dravyaguna Vigyan (દ્રવ્યગુણ)',
    author: 'Priyavrat Sharma',
    subject: 'Pharmacology',
    level: CourseLevel.UG2,
    language: Language.GUJARATI,
    coverImage: 'https://images.unsplash.com/photo-1615485290382-441e4d04fcad?auto=format&fit=crop&q=80&w=400',
    sthanas: [
      {
        id: 'dg-s1',
        title: 'Medicinal Plants',
        adhyayas: [
          {
            id: 'dg-a1',
            number: 1,
            title: 'Haritaki (હરડે)',
            content: {
              [Language.GUJARATI]: `અધ્યાય ૧: હરિતકી (Terminalia chebula)\nરસ: લવણ સિવાય પાંચ રસ. ગુણ: લઘુ, રૂક્ષ.\nકર્મ: અનુલોમન, રસાયણ. 'હરડે માતા સમાન હિતકારી છે'.`,
              [Language.ENGLISH]: `Chapter 1: Haritaki\nRasa: Five tastes except Salty. Action: Mild laxative, Rejuvenative.`,
              [Language.HINDI]: `अध्याय १: हरितकी\nरस: लवण रहित पंच रस. गुण: लघु, रूक्ष। कर्म: अनुलोमन, रसायन।`
            }
          }
        ]
      }
    ]
  },
  {
    id: 'bams2-rasa',
    title: 'Rasa Shastra (રસશાસ્ત્ર)',
    author: 'Nagarjuna',
    subject: 'Alchemy',
    level: CourseLevel.UG2,
    language: Language.GUJARATI,
    coverImage: 'https://images.unsplash.com/photo-1624638763599-2c78152e93d4?auto=format&fit=crop&q=80&w=400',
    sthanas: [
      {
        id: 'rasa-s1',
        title: 'Parada Vigyan',
        adhyayas: [
          {
            id: 'rasa-a1',
            number: 1,
            title: 'Parada Samskara',
            content: {
              [Language.GUJARATI]: `અધ્યાય ૧: પારદ અષ્ટાદશ સંસ્કાર\nપારદને શુદ્ધ કરવા માટે ૧૮ સંસ્કાર કરવામાં આવે છે. શુદ્ધ પારદ રોગનાશક છે.`,
              [Language.ENGLISH]: `Chapter 1: Mercury Processing\n18 Samskaras are performed to purify Mercury (Parada).`,
              [Language.HINDI]: `अध्याय १: पारद संस्कार\nपारद शुद्धि के लिए १८ संस्कार किए जाते हैं।`
            }
          }
        ]
      }
    ]
  },

  // 3rd Year (તૃતીય વર્ષ)
  {
    id: 'bams3-prasuti',
    title: 'Prasuti & Stri Roga',
    author: 'Prof. Tiwari',
    subject: 'Gynecology',
    level: CourseLevel.UG3,
    language: Language.GUJARATI,
    coverImage: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=400',
    sthanas: [
      {
        id: 'ps-s1',
        title: 'Garbhini',
        adhyayas: [
          {
            id: 'ps-a1',
            number: 1,
            title: 'Antenatal Care',
            content: {
              [Language.GUJARATI]: `અધ્યાય ૧: ગર્ભિણી પરિચર્યા\nગર્ભવતી સ્ત્રી માટે માસાનુમાસિક આહાર વિહારનું વર્ણન.`,
              [Language.ENGLISH]: `Chapter 1: Antenatal Care\nMonth-wise dietary regimen for pregnant pregnant women.`,
              [Language.HINDI]: `अध्याय १: गर्भिणी परिचर्या\nगर्भवती स्त्री के लिए मासानुमासिक आहार-विहार का वर्णन।`
            }
          }
        ]
      }
    ]
  },
  {
    id: 'bams3-kaumar',
    title: 'Kaumarbhritya (કૌમારભૃત્ય)',
    author: 'Kashyapa Samhita',
    subject: 'Pediatrics',
    level: CourseLevel.UG3,
    language: Language.GUJARATI,
    coverImage: 'https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&q=80&w=400',
    sthanas: [
      {
        id: 'kb-s1',
        title: 'Bal Roga',
        adhyayas: [
          {
            id: 'kb-a1',
            number: 1,
            title: 'Dantodbhava',
            content: {
              [Language.GUJARATI]: `અધ્યાય ૧: દંતોદ્ભવ\nબાળકમાં દાંત આવતી વખતે થતા ઉપદ્રવો: જ્વર, અતિસાર.`,
              [Language.ENGLISH]: `Chapter 1: Teething\nComplications during dentition in children: Fever, Diarrhea.`,
              [Language.HINDI]: `अध्याय १: दन्तोद्भव\nबच्चों में दाँत निकलते समय होने वाले रोग: ज्वर, अतिसार।`
            }
          }
        ]
      }
    ]
  },

  // 4th Year (ચતુર્થ વર્ષ)
  {
    id: 'bams4-kayachikitsa',
    title: 'Kayachikitsa (કાયચિકિત્સા)',
    author: 'Charaka Samhita',
    subject: 'General Medicine',
    level: CourseLevel.UG4,
    language: Language.GUJARATI,
    coverImage: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=400',
    sthanas: [
      {
        id: 'kc-s1',
        title: 'Jwara',
        adhyayas: [
          {
            id: 'kc-a1',
            number: 1,
            title: 'Jwara Chikitsa',
            content: {
              [Language.GUJARATI]: `અધ્યાય ૧: જ્વર ચિકિત્સા\nજ્વરના પ્રારંભમાં લંઘન (ઉપવાસ) શ્રેષ્ઠ છે.`,
              [Language.ENGLISH]: `Chapter 1: Fever Treatment\nFasting (Langhana) is best at the onset of fever.`,
              [Language.HINDI]: `अध्याय १: ज्वर चिकित्सा\nज्वर के आरम्भ में लंघन (उपवास) श्रेष्ठ है।`
            }
          }
        ]
      }
    ]
  },
  {
    id: 'bams4-shalya',
    title: 'Shalya Tantra (શલ્ય તંત્ર)',
    author: 'Sushruta Samhita',
    subject: 'Surgery',
    level: CourseLevel.UG4,
    language: Language.GUJARATI,
    coverImage: 'https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&q=80&w=400',
    sthanas: [
      {
        id: 'st-s1',
        title: 'Yantra Shastra',
        adhyayas: [
          {
            id: 'st-a1',
            number: 1,
            title: 'Surgical Instruments',
            content: {
              [Language.GUJARATI]: `અધ્યાય ૧: યંત્ર અને શસ્ત્ર\n૧૦૧ યંત્રો અને ૨૦ શસ્ત્રોનું વર્ણન. કંકમુખ યંત્ર પ્રધાન છે.`,
              [Language.ENGLISH]: `Chapter 1: Instruments\nDescription of 101 Yantras and 20 Shastras.`,
              [Language.HINDI]: `अध्याय १: यन्त्र और शस्त्र\n१०१ यन्त्र और २० शस्त्रों का वर्णन। कंकमुख यन्त्र प्रधान है।`
            }
          }
        ]
      }
    ]
  }
];
