import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Phone, 
  MessageSquare, 
  Send, 
  Mail, 
  MapPin, 
  Globe, 
  Clock, 
  Calendar, 
  Sparkles, 
  CheckCircle, 
  Check, 
  ArrowLeft, 
  ExternalLink,
  Instagram,
  Facebook,
  Youtube,
  ShieldCheck,
  AlertCircle,
  TrendingUp,
  Award,
  Users,
  Compass,
  Map,
  Layers,
  Search,
  UserCheck
} from 'lucide-react';

interface ContactUsPageProps {
  lang: 'RU' | 'KG' | 'EN';
  onBackToCatalog: () => void;
  onNavigateToView?: (view: string) => void;
}

export function ContactUsPage({ lang, onBackToCatalog, onNavigateToView }: ContactUsPageProps) {
  // Form states
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    serviceNeeded: 'import',
    message: ''
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submittedData, setSubmittedData] = useState<any>(null);

  // Map simulation states
  const [mapStyle, setMapStyle] = useState<'luxury' | 'satellite' | 'street'>('luxury');
  const [searchAddress, setSearchAddress] = useState('');
  const [calculatedDistance, setCalculatedDistance] = useState<string | null>(null);

  // Consultation states
  const [isConsultationModalOpen, setIsConsultationModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedExpert, setSelectedExpert] = useState('any');
  const [consultationSuccess, setConsultationSuccess] = useState(false);

  const t = {
    title: {
      RU: 'Контакты AutoHub',
      KG: 'AutoHub Байланыштары',
      EN: 'Contact AutoHub'
    },
    subtitle: {
      RU: 'Премиум-обслуживание и профессиональная помощь по любым вопросам автоимпорта',
      KG: 'Премиум-тейлөө жана унаа импорттоо боюнча бардык суроолорго кесипкөй жардам',
      EN: 'Premium service and professional assistance with any vehicle import inquiries'
    },
    heroHeadline: {
      RU: "Давайте подберем ваш идеальный автомобиль вместе",
      KG: "Келиңиз, сиздин идеалдуу унааңызды чогуу тандайлы",
      EN: "Let's Find Your Perfect Vehicle Together"
    },
    heroSubtitle: {
      RU: "Наши сертифицированные эксперты готовы помочь вам выкупить, импортировать, проверить по VIN-базам и зарегистрировать любой автомобиль.",
      KG: "Биздин тастыкталган адистерибиз сизге каалаган унааны сатып алууга, импорттоого, VIN-базаларынан текшерүүгө жана каттоого жардам берүүгө даяр.",
      EN: "Our experts are ready to help you buy, import, verify and manage vehicles."
    },
    btnContactUs: {
      RU: "Написать нам",
      KG: "Бизге жазуу",
      EN: "Contact Us"
    },
    btnWhatsApp: {
      RU: "WhatsApp чат",
      KG: "WhatsApp чат",
      EN: "WhatsApp Chat"
    },
    btnBookConsultation: {
      RU: "Забронировать консультацию",
      KG: "Консультация заказ кылуу",
      EN: "Book Consultation"
    },
    // Contact methods
    phoneTitle: {
      RU: "Телефонная линия",
      KG: "Телефондук байланыш",
      EN: "Phone Line"
    },
    phoneDesc: {
      RU: "Прямая многоканальная линия для консультаций и поддержки.",
      KG: "Кеңеш алуу жана колдоо үчүн түз көп каналдуу линия.",
      EN: "Direct multi-channel line for consultations and support."
    },
    phoneAction: {
      RU: "Позвонить сейчас",
      KG: "Азыр чалуу",
      EN: "Call Now"
    },
    whatsappTitle: {
      RU: "WhatsApp Бизнес",
      KG: "WhatsApp Бизнес",
      EN: "WhatsApp Business"
    },
    whatsappDesc: {
      RU: "Общайтесь с персональным менеджером в удобном формате.",
      KG: "Ыңгайлуу форматта жеке менеджер менен баарлашыңыз.",
      EN: "Chat with a personal manager in a convenient format."
    },
    whatsappAction: {
      RU: "Открыть WhatsApp",
      KG: "WhatsApp ачуу",
      EN: "Open WhatsApp"
    },
    telegramTitle: {
      RU: "Telegram канал & Бот",
      KG: "Telegram канал & Бот",
      EN: "Telegram Hub"
    },
    telegramDesc: {
      RU: "Следите за аукционами и общайтесь с умным ИИ-консультантом.",
      KG: "Аукциондорду байкап туруңуз жана акылдуу ЖИ кеңешчиси менен сүйлөшүңүз.",
      EN: "Follow live auctions and chat with our smart AI assistant."
    },
    telegramAction: {
      RU: "Перейти в Telegram",
      KG: "Telegram-га өтүү",
      EN: "Join Telegram"
    },
    emailTitle: {
      RU: "Официальный Email",
      KG: "Расмий Email",
      EN: "Official Email"
    },
    emailDesc: {
      RU: "Для коммерческих предложений, B2B запросов и дилерских контрактов.",
      KG: "Коммерциялык сунуштар, B2B суроо-талаптар жана дилердик келишимдер үчүн.",
      EN: "For commercial offers, B2B inquiries and dealership contracts."
    },
    emailAction: {
      RU: "Написать письмо",
      KG: "Кат жазуу",
      EN: "Send Email"
    },
    locationTitle: {
      RU: "Главный Офис",
      KG: "Башкы Офис",
      EN: "Headquarters"
    },
    locationDesc: {
      RU: "г. Бишкек, Проспект Чынгыза Айтматова 303/1 (Бизнес-центр Белинка, 3 этаж).",
      KG: "Бишкек ш., Чыңгыз Айтматов проспектиси 303/1 (Белинка бизнес-борбору, 3-кабат).",
      EN: "303/1 Chyngyz Aitmatov Ave, Bishkek (Belinka Business Center, 3rd Floor)."
    },
    locationAction: {
      RU: "Проложить маршрут",
      KG: "Маршрут куруу",
      EN: "Get Directions"
    },
    websiteTitle: {
      RU: "Веб-платформа",
      KG: "Веб-платформа",
      EN: "Web Platform"
    },
    websiteDesc: {
      RU: "Официальный цифровой портал импорта автомобилей в Кыргызстане.",
      KG: "Кыргызстандагы автоунаа импортунун расмий санариптик порталы.",
      EN: "The official digital auto import ecosystem in Kyrgyzstan."
    },
    websiteAction: {
      RU: "Главный сайт",
      KG: "Башкы сайт",
      EN: "Main Site"
    },
    // Business Hours
    hoursTitle: {
      RU: "Режим работы офиса",
      KG: "Офистин иштөө тартиби",
      EN: "Business Hours"
    },
    hoursSubtitle: {
      RU: "Мы рады видеть вас в нашем шоуруме и офисе продаж в Бишкеке.",
      KG: "Биз сизди Бишкектеги шоурумубузда жана сатуу офисибизде күтөбүз.",
      EN: "We look forward to welcoming you to our showroom and sales office in Bishkek."
    },
    weekdays: {
      RU: "Понедельник – Пятница",
      KG: "Дүйшөмбү – Жума",
      EN: "Monday – Friday"
    },
    saturday: {
      RU: "Суббота",
      KG: "Ишемби",
      EN: "Saturday"
    },
    sunday: {
      RU: "Воскресенье",
      KG: "Жекшемби",
      EN: "Sunday"
    },
    emergencyTitle: {
      RU: "Экстренная поддержка 24/7",
      KG: "Шашылыш колдоо 24/7",
      EN: "Emergency Line 24/7"
    },
    emergencyDesc: {
      RU: "Для решения форс-мажорных вопросов по текущей доставке и растаможке.",
      KG: "Жеткирилүүдөгү унаалар жана бажы жагынан тез арада чечиле турган маселелер үчүн.",
      EN: "For urgent matters regarding active transit, logistics, or customs clearance."
    },
    callEmergency: {
      RU: "Связаться экстренно",
      KG: "Шашылыш байланышуу",
      EN: "Contact Support"
    },
    // Contact Form
    formTitle: {
      RU: "Отправить цифровой запрос",
      KG: "Санариптик суроо-талап жөнөтүү",
      EN: "Send Digital Request"
    },
    formDesc: {
      RU: "Заполните форму, и система автоматически назначит профильного эксперта для вашей задачи в течение 10 минут.",
      KG: "Форманы толтуруңуз, тутум 10 мүнөттүн ичинде сизге профилдик адисти дайындайт.",
      EN: "Fill out the form, and our system will automatically match you with a specialized expert within 10 minutes."
    },
    fieldName: {
      RU: "Ваше имя и фамилия",
      KG: "Сиздин атыңыз жана фамилияңыз",
      EN: "Full Name"
    },
    fieldPhone: {
      RU: "Номер телефона",
      KG: "Телефон номериңиз",
      EN: "Phone Number"
    },
    fieldEmail: {
      RU: "Электронная почта (Email)",
      KG: "Электрондук дарек (Email)",
      EN: "Email Address"
    },
    fieldService: {
      RU: "Какая услуга вас интересует?",
      KG: "Кайсы кызмат сизди кызыктырат?",
      EN: "Service Needed"
    },
    service1: {
      RU: "Импорт под ключ (США, Корея, Китай, Япония)",
      KG: "Толук импорттоо (АКШ, Корея, Кытай, Япония)",
      EN: "Turnkey Auto Import (USA, Korea, China, Japan)"
    },
    service2: {
      RU: "VIN Проверка и Технический аудит истории авто",
      KG: "VIN Текшерүү жана унаанын тарыхын техникалык аудиттөө",
      EN: "VIN Check & Comprehensive Technical History Audit"
    },
    service3: {
      RU: "Покупка авто со склада в Бишкеке (В наличии)",
      KG: "Бишкектеги кампадагы унааны сатып алуу (Даяр унаалар)",
      EN: "Purchase Car from Bishkek Stock (In Stock)"
    },
    service4: {
      RU: "B2B Сотрудничество для автосалонов и дилеров",
      KG: "Автосалондор жана дилерлер үчүн B2B кызматташтык",
      EN: "B2B Partnership for Dealerships & Car Salons"
    },
    fieldMessage: {
      RU: "Сообщение или пожелания к автомобилю",
      KG: "Унаага карата каалоолоруңуз же билдирүүңүз",
      EN: "Message or Vehicle Specifications"
    },
    placeholderMessage: {
      RU: "Например: Ищу Lexus LX570 2020 года, бюджет $75,000, кожаный салон...",
      KG: "Мисалы: Lexus LX570 2020-жылкы унаа издеп жатам, бюджет $75,000...",
      EN: "E.g., Looking for Lexus LX570 2020, budget $75,000, pristine condition..."
    },
    btnSendRequest: {
      RU: "Отправить запрос в систему",
      KG: "Тутумга суроо-талап жөнөтүү",
      EN: "Send Premium Request"
    },
    btnRequestCallback: {
      RU: "Заказать обратный звонок",
      KG: "Кайра чалууну заказ кылуу",
      EN: "Request Callback"
    },
    // Why contact AutoHub
    whyTitle: {
      RU: "Преимущества связи с AutoHub",
      KG: "AutoHub менен байланышуунун артыкчылыктары",
      EN: "Why Contact AutoHub"
    },
    whySubtitle: {
      RU: "Стандарты обслуживания швейцарского уровня на рынке Средней Азии",
      KG: "Орто Азия рыногунда швейцариялык деңгээлдеги кызмат көрсөтүү стандарттары",
      EN: "Swiss-level customer care standards in Central Asia"
    },
    why1Title: {
      RU: "Реактивный ответ",
      KG: "Тез жооп берүү",
      EN: "Fast Response"
    },
    why1Desc: {
      RU: "Реакция на заявки менее 10 минут. Выделенный персональный менеджер.",
      KG: "Суроо-талаптарга 10 мүнөткө жетпеген убакытта жооп. Атайын жеке менеджер.",
      EN: "Average response time is under 10 minutes. Dedicated personal manager."
    },
    why2Title: {
      RU: "Профессиональная команда",
      KG: "Кесипкөй команда",
      EN: "Professional Team"
    },
    why2Desc: {
      RU: "Сертифицированные инспекторы в портах США, Кореи, Китая и Японии.",
      KG: "АКШ, Корея, Кытай жана Япония портторунда сертификатталган инспекторлор.",
      EN: "Certified on-site inspectors in major global ports and automotive hubs."
    },
    why3Title: {
      RU: "AI Интеграция",
      KG: "ЖИ Интеграциясы",
      EN: "AI-Powered Support"
    },
    why3Desc: {
      RU: "Интеллектуальная система подбора и проверки по базам в реальном времени.",
      KG: "Реалдуу убакыт режиминде маалымат базаларын талдоочу акылдуу тутум.",
      EN: "Smart auto matching and dynamic real-time database checks."
    },
    why4Title: {
      RU: "Безопасность сделок",
      KG: "Бүтүмдөрдүн коопсуздугу",
      EN: "Safe Transactions"
    },
    why4Desc: {
      RU: "Официальный договор, фиксированная цена, страхование транспортировки.",
      KG: "Расмий келишим, белгиленген баа, транспорттук камсыздандыруу.",
      EN: "Official legal contract, fixed final price, and full transit insurance."
    },
    why5Title: {
      RU: "Дилерская сеть КР",
      KG: "Дилердик тармак КР",
      EN: "Trusted Dealer Network"
    },
    why5Desc: {
      RU: "Автоматизированная B2B CRM платформа для 150+ партнеров по стране.",
      KG: "Өлкө боюнча 150дөн ашык өнөктөштөр үчүн автоматташтырылган B2B CRM платформасы.",
      EN: "B2B digital ecosystem connecting 150+ professional dealer nodes."
    },
    why6Title: {
      RU: "Клиентская забота",
      KG: "Кардарларды колдоо",
      EN: "Premium Customer Service"
    },
    why6Desc: {
      RU: "Поддержка клиентов на протяжении всей сделки и после выдачи авто.",
      KG: "Унааны алгандан кийин да кардарларды толук коштоо жана колдоо.",
      EN: "End-to-end luxury hospitality from first consultation to key handover."
    },
    // Final CTA
    ctaTitle: {
      RU: "Готовы сделать первый шаг?",
      KG: "Биринчи кадамды жасоого даярсызбы?",
      EN: "Ready to Start Your Journey?"
    },
    ctaSubtitle: {
      RU: "Выберите наиболее удобный формат сотрудничества с лидерами автоимпорта Кыргызстана.",
      KG: "Кыргызстандагы автоимпорттун лидерлери менен кызматташуунун эң ыңгайлуу форматын тандаңыз.",
      EN: "Select the most convenient way to collaborate with Kyrgyzstan's auto import authority."
    },
    btnOrderVehicle: {
      RU: "Заказать авто",
      KG: "Унаа заказ кылуу",
      EN: "Order Vehicle"
    },
    btnTalkExpert: {
      RU: "Связаться с экспертом",
      KG: "Адис менен сүйлөшүү",
      EN: "Talk to Expert"
    },
    btnBecomePartner: {
      RU: "Стать партнером (B2B)",
      KG: "Өнөктөш болуу (B2B)",
      EN: "Become Partner"
    },
    btnBack: {
      RU: "Назад в каталог",
      KG: "Каталогго кайтуу",
      EN: "Back to Catalog"
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (formErrors[name]) {
      setFormErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const errors: Record<string, string> = {};
    if (!formData.fullName.trim()) {
      errors.fullName = lang === 'RU' ? 'Введите ваше имя' : lang === 'KG' ? 'Атыңызды киргизиңиз' : 'Name is required';
    }
    if (!formData.phone.trim()) {
      errors.phone = lang === 'RU' ? 'Введите номер телефона' : lang === 'KG' ? 'Телефон номерин киргизиңиз' : 'Phone is required';
    }
    if (!formData.email.trim()) {
      errors.email = lang === 'RU' ? 'Введите электронную почту' : lang === 'KG' ? 'Электрондук почтаны киргизиңиз' : 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = lang === 'RU' ? 'Некорректный формат email' : lang === 'KG' ? 'Ката формат' : 'Invalid email format';
    }
    return errors;
  };

  const handleSubmit = (e: React.FormEvent, isCallbackOnly = false) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setIsSubmitting(true);
    // Simulate premium system submission & API response
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setSubmittedData({
        id: 'AH-REQ-' + Math.floor(100000 + Math.random() * 900000),
        timestamp: new Date().toLocaleTimeString(),
        manager: lang === 'RU' ? 'Айбек (Старший менеджер по продажам)' : lang === 'KG' ? 'Айбек (Сатуу бөлүмүнүн улук адиси)' : 'Aybek (Lead Sales Executive)',
        eta: '10 ' + (lang === 'RU' ? 'минут' : lang === 'KG' ? 'мүнөт' : 'minutes'),
        isCallback: isCallbackOnly,
        ...formData
      });
    }, 1500);
  };

  // Distance calculator simulation
  const calculateDirections = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchAddress.trim()) return;
    // Premium distance simulation based on Bishkek coordinates
    const distance = (3.2 + Math.random() * 8.5).toFixed(1);
    const time = Math.ceil(Number(distance) * 2.5);
    setCalculatedDistance(
      lang === 'RU' 
        ? `Приблизительное расстояние от вас до офиса Белинка: ${distance} км (~${time} мин на авто через пр. Айтматова)`
        : lang === 'KG' 
          ? `Сизден Белинка кеңсесине чейинки болжолдуу аралык: ${distance} км (~${time} мүнөт унаа менен)`
          : `Estimated distance to Belinka office: ${distance} km (~${time} mins via Aitmatov Ave)`
    );
  };

  // Consultation booking simulation
  const handleBookConsultation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDate || !selectedTime) return;
    setConsultationSuccess(true);
    setTimeout(() => {
      setIsConsultationModalOpen(false);
      setConsultationSuccess(false);
      // Reset
      setSelectedDate('');
      setSelectedTime('');
    }, 4000);
  };

  return (
    <div className="bg-[#03050c] text-white min-h-screen selection:bg-blue-600 selection:text-white pb-24 overflow-hidden relative font-sans">
      
      {/* Decorative luxury gradient layers */}
      <div className="absolute top-0 left-0 right-0 h-[600px] bg-gradient-to-b from-blue-950/15 via-[#03050c]/5 to-[#03050c] -z-10 pointer-events-none" />
      <div className="absolute top-[20%] left-[-10%] w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-[160px] pointer-events-none -z-10" />
      <div className="absolute bottom-[20%] right-[-10%] w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[160px] pointer-events-none -z-10" />

      {/* FLOATING TOP GLASS BAR */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <div className="flex items-center justify-between">
          <button
            onClick={onBackToCatalog}
            className="group flex items-center space-x-2.5 bg-white/5 hover:bg-white/10 text-white text-xs font-bold py-2.5 px-4.5 rounded-full border border-white/10 transition-all shadow-lg hover:scale-[1.02]"
            id="contacts-back-btn"
          >
            <ArrowLeft className="w-4 h-4 text-blue-400 group-hover:-translate-x-1 transition-transform" />
            <span>{t.btnBack[lang]}</span>
          </button>

          <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-blue-400 font-black bg-blue-500/5 px-4.5 py-1.5 rounded-full border border-blue-500/10">
            AUTOHUB • GLOBAL IMPORTS
          </span>
        </div>
      </div>

      {/* HERO SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 md:pt-20 pb-16">
        <div className="text-center max-w-4xl mx-auto space-y-6">
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center space-x-2 bg-blue-500/10 border border-blue-500/20 px-4 py-1.5 rounded-full"
          >
            <Sparkles className="w-4 h-4 text-blue-400 animate-pulse" />
            <span className="text-[10px] sm:text-xs font-black uppercase tracking-widest text-blue-400">
              {lang === 'RU' ? 'ПРЕМИУМ КЛИЕНТСКИЙ СЕРВИС 24/7' : lang === 'KG' ? 'ПРЕМИУМ КЛАСС КАРДАРЛАРДЫ КОЛДОО' : 'LUXURY AUTOMOTIVE SERVICE'}
            </span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight leading-none bg-gradient-to-r from-white via-gray-100 to-gray-400 bg-clip-text text-transparent font-display"
          >
            {t.heroHeadline[lang]}
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-base sm:text-lg text-gray-400 font-light max-w-2xl mx-auto leading-relaxed"
          >
            {t.heroSubtitle[lang]}
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap items-center justify-center gap-4 pt-4"
          >
            <a
              href="#contact-form-section"
              className="bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-bold py-3.5 px-8 rounded-xl shadow-lg shadow-blue-900/30 transition-all hover:scale-[1.02] flex items-center space-x-2"
            >
              <Send className="w-4 h-4" />
              <span>{t.btnContactUs[lang]}</span>
            </a>

            <a
              href="https://wa.me/996555123456" 
              target="_blank" 
              rel="noreferrer"
              className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-bold py-3.5 px-8 rounded-xl shadow-lg shadow-emerald-900/20 transition-all hover:scale-[1.02] flex items-center space-x-2"
            >
              <MessageSquare className="w-4 h-4" />
              <span>{t.btnWhatsApp[lang]}</span>
            </a>

            <button
              onClick={() => setIsConsultationModalOpen(true)}
              className="bg-white/5 hover:bg-white/10 text-white text-xs sm:text-sm font-bold py-3.5 px-8 rounded-xl border border-white/10 transition-all hover:scale-[1.02] flex items-center space-x-2"
            >
              <Calendar className="w-4 h-4 text-blue-400" />
              <span>{t.btnBookConsultation[lang]}</span>
            </button>
          </motion.div>
        </div>
      </section>

      {/* CONTACT METHODS GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* Card 1: Phone */}
          <motion.div 
            whileHover={{ y: -5 }}
            className="bg-gradient-to-b from-[#0a0f24] to-[#040612] p-8 rounded-2xl border border-white/5 hover:border-blue-500/20 transition-all flex flex-col justify-between text-left space-y-6"
          >
            <div className="space-y-4">
              <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center border border-blue-500/20 text-blue-400">
                <Phone className="w-5 h-5" />
              </div>
              <div className="space-y-1.5">
                <h3 className="text-lg font-bold text-white tracking-tight">{t.phoneTitle[lang]}</h3>
                <p className="text-xs text-gray-400 leading-relaxed font-light">{t.phoneDesc[lang]}</p>
              </div>
              <div className="font-mono text-xl font-bold text-white tracking-tight">
                +996 (555) 001-999
              </div>
            </div>
            <a 
              href="tel:+996555001999"
              className="w-full text-center bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-xs font-bold py-3 rounded-lg transition-all"
            >
              {t.phoneAction[lang]}
            </a>
          </motion.div>

          {/* Card 2: WhatsApp */}
          <motion.div 
            whileHover={{ y: -5 }}
            className="bg-gradient-to-b from-[#0a0f24] to-[#040612] p-8 rounded-2xl border border-white/5 hover:border-emerald-500/20 transition-all flex flex-col justify-between text-left space-y-6"
          >
            <div className="space-y-4">
              <div className="w-12 h-12 bg-emerald-500/10 rounded-xl flex items-center justify-center border border-emerald-500/20 text-emerald-400">
                <MessageSquare className="w-5 h-5" />
              </div>
              <div className="space-y-1.5">
                <h3 className="text-lg font-bold text-white tracking-tight">{t.whatsappTitle[lang]}</h3>
                <p className="text-xs text-gray-400 leading-relaxed font-light">{t.whatsappDesc[lang]}</p>
              </div>
              <div className="font-mono text-xl font-bold text-emerald-400 tracking-tight">
                +996 (555) 123-456
              </div>
            </div>
            <a 
              href="https://wa.me/996555123456"
              target="_blank"
              rel="noreferrer"
              className="w-full text-center bg-emerald-600/10 hover:bg-emerald-600/20 border border-emerald-500/20 text-emerald-400 text-xs font-bold py-3 rounded-lg transition-all"
            >
              {t.whatsappAction[lang]}
            </a>
          </motion.div>

          {/* Card 3: Telegram */}
          <motion.div 
            whileHover={{ y: -5 }}
            className="bg-gradient-to-b from-[#0a0f24] to-[#040612] p-8 rounded-2xl border border-white/5 hover:border-cyan-500/20 transition-all flex flex-col justify-between text-left space-y-6"
          >
            <div className="space-y-4">
              <div className="w-12 h-12 bg-cyan-500/10 rounded-xl flex items-center justify-center border border-cyan-500/20 text-cyan-400">
                <Send className="w-5 h-5 -rotate-45" />
              </div>
              <div className="space-y-1.5">
                <h3 className="text-lg font-bold text-white tracking-tight">{t.telegramTitle[lang]}</h3>
                <p className="text-xs text-gray-400 leading-relaxed font-light">{t.telegramDesc[lang]}</p>
              </div>
              <div className="font-mono text-xl font-bold text-cyan-400 tracking-tight">
                @AutoHubKG_bot
              </div>
            </div>
            <a 
              href="https://t.me/autohubkg"
              target="_blank"
              rel="noreferrer"
              className="w-full text-center bg-cyan-600/10 hover:bg-cyan-600/20 border border-cyan-500/20 text-cyan-400 text-xs font-bold py-3 rounded-lg transition-all"
            >
              {t.telegramAction[lang]}
            </a>
          </motion.div>

          {/* Card 4: Email */}
          <motion.div 
            whileHover={{ y: -5 }}
            className="bg-gradient-to-b from-[#0a0f24] to-[#040612] p-8 rounded-2xl border border-white/5 hover:border-blue-500/20 transition-all flex flex-col justify-between text-left space-y-6"
          >
            <div className="space-y-4">
              <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center border border-blue-500/20 text-blue-400">
                <Mail className="w-5 h-5" />
              </div>
              <div className="space-y-1.5">
                <h3 className="text-lg font-bold text-white tracking-tight">{t.emailTitle[lang]}</h3>
                <p className="text-xs text-gray-400 leading-relaxed font-light">{t.emailDesc[lang]}</p>
              </div>
              <div className="font-mono text-sm font-bold text-white tracking-tight truncate">
                sales@autohub.kg
              </div>
            </div>
            <a 
              href="mailto:sales@autohub.kg"
              className="w-full text-center bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-xs font-bold py-3 rounded-lg transition-all"
            >
              {t.emailAction[lang]}
            </a>
          </motion.div>

          {/* Card 5: Location */}
          <motion.div 
            whileHover={{ y: -5 }}
            className="bg-gradient-to-b from-[#0a0f24] to-[#040612] p-8 rounded-2xl border border-white/5 hover:border-blue-500/20 transition-all flex flex-col justify-between text-left space-y-6 md:col-span-1"
          >
            <div className="space-y-4">
              <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center border border-blue-500/20 text-blue-400">
                <MapPin className="w-5 h-5" />
              </div>
              <div className="space-y-1.5">
                <h3 className="text-lg font-bold text-white tracking-tight">{t.locationTitle[lang]}</h3>
                <p className="text-xs text-gray-300 leading-relaxed font-light">{t.locationDesc[lang]}</p>
              </div>
              <div className="text-[11px] text-gray-400 font-semibold uppercase tracking-wider">
                {lang === 'RU' ? 'Бизнес-центр Belinka, 3 этаж' : lang === 'KG' ? 'Belinka бизнес борбору, 3-кабат' : 'Belinka Business Center, 3rd Floor'}
              </div>
            </div>
            <a 
              href="#google-map-section"
              className="w-full text-center bg-blue-600/15 hover:bg-blue-600/20 border border-blue-500/30 text-blue-400 text-xs font-bold py-3 rounded-lg transition-all"
            >
              {t.locationAction[lang]}
            </a>
          </motion.div>

          {/* Card 6: Website */}
          <motion.div 
            whileHover={{ y: -5 }}
            className="bg-gradient-to-b from-[#0a0f24] to-[#040612] p-8 rounded-2xl border border-white/5 hover:border-blue-500/20 transition-all flex flex-col justify-between text-left space-y-6"
          >
            <div className="space-y-4">
              <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center border border-blue-500/20 text-blue-400">
                <Globe className="w-5 h-5" />
              </div>
              <div className="space-y-1.5">
                <h3 className="text-lg font-bold text-white tracking-tight">{t.websiteTitle[lang]}</h3>
                <p className="text-xs text-gray-400 leading-relaxed font-light">{t.websiteDesc[lang]}</p>
              </div>
              <div className="font-mono text-sm font-bold text-white tracking-tight">
                www.autohub.kg
              </div>
            </div>
            <button 
              onClick={onBackToCatalog}
              className="w-full text-center bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-xs font-bold py-3 rounded-lg transition-all"
            >
              {t.websiteAction[lang]}
            </button>
          </motion.div>

        </div>
      </section>

      {/* WHY CONTACT AUTOHUB (6 VALUE BENTO BLOCKS) */}
      <section className="bg-slate-950/80 border-y border-white/5 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
            <span className="text-xs font-black tracking-[0.2em] text-blue-400 uppercase font-mono">
              {lang === 'RU' ? 'ПРЕИМУЩЕСТВА СЕРВИСА' : lang === 'KG' ? 'КЫЗМАТТЫН АРТЫКЧЫЛЫКТАРЫ' : 'THE AUTOHUB ADVANTAGE'}
            </span>
            <h2 className="text-3xl font-black text-white font-display">
              {t.whyTitle[lang]}
            </h2>
            <p className="text-sm text-gray-400 font-light">
              {t.whySubtitle[lang]}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
            
            {/* Value 1: Fast Response */}
            <div className="bg-white/2 border border-white/5 rounded-2xl p-6.5 space-y-3.5 hover:border-blue-500/10 transition-colors">
              <div className="flex items-center space-x-3 text-blue-400">
                <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center">
                  <Clock className="w-4 h-4" />
                </div>
                <h3 className="font-bold text-sm text-white uppercase tracking-wider">{t.why1Title[lang]}</h3>
              </div>
              <p className="text-xs text-gray-400 leading-relaxed font-light">{t.why1Desc[lang]}</p>
            </div>

            {/* Value 2: Professional Team */}
            <div className="bg-white/2 border border-white/5 rounded-2xl p-6.5 space-y-3.5 hover:border-blue-500/10 transition-colors">
              <div className="flex items-center space-x-3 text-blue-400">
                <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center">
                  <Users className="w-4 h-4" />
                </div>
                <h3 className="font-bold text-sm text-white uppercase tracking-wider">{t.why2Title[lang]}</h3>
              </div>
              <p className="text-xs text-gray-400 leading-relaxed font-light">{t.why2Desc[lang]}</p>
            </div>

            {/* Value 3: AI Support */}
            <div className="bg-white/2 border border-white/5 rounded-2xl p-6.5 space-y-3.5 hover:border-blue-500/10 transition-colors">
              <div className="flex items-center space-x-3 text-blue-400">
                <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center">
                  <Sparkles className="w-4 h-4" />
                </div>
                <h3 className="font-bold text-sm text-white uppercase tracking-wider">{t.why3Title[lang]}</h3>
              </div>
              <p className="text-xs text-gray-400 leading-relaxed font-light">{t.why3Desc[lang]}</p>
            </div>

            {/* Value 4: Safe Transactions */}
            <div className="bg-white/2 border border-white/5 rounded-2xl p-6.5 space-y-3.5 hover:border-blue-500/10 transition-colors">
              <div className="flex items-center space-x-3 text-blue-400">
                <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <h3 className="font-bold text-sm text-white uppercase tracking-wider">{t.why4Title[lang]}</h3>
              </div>
              <p className="text-xs text-gray-400 leading-relaxed font-light">{t.why4Desc[lang]}</p>
            </div>

            {/* Value 5: Trusted Dealer Network */}
            <div className="bg-white/2 border border-white/5 rounded-2xl p-6.5 space-y-3.5 hover:border-blue-500/10 transition-colors">
              <div className="flex items-center space-x-3 text-blue-400">
                <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center">
                  <Award className="w-4 h-4" />
                </div>
                <h3 className="font-bold text-sm text-white uppercase tracking-wider">{t.why5Title[lang]}</h3>
              </div>
              <p className="text-xs text-gray-400 leading-relaxed font-light">{t.why5Desc[lang]}</p>
            </div>

            {/* Value 6: Premium Customer Service */}
            <div className="bg-white/2 border border-white/5 rounded-2xl p-6.5 space-y-3.5 hover:border-blue-500/10 transition-colors">
              <div className="flex items-center space-x-3 text-blue-400">
                <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center">
                  <TrendingUp className="w-4 h-4" />
                </div>
                <h3 className="font-bold text-sm text-white uppercase tracking-wider">{t.why6Title[lang]}</h3>
              </div>
              <p className="text-xs text-gray-400 leading-relaxed font-light">{t.why6Desc[lang]}</p>
            </div>

          </div>
        </div>
      </section>

      {/* BUSINESS HOURS & EMERGENCY LINE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Block: Traditional Schedule (7 cols) */}
          <div className="lg:col-span-7 bg-gradient-to-br from-[#070b1b] to-[#04060e] p-8 sm:p-10 rounded-3xl border border-white/5 text-left flex flex-col justify-between space-y-8">
            <div className="space-y-4">
              <div className="inline-flex p-2 bg-blue-500/10 text-blue-400 rounded-xl border border-blue-500/20">
                <Clock className="w-6 h-6" />
              </div>
              <div className="space-y-1.5">
                <h3 className="text-2xl font-black text-white font-display">{t.hoursTitle[lang]}</h3>
                <p className="text-xs text-gray-400 leading-relaxed font-light">{t.hoursSubtitle[lang]}</p>
              </div>
            </div>

            {/* Days table list */}
            <div className="divide-y divide-white/5 font-mono text-xs space-y-3 pt-4">
              
              <div className="flex justify-between py-2 items-center">
                <div className="flex items-center space-x-2 text-white">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                  <span>{t.weekdays[lang]}</span>
                </div>
                <div className="text-gray-200 font-bold">
                  09:00 – 19:00
                </div>
              </div>

              <div className="flex justify-between py-3.5 items-center">
                <div className="flex items-center space-x-2 text-white">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                  <span>{t.saturday[lang]}</span>
                </div>
                <div className="text-gray-200 font-bold">
                  10:00 – 17:00
                </div>
              </div>

              <div className="flex justify-between py-3.5 items-center">
                <div className="flex items-center space-x-2 text-gray-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500/50" />
                  <span>{t.sunday[lang]}</span>
                </div>
                <div className="text-amber-500 font-bold bg-amber-500/5 px-2 py-0.5 rounded border border-amber-500/15">
                  {lang === 'RU' ? 'Выходной (Онлайн поддержка)' : lang === 'KG' ? 'Дем алыш (Онлайн колдоо)' : 'Closed (Online only)'}
                </div>
              </div>

            </div>

            <div className="text-[10px] text-gray-400 uppercase tracking-widest pt-4 border-t border-white/5">
              {lang === 'RU' ? '*Для личного визита в выходные дни рекомендуется предварительная запись' : lang === 'KG' ? '*Дем алыш күндөрү келүү үчүн алдын ала жазылуу сунушталат' : '*Appointments are recommended for weekend showroom visits'}
            </div>
          </div>

          {/* Right Block: Emergency Hotline & VIP Support (5 cols) */}
          <div className="lg:col-span-5 bg-gradient-to-br from-[#100b08] to-[#03050c] p-8 sm:p-10 rounded-3xl border border-amber-500/10 text-left flex flex-col justify-between space-y-8 relative overflow-hidden">
            {/* Visual bronze warm ambient light */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-full blur-2xl" />

            <div className="space-y-4">
              <div className="inline-flex p-2 bg-amber-500/10 text-amber-500 rounded-xl border border-amber-500/20">
                <AlertCircle className="w-6 h-6" />
              </div>
              <div className="space-y-1.5">
                <h3 className="text-xl font-black text-white font-display">{t.emergencyTitle[lang]}</h3>
                <p className="text-xs text-gray-400 leading-relaxed font-light">{t.emergencyDesc[lang]}</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="text-[10px] font-mono font-bold tracking-widest text-amber-400 uppercase">
                {lang === 'RU' ? 'ВЫДЕЛЕННАЯ ЛИНИЯ ПОДДЕРЖКИ' : lang === 'KG' ? 'ЫКЧАМ БАЙЛАНЫШ ЛИНИЯСЫ' : 'EMERGENCY DISPATCH'}
              </div>
              <div className="font-mono text-3xl font-black text-amber-500 tracking-tight">
                +996 (777) 900-111
              </div>
              <p className="text-[11px] text-gray-400 leading-relaxed">
                {lang === 'RU' ? 'Работает круглосуточно для клиентов с активным договором доставки авто на корабле или растаможке на таможенном посту в КР.'
                              : lang === 'KG' ? 'Келишими бар кардарлар үчүн унаа кемеде келе жатканда же бажыда турганда суроолорго жооп берүү үчүн күнү-түнү иштейт.'
                              : 'Monitored 24/7. Reserved exclusively for clients with active vehicle transits, shipping ocean containers, or customs clearings.'}
              </p>
            </div>

            <a 
              href="tel:+996777900111"
              className="w-full text-center bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-black text-xs font-bold py-3.5 rounded-xl shadow-lg shadow-amber-900/10 transition-all"
            >
              {t.callEmergency[lang]}
            </a>
          </div>

        </div>
      </section>

      {/* CONTACT FORM & INTERACTIVE SIMULATION */}
      <section id="contact-form-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left column: Form block (7 cols) */}
          <div className="lg:col-span-7 bg-[#070914] rounded-3xl p-8 sm:p-10 border border-white/10 text-left relative">
            
            <h3 className="text-2xl font-black text-white tracking-tight font-display mb-2">{t.formTitle[lang]}</h3>
            <p className="text-xs text-gray-400 font-light leading-relaxed mb-8">{t.formDesc[lang]}</p>

            {submitSuccess ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-blue-600/10 border border-blue-500/20 rounded-2xl p-6 space-y-6"
              >
                <div className="flex items-center space-x-3 text-blue-400">
                  <CheckCircle className="w-8 h-8" />
                  <div>
                    <h4 className="font-bold text-base text-white">{lang === 'RU' ? 'Заявка успешно принята!' : lang === 'KG' ? 'Суроо-талап ийгиликтүү кабыл алынды!' : 'Request Sent Successfully!'}</h4>
                    <span className="text-[10px] font-mono text-blue-300 uppercase tracking-widest">{submittedData?.id}</span>
                  </div>
                </div>

                <div className="divide-y divide-white/5 font-mono text-xs space-y-3.5 pt-2">
                  <div className="flex justify-between py-2">
                    <span className="text-gray-400">{lang === 'RU' ? 'Время регистрации' : lang === 'KG' ? 'Катталган убактысы' : 'Registered At'}:</span>
                    <span className="text-white font-bold">{submittedData?.timestamp}</span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="text-gray-400">{lang === 'RU' ? 'Назначенный эксперт' : lang === 'KG' ? 'Дайындалган адис' : 'Assigned Specialist'}:</span>
                    <span className="text-white font-bold">{submittedData?.manager}</span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="text-gray-400">{lang === 'RU' ? 'Ожидание звонка' : lang === 'KG' ? 'Чалууну күтүү мөөнөтү' : 'ETA Callback'}:</span>
                    <span className="text-amber-400 font-bold">{submittedData?.eta}</span>
                  </div>
                  <div className="py-2 space-y-1">
                    <span className="text-gray-400 block">{lang === 'RU' ? 'Суть обращения' : lang === 'KG' ? 'Кайрылуунун кыскача мазмуну' : 'Inquiry Summary'}:</span>
                    <p className="text-xs text-gray-200 not-italic font-sans leading-relaxed">{submittedData?.message || '—'}</p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-3.5 pt-4">
                  <button 
                    onClick={() => {
                      setSubmitSuccess(false);
                      setFormData({ fullName: '', phone: '', email: '', serviceNeeded: 'import', message: '' });
                    }}
                    className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold py-2.5 px-6 rounded-lg transition-colors"
                  >
                    {lang === 'RU' ? 'Отправить ещё один запрос' : lang === 'KG' ? 'Жаңы суроо-талап жөнөтүү' : 'Send Another Request'}
                  </button>

                  <a 
                    href="https://wa.me/996555123456"
                    target="_blank"
                    rel="noreferrer"
                    className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold py-2.5 px-6 rounded-lg transition-colors flex items-center space-x-1.5"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>WhatsApp</span>
                  </a>
                </div>
              </motion.div>
            ) : (
              <form onSubmit={(e) => handleSubmit(e, false)} className="space-y-5">
                
                {/* Full name */}
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-gray-300 uppercase tracking-wider block">
                    {t.fieldName[lang]} <span className="text-red-500">*</span>
                  </label>
                  <input 
                    type="text" 
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    placeholder={lang === 'RU' ? 'Иван Иванов' : lang === 'KG' ? 'Мисалы: Асан Үсөн уулу' : 'E.g. John Doe'}
                    className={`w-full bg-white/5 border rounded-xl py-3 px-4 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all ${
                      formErrors.fullName ? 'border-red-500/60' : 'border-white/10 focus:border-blue-500'
                    }`}
                  />
                  {formErrors.fullName && (
                    <span className="text-[10px] text-red-400 font-mono block mt-1">{formErrors.fullName}</span>
                  )}
                </div>

                {/* Phone & Email Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold text-gray-300 uppercase tracking-wider block">
                      {t.fieldPhone[lang]} <span className="text-red-500">*</span>
                    </label>
                    <input 
                      type="tel" 
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="+996 (555) 123-456"
                      className={`w-full bg-white/5 border rounded-xl py-3 px-4 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all ${
                        formErrors.phone ? 'border-red-500/60' : 'border-white/10 focus:border-blue-500'
                      }`}
                    />
                    {formErrors.phone && (
                      <span className="text-[10px] text-red-400 font-mono block mt-1">{formErrors.phone}</span>
                    )}
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold text-gray-300 uppercase tracking-wider block">
                      {t.fieldEmail[lang]} <span className="text-red-500">*</span>
                    </label>
                    <input 
                      type="email" 
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="client@example.com"
                      className={`w-full bg-white/5 border rounded-xl py-3 px-4 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all ${
                        formErrors.email ? 'border-red-500/60' : 'border-white/10 focus:border-blue-500'
                      }`}
                    />
                    {formErrors.email && (
                      <span className="text-[10px] text-red-400 font-mono block mt-1">{formErrors.email}</span>
                    )}
                  </div>
                </div>

                {/* Service needed select option */}
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-gray-300 uppercase tracking-wider block">
                    {t.fieldService[lang]}
                  </label>
                  <select 
                    name="serviceNeeded"
                    value={formData.serviceNeeded}
                    onChange={handleInputChange}
                    className="w-full bg-[#0a0f24] border border-white/10 rounded-xl py-3 px-4 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all"
                  >
                    <option value="import">{t.service1[lang]}</option>
                    <option value="vin">{t.service2[lang]}</option>
                    <option value="stock">{t.service3[lang]}</option>
                    <option value="b2b">{t.service4[lang]}</option>
                  </select>
                </div>

                {/* Message input */}
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-gray-300 uppercase tracking-wider block">
                    {t.fieldMessage[lang]}
                  </label>
                  <textarea 
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={4}
                    placeholder={t.placeholderMessage[lang]}
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all resize-none"
                  />
                </div>

                {/* Submit Buttons */}
                <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="sm:col-span-8 bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-bold py-3.5 px-6 rounded-xl shadow-lg transition-all hover:scale-[1.01] flex items-center justify-center space-x-2 disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <span className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full" />
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>{t.btnSendRequest[lang]}</span>
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={(e) => handleSubmit(e, true)}
                    disabled={isSubmitting}
                    className="sm:col-span-4 bg-white/5 hover:bg-white/10 border border-white/10 text-white text-xs font-bold py-3.5 px-4 rounded-xl transition-all"
                  >
                    {t.btnRequestCallback[lang]}
                  </button>
                </div>

              </form>
            )}

          </div>

          {/* Right column: Socials, Interactive map routing calculator (5 cols) */}
          <div className="lg:col-span-5 space-y-8">
            
            {/* Social media card */}
            <div className="bg-gradient-to-br from-[#0c0f24] to-[#040612] rounded-3xl p-8 border border-white/5 text-left space-y-6">
              <h4 className="text-lg font-bold text-white font-display">
                {lang === 'RU' ? 'Мы в социальных сетях' : lang === 'KG' ? 'Биз социалдык тармактарда' : 'Follow AutoHub'}
              </h4>
              <p className="text-xs text-gray-400 font-light leading-relaxed">
                {lang === 'RU' ? 'Получайте ежедневные эксклюзивные отчеты с аукционов США и Кореи, обзоры новых авто в Бишкеке и аналитику рынка.' 
                              : lang === 'KG' ? 'АКШ жана Кореядан эксклюзивдүү сунуштар, Бишкектеги жаңы унаалардын видеолору.' 
                              : 'Tune in to our premium digital handles for live auto imports reviews, market stats, and on-site port recordings.'}
              </p>

              {/* Grid of socials */}
              <div className="grid grid-cols-2 gap-3.5">
                
                <a 
                  href="https://instagram.com/autohubkg" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="flex items-center space-x-2.5 bg-white/5 hover:bg-[#E1306C]/10 border border-white/10 hover:border-[#E1306C]/40 p-3 rounded-xl transition-all group"
                >
                  <Instagram className="w-4 h-4 text-gray-400 group-hover:text-[#E1306C] transition-colors" />
                  <span className="text-[11px] font-bold text-gray-200 group-hover:text-white transition-colors">Instagram</span>
                </a>

                <a 
                  href="https://facebook.com/autohubkg" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="flex items-center space-x-2.5 bg-white/5 hover:bg-[#1877F2]/10 border border-white/10 hover:border-[#1877F2]/40 p-3 rounded-xl transition-all group"
                >
                  <Facebook className="w-4 h-4 text-gray-400 group-hover:text-[#1877F2] transition-colors" />
                  <span className="text-[11px] font-bold text-gray-200 group-hover:text-white transition-colors">Facebook</span>
                </a>

                <a 
                  href="https://youtube.com/autohubkg" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="flex items-center space-x-2.5 bg-white/5 hover:bg-[#FF0000]/10 border border-white/10 hover:border-[#FF0000]/40 p-3 rounded-xl transition-all group"
                >
                  <Youtube className="w-4 h-4 text-gray-400 group-hover:text-[#FF0000] transition-colors" />
                  <span className="text-[11px] font-bold text-gray-200 group-hover:text-white transition-colors">YouTube</span>
                </a>

                <a 
                  href="https://t.me/autohubkg" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="flex items-center space-x-2.5 bg-white/5 hover:bg-[#0088cc]/10 border border-white/10 hover:border-[#0088cc]/40 p-3 rounded-xl transition-all group"
                >
                  <Send className="w-4 h-4 text-gray-400 group-hover:text-[#0088cc] transition-colors -rotate-12" />
                  <span className="text-[11px] font-bold text-gray-200 group-hover:text-white transition-colors">Telegram Channel</span>
                </a>

              </div>
            </div>

            {/* Smart Distance Router Calculator */}
            <div className="bg-gradient-to-br from-[#0c0f24] to-[#040612] rounded-3xl p-8 border border-white/5 text-left space-y-5">
              <div className="space-y-1">
                <span className="text-[10px] font-mono tracking-wider uppercase text-blue-400 font-bold">
                  {lang === 'RU' ? 'ИНТЕЛЛЕКТУАЛЬНЫЙ МАРШРУТ' : lang === 'KG' ? 'ИНТЕЛЛЕКТУАЛДУУ МАРШРУТ' : 'AI ROUTE GENERATOR'}
                </span>
                <h4 className="text-base font-bold text-white tracking-tight">
                  {lang === 'RU' ? 'Рассчитать расстояние до офиса' : lang === 'KG' ? 'Кеңсеге чейинки аралыкты эсептөө' : 'Calculate Distance to Office'}
                </h4>
              </div>

              <p className="text-xs text-gray-400 leading-relaxed font-light">
                {lang === 'RU' ? 'Введите ваш текущий адрес в Бишкеке (например: ТРЦ Азия Молл, 10-й микрорайон, Аламедин-1) для расчёта.'
                              : lang === 'KG' ? 'Бишкек шаарындагы дарегиңизди жазыңыз.'
                              : 'Enter your current address or landmark in Bishkek to calculate a direct driving route to Belinka Business Center.'}
              </p>

              <form onSubmit={calculateDirections} className="space-y-3">
                <div className="relative">
                  <input 
                    type="text" 
                    value={searchAddress}
                    onChange={(e) => {
                      setSearchAddress(e.target.value);
                      if (calculatedDistance) setCalculatedDistance(null);
                    }}
                    placeholder={lang === 'RU' ? 'ул. Киевская 148 / Вефа Центр' : lang === 'KG' ? 'мисалы: Азия Молл' : 'E.g., Asia Mall, Kievskaya St'}
                    className="w-full bg-white/5 border border-white/10 focus:border-blue-500 focus:outline-none rounded-xl py-3 pl-4 pr-10 text-xs text-white"
                  />
                  <button type="submit" className="absolute right-3 top-3 text-blue-400 hover:text-white transition-colors">
                    <Compass className="w-4 h-4" />
                  </button>
                </div>

                <button 
                  type="submit" 
                  className="w-full bg-white/5 hover:bg-white/10 border border-white/10 py-2.5 rounded-xl text-xs font-bold transition-all text-white"
                >
                  {lang === 'RU' ? 'Сгенерировать маршрут' : lang === 'KG' ? 'Маршрутту алуу' : 'Generate Route'}
                </button>
              </form>

              {calculatedDistance && (
                <motion.div 
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-3.5 bg-blue-500/10 border border-blue-500/20 text-blue-300 rounded-xl text-xs font-mono leading-relaxed flex items-start space-x-2.5"
                >
                  <MapPin className="w-4 h-4 shrink-0 mt-0.5 text-blue-400" />
                  <span>{calculatedDistance}</span>
                </motion.div>
              )}
            </div>

          </div>
        </div>
      </section>

      {/* PREMIUM GOOGLE MAP COMPONENT (LARGE CARD) */}
      <section id="google-map-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-[#070914] rounded-3xl border border-white/10 overflow-hidden text-left relative">
          
          {/* Header Map Panel */}
          <div className="p-6 border-b border-white/10 flex flex-wrap items-center justify-between gap-4 bg-slate-950/60 backdrop-blur-md">
            <div className="space-y-1">
              <span className="text-[10px] font-mono tracking-widest text-blue-400 uppercase font-bold">
                {lang === 'RU' ? 'КАРТА И ГЕОПОЗИЦИЯ' : lang === 'KG' ? 'КАРТА ЖАНА ГЕОПОЗИЦИЯ' : 'GEOSPATIAL LOCATION'}
              </span>
              <h3 className="text-xl font-bold text-white font-display">
                {lang === 'RU' ? 'Интерактивный Шоурум Бишкек' : lang === 'KG' ? 'Бишкек Интерактивдүү Шоурум' : 'Interactive Bishkek Headquarters'}
              </h3>
            </div>

            {/* Map Theme Toggles */}
            <div className="flex items-center space-x-1 bg-white/5 p-1 rounded-lg border border-white/10">
              <button 
                onClick={() => setMapStyle('luxury')}
                className={`px-3 py-1.5 rounded text-[10px] font-bold transition-all ${
                  mapStyle === 'luxury' ? 'bg-blue-600 text-white' : 'text-gray-400 hover:text-white'
                }`}
              >
                {lang === 'RU' ? 'Люкс Тёмная' : lang === 'KG' ? 'Люкс Түнкү' : 'Luxury Dark'}
              </button>
              <button 
                onClick={() => setMapStyle('satellite')}
                className={`px-3 py-1.5 rounded text-[10px] font-bold transition-all ${
                  mapStyle === 'satellite' ? 'bg-blue-600 text-white' : 'text-gray-400 hover:text-white'
                }`}
              >
                {lang === 'RU' ? 'Спутник' : lang === 'KG' ? 'Спутник' : 'Satellite'}
              </button>
              <button 
                onClick={() => setMapStyle('street')}
                className={`px-3 py-1.5 rounded text-[10px] font-bold transition-all ${
                  mapStyle === 'street' ? 'bg-blue-600 text-white' : 'text-gray-400 hover:text-white'
                }`}
              >
                {lang === 'RU' ? 'Схема' : lang === 'KG' ? 'Схема' : 'Street Map'}
              </button>
            </div>
          </div>

          {/* Interactive Simulated Map Stage */}
          <div className="relative aspect-[16/9] md:min-h-[460px] w-full bg-[#05070e] overflow-hidden flex items-center justify-center">
            
            {/* Dark luxury map styling simulation */}
            {mapStyle === 'luxury' && (
              <div className="absolute inset-0 opacity-40 mix-blend-screen pointer-events-none">
                {/* Simulated geometric grid patterns */}
                <div className="absolute inset-0 bg-[radial-gradient(#111827_1.2px,transparent_1.2px)] [background-size:24px_24px] opacity-65" />
                <div className="absolute top-[30%] left-0 right-0 h-[1px] bg-blue-500/20" />
                <div className="absolute top-[60%] left-0 right-0 h-[1px] bg-blue-500/10" />
                <div className="absolute left-[25%] top-0 bottom-0 w-[1px] bg-blue-500/15" />
                <div className="absolute left-[70%] top-0 bottom-0 w-[1px] bg-blue-500/20" />
                {/* Ala-Archa River line simulated */}
                <svg className="absolute left-[40%] top-0 h-full w-24 text-blue-900/40" fill="none" viewBox="0 0 100 800" preserveAspectRatio="none">
                  <path d="M10,0 Q30,150 20,300 T50,600 T80,800" stroke="currentColor" strokeWidth="6" strokeLinecap="round" />
                </svg>
                {/* Major streets lines */}
                <div className="absolute top-[45%] left-0 right-0 h-4 bg-gray-900/60 border-y border-white/5 -rotate-3 flex items-center pl-24 text-[8px] text-gray-500 font-mono">
                  CHUY AVENUE (ЧУЙ ПРОСПЕКТИ)
                </div>
                <div className="absolute left-[55%] top-0 bottom-0 w-8 bg-gray-900/60 border-x border-white/5 rotate-6 flex items-end pb-24 text-[8px] text-gray-500 font-mono tracking-widest uppercase [writing-mode:vertical-lr]">
                  Chyngyz Aitmatov Avenue (Белинка)
                </div>
              </div>
            )}

            {/* Satellite map styling simulation */}
            {mapStyle === 'satellite' && (
              <div className="absolute inset-0 opacity-30 bg-cover bg-center pointer-events-none" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=1200&q=80")' }}>
                <div className="absolute inset-0 bg-blue-950/20 mix-blend-color" />
              </div>
            )}

            {/* Street map styling simulation */}
            {mapStyle === 'street' && (
              <div className="absolute inset-0 opacity-20 pointer-events-none bg-blue-900/5">
                <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:20px_20px] opacity-40" />
                <div className="absolute top-[45%] left-0 right-0 h-2 bg-blue-500/10" />
                <div className="absolute left-[55%] top-0 bottom-0 w-4 bg-blue-500/10" />
              </div>
            )}

            {/* Interactive map controls bottom right */}
            <div className="absolute bottom-6 left-6 z-10 space-y-2 max-w-sm bg-black/85 backdrop-blur-md p-5 rounded-2xl border border-white/10 shadow-2xl">
              <div className="flex items-start space-x-3">
                <div className="p-2 bg-blue-600 text-white rounded-lg">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">AutoHub Kyrgyzstan HQ</h4>
                  <p className="text-xs text-gray-400 mt-1 leading-relaxed">
                    {lang === 'RU' ? 'БЦ Белинка, 3 этаж (напротив посольства США)' : lang === 'KG' ? 'Белинка ББ, 3-кабат' : 'Belinka BC, 3rd Floor (Opposite US Embassy)'}
                  </p>
                  <span className="text-[10px] text-blue-400 font-mono block mt-1.5">
                    42.8241° N, 74.5852° E
                  </span>
                </div>
              </div>

              <div className="pt-3.5 border-t border-white/5 flex items-center justify-between">
                <span className="text-[10px] text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded">
                  {lang === 'RU' ? 'Доступна парковка' : lang === 'KG' ? 'Тура турган жер бар' : 'Guest Parking Available'}
                </span>
                
                <a 
                  href="https://yandex.com/maps/?text=42.8241,74.5852"
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs text-white hover:text-blue-400 font-bold flex items-center space-x-1"
                >
                  <span>Yandex Maps</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Simulated Marker Center Spot */}
            <motion.div 
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
              className="relative cursor-pointer z-20 group"
            >
              {/* Outer pulsing ring */}
              <div className="absolute -inset-6 bg-blue-500/30 rounded-full blur animate-ping pointer-events-none" />
              
              {/* Pin frame */}
              <div className="bg-blue-600 text-white p-4.5 rounded-full border border-blue-400/50 shadow-2xl flex items-center justify-center">
                <MapPin className="w-8 h-8 text-white fill-current" />
              </div>
              
              {/* Small tooltip overhead on hover */}
              <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-[#0B3D91] text-white text-[10px] font-black tracking-widest uppercase py-1.5 px-3.5 rounded-lg border border-blue-400/30 shadow-md whitespace-nowrap opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                ★ AUTOHUB HQ
              </div>
            </motion.div>

          </div>

          {/* Bottom Actions Frame */}
          <div className="p-6 bg-[#04060e] flex flex-col sm:flex-row items-center justify-between gap-6">
            <p className="text-xs text-gray-400 leading-relaxed text-center sm:text-left">
              {lang === 'RU' ? 'Адрес: г. Бишкек, Проспект Чынгыза Айтматова 303/1. Ориентир: напротив Торгового Представительства РФ / Парк Победы.'
                            : lang === 'KG' ? 'Дареги: Бишкек ш., Чыңгыз Айтматов проспектиси 303/1.'
                            : 'Address: 303/1 Chyngyz Aitmatov Ave, Bishkek. Landmark: Victory Park / Southern Highway Area.'}
            </p>

            <a 
              href="https://yandex.com/maps/10309/bishkek/?ll=74.5852%2C42.8241&z=16" 
              target="_blank" 
              rel="noreferrer"
              className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold py-3 px-6 rounded-xl shadow-md transition-all flex items-center space-x-2 shrink-0"
            >
              <Layers className="w-4 h-4" />
              <span>{lang === 'RU' ? 'Открыть на Яндекс Картах' : lang === 'KG' ? 'Яндекс Картадан ачуу' : 'Open in Yandex Maps'}</span>
            </a>
          </div>

        </div>
      </section>

      {/* FINAL CALL TO ACTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-gradient-to-r from-[#0a122e] via-[#050818] to-[#02040b] rounded-3xl p-8 sm:p-12 border border-blue-500/20 text-center relative overflow-hidden space-y-6">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/10 via-transparent to-transparent pointer-events-none" />

          <span className="text-xs font-black tracking-[0.2em] text-blue-400 uppercase font-mono block">
            {lang === 'RU' ? 'СДЕЛАЙТЕ СЛЕДУЮЩИЙ ШАГ' : lang === 'KG' ? 'КИЙИНКИ КАДАМ' : 'START THE COOPERATION'}
          </span>
          
          <h2 className="text-3xl sm:text-4xl font-black text-white font-display">
            {t.ctaTitle[lang]}
          </h2>
          
          <p className="text-xs sm:text-sm text-gray-400 max-w-xl mx-auto font-light leading-relaxed">
            {t.ctaSubtitle[lang]}
          </p>

          <div className="flex flex-wrap gap-4 items-center justify-center pt-4">
            
            <button
              onClick={() => {
                if (onNavigateToView) onNavigateToView('order-car');
              }}
              className="bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-bold py-3.5 px-8 rounded-xl shadow-lg transition-all hover:scale-[1.02]"
            >
              {t.btnOrderVehicle[lang]}
            </button>

            <a
              href="#contact-form-section"
              className="bg-white/5 hover:bg-white/10 text-white text-xs sm:text-sm font-bold py-3.5 px-8 rounded-xl border border-white/10 transition-all hover:scale-[1.02]"
            >
              {t.btnTalkExpert[lang]}
            </a>

            <button
              onClick={() => {
                if (onNavigateToView) onNavigateToView('dealers');
              }}
              className="bg-transparent hover:bg-white/5 text-blue-400 hover:text-blue-300 text-xs sm:text-sm font-bold py-3.5 px-6 rounded-xl border border-blue-500/20 hover:border-blue-500/30 transition-all"
            >
              {t.btnBecomePartner[lang]}
            </button>

          </div>
        </div>
      </section>

      {/* CONSULTATION BOOKING MODAL */}
      <AnimatePresence>
        {isConsultationModalOpen && (
          <div className="fixed inset-0 z-[1000] overflow-y-auto flex items-center justify-center p-4">
            {/* Backdrop */}
            <div 
              onClick={() => setIsConsultationModalOpen(false)}
              className="fixed inset-0 bg-black/85 backdrop-blur-md"
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="bg-[#0b0e1b] rounded-3xl w-full max-w-lg overflow-hidden shadow-2xl relative border border-white/15 z-[1001] p-6 sm:p-8 text-left"
            >
              <button 
                onClick={() => setIsConsultationModalOpen(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
              >
                ✕
              </button>

              <div className="space-y-6">
                
                <div className="space-y-1">
                  <span className="text-[10px] font-mono tracking-widest text-blue-400 uppercase font-black flex items-center space-x-1">
                    <Sparkles className="w-3.5 h-3.5 text-blue-400" />
                    <span>{lang === 'RU' ? 'ЗАПИСЬ НА КОНСУЛЬТАЦИЮ' : 'КЕҢЕШ АЛУУГА ЖАЗЫЛУУ'}</span>
                  </span>
                  <h3 className="text-xl font-bold text-white font-display">
                    {lang === 'RU' ? 'Забронировать визит / Звонок' : lang === 'KG' ? 'Адис менен жолугушуу' : 'Book Expert Consultation'}
                  </h3>
                  <p className="text-xs text-gray-400 font-light">
                    {lang === 'RU' ? 'Выберите дату, время и специалиста. Наш бот зарезервирует слот.'
                                  : lang === 'KG' ? 'Каалаган күнүңүздү жана убактыңызды тандаңыз.'
                                  : 'Select your preferred date, hour and consultant to guarantee instant VIP support.'}
                  </p>
                </div>

                {consultationSuccess ? (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="p-5 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl text-center space-y-3"
                  >
                    <CheckCircle className="w-10 h-10 text-emerald-400 mx-auto" />
                    <h4 className="font-bold text-white">{lang === 'RU' ? 'Консультация успешно забронирована!' : 'Жолугушуу ийгиликтүү брондолду!'}</h4>
                    <p className="text-xs text-gray-400 leading-relaxed">
                      {lang === 'RU' ? 'Слот подтвержден. СМС-уведомление с кодом пропуска отправлено на ваш телефон.'
                                    : 'Биздин адис көрсөтүлгөн убакытта сиз менен байланышат.'}
                    </p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleBookConsultation} className="space-y-4">
                    
                    {/* Expert Choice */}
                    <div className="space-y-1.5">
                      <label className="text-[11px] font-bold text-gray-300 uppercase tracking-wider block">
                        {lang === 'RU' ? 'Специалист' : lang === 'KG' ? 'Адис' : 'Consultant Expert'}
                      </label>
                      <select 
                        value={selectedExpert}
                        onChange={(e) => setSelectedExpert(e.target.value)}
                        className="w-full bg-[#0a0f24] border border-white/10 rounded-xl py-3 px-4 text-xs text-white"
                      >
                        <option value="any">{lang === 'RU' ? 'Любой свободный специалист' : 'Каалаган бош адис'}</option>
                        <option value="askar">{lang === 'RU' ? 'Аскар (Генеральный директор)' : 'Аскар (Башкы директор)'}</option>
                        <option value="aybek">{lang === 'RU' ? 'Айбек (Старший менеджер по продажам)' : 'Айбек (Сатуу бөлүмү)'}</option>
                        <option value="nurlan">{lang === 'RU' ? 'Нурлан (Технический эксперт по VIN)' : 'Нурлан (Техникалык адис)'}</option>
                      </select>
                    </div>

                    {/* Date picker */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-[11px] font-bold text-gray-300 uppercase tracking-wider block">
                          {lang === 'RU' ? 'Дата визита' : 'Күнү'}
                        </label>
                        <input 
                          type="date" 
                          required
                          value={selectedDate}
                          onChange={(e) => setSelectedDate(e.target.value)}
                          className="w-full bg-white/5 border border-white/10 rounded-xl py-2.5 px-3.5 text-xs text-white focus:outline-none focus:border-blue-500"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[11px] font-bold text-gray-300 uppercase tracking-wider block">
                          {lang === 'RU' ? 'Время визита' : 'Сааты'}
                        </label>
                        <input 
                          type="time" 
                          required
                          value={selectedTime}
                          onChange={(e) => setSelectedTime(e.target.value)}
                          className="w-full bg-white/5 border border-white/10 rounded-xl py-2.5 px-3.5 text-xs text-white focus:outline-none focus:border-blue-500"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold py-3 rounded-xl transition-all shadow-md shadow-blue-900/10 flex items-center justify-center space-x-2"
                    >
                      <UserCheck className="w-4 h-4" />
                      <span>{lang === 'RU' ? 'Подтвердить бронирование' : 'Брондоону тастыктоо'}</span>
                    </button>

                  </form>
                )}

              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
