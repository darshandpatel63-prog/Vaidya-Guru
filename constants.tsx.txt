
import { Book, CourseLevel, Language, MedicalField } from './types';

export const MOCK_BOOKS: Book[] = [
  // ==========================================
  // BAMS 1st Year (B.A.M.S. First Prof)
  // ==========================================
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
              [Language.GUJARATI]: `અધ્યાય ૧: આયુર્વેદ નિરૂપણ
શરીર, ઇન્દ્રિય, સત્વ (મન) અને આત્માના સંયોગને 'આયુ' કહેવાય છે.
આયુર્વેદનું પ્રયોજન: ૧. સ્વસ્થ વ્યક્તિના સ્વાસ્થ્યનું રક્ષણ કરવું. ૨. રોગીના રોગનું નિવારણ કરવું.`,
              [Language.ENGLISH]: `Chapter 1: Definition of Ayu
Ayu (Life) is the combination of Sharira (Body), Indriya (Senses), Satva (Mind), and Atma (Soul).
Aim: To maintain health of the healthy and cure the diseased.`,
              [Language.HINDI]: `अध्याय १: आयुर्वेद निरूपण
शरीर, इन्द्रिय, सत्व (मन) और आत्मा के संयोग को 'आयु' कहते हैं।
प्रयोजन: १. स्वस्थ व्यक्ति के स्वास्थ्य की रक्षा करना। २. रोगी के रोग का निवारण करना।`
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
              [Language.GUJARATI]: `અધ્યાય ૧: ત્રિદોષ સિદ્ધાંત
વાત, પિત્ત અને કફ - આ ત્રણ શારીરિક દોષો છે. તે શરીરને ધારણ કરે છે.`,
              [Language.ENGLISH]: `Chapter 1: Tridosha Theory
Vata, Pitta, and Kapha are the three humors that sustain the body.`,
              [Language.HINDI]: `अध्याय १: त्रिदोष सिद्धांत
वात, पित्त और कफ - ये तीन शारीरिक दोष हैं जो शरीर को धारण करते हैं।`
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
              [Language.GUJARATI]: `અધ્યાય ૧: મર્મ વિજ્ઞાન
શરીરમાં ૧૦૭ મર્મ સ્થાનો છે જ્યાં પ્રાણ વસે છે. શિર, હૃદય અને બસ્તિ મુખ્ય છે.`,
              [Language.ENGLISH]: `Chapter 1: Marma Points
There are 107 Marma points where life energy resides. Head, Heart, and Bladder are vital.`,
              [Language.HINDI]: `अध्याय १: मर्म विज्ञान
शरीर में १०७ मर्म स्थान होते हैं जहाँ प्राण बसते हैं। शिर, हृदय और बस्ति मुख्य मर्म हैं।`
            }
          }
        ]
      }
    ]
  },
  {
    id: 'bams1-sanskrit',
    title: 'Sanskrit & Ayurved Itihas',
    author: 'Dr. B.K. Gupta',
    subject: 'Language & History',
    level: CourseLevel.UG1,
    language: Language.HINDI,
    coverImage: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=400',
    sthanas: [
      {
        id: 'san-s1',
        title: 'Vyakaran',
        adhyayas: [
          {
            id: 'san-a1',
            number: 1,
            title: 'Maheshwara Sutrani',
            content: {
              [Language.HINDI]: `अध्याय १: माहेश्वर सूत्र
अइउण् । ऋलृक् । एओङ् । ऐऔच् । हयवरट् । लण् ।
ये १४ सूत्र संस्कृत व्याकरण के आधार हैं।`,
              [Language.GUJARATI]: `અધ્યાય ૧: માહેશ્વર સૂત્ર
સંસ્કૃત વ્યાકરણના પાયારૂપ ૧૪ સૂત્રો.`,
              [Language.ENGLISH]: `Chapter 1: Maheshwara Sutras
The 14 foundational sutras of Sanskrit grammar.`
            }
          }
        ]
      }
    ]
  },

  // ==========================================
  // BAMS 2nd Year (B.A.M.S. Second Prof)
  // ==========================================
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
              [Language.GUJARATI]: `અધ્યાય ૧: હરિતકી (Terminalia chebula)
રસ: લવણ સિવાય પાંચ રસ. ગુણ: લઘુ, રૂક્ષ.
કર્મ: અનુલોમન, રસાયણ. 'હરડે માતા સમાન હિતકારી છે'.`,
              [Language.ENGLISH]: `Chapter 1: Haritaki
Rasa: Five tastes except Salty. Action: Mild laxative, Rejuvenative.`,
              [Language.HINDI]: `अध्याय १: हरितकी
रस: लवण रहित पंच रस। गुण: लघु, रूक्ष। कर्म: अनुलोमन, रसायन।`
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
              [Language.GUJARATI]: `અધ્યાય ૧: પારદ અષ્ટાદશ સંસ્કાર
પારદને શુદ્ધ કરવા માટે ૧૮ સંસ્કાર કરવામાં આવે છે. શુદ્ધ પારદ રોગનાશક છે.`,
              [Language.ENGLISH]: `Chapter 1: Mercury Processing
18 Samskaras are performed to purify Mercury (Parada).`,
              [Language.HINDI]: `अध्याय १: पारद संस्कार
पारद शुद्धि के लिए १८ संस्कार किए जाते हैं।`
            }
          }
        ]
      }
    ]
  },
  {
    id: 'bams2-roga',
    title: 'Roga Nidana (રોગ નિદાન)',
    author: 'Madhava Nidana',
    subject: 'Pathology',
    level: CourseLevel.UG2,
    language: Language.GUJARATI,
    coverImage: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=400',
    sthanas: [
      {
        id: 'rn-s1',
        title: 'Nidana Panchaka',
        adhyayas: [
          {
            id: 'rn-a1',
            number: 1,
            title: 'Nidana Panchaka',
            content: {
              [Language.GUJARATI]: `અધ્યાય ૧: નિદાન પંચક
રોગ જાણવા માટેના ૫ સાધનો: નિદાન, પૂર્વરૂપ, રૂપ, ઉપશય અને સંપ્રાપ્તિ.`,
              [Language.ENGLISH]: `Chapter 1: Diagnostic Tools
5 tools to diagnose disease: Etiology, Prodrome, Symptoms, Trial, Pathogenesis.`,
              [Language.HINDI]: `अध्याय १: निदान पंचक
रोग निर्णय के ५ साधन: निदान, पूर्वरूप, रूप, उपशय, सम्प्राप्ति।`
            }
          }
        ]
      }
    ]
  },

  // ==========================================
  // BAMS 3rd Year (B.A.M.S. Third Prof)
  // ==========================================
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
              [Language.GUJARATI]: `અધ્યાય ૧: ગર્ભિણી પરિચર્યા
ગર્ભવતી સ્ત્રી માટે માસાનુમાસિક આહાર વિહારનું વર્ણન.`,
              [Language.ENGLISH]: `Chapter 1: Antenatal Care
Month-wise dietary regimen for pregnant women.`,
              [Language.HINDI]: `अध्याय १: गर्भिणी परिचर्या
गर्भवती स्त्री के लिए मासानुमासिक आहार-विहार का वर्णन।`
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
              [Language.GUJARATI]: `અધ્યાય ૧: દંતોદ્ભવ
બાળકમાં દાંત આવતી વખતે થતા ઉપદ્રવો: જ્વર, અતિસાર.`,
              [Language.ENGLISH]: `Chapter 1: Teething
Complications during dentition in children: Fever, Diarrhea.`,
              [Language.HINDI]: `अध्याय १: दन्तोद्भव
बच्चों में दाँत निकलते समय होने वाले रोग: ज्वर, अतिसार।`
            }
          }
        ]
      }
    ]
  },
  {
    id: 'bams3-swastha',
    title: 'Swasthavritta (સ્વસ્થવૃત્ત)',
    author: 'Dr. Mangala',
    subject: 'Preventive Medicine',
    level: CourseLevel.UG3,
    language: Language.HINDI,
    coverImage: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&q=80&w=400',
    sthanas: [
      {
        id: 'sw-s1',
        title: 'Dinacharya',
        adhyayas: [
          {
            id: 'sw-a1',
            number: 1,
            title: 'Daily Regimen',
            content: {
              [Language.HINDI]: `अध्याय १: दिनचर्या
ब्रह्म मुहूर्त में उठना, दन्तधावन, अभ्यंग, व्यायाम।`,
              [Language.GUJARATI]: `અધ્યાય ૧: દિનચર્યા
બ્રહ્મ મુહૂર્તમાં જાગવું, દાતણ કરવું, તેલ માલિશ, કસરત.`,
              [Language.ENGLISH]: `Chapter 1: Daily Routine
Waking up in Brahma Muhurta, brushing teeth, oil massage, exercise.`
            }
          }
        ]
      }
    ]
  },

  // ==========================================
  // BAMS 4th Year (B.A.M.S. Final Prof)
  // ==========================================
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
              [Language.GUJARATI]: `અધ્યાય ૧: જ્વર ચિકિત્સા
જ્વરના પ્રારંભમાં લંઘન (ઉપવાસ) શ્રેષ્ઠ છે.`,
              [Language.ENGLISH]: `Chapter 1: Fever Treatment
Fasting (Langhana) is best at the onset of fever.`,
              [Language.HINDI]: `अध्याय १: ज्वर चिकित्सा
ज्वर के आरम्भ में लंघन (उपवास) श्रेष्ठ है।`
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
              [Language.GUJARATI]: `અધ્યાય ૧: યંત્ર અને શસ્ત્ર
૧૦૧ યંત્રો અને ૨૦ શસ્ત્રોનું વર્ણન. કંકમુખ યંત્ર પ્રધાન છે.`,
              [Language.ENGLISH]: `Chapter 1: Instruments
Description of 101 Yantras and 20 Shastras.`,
              [Language.HINDI]: `अध्याय १: यन्त्र और शस्त्र
१०१ यन्त्र और २० शस्त्रों का वर्णन। कंकमुख यन्त्र प्रधान है।`
            }
          }
        ]
      }
    ]
  },
  {
    id: 'bams4-pancha',
    title: 'Panchakarma (પંચકર્મ)',
    author: 'Vasant Patil',
    subject: 'Panchakarma',
    level: CourseLevel.UG4,
    language: Language.GUJARATI,
    coverImage: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&q=80&w=400',
    sthanas: [
      {
        id: 'pk-s1',
        title: 'Vamana',
        adhyayas: [
          {
            id: 'pk-a1',
            number: 1,
            title: 'Vamana Vidhi',
            content: {
              [Language.GUJARATI]: `અધ્યાય ૧: વમન કર્મ
કફ દોષને મુખ દ્વારા બહાર કાઢવાની પ્રક્રિયા. વસંત ઋતુમાં શ્રેષ્ઠ.`,
              [Language.ENGLISH]: `Chapter 1: Vamana
Expulsion of Kapha through mouth. Best in Spring season.`,
              [Language.HINDI]: `अध्याय १: वमन कर्म
कफ दोष को मुख द्वारा बाहर निकालने की प्रक्रिया। वसन्त ऋतु में श्रेष्ठ।`
            }
          }
        ]
      }
    ]
  },

  // ==========================================
  // MBBS Courses
  // ==========================================
  {
    id: 'mbbs-anat',
    title: 'Gray\'s Anatomy',
    author: 'Henry Gray',
    subject: 'Human Anatomy (MBBS)',
    level: CourseLevel.UG1,
    language: Language.ENGLISH,
    coverImage: 'https://images.unsplash.com/photo-1530210124550-912dc1381cb8?auto=format&fit=crop&q=80&w=400',
    sthanas: [
      {
        id: 'mb-an-s1',
        title: 'General Anatomy',
        adhyayas: [
          {
            id: 'mb-an-a1',
            number: 1,
            title: 'Introduction',
            content: {
              [Language.ENGLISH]: `Chapter 1: Introduction to Anatomy
Anatomical positions, planes, and terms of movement.`,
              [Language.GUJARATI]: `અધ્યાય ૧: શરીર રચના પરિચય
એનાટોમિકલ પોઝિશન અને હલનચલનના પ્રકારો.`,
              [Language.HINDI]: `अध्याय १: शरीर रचना परिचय
एनाटॉमिकल पोजीशन और गतिविधियों के प्रकार।`
            }
          }
        ]
      }
    ]
  },
  {
    id: 'mbbs-physio',
    title: 'Guyton Physiology',
    author: 'Guyton & Hall',
    subject: 'Physiology (MBBS)',
    level: CourseLevel.UG1,
    language: Language.ENGLISH,
    coverImage: 'https://images.unsplash.com/photo-1576086213369-97a306d36557?auto=format&fit=crop&q=80&w=400',
    sthanas: [
      {
        id: 'mb-ph-s1',
        title: 'Cell Physiology',
        adhyayas: [
          {
            id: 'mb-ph-a1',
            number: 1,
            title: 'The Cell',
            content: {
              [Language.ENGLISH]: `Chapter 1: Functional Organization
Structure of the cell, transport across membranes.`,
              [Language.GUJARATI]: `અધ્યાય ૧: કોષ રચના
કોષનું બંધારણ અને પટલ દ્વારા વહન.`,
              [Language.HINDI]: `अध्याय १: कोशिका रचना
कोशिका की संरचना और झिल्ली द्वारा परिवहन।`
            }
          }
        ]
      }
    ]
  },
  {
    id: 'mbbs-med',
    title: 'Harrison\'s Medicine',
    author: 'Harrison',
    subject: 'Internal Medicine (MBBS)',
    level: CourseLevel.UG3,
    language: Language.ENGLISH,
    coverImage: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=400',
    sthanas: [
      {
        id: 'mb-med-s1',
        title: 'Cardiology',
        adhyayas: [
          {
            id: 'mb-med-a1',
            number: 1,
            title: 'Heart Failure',
            content: {
              [Language.ENGLISH]: `Chapter 1: Heart Failure
Pathophysiology, clinical presentation, and management of HF.`,
              [Language.GUJARATI]: `અધ્યાય ૧: હાર્ટ ફેલ્યોર
હૃદયની નિષ્ફળતાના કારણો અને સારવાર.`,
              [Language.HINDI]: `अध्याय १: हार्ट फेलियर
हृदय की विफलता के कारण और उपचार।`
            }
          }
        ]
      }
    ]
  },

  // ==========================================
  // BHMS Courses
  // ==========================================
  {
    id: 'bhms-organon',
    title: 'Organon of Medicine',
    author: 'Samuel Hahnemann',
    subject: 'Homeopathy',
    level: CourseLevel.UG1,
    language: Language.ENGLISH,
    coverImage: 'https://images.unsplash.com/photo-1532153975070-2e9ab71f1b14?auto=format&fit=crop&q=80&w=400',
    sthanas: [
      {
        id: 'bh-org-s1',
        title: 'Principles',
        adhyayas: [
          {
            id: 'bh-org-a1',
            number: 1,
            title: 'Aphorism 1',
            content: {
              [Language.ENGLISH]: `Aphorism 1: The Physician's Mission
The physician's high and only mission is to restore the sick to health, to cure, as it is termed.`,
              [Language.GUJARATI]: `એફોરિઝમ ૧: ચિકિત્સકનું મિશન
ચિકિત્સકનું એકમાત્ર મિશન રોગીને સ્વસ્થ કરવાનું છે.`,
              [Language.HINDI]: `एफोरिज्म १: चिकित्सक का मिशन
चिकित्सक का एकमात्र मिशन रोगी को स्वस्थ करना है।`
            }
          }
        ]
      }
    ]
  },

  // ==========================================
  // Nursing Courses
  // ==========================================
  {
    id: 'nurs-fund',
    title: 'Nursing Fundamentals',
    author: 'Potter & Perry',
    subject: 'Nursing',
    level: CourseLevel.UG1,
    language: Language.ENGLISH,
    coverImage: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=400',
    sthanas: [
      {
        id: 'ns-fn-s1',
        title: 'Basics',
        adhyayas: [
          {
            id: 'ns-fn-a1',
            number: 1,
            title: 'Patient Care',
            content: {
              [Language.ENGLISH]: `Chapter 1: Patient Care
Hygiene, vital signs monitoring, and compassionate care.`,
              [Language.GUJARATI]: `અધ્યાય ૧: દર્દીની સંભાળ
સ્વચ્છતા, વાઈટલ સાિન્સ અને કરુણાપૂર્ણ સંભાળ.`,
              [Language.HINDI]: `अध्याय १: रोगी की देखभाल
स्वच्छता, वाइटल साइन्स और करुणापूर्ण देखभाल।`
            }
          }
        ]
      }
    ]
  }
];
