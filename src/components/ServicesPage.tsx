import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  Search, 
  FileText, 
  CheckCircle2, 
  Activity, 
  ShieldCheck, 
  TrendingUp, 
  BarChart3, 
  PieChart, 
  Briefcase, 
  Cpu, 
  ChevronRight, 
  ArrowRight, 
  DollarSign, 
  Percent, 
  Shield, 
  Calculator, 
  Truck, 
  MapPin, 
  Users, 
  MessageSquare, 
  Phone, 
  Mail, 
  Award, 
  Smile, 
  Clock, 
  Settings, 
  Zap, 
  ArrowUpRight, 
  Send,
  MessageCircle,
  Plus,
  Play,
  Globe,
  Star,
  Users2,
  BookmarkCheck,
  Building,
  Anchor,
  FileCheck2,
  Coins,
  Check,
  AlertCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// Counter component for animated statistics
function AnimatedCounter({ target, suffix = '', prefix = '' }: { target: number; suffix?: string; prefix?: string }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = target;
    if (start === end) return;

    const totalDuration = 2000; // 2 seconds
    const incrementTime = Math.max(Math.floor(totalDuration / end), 20);
    
    const timer = setInterval(() => {
      start += Math.ceil(end / 100);
      if (start >= end) {
        clearInterval(timer);
        setCount(end);
      } else {
        setCount(start);
      }
    }, incrementTime);

    return () => clearInterval(timer);
  }, [target]);

  return (
    <span className="font-extrabold text-3xl sm:text-4xl text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-blue-400">
      {prefix}{count.toLocaleString()}{suffix}
    </span>
  );
}

interface ServicesPageProps {
  lang: 'RU' | 'KG' | 'EN';
  onBackToCatalog: () => void;
  onNavigateToView: (view: string) => void;
}

export function ServicesPage({ lang, onBackToCatalog, onNavigateToView }: ServicesPageProps) {
  // Navigation mapping translations
  const t = {
    RU: {
      title: "Каталог Премиум Услуг",
      subtitle: "Полная экосистема для покупки, импорта, проверки и управления автомобилями с искусственным интеллектом",
      back: "В каталог",
      autoImportTitle: "1. Автомобильный Импорт",
      autoImportDesc: "Эксклюзивный доступ к международным дилерским сетям и подбору автомобилей «под ключ» с гарантией качества",
      aiServicesTitle: "2. Интеллектуальные AI Сервисы",
      aiServicesDesc: "Инновационные решения на базе нейросетей для анализа рынка, здоровья авто, поддержки продаж и автоматизации дилеров",
      verificationTitle: "3. Проверка и Верификация",
      verificationDesc: "Детальный юридический и технический аудит истории любого транспортного средства перед покупкой",
      financialTitle: "4. Финансовые Услуги",
      financialDesc: "Гибкие лизинговые программы, выгодное автокредитование и мгновенный расчет всех затрат",
      auctionsTitle: "5. Международные Автоаукционы",
      auctionsDesc: "Прямой доступ к торгам на крупнейших площадках мира с поддержкой профессиональных байеров",
      logisticsTitle: "6. Интеллектуальная Логистика",
      logisticsDesc: "Прозрачное экспедирование грузов от зарубежных портов до Бишкека с пошаговым отслеживанием статуса",
      dealerSolutionsTitle: "7. Решения для Автосалонов и Дилеров",
      dealerSolutionsDesc: "Инструменты автоматизации бизнес-процессов, цифровой аналитики и управления клиентской базой",
      whyChooseTitle: "8. Почему выбирают AutoHub?",
      whyChooseDesc: "Реальные показатели технологического лидерства в сфере автомобильного ритейла Кыргызстана",
      contactTitle: "9. Свяжитесь с Нами",
      contactDesc: "Оставьте заявку, напишите в мессенджеры или проконсультируйтесь с вашим персональным AI-менеджером",
      requestCallback: "Заказать обратный звонок",
      liveChat: "Интерактивный AI Консультант",
      contactManager: "Связаться с менеджером",
      orderNow: "Заказать сейчас",
      openAI: "Открыть AI Модуль",
      checkVehicle: "Проверить VIN",
      downloadReport: "Скачать образец PDF",
      calculate: "Рассчитать стоимость",
      apply: "Подать заявку",
      openDashboard: "Открыть дашборд",
      statImported: "Импортировано авто",
      statReports: "Проверено отчетов VIN",
      statDealers: "Дилеров-партнеров",
      statDeliveries: "Успешных доставок",
      statSatisfaction: "Канааттануу деңгээли (CSAT)",
      statAccuracy: "Точность предсказаний AI",
      successMsg: "Ваша заявка успешно отправлена! Наш менеджер свяжется с вами в течение 10 минут.",
      chatWelcome: "Саламатсызбы! Я ваш интерактивный AI-помощник AutoHub. Чем я могу помочь вам сегодня?",
      chatPlaceholder: "Напишите ваш вопрос...",
      vinPlaceholder: "Введите 17-значный VIN-код...",
      vinAlert: "Отчет сформирован успешно! PDF образец доступен.",
      customsCalcTitle: "Калькулятор растаможки (Экспресс-расчет)",
      deliveryCalcTitle: "Калькулятор доставки в Бишкек",
      volumeLabel: "Объем двигателя (куб. см)",
      yearLabel: "Год выпуска",
      fuelLabel: "Тип топлива",
      petrol: "Бензин",
      diesel: "Дизель",
      electric: "Электромобиль (0% пошлина!)",
      calcBtn: "Рассчитать",
      resultLabel: "Итого к оплате (приблизительно):",
      portLabel: "Порт отправления",
      chinaPort: "Урумчи / Кашгар (Китай) - $1,200",
      koreaPort: "Инчхон (Южная Корея) - $2,100",
      japanPort: "Йокогама (Япония) - $2,500",
      usaPort: "Клайпеда / Хьюстон (США) - $3,800",
      ctaHeadline: "Всё, что вам нужно для покупки, импорта и управления автомобилями — на единой AI-платформе.",
      startAIConsult: "Начать AI-Консультацию",
    },
    KG: {
      title: "Премиум кызматтар каталогу",
      subtitle: "Искусстволук интеллект менен унааларды сатып алуу, импорттоо, текшерүү жана башкаруу үчүн толук экосистема",
      back: "Каталогко",
      autoImportTitle: "1. Автомобилдик импорт",
      autoImportDesc: "Эл аралык дилердик тармактарга жана сапат кепилдиги менен даяр унааларды тандоого эксклюзивдүү мүмкүнчүлүк",
      aiServicesTitle: "2. Интеллектуалдык AI кызматтары",
      aiServicesDesc: "Рынокту талдоо, унаанын абалын баалоо, сатууну колдоо жана дилерлерди автоматташтыруу үчүн нейротармак чечимдери",
      verificationTitle: "3. Текшерүү жана верификация",
      verificationDesc: "Сатып алуудан мурун каалаган транспорт каражатынын тарыхын деталдуу юридикалык жана техникалык текшерүү",
      financialTitle: "4. Финансылык кызматтар",
      financialDesc: "Ийкемдүү лизингдик программалар, пайдалуу автонасыялар жана бардык чыгымдарды тез эсептөө",
      auctionsTitle: "5. Эл аралык автоаукциондор",
      auctionsDesc: "Профессионалдуу байерлердин колдоосу менен дүйнөнүн ири аянтчаларындагы тооруктарга түз кирүү",
      logisticsTitle: "6. Интеллектуалдык логистика",
      logisticsDesc: "Чет өлкөлүк порттордон Бишкекке чейинки жүктөрдү кадам сайын көзөмөлдөө менен ачык жеткирүү",
      dealerSolutionsTitle: "7. Автосалондор жана дилерлер үчүн чечимдер",
      dealerSolutionsDesc: "Бизнес-процесстерди автоматташтыруу, санариптик аналитика жана кардарлар базасын башкаруу куралдары",
      whyChooseTitle: "8. Эмне үчүн AutoHub тандашат?",
      whyChooseDesc: "Кыргызстандын автомобиль ритейли чөйрөсүндөгү технологиялык лидерликтин реалдуу көрсөткүчтөрү",
      contactTitle: "9. Биз менен байланышыңыз",
      contactDesc: "Сурам калтырыңыз, мессенджерлерге жазыңыз же жеке AI-менеджериңизден кеңеш алыңыз",
      requestCallback: "Артка чалууга буйрутма берүү",
      liveChat: "Интерактивдүү AI кеңешчиси",
      contactManager: "Менеджер менен байланышуу",
      orderNow: "Азыр буйрутма берүү",
      openAI: "AI модулду ачуу",
      checkVehicle: "VIN текшерүү",
      downloadReport: "PDF үлгүсүн жүктөө",
      calculate: "Баасын эсептөө",
      apply: "Арыз берүү",
      openDashboard: "Панелди ачуу",
      statImported: "Импорттолгон унаалар",
      statReports: "Текшерилген VIN отчеттору",
      statDealers: "Өнөктөш дилерлер",
      statDeliveries: "Ийгиликтүү жеткирилген унаалар",
      statSatisfaction: "Канааттануу деңгээли (CSAT)",
      statAccuracy: "AI тактыгы",
      successMsg: "Сиздин сурооңуз ийгиликтүү жөнөтүлдү! Менеджерибиз 10 мүнөттүн ичинде байланышат.",
      chatWelcome: "Саламатсызбы! Мен сиздин AutoHub интерактивдүү AI жардамчыңызмын. Бүгүн сизге кандай жардам бере алам?",
      chatPlaceholder: "Сурооңузду жазыңыз...",
      vinPlaceholder: "17 орундуу VIN-кодду жазыңыз...",
      vinAlert: "Отчет ийгиликтүү даярдалды! PDF үлгүсү жеткиликтүү.",
      customsCalcTitle: "Бажы төлөмдөрүнүн калькулятору",
      deliveryCalcTitle: "Бишкекке жеткирүү калькулятору",
      volumeLabel: "Кыймылдаткычтын көлөмү (куб. см)",
      yearLabel: "Чыккан жылы",
      fuelLabel: "Күйүүчү майдын түрү",
      petrol: "Бензин",
      diesel: "Дизель",
      electric: "Электромобиль (0% бажы төлөмү!)",
      calcBtn: "Эсептөө",
      resultLabel: "Төлөөгө жалпы сумма (болжол менен):",
      portLabel: "Жөнөтүлүүчү порт",
      chinaPort: "Урумчи / Кашгар (Кытай) - $1,200",
      koreaPort: "Инчхон (Түштүк Корея) - $2,100",
      japanPort: "Йокогама (Япония) - $2,500",
      usaPort: "Клайпеда / Хьюстон (АКШ) - $3,800",
      ctaHeadline: "Унаа сатып алуу, импорттоо жана башкаруу үчүн керектүү нерселердин баары — бирдиктүү AI платформасында.",
      startAIConsult: "AI-Кеңеш баштоо",
    },
    EN: {
      title: "Premium Services Catalog",
      subtitle: "The ultimate AI-driven ecosystem for sourcing, importing, verifying, and managing vehicles",
      back: "To Catalog",
      autoImportTitle: "1. International Auto Import",
      autoImportDesc: "Direct turnkey acquisition of imported vehicles from worldwide logistics networks with certification guarantee",
      aiServicesTitle: "2. Intelligent AI Services",
      aiServicesDesc: "Neural network intelligence for real-time market prediction, auto health check, sales coaching, and corporate analytics",
      verificationTitle: "3. Verification & Safety Auditing",
      verificationDesc: "Exhaustive legal history databases, accident registries, and physical condition diagnostics prior to purchase",
      financialTitle: "4. Premium Financial Services",
      financialDesc: "Custom tailored auto leasing products, direct bank credit approvals, and instant fiscal calculator suites",
      auctionsTitle: "5. Global Auto Auctions",
      auctionsDesc: "Live bidding channels and proxy buying support across major platforms in North America, Asia, and Europe",
      logisticsTitle: "6. Seamless End-to-End Logistics",
      logisticsDesc: "Coordinated ocean and overland freight tracking from initial dispatch port straight to Bishkek customs hubs",
      dealerSolutionsTitle: "7. Corporate Dealership Solutions",
      dealerSolutionsDesc: "Custom client CRM hubs, predictive CEO decision dashboards, and targeted neural marketing automated copywriters",
      whyChooseTitle: "8. Why Automotive Partners Trust AutoHub",
      whyChooseDesc: "Key performance indicators establishing our technological dominance in the Kyrgyz auto import market",
      contactTitle: "9. Executive Communications",
      contactDesc: "Get in touch directly via priority instant messengers, phone request, or consult with our trained active AI sales manager",
      requestCallback: "Request Call",
      liveChat: "Interactive AI Advisor",
      contactManager: "Connect with Manager",
      orderNow: "Order Now",
      openAI: "Open AI Module",
      checkVehicle: "Check VIN",
      downloadReport: "Download Sample PDF",
      calculate: "Calculate Cost",
      apply: "Apply Now",
      openDashboard: "Open Dashboard",
      statImported: "Imported Vehicles",
      statReports: "Verified VIN Reports",
      statDealers: "Partner Dealerships",
      statDeliveries: "Successful Shipments",
      statSatisfaction: "Customer Satisfaction (CSAT)",
      statAccuracy: "AI Score Accuracy",
      successMsg: "Your inquiry has been logged successfully! An executive advisor will connect within 10 minutes.",
      chatWelcome: "Hello! I am your interactive AutoHub AI concierge. How can I assist you with your premium vehicle sourcing today?",
      chatPlaceholder: "Type your query here...",
      vinPlaceholder: "Enter 17-character VIN code...",
      vinAlert: "Verification generated successfully! Sample report is prepared.",
      customsCalcTitle: "Customs Duty Calculator (Express)",
      deliveryCalcTitle: "Bishkek Freight Cost Estimate",
      volumeLabel: "Engine Volume (cc)",
      yearLabel: "Manufacturing Year",
      fuelLabel: "Fuel Type",
      petrol: "Petrol / Gas",
      diesel: "Diesel",
      electric: "Electric Vehicle (0% Duty Free!)",
      calcBtn: "Calculate",
      resultLabel: "Estimated cost to pay (Approx):",
      portLabel: "Dispatch Port",
      chinaPort: "Urumqi / Kashgar (China) - $1,200",
      koreaPort: "Incheon (South Korea) - $2,100",
      japanPort: "Yokohama (Japan) - $2,500",
      usaPort: "Klaipeda / Houston (USA) - $3,800",
      ctaHeadline: "Everything You Need For Buying, Sourcing, and Managing Vehicles — In One Single AI Platform.",
      startAIConsult: "Start AI Consultation",
    }
  }[lang];

  // Callback modal
  const [showCallbackModal, setShowCallbackModal] = useState(false);
  const [callbackName, setCallbackName] = useState('');
  const [callbackPhone, setCallbackPhone] = useState('');
  
  // Custom calculator states
  const [showCustomsModal, setShowCustomsModal] = useState(false);
  const [calcVolume, setCalcVolume] = useState('2000');
  const [calcYear, setCalcYear] = useState('2020');
  const [calcFuel, setCalcFuel] = useState('petrol');
  const [calcResult, setCalcResult] = useState<number | null>(null);

  // Delivery calculator states
  const [showDeliveryModal, setShowDeliveryModal] = useState(false);
  const [calcPort, setCalcPort] = useState('china');
  const [deliveryCost, setDeliveryCost] = useState<number | null>(null);

  // VIN check state
  const [showVinModal, setShowVinModal] = useState(false);
  const [vinCode, setVinCode] = useState('');

  // AI Chat concierge states
  const [showChatModal, setShowChatModal] = useState(false);
  const [chatInput, setChatInput] = useState('');
  const [chatMessages, setChatMessages] = useState<{ sender: 'ai' | 'user'; text: string }[]>([
    { sender: 'ai', text: t.chatWelcome }
  ]);

  const [activeCategory, setActiveCategory] = useState('import');

  const categories = [
    {
      id: 'import',
      name: lang === 'RU' ? '🚗 Автоимпорт' : lang === 'KG' ? '🚗 Авто Импорт' : '🚗 Auto Import',
      icon: <Globe className="w-5 h-5 text-blue-400" />,
      desc: lang === 'RU' ? 'Доставка автомобилей под ключ со всего мира' : lang === 'KG' ? 'Дүйнө жүзүнөн унааларды толук жеткирүү' : 'Turnkey international vehicle sourcing and import',
      items: [
        {
          name: lang === 'RU' ? 'Заказ унаа под ключ' : lang === 'KG' ? 'Буйрутма берүү' : 'Order Vehicle',
          desc: lang === 'RU' ? 'Подбор, выкуп и доставка любого авто из-за рубежа с полной финансовой гарантией.' : lang === 'KG' ? 'Чет өлкөдөн каалаган унааны толук финансылык кепилдик менен тандап алуу, сатып алуу жана жеткирүү.' : 'Full sourcing, bidding, and turnkey delivery from international markets.',
          icon: <FileCheck2 className="w-5 h-5 text-blue-400" />,
          actionLabel: lang === 'RU' ? 'Оформить заказ' : lang === 'KG' ? 'Буйрутма берүү' : 'Place Order',
          action: () => onNavigateToView('order-car')
        },
        {
          name: lang === 'RU' ? 'Импорт из Японии 🇯🇵' : lang === 'KG' ? 'Япониядан импорт 🇯🇵' : 'Japan Import 🇯🇵',
          desc: lang === 'RU' ? 'Покупка унаа на USS, TAA, CAA аукционах с оригинальным аукционным листом.' : lang === 'KG' ? 'Оригиналдуу аукцион баракчасы менен USS, TAA, CAA аукциондорунан унаа сатып алуу.' : 'Access closed Japanese bidding channels with certified translations.',
          icon: <Globe className="w-5 h-5 text-red-400" />,
          actionLabel: lang === 'RU' ? 'Выбрать авто' : lang === 'KG' ? 'Унаа издөө' : 'Search Japan',
          action: () => onNavigateToView('auctions')
        },
        {
          name: lang === 'RU' ? 'Импорт из Кореи 🇰🇷' : lang === 'KG' ? 'Кореядан импорт 🇰🇷' : 'Korea Import 🇰🇷',
          desc: lang === 'RU' ? 'Прямой выкуп с дилерских площадок Encar без посредников.' : lang === 'KG' ? 'Ортотомчуларсыз Encar дилердик аянтчаларынан түз сатып алуу.' : 'Premium SUVs and sedans sourced directly from South Korea.',
          icon: <Globe className="w-5 h-5 text-sky-400" />,
          actionLabel: lang === 'RU' ? 'Заказать из Кореи' : lang === 'KG' ? 'Кореядан буйрутма' : 'Order Korea',
          action: () => {
            setShowCallbackModal(true);
            setCallbackName(lang === 'RU' ? 'Заказ из Кореи' : 'Korea Import Sourcing');
          }
        },
        {
          name: lang === 'RU' ? 'Импорт из Китая 🇨🇳' : lang === 'KG' ? 'Кытайдан импорт 🇨🇳' : 'China Import 🇨🇳',
          desc: lang === 'RU' ? 'Поставка премиум электромобилей (BYD, Zeekr, Li) с льготной растаможкой 0%.' : lang === 'KG' ? 'Премиум электромобилдерин (BYD, Zeekr, Li) 0% бажы төлөмү менен жеткирүү.' : 'Leading smart EVs with factory allocation and 0% customs duty rate.',
          icon: <Zap className="w-5 h-5 text-emerald-400" />,
          actionLabel: lang === 'RU' ? 'Заказать электрокар' : lang === 'KG' ? 'Электрокар алуу' : 'Order EV',
          action: () => {
            setShowCallbackModal(true);
            setCallbackName(lang === 'RU' ? 'Импорт из Китая' : 'China EV Import Sourcing');
          }
        },
        {
          name: lang === 'RU' ? 'Импорт из США 🇺🇸' : lang === 'KG' ? 'АКШдан импорт 🇺🇸' : 'USA Import 🇺🇸',
          desc: lang === 'RU' ? 'Безопасная покупка на страховых аукционах Copart/IAAI с доставкой в контейнерах.' : lang === 'KG' ? 'Copart/IAAI камсыздандыруу аукциондорунан коопсуз сатып алуу жана контейнерде жеткирүү.' : 'Safe bidding on Copart & IAAI with secure container freight to Bishkek.',
          icon: <ShieldCheck className="w-5 h-5 text-blue-400" />,
          actionLabel: lang === 'RU' ? 'Подобрать на аукционе' : lang === 'KG' ? 'Аукциондон издөө' : 'Select US Copart',
          action: () => onNavigateToView('auctions')
        }
      ]
    },
    {
      id: 'verification',
      name: lang === 'RU' ? '🔍 Верификация унаа' : lang === 'KG' ? '🔍 Текшерүү' : '🔍 Vehicle Verification',
      icon: <ShieldCheck className="w-5 h-5 text-[#5D9CEC]" />,
      desc: lang === 'RU' ? 'Юридический и технический аудит истории транспортного средства' : lang === 'KG' ? 'Транспорт каражатынын тарыхын юридикалык жана техникалык текшерүү' : 'Exhaustive history auditing and condition check',
      items: [
        {
          name: lang === 'RU' ? 'Проверка VIN-кода' : lang === 'KG' ? 'VIN текшерүү' : 'VIN Check',
          desc: lang === 'RU' ? 'Мгновенный отчет об авариях, залогах и реальном пробеге по базам ЕАЭС и Carfax.' : lang === 'KG' ? 'ЕАЭБ жана Carfax базалары боюнча авариялар, күрөөлөр жана реалдуу жүрүшү тууралуу тез отчет.' : 'Instant accident and mileage reports compiled from international registries.',
          icon: <Search className="w-5 h-5 text-blue-400" />,
          actionLabel: lang === 'RU' ? 'Проверить VIN' : lang === 'KG' ? 'Текшерүү' : 'Run Check',
          action: () => {
            setShowVinModal(true);
          }
        },
        {
          name: lang === 'RU' ? 'История владения (Timeline)' : lang === 'KG' ? 'Унаа тарыхы (Timeline)' : 'Vehicle Timeline',
          desc: lang === 'RU' ? 'Визуальная интерактивная хронология событий в жизни автомобиля.' : lang === 'KG' ? 'Унаанын жашоосундагы окуялардын визуалдык интерактивдүү хронологиясы.' : 'Chronological historical ledger of ownership milestones.',
          icon: <Clock className="w-5 h-5 text-sky-400" />,
          actionLabel: lang === 'RU' ? 'Открыть Timeline' : lang === 'KG' ? 'Хронологияны ачуу' : 'View Timeline',
          action: () => onNavigateToView('vehicle_timeline')
        },
        {
          name: lang === 'RU' ? 'Индекс Доверия (Trust Score)' : lang === 'KG' ? 'Ишеним индекси (Trust Score)' : 'Trust Score',
          desc: lang === 'RU' ? 'Математический балл надежности унаа, рассчитанный ИИ по 45 параметрам.' : lang === 'KG' ? 'ИИ тарабынан 45 параметр боюнча эсептелген унаанын ишенимдүүлүк деңгээли.' : 'Deterministic safety coefficient generated by our trained machine learning model.',
          icon: <Award className="w-5 h-5 text-amber-400" />,
          actionLabel: lang === 'RU' ? 'Рассчитать балл' : lang === 'KG' ? 'Баллды эсептөө' : 'Evaluate Score',
          action: () => onNavigateToView('vehicle_timeline')
        },
        {
          name: lang === 'RU' ? 'ИИ Авто-Доктор (Auto Doctor)' : lang === 'KG' ? 'ИИ Авто-Доктор (Auto Doctor)' : 'AI Auto Doctor',
          desc: lang === 'RU' ? 'Интеллектуальный анализ кодов ошибок OBD-II и подбор запчастей.' : lang === 'KG' ? 'OBD-II ката кодун интеллектуалдык талдоо жана тетиктерди тандоо.' : 'Smart OBD diagnostic model translating error codes into solutions.',
          icon: <Activity className="w-5 h-5 text-emerald-400" />,
          actionLabel: lang === 'RU' ? 'Запустить диагностику' : lang === 'KG' ? 'Диагностиканы баштоо' : 'Start Diagnosis',
          action: () => onNavigateToView('ai-advisor')
        }
      ]
    },
    {
      id: 'ai_platform',
      name: lang === 'RU' ? '🤖 AI Платформа' : lang === 'KG' ? '🤖 AI Платформа' : '🤖 AI Platform',
      icon: <Sparkles className="w-5 h-5 text-amber-400" />,
      desc: lang === 'RU' ? 'Сервисы на базе искусственного интеллекта для анализа и продаж' : lang === 'KG' ? 'Талдоо жана сатуу үчүн жасалма интеллект кызматтары' : 'Neural network suites for market analytics and dealership coaching',
      items: [
        {
          name: lang === 'RU' ? 'Умный ИИ-Советник' : lang === 'KG' ? 'Акылдуу ИИ-Кеңешчи' : 'AI Advisor',
          desc: lang === 'RU' ? 'Поможет выбрать идеальный автомобиль по вашим критериям и бюджету.' : lang === 'KG' ? 'Сиздин талаптарга жана бюджетке ылайык идеалдуу унааны тандоого жардам берет.' : 'Smart assistant matching your lifestyle, budget, and customs requirements.',
          icon: <Sparkles className="w-5 h-5 text-amber-400" />,
          actionLabel: lang === 'RU' ? 'Запустить AI' : lang === 'KG' ? 'AI баштоо' : 'Run Advisor',
          action: () => onNavigateToView('ai-advisor')
        },
        {
          name: lang === 'RU' ? 'ИИ Маркетолог (Marketing AI)' : lang === 'KG' ? 'ИИ Маркетолог (Marketing AI)' : 'Marketing AI',
          desc: lang === 'RU' ? 'Генерация профессиональных рекламных текстов и объявлений для соцсетей за 3 секунды.' : lang === 'KG' ? 'Коомдук тармактар үчүн 3 секундда профессионалдуу жарнама тексттерин жаратуу.' : 'Automated high-conversion copywriting and localized banner generators.',
          icon: <Cpu className="w-5 h-5 text-pink-400" />,
          actionLabel: lang === 'RU' ? 'Генерировать рекламу' : lang === 'KG' ? 'Жарнама жаратуу' : 'Open Marketing AI',
          action: () => onNavigateToView('marketing_ai')
        },
        {
          name: lang === 'RU' ? 'AI Менеджер продаж' : lang === 'KG' ? 'AI Сатуу менеджери' : 'AI Sales Manager',
          desc: lang === 'RU' ? 'Анализ лидов, оценка вероятности сделки и автогенерация скриптов дожима.' : lang === 'KG' ? 'Лиддерди талдоо, келишимдин ийгиликтүү болуусун баалоо жана билдирүү шаблондору.' : 'Predict lead score, closing probabilities, and WhatsApp response templates.',
          icon: <Briefcase className="w-5 h-5 text-indigo-400" />,
          actionLabel: lang === 'RU' ? 'Открыть AI Менеджер' : lang === 'KG' ? 'Менеджерди ачуу' : 'Launch Sales Manager',
          action: () => onNavigateToView('sales_manager')
        },
        {
          name: lang === 'RU' ? 'Панель руководителя (CEO Dashboard)' : lang === 'KG' ? 'Жетекчи панели (CEO Dashboard)' : 'CEO AI Dashboard',
          desc: lang === 'RU' ? 'Интерактивная аналитика продаж, предсказание выручки и трендов рынка.' : lang === 'KG' ? 'Сатуунун интерактивдүү аналитикасы, кирешени жана рынок тренддерин божомолдоо.' : 'Executive revenue graphs, regional demand charts, and predictive business KPIs.',
          icon: <BarChart3 className="w-5 h-5 text-purple-400" />,
          actionLabel: lang === 'RU' ? 'Панель аналитики' : lang === 'KG' ? 'Панелди ачуу' : 'Open CEO Board',
          action: () => onNavigateToView('ceo_dashboard')
        }
      ]
    },
    {
      id: 'logistics',
      name: lang === 'RU' ? '📦 Логистика' : lang === 'KG' ? '📦 Логистика' : '📦 Logistics',
      icon: <Truck className="w-5 h-5 text-sky-400" />,
      desc: lang === 'RU' ? 'Прозрачное экспедирование грузов от портов до Кыргызстана' : lang === 'KG' ? 'Порттордон Кыргызстанга чейин жүктөрдү ачык жеткирүү' : 'Transparent global overland and ocean cargo tracking',
      items: [
        {
          name: lang === 'RU' ? 'Статус заказа' : lang === 'KG' ? 'Буйрутма статусу' : 'Order Status',
          desc: lang === 'RU' ? 'Проверка текущего статуса вашего договора и этапа выполнения заказа.' : lang === 'KG' ? 'Келишимдин учурдагы статусун жана аткарылуу баскычын текшерүү.' : 'Review contract compliance, approval status, and upcoming tasks.',
          icon: <BookmarkCheck className="w-5 h-5 text-blue-400" />,
          actionLabel: lang === 'RU' ? 'Проверить статус' : lang === 'KG' ? 'Статусту текшерүү' : 'Track Order',
          action: () => onNavigateToView('order-tracking')
        },
        {
          name: lang === 'RU' ? 'Живой трекинг на карте' : lang === 'KG' ? 'Картадан байкоо жүргүзүү' : 'Shipping Tracking',
          desc: lang === 'RU' ? 'Интерактивное отслеживание контейнера на карте мира по номеру контейнера.' : lang === 'KG' ? 'Контейнердин номери боюнча дүйнө картасында контейнерди интерактивдүү көзөмөлдөө.' : 'Live visual shipping coordinates mapping the route to Central Asia.',
          icon: <MapPin className="w-5 h-5 text-sky-400" />,
          actionLabel: lang === 'RU' ? 'Карта отслеживания' : lang === 'KG' ? 'Картаны ачуу' : 'Open Live Tracker',
          action: () => onNavigateToView('order-tracking')
        },
        {
          name: lang === 'RU' ? 'Таможенная очистка ЕАЭС' : lang === 'KG' ? 'ЕАЭБ Бажылык тариздөө' : 'Customs Clearance',
          desc: lang === 'RU' ? 'Полное юридическое оформление на таможенных терминалах Бишкека по сетке ЕАЭС.' : lang === 'KG' ? 'Бишкек бажы терминалдарында ЕАЭБ торчосу боюнча толук юридикалык тариздөө.' : 'Hassle-free border documentation handling with local customs brokers.',
          icon: <FileText className="w-5 h-5 text-[#5D9CEC]" />,
          actionLabel: lang === 'RU' ? 'Калькулятор растаможки' : lang === 'KG' ? 'Бажы калькулятору' : 'Calculate Customs',
          action: () => {
            setCalcResult(null);
            setShowCustomsModal(true);
          }
        }
      ]
    },
    {
      id: 'dealer_solutions',
      name: lang === 'RU' ? '💼 Для Автосалонов' : lang === 'KG' ? '💼 Дилердик чечимдер' : '💼 Dealer Solutions',
      icon: <Briefcase className="w-5 h-5 text-purple-400" />,
      desc: lang === 'RU' ? 'Профессиональные B2B решения для масштабирования продаж' : lang === 'KG' ? 'Сатууну кеңейтүү үчүн профессионалдуу B2B чечимдери' : 'Automated B2B enterprise software and partner dealership utilities',
      items: [
        {
          name: lang === 'RU' ? 'Управление клиентами (CRM)' : lang === 'KG' ? 'Кардарларды башкаруу (CRM)' : 'CRM Hub',
          desc: lang === 'RU' ? 'Умная воронка продаж с интеграцией мессенджеров для менеджеров.' : lang === 'KG' ? 'Менеджерлер үчүн мессенджерлер интеграциясы менен акылдуу сатуу воронкасы.' : 'Comprehensive user-profiles, communication history, and active negotiation timelines.',
          icon: <Users className="w-5 h-5 text-purple-400" />,
          actionLabel: lang === 'RU' ? 'Открыть CRM' : lang === 'KG' ? 'CRMди ачуу' : 'Launch CRM',
          action: () => onNavigateToView('crm')
        },
        {
          name: lang === 'RU' ? 'Маркетинговая аналитика' : lang === 'KG' ? 'Маркетингдик аналитика' : 'Analytics Panel',
          desc: lang === 'RU' ? 'Анализ конверсии объявлений и эффективности рекламных каналов.' : lang === 'KG' ? 'Жарнама конверсиясын жана каналдардын натыйжалуулугун талдоо.' : 'Monitor promotional channels, lead metrics, and active listing reach.',
          icon: <TrendingUp className="w-5 h-5 text-indigo-400" />,
          actionLabel: lang === 'RU' ? 'Показать графики' : lang === 'KG' ? 'Графиктерди көрсөтүү' : 'View Analytics',
          action: () => onNavigateToView('ceo_dashboard')
        },
        {
          name: lang === 'RU' ? 'Финансовые отчеты' : lang === 'KG' ? 'Финансылык отчеттор' : 'Reports Generator',
          desc: lang === 'RU' ? 'Автоматическая генерация PDF отчетов о доходности и продажах автосалона.' : lang === 'KG' ? 'Автосалондун кирешелүүлүгү жана сатуулары жөнүндө PDF отчетторун автоматтык түрдө жаратуу.' : 'Instant fiscal declarations and comprehensive PDF sales ledger generation.',
          icon: <FileText className="w-5 h-5 text-[#5D9CEC]" />,
          actionLabel: lang === 'RU' ? 'Создать отчет' : lang === 'KG' ? 'Отчет жаратуу' : 'Generate Ledger',
          action: () => onNavigateToView('crm')
        },
        {
          name: lang === 'RU' ? 'Менеджмент лидов' : lang === 'KG' ? 'Лиддерди башкаруу' : 'Customer Management',
          desc: lang === 'RU' ? 'Интеллектуальная сегментация клиентов по теплоте и автоназначение менеджеров.' : lang === 'KG' ? 'Кардарларды жылуулугу боюнча интеллектуалдык сегментациялоо жана менеджерлерди дайындоо.' : 'Segment cold/warm/hot clients and assign to representatives automatically.',
          icon: <Users2 className="w-5 h-5 text-emerald-400" />,
          actionLabel: lang === 'RU' ? 'Список лидов' : lang === 'KG' ? 'Лиддер тизмеси' : 'Manage Leads',
          action: () => onNavigateToView('sales_manager')
        }
      ]
    },
    {
      id: 'financial',
      name: lang === 'RU' ? '💳 Финансы' : lang === 'KG' ? '💳 Финансы кызматтары' : '💳 Financial Services',
      icon: <Coins className="w-5 h-5 text-emerald-400" />,
      desc: lang === 'RU' ? 'Лизинг, автокредитование и мгновенные калькуляторы затрат' : lang === 'KG' ? 'Лизинг, автокредит жана чыгымдарды тез эсептегичтер' : 'Flexible bank lending, custom leasing products, and pricing calculators',
      items: [
        {
          name: lang === 'RU' ? 'Выгодный автокредит' : lang === 'KG' ? 'Пайдалуу автонасыя' : 'Auto Loan',
          desc: lang === 'RU' ? 'Оформление кредита без лишних документов через банки-партнеры.' : lang === 'KG' ? 'Өнөктөш банктар аркылуу ашыкча документтерсиз кредит алуу.' : 'Affordable partner bank lending programs in Kyrgyz Som starting from 18%.',
          icon: <Percent className="w-5 h-5 text-blue-400" />,
          actionLabel: lang === 'RU' ? 'Рассчитать кредит' : lang === 'KG' ? 'Кредит эсептөө' : 'Calculate Loan',
          action: () => onNavigateToView('calculator')
        },
        {
          name: lang === 'RU' ? 'Премиум лизинг' : lang === 'KG' ? 'Премиум лизинг' : 'Auto Leasing',
          desc: lang === 'RU' ? 'Долгосрочная аренда с последующим выкупом для физлиц и юрлиц.' : lang === 'KG' ? 'Жеке жана юридикалык жактар үчүн кийин сатып алуу укугу менен узак мөөнөттүү ижара.' : 'Optimized tax structure and flexible leasing rates in USD starting from 12.5%.',
          icon: <Coins className="w-5 h-5 text-purple-400" />,
          actionLabel: lang === 'RU' ? 'Подать на лизинг' : lang === 'KG' ? 'Лизингге арыз' : 'Apply Leasing',
          action: () => {
            setShowCallbackModal(true);
            setCallbackName(lang === 'RU' ? 'Заявка на Лизинг' : 'Leasing Application Sourcing');
          }
        },
        {
          name: lang === 'RU' ? 'Калькулятор растаможки ЕАЭС' : lang === 'KG' ? 'Бажы калькулятору' : 'Customs Calculator',
          desc: lang === 'RU' ? 'Быстрый расчет таможенных пошлин ЕАЭС под ключ в сомах и долларах.' : lang === 'KG' ? 'Сом жана доллар менен бажы төлөмдөрүн толук эсептөө.' : 'Instant customs duties evaluation according to official EAEU tariffs.',
          icon: <Calculator className="w-5 h-5 text-amber-400" />,
          actionLabel: lang === 'RU' ? 'Рассчитать пошлину' : lang === 'KG' ? 'Төлөмдү эсептөө' : 'Calculate Duty',
          action: () => {
            setCalcResult(null);
            setShowCustomsModal(true);
          }
        },
        {
          name: lang === 'RU' ? 'Программа Trade-In' : lang === 'KG' ? 'Trade-In программасы' : 'Trade-In',
          desc: lang === 'RU' ? 'Обмен вашего старого автомобиля на новый импортный с зачетом стоимости.' : lang === 'KG' ? 'Эски унааңызды баасын эсепке алуу менен жаңы импорттолгон унаага алмаштыруу.' : 'Instant valuation and exchange of your current car for a freshly imported one.',
          icon: <TrendingUp className="w-5 h-5 text-sky-400" />,
          actionLabel: lang === 'RU' ? 'Оценить свое авто' : lang === 'KG' ? 'Унааны баалоо' : 'Apply Trade-In',
          action: () => {
            setShowCallbackModal(true);
            setCallbackName(lang === 'RU' ? 'Программа Trade-In' : 'Trade-In Request');
          }
        }
      ]
    },
    {
      id: 'support',
      name: lang === 'RU' ? '📞 Поддержка 24/7' : lang === 'KG' ? '📞 Колдоо 24/7' : '📞 Support & Chat',
      icon: <Phone className="w-5 h-5 text-[#5D9CEC]" />,
      desc: lang === 'RU' ? 'Круглосуточная помощь специалистов и интерактивный чат-бот' : lang === 'KG' ? 'Адистердин күнү-түнү жардамы жана интерактивдүү чат-бот' : 'Round-the-clock executive helpdesk and interactive assistant',
      items: [
        {
          name: 'WhatsApp Business',
          desc: lang === 'RU' ? 'Прямая оперативная связь с персональным менеджером в WhatsApp.' : lang === 'KG' ? 'WhatsApp аркылуу жеке менеджер менен түз байланыш.' : 'Direct premium messenger communication with your personal sourcing specialist.',
          icon: <MessageCircle className="w-5 h-5 text-emerald-400" />,
          actionLabel: lang === 'RU' ? 'Написать в WhatsApp' : lang === 'KG' ? 'WhatsApp жазуу' : 'Open WhatsApp Chat',
          action: () => window.open('https://wa.me/996555123456', '_blank')
        },
        {
          name: 'Telegram Premium Support',
          desc: lang === 'RU' ? 'Официальный информационный канал и поддержка клиентов в Telegram.' : lang === 'KG' ? 'Телеграмдагы расмий маалымат каналы жана кардарларды колдоо.' : 'Official broadcast news channel and prompt service inquiries in Telegram.',
          icon: <Send className="w-5 h-5 text-sky-400" />,
          actionLabel: lang === 'RU' ? 'Написать в Telegram' : lang === 'KG' ? 'Telegram жазуу' : 'Open Telegram Support',
          action: () => window.open('https://t.me/autohub_kg', '_blank')
        },
        {
          name: lang === 'RU' ? 'Интерактивный AI чат' : lang === 'KG' ? 'Интерактивдүү AI чат' : 'Live Chat Assistant',
          desc: lang === 'RU' ? 'Получите ответы на любые вопросы об импорте и логистике мгновенно.' : lang === 'KG' ? 'Импорт жана логистика тууралуу каалаган суроолорго тез жооп алыңыз.' : 'Instant automated responses about shipping, customs, or vehicle sourcing.',
          icon: <MessageSquare className="w-5 h-5 text-blue-400" />,
          actionLabel: lang === 'RU' ? 'Запустить чат' : lang === 'KG' ? 'Чатты баштоо' : 'Start Chatting',
          action: () => setShowChatModal(true)
        },
        {
          name: lang === 'RU' ? 'Персональный менеджер' : lang === 'KG' ? 'Жеке менеджер' : 'Contact Manager',
          desc: lang === 'RU' ? 'Закажите обратный звонок, и ведущий эксперт свяжется с вами.' : lang === 'KG' ? 'Кайра чалууга буйрутма бериңиз, биздин эксперт байланышат.' : 'Schedule a detailed custom physical diagnostic review or direct consultation.',
          icon: <Users className="w-5 h-5 text-purple-400" />,
          actionLabel: lang === 'RU' ? 'Заказать звонок' : lang === 'KG' ? 'Чалууну суроо' : 'Request Callback',
          action: () => {
            setShowCallbackModal(true);
            setCallbackName(lang === 'RU' ? 'Консультация с персональным менеджером' : 'Direct Consultation Request');
          }
        }
      ]
    }
  ];

  const handleCallbackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!callbackName || !callbackPhone) return;
    alert(t.successMsg);
    setShowCallbackModal(false);
    setCallbackName('');
    setCallbackPhone('');
  };

  const calculateCustoms = () => {
    const vol = parseFloat(calcVolume) || 0;
    const yr = parseInt(calcYear) || 2020;
    
    if (calcFuel === 'electric') {
      setCalcResult(0); // Zero tax for EV in Kyrgyzstan
      return;
    }

    // Rough approximation formula for Kyrgyz customs
    let ratePerCc = 0.6;
    const age = 2026 - yr;
    if (age < 3) ratePerCc = 1.2;
    else if (age >= 3 && age <= 5) ratePerCc = 0.9;
    else if (age > 5 && age <= 10) ratePerCc = 1.6;
    else ratePerCc = 2.8;

    const baseDuty = vol * ratePerCc;
    const environmentTax = 150; // Eco tax
    const total = baseDuty + environmentTax;
    setCalcResult(Math.round(total));
  };

  const calculateDelivery = () => {
    const portCosts: Record<string, number> = {
      china: 1200,
      korea: 2100,
      japan: 2500,
      usa: 3800
    };
    setDeliveryCost(portCosts[calcPort] || 1500);
  };

  const handleVinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (vinCode.length < 5) return;
    alert(`${t.vinAlert}\nVIN: ${vinCode.toUpperCase()}`);
    setShowVinModal(false);
    setVinCode('');
  };

  const handleSendChatMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    
    const userText = chatInput;
    setChatMessages(prev => [...prev, { sender: 'user', text: userText }]);
    setChatInput('');

    // Dynamic AI auto response in matching language
    setTimeout(() => {
      let aiResponse = "";
      const textLower = userText.toLowerCase();

      if (lang === 'RU') {
        if (textLower.includes('доставк') || textLower.includes('кита') || textLower.includes('коре')) {
          aiResponse = "Доставка из Китая занимает 12-18 дней транзитом через Торугарт/Иркештам. Из Южной Кореи везем морем до Владивостока, затем сеткой по ж/д до Бишкека за 30-35 дней.";
        } else if (textLower.includes('растамож') || textLower.includes('пошлин') || textLower.includes('налог')) {
          aiResponse = "Для электромобилей таможенная ставка составляет 0%! На бензиновые авто расчет зависит от объема двигателя и года выпуска. Попробуйте наш калькулятор на этой странице!";
        } else if (textLower.includes('кредит') || textLower.includes('лизинг')) {
          aiResponse = "Мы сотрудничаем с Бакай Банком, Оптима Банком и Демир Банком. Доступны ставки от 12.5% годовых в долларах и от 18% в сомах.";
        } else {
          aiResponse = `Спасибо за вопрос! AutoHub Kyrgyzstan предлагает комплексную доставку под ключ. Мы можем привезти унаа вашей мечты с полной гарантией. Хотите заказать обратный звонок специалиста?`;
        }
      } else if (lang === 'KG') {
        if (textLower.includes('жетки') || textLower.includes('кытай') || textLower.includes('корея')) {
          aiResponse = "Кытайдан унаа жеткирүү Торугарт же Эркечтам аркылуу 12-18 күндү алат. Кореядан Владивосток аркылуу темир жол менен 30-35 күндө Бишкекке келет.";
        } else if (textLower.includes('бажы') || textLower.includes('төлөм') || textLower.includes('салык')) {
          aiResponse = "Электромобилдер үчүн бажы төлөмү 0%! Башка унааларга кыймылдаткычтын көлөмүнө жана чыккан жылына жараша болот.";
        } else {
          aiResponse = "Сурооңузга чоң рахмат! AutoHub унааларды толук кепилдик менен алып келет. Биздин менеджер сизге чалуусун каалайсызбы?";
        }
      } else {
        if (textLower.includes('shipping') || textLower.includes('china') || textLower.includes('delivery')) {
          aiResponse = "Transit from China via Torugart customs takes about 12-18 days. Freight from South Korea takes 30-35 days via ocean container and railway network.";
        } else if (textLower.includes('customs') || textLower.includes('tax') || textLower.includes('duty')) {
          aiResponse = "Electric vehicles enjoy 0% Customs Duty in Kyrgyzstan. ICE vehicles are calculated based on year of manufacture and cubic volume of the engine.";
        } else {
          aiResponse = "Thank you for reaching out! AutoHub Kyrgyzstan provides premium concierge importing, VIN certification, and auto-leasing. Would you like to schedule a call?";
        }
      }

      setChatMessages(prev => [...prev, { sender: 'ai', text: aiResponse }]);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-[#070a13] text-white font-sans antialiased selection:bg-[#0B3D91] selection:text-white pb-32 pt-28 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      
      {/* Premium Luxury Grid & Glowing Overlays */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_120%_120%_at_50%_-10%,rgba(11,61,145,0.18),rgba(0,0,0,0))] pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-[450px] h-[450px] bg-blue-600/5 rounded-full blur-[140px] pointer-events-none animate-pulse" />
      <div className="absolute bottom-1/4 left-5 w-[400px] h-[400px] bg-sky-500/5 rounded-full blur-[120px] pointer-events-none" />
      
      {/* Decorative luxury abstract lines */}
      <div className="absolute top-48 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[1px] bg-gradient-to-r from-transparent via-blue-500/20 to-transparent" />

      <div className="max-w-7xl mx-auto space-y-16 relative z-10">
        
        {/* TOP TITLE HEADER */}
        <div className="text-center space-y-4 max-w-4xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center space-x-2 bg-blue-500/10 border border-blue-400/20 px-3.5 py-1.5 rounded-full text-xs font-semibold text-[#5D9CEC] uppercase tracking-widest"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>AUTOHUB WORLD-CLASS SERVICES</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight"
          >
            <span className="bg-gradient-to-r from-white via-slate-100 to-blue-400 bg-clip-text text-transparent">
              {t.title}
            </span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 text-base sm:text-lg max-w-3xl mx-auto leading-relaxed"
          >
            {t.subtitle}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="pt-4 flex justify-center gap-4 flex-wrap"
          >
            <button 
              onClick={onBackToCatalog}
              className="px-6 py-3 rounded-full bg-white/5 hover:bg-white/10 text-gray-200 border border-white/10 text-sm font-semibold transition-all flex items-center space-x-2"
            >
              <ArrowRight className="w-4 h-4 rotate-180" />
              <span>{t.back}</span>
            </button>
            <button 
              onClick={() => setShowChatModal(true)}
              className="px-6 py-3 rounded-full bg-gradient-to-r from-blue-700 to-blue-500 hover:from-blue-600 hover:to-blue-400 text-white text-sm font-semibold transition-all flex items-center space-x-2 shadow-lg shadow-blue-500/25 border border-blue-400/20"
            >
              <MessageCircle className="w-4 h-4" />
              <span>{t.startAIConsult}</span>
            </button>
          </motion.div>
        </div>

        {/* INTERACTIVE SOURCING & SERVICES HUB */}
        <div className="bg-[#0c1020]/40 border border-white/10 rounded-3xl p-6 sm:p-8 backdrop-blur-md relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl from-blue-500/10 to-transparent rounded-bl-full pointer-events-none" />
          
          <div className="flex flex-col lg:flex-row gap-8">
            
            {/* Left Sidebar - Categories Switcher */}
            <div className="w-full lg:w-1/3 flex flex-col space-y-3.5">
              <div className="pb-4 border-b border-white/10">
                <span className="text-[#5D9CEC] text-[10px] font-bold uppercase tracking-widest block">NAVIGATIONAL HUB</span>
                <h3 className="text-xl font-black text-white mt-1">
                  {lang === 'RU' ? 'Категории услуг' : lang === 'KG' ? 'Кызмат категориялары' : 'Service Categories'}
                </h3>
              </div>
              
              <div className="flex flex-row lg:flex-col gap-2 overflow-x-auto pb-4 lg:pb-0 lg:overflow-visible scrollbar-none">
                {categories.map((cat) => {
                  const isActive = activeCategory === cat.id;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => setActiveCategory(cat.id)}
                      className={`flex items-center space-x-3.5 px-4.5 py-3 rounded-xl border text-left transition-all shrink-0 lg:shrink ${
                        isActive
                          ? 'bg-[#0B3D91]/30 border-[#0B3D91] text-white shadow-lg shadow-blue-500/5'
                          : 'bg-[#090d19]/40 border-white/5 text-gray-400 hover:bg-white/5 hover:text-white hover:border-white/10'
                      }`}
                    >
                      <div className={`p-2 rounded-lg transition-colors ${isActive ? 'bg-[#0B3D91] text-white' : 'bg-white/5 text-gray-400 group-hover:text-white'}`}>
                        {cat.icon}
                      </div>
                      <div className="min-w-0">
                        <span className="block text-sm font-bold tracking-tight">{cat.name}</span>
                        <span className="hidden lg:block text-[10px] text-gray-400 truncate max-w-[200px] mt-0.5">{cat.desc}</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
            
            {/* Right Display Grid */}
            <div className="flex-1 space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <div>
                  <span className="text-amber-400 text-[10px] font-bold uppercase tracking-widest block">ACTIVE DIRECTORY</span>
                  <h3 className="text-lg font-bold text-white mt-0.5">
                    {categories.find(c => c.id === activeCategory)?.name}
                  </h3>
                </div>
                <span className="text-xs text-gray-500 font-mono">
                  {categories.find(c => c.id === activeCategory)?.items.length} {lang === 'RU' ? 'сервисов найдено' : lang === 'KG' ? 'кызматтар табылды' : 'services found'}
                </span>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <AnimatePresence mode="wait">
                  {categories.find(c => c.id === activeCategory)?.items.map((item, index) => (
                    <motion.div
                      key={item.name}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -15 }}
                      transition={{ delay: index * 0.05, duration: 0.2 }}
                      className="bg-[#090d19]/60 border border-white/10 rounded-2xl p-5 hover:border-[#0B3D91]/40 hover:shadow-2xl hover:shadow-[#0B3D91]/5 transition-all group flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-start justify-between mb-3.5">
                          <div className="p-3 bg-white/5 border border-white/10 rounded-xl text-[#5D9CEC] group-hover:bg-[#0B3D91]/20 group-hover:border-[#0B3D91]/30 transition-all">
                            {item.icon}
                          </div>
                          <span className="text-[9px] font-mono px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-gray-400 group-hover:text-[#5D9CEC] group-hover:bg-[#0B3D91]/10 group-hover:border-[#0B3D91]/20 transition-all uppercase tracking-wider font-bold">
                            ✔ Premium Verified
                          </span>
                        </div>
                        
                        <h4 className="text-base font-bold text-white group-hover:text-blue-400 transition-colors tracking-tight mb-2">
                          {item.name}
                        </h4>
                        
                        <p className="text-gray-400 text-xs leading-relaxed mb-6">
                          {item.desc}
                        </p>
                      </div>
                      
                      <button
                        onClick={item.action}
                        className="w-full py-2.5 rounded-xl bg-white/5 text-gray-300 group-hover:bg-gradient-to-r group-hover:from-blue-700 group-hover:to-blue-500 group-hover:text-white border border-white/5 group-hover:border-transparent text-xs font-bold transition-all flex items-center justify-center space-x-2 shadow-sm"
                      >
                        <span>{item.actionLabel}</span>
                        <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </button>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>
            
          </div>
        </div>

        {/* SECTION 1: AUTO IMPORT */}
        <div className="space-y-6">
          <div className="border-l-4 border-blue-500 pl-4">
            <h2 className="text-xl sm:text-2xl font-black tracking-tight uppercase text-white">{t.autoImportTitle}</h2>
            <p className="text-gray-400 text-xs sm:text-sm mt-1">{t.autoImportDesc}</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: lang === 'RU' ? "Импорт из Японии 🇯🇵" : lang === 'KG' ? "Япониядан импорт 🇯🇵" : "Import from Japan 🇯🇵", desc: lang === 'RU' ? "Доступ к закрытым автоаукционам USS, TAA, CAA с детальной оценкой инспекции." : lang === 'KG' ? "USS, TAA, CAA жабык аукциондорунан унааларды толук текшерүү менен алып келүү." : "Direct shipping from main hubs like Yokohama, Osaka. Certified auction sheet translation included.", icon: <Globe className="w-6 h-6 text-red-400" /> },
              { title: lang === 'RU' ? "Импорт из Кореи 🇰🇷" : lang === 'KG' ? "Кореядан импорт 🇰🇷" : "Import from Korea 🇰🇷", desc: lang === 'RU' ? "Оригинальные дизельные, бензиновые и LPi газовые кроссоверы напрямую из Южной Кореи." : lang === 'KG' ? "Түштүк Кореядан дизель, бензин жана газ LPi кроссоверлерин түз алып келүү." : "Pristine SUVs, hybrid sedans and custom LPI configurations directly sourced from Encar networks.", icon: <Globe className="w-6 h-6 text-sky-400" /> },
              { title: lang === 'RU' ? "Импорт из Китая 🇨🇳" : lang === 'KG' ? "Кытайдан импорт 🇨🇳" : "Import from China 🇨🇳", desc: lang === 'RU' ? "Премиум электромобили BYD, Zeekr, Lixiang. Таможня 0% и быстрая авиа-логистика." : lang === 'KG' ? "BYD, Zeekr, Lixiang премиум электромобилдери. Бажы төлөмү 0% жана тез логистика." : "Trending smart EVs with direct factory allocations, zero custom taxes, and fast land transit.", icon: <Zap className="w-6 h-6 text-emerald-400" /> },
              { title: lang === 'RU' ? "Импорт из США 🇺🇸" : lang === 'KG' ? "АКШдан импорт 🇺🇸" : "Import from USA 🇺🇸", desc: lang === 'RU' ? "Подбор на страховых площадках Copart и IAAI. Безопасная контейнерная доставка в КР." : lang === 'KG' ? "Copart жана IAAI камсыздандыруу аянтчаларынан тандоо. КРга коопсуз контейнердик жеткирүү." : "Pre-purchased title checking, bidding support on Copart & IAAI, with secure container freight.", icon: <ShieldCheck className="w-6 h-6 text-blue-400" /> },
              { title: lang === 'RU' ? "Покупка Дилер-Дилер" : lang === 'KG' ? "Дилер-Дилер соодасы" : "Dealer-to-Dealer Purchase", desc: lang === 'RU' ? "B2B оптовые поставки для автосалонов Бишкека и Оша по сниженным комиссиям." : lang === 'KG' ? "Бишкек жана Ош автосалондору үчүн төмөндөтүлгөн комиссия менен B2B дүң жеткирүү." : "Consolidated custom rates for volume wholesale purchasing from verified international agencies.", icon: <Briefcase className="w-6 h-6 text-purple-400" /> },
              { title: lang === 'RU' ? "Персональный поиск унаа" : lang === 'KG' ? "Жеке унаа издөө" : "Personal Vehicle Search", desc: lang === 'RU' ? "Индивидуальный подбор редких комплектаций по параметрам клиента под ключ." : lang === 'KG' ? "Кардардын талаптарына ылайык сейрек кездешүүчү унааларды жекече издөө." : "AI-driven scouting matching your precise styling preferences, interior layouts, and custom budget.", icon: <Search className="w-6 h-6 text-amber-400" /> }
            ].map((item, idx) => (
              <motion.div 
                key={idx}
                whileHover={{ y: -6, scale: 1.02 }}
                className="bg-[#0d1222]/60 backdrop-blur-md border border-white/10 rounded-2xl p-6 transition-all relative overflow-hidden group hover:border-blue-500/40 hover:shadow-2xl hover:shadow-blue-500/5"
              >
                <div className="absolute right-0 top-0 w-24 h-24 bg-gradient-to-bl from-blue-500/5 to-transparent rounded-bl-full pointer-events-none" />
                <div className="p-3.5 bg-white/5 rounded-2xl w-fit border border-white/5 group-hover:bg-blue-500/10 group-hover:border-blue-500/20 transition-all mb-4">
                  {item.icon}
                </div>
                <h3 className="text-lg font-bold tracking-tight mb-2 text-slate-100 group-hover:text-blue-400 transition-colors">{item.title}</h3>
                <p className="text-gray-400 text-xs leading-relaxed mb-6">{item.desc}</p>
                <button 
                  onClick={() => {
                    setShowCallbackModal(true);
                    setCallbackName(`Sourcing Service: ${item.title}`);
                  }}
                  className="w-full py-2.5 rounded-xl bg-white/5 group-hover:bg-gradient-to-r group-hover:from-blue-700 group-hover:to-blue-500 text-gray-300 group-hover:text-white border border-white/5 group-hover:border-transparent text-xs font-semibold transition-all flex items-center justify-center space-x-2"
                >
                  <span>{t.orderNow}</span>
                  <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </button>
              </motion.div>
            ))}
          </div>
        </div>

        {/* SECTION 2: AI SERVICES */}
        <div className="space-y-6">
          <div className="border-l-4 border-blue-500 pl-4">
            <h2 className="text-xl sm:text-2xl font-black tracking-tight uppercase text-white">{t.aiServicesTitle}</h2>
            <p className="text-gray-400 text-xs sm:text-sm mt-1">{t.aiServicesDesc}</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {[
              { title: lang === 'RU' ? "AI Советник" : lang === 'KG' ? "AI Кеңешчи" : "AI Advisor", view: "ai-advisor", icon: <Sparkles className="w-5 h-5 text-amber-400" />, desc: "Smart contextual assistant recommending models by local utility, customs, and budget." },
              { title: lang === 'RU' ? "AI Авто-Доктор" : lang === 'KG' ? "AI Авто-Доктор" : "AI Auto Doctor", view: "ai-advisor", icon: <Activity className="w-5 h-5 text-emerald-400" />, desc: "Predictive diagnostic model reading check codes and outlining spare part catalogs in Bishkek." },
              { title: lang === 'RU' ? "AI История унаа" : lang === 'KG' ? "AI Унаа тарыхы" : "AI Vehicle Timeline", view: "vehicle_timeline", icon: <Clock className="w-5 h-5 text-sky-400" />, desc: "Aesthetic timeline generating vehicle chronological historical reports with trust badges." },
              { title: lang === 'RU' ? "AI Траст-Балл" : lang === 'KG' ? "AI Траст-балл" : "AI Trust Score", view: "vehicle_timeline", icon: <ShieldCheck className="w-5 h-5 text-blue-400" />, desc: "Deterministic mathematical scoring from 0 to 100 for vehicle legal and technical safety." },
              { title: lang === 'RU' ? "AI Менеджер Продаж" : lang === 'KG' ? "AI Сатуу менеджери" : "AI Sales Manager", view: "sales_manager", icon: <Briefcase className="w-5 h-5 text-indigo-400" />, desc: "Analyze hot leads, predict deal closure, create WhatsApp follow-ups, and strategies." },
              { title: lang === 'RU' ? "AI Маркетинг Студия" : lang === 'KG' ? "AI Маркетинг студиясы" : "AI Marketing Studio", view: "marketing_ai", icon: <Cpu className="w-5 h-5 text-pink-400" />, desc: "Instant professional ad copywriting, Kyrgyz targeted banners, and Telegram promo text." },
              { title: lang === 'RU' ? "CEO AI Панель" : lang === 'KG' ? "CEO AI Панели" : "CEO AI Dashboard", view: "ceo_dashboard", icon: <BarChart3 className="w-5 h-5 text-purple-400" />, desc: "Executive charts, regional sales breakdowns, financial metrics, and KPI predictions." }
            ].map((aiItem, idx) => (
              <motion.div 
                key={idx}
                whileHover={{ y: -4, borderColor: "rgba(93,156,236,0.3)" }}
                className="bg-[#090d19] border border-white/5 rounded-xl p-5 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center space-x-2.5 mb-3">
                    <div className="p-2 bg-white/5 rounded-lg text-blue-400">
                      {aiItem.icon}
                    </div>
                    <h4 className="font-bold text-sm text-slate-100">{aiItem.title}</h4>
                  </div>
                  <p className="text-gray-400 text-xs leading-normal min-h-[48px]">{aiItem.desc}</p>
                </div>
                <button 
                  onClick={() => onNavigateToView(aiItem.view)}
                  className="w-full py-2 rounded-lg bg-[#5D9CEC]/10 hover:bg-[#5D9CEC] text-[#5D9CEC] hover:text-white transition-all text-xs font-semibold mt-4 flex items-center justify-center space-x-1.5"
                >
                  <span>{t.openAI}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </motion.div>
            ))}
          </div>
        </div>

        {/* SECTION 3: VEHICLE VERIFICATION */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-gradient-to-r from-blue-950/20 to-black/20 border border-white/10 rounded-3xl p-8 shadow-xl">
          <div className="lg:col-span-5 space-y-4">
            <span className="text-[#5D9CEC] text-xs font-semibold uppercase tracking-wider">SECURE PLATFORM</span>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight">{t.verificationTitle}</h2>
            <p className="text-gray-400 text-sm leading-relaxed">{t.verificationDesc}</p>
            
            <ul className="space-y-2 text-xs text-gray-300">
              <li className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Мгновенный VIN Check по базам КР, США, Кореи, Европы</span>
              </li>
              <li className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Генерация детальных отчетов по авариям и пробегам</span>
              </li>
              <li className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Умные сертифицированные PDF отчеты с цифровой подписью</span>
              </li>
              <li className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Выездной технический осмотр нашими экспертами в КР</span>
              </li>
            </ul>
          </div>
          
          <div className="lg:col-span-7 bg-[#0d1222]/80 border border-white/10 rounded-2xl p-6 space-y-4">
            <h3 className="text-sm font-bold tracking-wide uppercase text-slate-200">Генератор Истории и Траст-Балла</h3>
            
            <div className="p-4 bg-black/40 rounded-xl space-y-3 border border-white/5">
              <div className="flex justify-between text-xs text-gray-400">
                <span>Последняя проверка</span>
                <span className="font-mono text-emerald-400">BYD Song Plus • 2026</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-bold text-slate-100">AutoHub Trust Rating</span>
                <span className="px-2.5 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-full font-bold text-xs">96 / 100 (Safe)</span>
              </div>
              <div className="w-full bg-white/5 rounded-full h-2">
                <div className="bg-emerald-500 h-2 rounded-full w-[96%]" />
              </div>
            </div>

            <div className="flex gap-3">
              <button 
                onClick={() => setShowVinModal(true)}
                className="flex-1 py-3 rounded-xl bg-gradient-to-r from-blue-700 to-blue-500 hover:from-blue-600 hover:to-blue-400 text-white text-xs font-bold transition-all shadow-md flex items-center justify-center space-x-2"
              >
                <Search className="w-4 h-4" />
                <span>{t.checkVehicle}</span>
              </button>
              <button 
                onClick={() => {
                  alert(lang === 'RU' ? 'Образец PDF отчета отправлен на вашу почту.' : 'Sample PDF Report has been prepared.');
                }}
                className="px-4 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 border border-white/10 text-xs font-bold transition-all flex items-center justify-center space-x-2"
              >
                <FileText className="w-4 h-4" />
                <span>{lang === 'RU' ? 'Скачать PDF' : 'Download Report'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* SECTION 4: FINANCIAL SERVICES */}
        <div className="space-y-6">
          <div className="border-l-4 border-blue-500 pl-4">
            <h2 className="text-xl sm:text-2xl font-black tracking-tight uppercase text-white">{t.financialTitle}</h2>
            <p className="text-gray-400 text-xs sm:text-sm mt-1">{t.financialDesc}</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Auto Loan Card */}
            <div className="bg-[#0d1222]/80 border border-white/10 rounded-2xl p-6 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="p-3 bg-blue-500/10 text-blue-400 border border-blue-500/20 rounded-xl w-fit">
                  <Percent className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-slate-100">Выгодный Автокредит</h3>
                <p className="text-gray-400 text-xs leading-relaxed">
                  Программы финансирования от банков-партнеров КР. Без залога другого имущества, быстрое решение за 1 рабочий день. Ставки от 18% годовых в сомах.
                </p>
              </div>
              <div className="mt-6 flex gap-2">
                <button 
                  onClick={() => {
                    onNavigateToView('calculator');
                  }}
                  className="flex-1 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 border border-white/10 text-xs font-bold transition-all"
                >
                  {t.calculate}
                </button>
                <button 
                  onClick={() => setShowCallbackModal(true)}
                  className="flex-1 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all"
                >
                  {t.apply}
                </button>
              </div>
            </div>

            {/* Auto Leasing Card */}
            <div className="bg-[#0d1222]/80 border border-white/10 rounded-2xl p-6 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="p-3 bg-purple-500/10 text-purple-400 border border-purple-500/20 rounded-xl w-fit">
                  <Coins className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-slate-100">Премиум Автолизинг</h3>
                <p className="text-gray-400 text-xs leading-relaxed">
                  Долгосрочный лизинг унаа для частных лиц и компаний. Минимальный пакет документов, уплата НДС, гибкие графики платежей. Ставки от 12.5% в USD.
                </p>
              </div>
              <div className="mt-6 flex gap-2">
                <button 
                  onClick={() => onNavigateToView('calculator')}
                  className="flex-1 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 border border-white/10 text-xs font-bold transition-all"
                >
                  {t.calculate}
                </button>
                <button 
                  onClick={() => setShowCallbackModal(true)}
                  className="flex-1 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all"
                >
                  {t.apply}
                </button>
              </div>
            </div>

            {/* Quick Customs & Delivery Dialog trigger */}
            <div className="bg-gradient-to-br from-blue-950/20 to-black/30 border border-white/10 rounded-2xl p-6 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="p-3 bg-amber-500/10 text-amber-400 border border-amber-500/20 rounded-xl w-fit">
                  <Calculator className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-slate-100">Калькуляторы пошлин и доставки</h3>
                <p className="text-gray-400 text-xs leading-relaxed">
                  Рассчитайте точные таможенные платежи по сетке ЕАЭС и стоимость транспортировки из Японии, Кореи, Китая, США до Бишкека в один клик.
                </p>
              </div>
              <div className="mt-6 flex gap-2">
                <button 
                  onClick={() => {
                    setCalcResult(null);
                    setShowCustomsModal(true);
                  }}
                  className="flex-1 py-2.5 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 border border-amber-500/20 text-xs font-extrabold transition-all"
                >
                  Растаможка КР
                </button>
                <button 
                  onClick={() => {
                    setDeliveryCost(null);
                    setShowDeliveryModal(true);
                  }}
                  className="flex-1 py-2.5 rounded-xl bg-sky-500/10 hover:bg-sky-500/20 text-sky-400 border border-sky-500/20 text-xs font-extrabold transition-all"
                >
                  Логистика унаа
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 5: AUCTIONS */}
        <div className="space-y-6">
          <div className="border-l-4 border-blue-500 pl-4">
            <h2 className="text-xl sm:text-2xl font-black tracking-tight uppercase text-white">{t.auctionsTitle}</h2>
            <p className="text-gray-400 text-xs sm:text-sm mt-1">{t.auctionsDesc}</p>
          </div>
          
          <div className="bg-[#090d19] border border-white/10 rounded-3xl p-6 sm:p-8 space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { name: "Japan Auctions", sub: "USS, TAA, CAA, JU", rate: "99%" },
                { name: "Korea Auctions", sub: "Lotte, Hyundai Glovis", rate: "98%" },
                { name: "USA Auctions", sub: "Copart, IAAI, Manheim", rate: "95%" },
                { name: "China Auctions", sub: "Direct Factory Liquidation", rate: "99%" }
              ].map((auc, idx) => (
                <div key={idx} className="bg-black/30 border border-white/5 rounded-2xl p-4 text-center">
                  <span className="text-[10px] text-gray-500 font-bold block uppercase tracking-wider mb-1">Direct API Feed</span>
                  <h4 className="font-extrabold text-sm text-slate-100">{auc.name}</h4>
                  <p className="text-gray-400 text-xs mt-1">{auc.sub}</p>
                  <span className="inline-block mt-2.5 px-2 py-0.5 bg-blue-500/10 text-blue-400 border border-blue-500/20 rounded text-[10px] font-mono">Bidding rate {auc.rate}</span>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-4">
              <div className="bg-white/5 border border-white/5 p-5 rounded-2xl space-y-2">
                <div className="flex items-center space-x-2 text-blue-400 font-bold text-sm">
                  <Play className="w-4 h-4 fill-current text-blue-400 animate-pulse" />
                  <span>Live Auction Preview</span>
                </div>
                <p className="text-gray-400 text-xs leading-relaxed">
                  Полноэкранный просмотр активных торгов в реальном времени. Автоматические переводы аукционных листов на русский и кыргызский языки.
                </p>
              </div>

              <div className="bg-white/5 border border-white/5 p-5 rounded-2xl space-y-2">
                <div className="flex items-center space-x-2 text-[#5D9CEC] font-bold text-sm">
                  <BarChart3 className="w-4 h-4" />
                  <span>Auction Analytics</span>
                </div>
                <p className="text-gray-400 text-xs leading-relaxed">
                  Статистика продаж аналогичных моделей за последние 12 месяцев. Помогает определить реальную рыночную цену и не переплачивать на торгах.
                </p>
              </div>

              <div className="bg-white/5 border border-white/5 p-5 rounded-2xl space-y-2">
                <div className="flex items-center space-x-2 text-amber-400 font-bold text-sm">
                  <Sparkles className="w-4 h-4" />
                  <span>AI Auction Assistant</span>
                </div>
                <p className="text-gray-400 text-xs leading-relaxed">
                  Нейросеть прогнозирует выигрышную ставку с точностью до 95%. Оценивает скрытые дефекты кузова по фотографиям повреждений.
                </p>
              </div>
            </div>

            <div className="text-center pt-2">
              <button 
                onClick={() => onNavigateToView('auctions')}
                className="px-8 py-3 rounded-xl bg-gradient-to-r from-blue-700 to-blue-500 hover:from-blue-600 hover:to-blue-400 text-white font-bold text-sm transition-all shadow-lg"
              >
                Открыть Аукционную Платформу
              </button>
            </div>
          </div>
        </div>

        {/* SECTION 6: LOGISTICS */}
        <div className="space-y-6">
          <div className="border-l-4 border-blue-500 pl-4">
            <h2 className="text-xl sm:text-2xl font-black tracking-tight uppercase text-white">{t.logisticsTitle}</h2>
            <p className="text-gray-400 text-xs sm:text-sm mt-1">{t.logisticsDesc}</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {[
              { title: "Order Tracking", desc: "Уникальный трекинг-номер для отслеживания унаа по картам.", icon: <MapPin className="w-5 h-5 text-blue-400" /> },
              { title: "Shipping Status", desc: "Статус погрузки в портах Инчхон, Йокогама, Хьюстон.", icon: <Anchor className="w-5 h-5 text-sky-400" /> },
              { title: "Customs Clearance", desc: "Оформление на таможне КР по льготным ставкам ЕАЭС.", icon: <FileText className="w-5 h-5 text-[#5D9CEC]" /> },
              { title: "Port Delivery", desc: "Транспортировка в крытых автовозах до Bishkek Ring Road.", icon: <Truck className="w-5 h-5 text-indigo-400" /> },
              { title: "Estimated Arrival", desc: "Интеллектуальный расчет точного дня доставки.", icon: <Clock className="w-5 h-5 text-amber-400" /> }
            ].map((log, idx) => (
              <div key={idx} className="bg-[#0c0e18] border border-white/5 p-5 rounded-2xl flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="p-2.5 bg-white/5 text-blue-400 rounded-xl w-fit">
                    {log.icon}
                  </div>
                  <h4 className="font-extrabold text-xs text-slate-200">{log.title}</h4>
                  <p className="text-gray-400 text-[11px] leading-relaxed">{log.desc}</p>
                </div>
                <button 
                  onClick={() => onNavigateToView('order-tracking')}
                  className="w-full text-left text-[10px] font-bold text-[#5D9CEC] hover:text-white transition-colors mt-4 inline-flex items-center space-x-1"
                >
                  <span>Проверить статус</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* SECTION 7: DEALER SOLUTIONS */}
        <div className="bg-gradient-to-b from-[#101428] to-[#070a13] border border-white/10 rounded-3xl p-8 shadow-xl">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
            <div className="space-y-4 max-w-2xl">
              <span className="px-3 py-1 bg-purple-500/10 border border-purple-500/20 text-purple-400 rounded-full text-[10px] font-bold uppercase tracking-widest">Enterprise B2B Package</span>
              <h2 className="text-2xl sm:text-3xl font-black tracking-tight">{t.dealerSolutionsTitle}</h2>
              <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">{t.dealerSolutionsDesc}</p>
              
              <div className="grid grid-cols-2 gap-4 text-xs text-gray-300">
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-purple-400" />
                  <span>Управление лидами в CRM</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-purple-400" />
                  <span>Авто-генерация рекламы</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-purple-400" />
                  <span>Панель CEO AI показателей</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-purple-400" />
                  <span>Финансовые PDF отчеты</span>
                </div>
              </div>
            </div>
            
            <div className="bg-black/40 border border-white/5 rounded-2xl p-6 space-y-4 w-full lg:max-w-md">
              <div className="flex items-center justify-between border-b border-white/5 pb-3">
                <div className="flex items-center space-x-2">
                  <Building className="w-4 h-4 text-purple-400" />
                  <span className="text-xs font-bold text-slate-200">AutoHub Dealer Pro</span>
                </div>
                <span className="text-[10px] bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded border border-emerald-500/20">Active Licence</span>
              </div>
              
              <p className="text-gray-400 text-[11px]">
                Подключите ваш автосалон к крупнейшей торговой дилерской сети Кыргызстана. Размещайте ваши автомобили в каталоге, ведите клиентов и отслеживайте прибыль.
              </p>

              <button 
                onClick={() => onNavigateToView('crm')}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-700 to-purple-500 hover:from-purple-600 hover:to-purple-400 text-white font-bold text-xs transition-all shadow-lg shadow-purple-500/15"
              >
                {t.openDashboard}
              </button>
            </div>
          </div>
        </div>

        {/* SECTION 8: WHY CHOOSE AUTOHUB (ANIMATED STATISTICS) */}
        <div className="space-y-8 bg-[#090d19]/40 border border-white/10 p-8 rounded-3xl relative">
          <div className="text-center space-y-2">
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight uppercase text-white">{t.whyChooseTitle}</h2>
            <p className="text-gray-400 text-xs sm:text-sm">{t.whyChooseDesc}</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 pt-4 text-center">
            {[
              { value: 12500, suffix: "+", label: t.statImported },
              { value: 85000, suffix: "+", label: t.statReports },
              { value: 120, suffix: "+", label: t.statDealers },
              { value: 9840, suffix: "+", label: t.statDeliveries },
              { value: 98.7, suffix: "%", label: t.statSatisfaction },
              { value: 96.5, suffix: "%", label: t.statAccuracy }
            ].map((stat, idx) => (
              <div key={idx} className="space-y-2 p-3 bg-black/20 border border-white/5 rounded-2xl hover:border-blue-500/20 transition-all">
                <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                <span className="block text-[11px] font-semibold text-gray-400 uppercase tracking-tight">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* SECTION 9: CONTACT US */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Channel Cards */}
          <div className="lg:col-span-7 space-y-6">
            <div className="border-l-4 border-blue-500 pl-4">
              <h2 className="text-xl sm:text-2xl font-black tracking-tight uppercase text-white">{t.contactTitle}</h2>
              <p className="text-gray-400 text-xs sm:text-sm mt-1">{t.contactDesc}</p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <a 
                href="https://wa.me/996555123456" 
                target="_blank" 
                rel="noreferrer"
                className="bg-emerald-500/10 border border-emerald-500/20 hover:bg-emerald-500/20 p-5 rounded-2xl transition-all flex items-center space-x-4 group"
              >
                <div className="p-3 bg-emerald-500/20 text-emerald-400 rounded-xl">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-slate-100">WhatsApp Premium Support</h4>
                  <p className="text-gray-400 text-[11px] font-mono mt-0.5">+996 (555) 12-34-56</p>
                </div>
              </a>

              <a 
                href="https://t.me/autohub_kg" 
                target="_blank" 
                rel="noreferrer"
                className="bg-sky-500/10 border border-sky-500/20 hover:bg-sky-500/20 p-5 rounded-2xl transition-all flex items-center space-x-4 group"
              >
                <div className="p-3 bg-sky-500/20 text-sky-400 rounded-xl">
                  <Send className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-slate-100">Telegram Channel</h4>
                  <p className="text-gray-400 text-[11px] font-mono mt-0.5">@autohub_kg</p>
                </div>
              </a>

              <div className="bg-blue-500/10 border border-blue-500/20 p-5 rounded-2xl flex items-center space-x-4">
                <div className="p-3 bg-blue-500/20 text-blue-400 rounded-xl">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-slate-100">Priority Hot Line</h4>
                  <p className="text-gray-400 text-[11px] font-mono mt-0.5">0 (555) 12-34-56 • 24/7</p>
                </div>
              </div>

              <div className="bg-purple-500/10 border border-purple-500/20 p-5 rounded-2xl flex items-center space-x-4">
                <div className="p-3 bg-purple-500/20 text-purple-400 rounded-xl">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-slate-100">Corporate Email</h4>
                  <p className="text-gray-400 text-[11px] font-mono mt-0.5">vip@autohub.kg</p>
                </div>
              </div>
            </div>

            {/* Office Location Map Mock */}
            <div className="bg-white/5 border border-white/5 p-5 rounded-2xl flex items-start space-x-4">
              <MapPin className="w-5 h-5 text-[#5D9CEC] mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="font-bold text-sm text-slate-100">Bishkek Showroom & Office Location</h4>
                <p className="text-gray-400 text-xs mt-1">
                  Кыргызстан, г. Бишкек, ул. Ибраимова 115/1, Бизнес-центр «Askar Tower», 1-й этаж.
                </p>
              </div>
            </div>
          </div>

          {/* AI Live Interactive Consultant (Col Span 5) */}
          <div className="lg:col-span-5 bg-[#0d1222] border border-white/10 rounded-3xl p-6 flex flex-col justify-between h-[380px] shadow-xl relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-sky-400 to-emerald-500" />
            
            <div className="flex items-center justify-between border-b border-white/5 pb-3">
              <div className="flex items-center space-x-2.5">
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-ping" />
                <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-200">{t.liveChat}</h3>
              </div>
              <span className="text-[10px] text-gray-500 font-bold font-mono">MODEL: DEEPMIND GEN-3.5</span>
            </div>

            {/* Messages Body */}
            <div className="flex-1 overflow-y-auto space-y-3 py-4 pr-1 scrollbar-thin scrollbar-thumb-blue-600">
              {chatMessages.map((msg, index) => (
                <div 
                  key={index} 
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div 
                    className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-xs ${
                      msg.sender === 'user' 
                        ? 'bg-blue-600 text-white rounded-br-none' 
                        : 'bg-white/5 text-gray-200 border border-white/10 rounded-bl-none'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>

            {/* Message Input Form */}
            <form onSubmit={handleSendChatMessage} className="flex gap-2">
              <input 
                type="text" 
                placeholder={t.chatPlaceholder} 
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                className="flex-1 bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 text-xs focus:border-blue-500 focus:outline-none transition-all text-white font-medium"
              />
              <button 
                type="submit" 
                className="p-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl transition-all"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>

        {/* FINAL PREMIUM CTA */}
        <div className="bg-gradient-to-br from-[#0B3D91]/20 via-[#11162d] to-[#070a13] border border-[#0B3D91]/30 rounded-3xl p-8 sm:p-12 text-center space-y-8 relative overflow-hidden shadow-2xl">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.1),transparent_60%)] pointer-events-none" />
          <div className="absolute -top-24 -left-24 w-48 h-48 bg-[#0B3D91]/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-3xl mx-auto space-y-4 relative z-10">
            <span className="text-amber-400 text-xs font-bold uppercase tracking-widest block">ALL-IN-ONE AUTOMOTIVE PLATFORM</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-tight">
              {t.ctaHeadline}
            </h2>
          </div>

          <div className="flex flex-wrap justify-center gap-4 relative z-10">
            <button 
              onClick={() => {
                setShowCallbackModal(true);
                setCallbackName("Turnkey Sourcing Request");
              }}
              className="px-8 py-4 rounded-full bg-gradient-to-r from-blue-700 via-blue-600 to-blue-500 hover:from-blue-600 hover:to-blue-400 text-white font-bold text-sm transition-all shadow-lg shadow-blue-500/25 border border-blue-400/20"
            >
              Order Vehicle
            </button>
            
            <button 
              onClick={() => {
                setShowCallbackModal(true);
                setCallbackName("General Contact Inquiry");
              }}
              className="px-8 py-4 rounded-full bg-white/5 hover:bg-white/10 text-gray-200 border border-white/10 font-bold text-sm transition-all"
            >
              Contact Us
            </button>

            <button 
              onClick={() => setShowChatModal(true)}
              className="px-8 py-4 rounded-full bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/20 font-bold text-sm transition-all"
            >
              Start AI Consultation
            </button>
          </div>
        </div>

      </div>

      {/* MODALS */}
      
      {/* 1. Callback request modal */}
      <AnimatePresence>
        {showCallbackModal && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-[#0c0f1d] border border-white/15 rounded-3xl p-6 w-full max-w-md relative"
            >
              <button 
                onClick={() => setShowCallbackModal(false)}
                className="absolute right-4 top-4 text-gray-400 hover:text-white"
              >
                ✕
              </button>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-2.5">
                  <Sparkles className="w-5 h-5 text-amber-400" />
                  <h3 className="text-base font-bold text-slate-100">Заказать премиум-сопровождение</h3>
                </div>
                <p className="text-gray-400 text-xs leading-relaxed">
                  Оставьте контакты и наш эксперт свяжется с вами, чтобы обсудить услугу: <span className="text-blue-400 font-semibold">{callbackName}</span>.
                </p>

                <form onSubmit={handleCallbackSubmit} className="space-y-4">
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-400 mb-1.5">Имя</label>
                    <input 
                      type="text" 
                      required
                      placeholder="Алибек" 
                      value={callbackName}
                      onChange={(e) => setCallbackName(e.target.value)}
                      className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 text-xs focus:border-blue-500 focus:outline-none transition-all text-white font-medium"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-400 mb-1.5">Телефон</label>
                    <input 
                      type="tel" 
                      required
                      placeholder="+996 (555) 12-34-56" 
                      value={callbackPhone}
                      onChange={(e) => setCallbackPhone(e.target.value)}
                      className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 text-xs focus:border-blue-500 focus:outline-none transition-all text-white font-mono"
                    />
                  </div>
                  <button 
                    type="submit"
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-700 to-blue-500 text-white font-bold text-xs"
                  >
                    Жду звонка
                  </button>
                </form>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 2. VIN Check Modal */}
      <AnimatePresence>
        {showVinModal && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-[#0c0f1d] border border-white/15 rounded-3xl p-6 w-full max-w-md relative"
            >
              <button 
                onClick={() => setShowVinModal(false)}
                className="absolute right-4 top-4 text-gray-400 hover:text-white"
              >
                ✕
              </button>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-2.5">
                  <ShieldCheck className="w-5 h-5 text-blue-400" />
                  <h3 className="text-base font-bold text-slate-100">Мгновенный VIN Check</h3>
                </div>
                <p className="text-gray-400 text-xs leading-relaxed">
                  Проверьте историю автомобиля, участие в ДТП, реальные пробеги и таможенную историю ЕАЭС.
                </p>

                <form onSubmit={handleVinSubmit} className="space-y-4">
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-400 mb-1.5">VIN-код унаа</label>
                    <input 
                      type="text" 
                      required
                      placeholder={t.vinPlaceholder} 
                      value={vinCode}
                      onChange={(e) => setVinCode(e.target.value)}
                      className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 text-xs focus:border-blue-500 focus:outline-none transition-all text-white font-mono uppercase"
                    />
                  </div>
                  <button 
                    type="submit"
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-700 to-blue-500 text-white font-bold text-xs"
                  >
                    Запустить проверку
                  </button>
                </form>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 3. Customs Calculator Modal */}
      <AnimatePresence>
        {showCustomsModal && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-[#0c0f1d] border border-white/15 rounded-3xl p-6 w-full max-w-md relative"
            >
              <button 
                onClick={() => setShowCustomsModal(false)}
                className="absolute right-4 top-4 text-gray-400 hover:text-white"
              >
                ✕
              </button>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-2.5">
                  <Calculator className="w-5 h-5 text-amber-400" />
                  <h3 className="text-base font-bold text-slate-100">{t.customsCalcTitle}</h3>
                </div>

                <div className="space-y-3">
                  <div>
                    <label className="block text-[10px] uppercase font-bold tracking-wider text-gray-400 mb-1">{t.fuelLabel}</label>
                    <select 
                      value={calcFuel}
                      onChange={(e) => setCalcFuel(e.target.value)}
                      className="w-full bg-black/50 border border-white/10 rounded-xl px-3 py-2 text-xs text-white"
                    >
                      <option value="petrol">{t.petrol}</option>
                      <option value="diesel">{t.diesel}</option>
                      <option value="electric">{t.electric}</option>
                    </select>
                  </div>

                  {calcFuel !== 'electric' && (
                    <>
                      <div>
                        <label className="block text-[10px] uppercase font-bold tracking-wider text-gray-400 mb-1">{t.volumeLabel}</label>
                        <input 
                          type="number" 
                          value={calcVolume}
                          onChange={(e) => setCalcVolume(e.target.value)}
                          className="w-full bg-black/50 border border-white/10 rounded-xl px-3 py-2 text-xs text-white font-mono"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] uppercase font-bold tracking-wider text-gray-400 mb-1">{t.yearLabel}</label>
                        <input 
                          type="number" 
                          value={calcYear}
                          onChange={(e) => setCalcYear(e.target.value)}
                          className="w-full bg-black/50 border border-white/10 rounded-xl px-3 py-2 text-xs text-white font-mono"
                        />
                      </div>
                    </>
                  )}

                  <button 
                    onClick={calculateCustoms}
                    className="w-full py-2.5 rounded-xl bg-gradient-to-r from-blue-700 to-blue-500 text-white font-bold text-xs"
                  >
                    {t.calcBtn}
                  </button>

                  {calcResult !== null && (
                    <div className="p-3 bg-white/5 border border-white/5 rounded-xl text-center space-y-1">
                      <span className="text-[10px] text-gray-400 uppercase font-semibold">{t.resultLabel}</span>
                      <span className="block text-2xl font-black text-amber-400 font-mono">${calcResult.toLocaleString()}</span>
                      <span className="text-[9px] text-gray-500 block">Расчет на основе ставок ЕТТ ЕАЭС для физических лиц.</span>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 4. Delivery Calculator Modal */}
      <AnimatePresence>
        {showDeliveryModal && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-[#0c0f1d] border border-white/15 rounded-3xl p-6 w-full max-w-md relative"
            >
              <button 
                onClick={() => setShowDeliveryModal(false)}
                className="absolute right-4 top-4 text-gray-400 hover:text-white"
              >
                ✕
              </button>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-2.5">
                  <Truck className="w-5 h-5 text-sky-400" />
                  <h3 className="text-base font-bold text-slate-100">{t.deliveryCalcTitle}</h3>
                </div>

                <div className="space-y-3">
                  <div>
                    <label className="block text-[10px] uppercase font-bold tracking-wider text-gray-400 mb-1">{t.portLabel}</label>
                    <select 
                      value={calcPort}
                      onChange={(e) => setCalcPort(e.target.value)}
                      className="w-full bg-black/50 border border-white/10 rounded-xl px-3 py-2 text-xs text-white"
                    >
                      <option value="china">{t.chinaPort}</option>
                      <option value="korea">{t.koreaPort}</option>
                      <option value="japan">{t.japanPort}</option>
                      <option value="usa">{t.usaPort}</option>
                    </select>
                  </div>

                  <button 
                    onClick={calculateDelivery}
                    className="w-full py-2.5 rounded-xl bg-gradient-to-r from-blue-700 to-blue-500 text-white font-bold text-xs"
                  >
                    {t.calcBtn}
                  </button>

                  {deliveryCost !== null && (
                    <div className="p-3 bg-white/5 border border-white/5 rounded-xl text-center space-y-1">
                      <span className="text-[10px] text-gray-400 uppercase font-semibold">Ориентировочная доставка:</span>
                      <span className="block text-2xl font-black text-sky-400 font-mono">${deliveryCost.toLocaleString()}</span>
                      <span className="text-[9px] text-gray-500 block">Включает транспортировку до СВХ в городе Бишкек.</span>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 5. Direct AI Concierge Chat Dialog Full Screen modal */}
      <AnimatePresence>
        {showChatModal && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-[#0c0f1d] border border-white/15 rounded-3xl p-6 w-full max-w-lg h-[500px] flex flex-col justify-between relative"
            >
              <button 
                onClick={() => setShowChatModal(false)}
                className="absolute right-4 top-4 text-gray-400 hover:text-white"
              >
                ✕
              </button>

              <div className="flex items-center space-x-2 border-b border-white/5 pb-3">
                <Sparkles className="w-5 h-5 text-amber-400 animate-pulse" />
                <div>
                  <h3 className="text-sm font-bold text-slate-100">{t.liveChat}</h3>
                  <span className="text-[9px] text-gray-500 block uppercase font-mono">Deepmind active advisor mode</span>
                </div>
              </div>

              {/* Chat messages */}
              <div className="flex-1 overflow-y-auto space-y-3 py-4 pr-1 scrollbar-thin scrollbar-thumb-blue-600">
                {chatMessages.map((msg, index) => (
                  <div 
                    key={index} 
                    className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div 
                      className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-xs ${
                        msg.sender === 'user' 
                          ? 'bg-blue-600 text-white rounded-br-none' 
                          : 'bg-white/5 text-gray-200 border border-white/10 rounded-bl-none'
                      }`}
                    >
                      {msg.text}
                    </div>
                  </div>
                ))}
              </div>

              {/* Chat Input form */}
              <form onSubmit={handleSendChatMessage} className="flex gap-2 border-t border-white/5 pt-3">
                <input 
                  type="text" 
                  placeholder={t.chatPlaceholder} 
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  className="flex-1 bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 text-xs focus:border-blue-500 focus:outline-none transition-all text-white font-medium"
                />
                <button 
                  type="submit" 
                  className="px-4 bg-blue-600 hover:bg-blue-500 text-white rounded-xl transition-all font-semibold text-xs flex items-center space-x-1"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Отправить</span>
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
