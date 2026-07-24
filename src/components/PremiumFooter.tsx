import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Globe, 
  Clock, 
  ArrowUpRight, 
  Sparkles, 
  CheckCircle2, 
  Instagram, 
  Facebook, 
  Youtube, 
  Send, 
  Linkedin,
  MessageCircle,
  ShieldCheck,
  Zap,
  Info,
  ExternalLink
} from 'lucide-react';
import { Logo } from './Logo';

interface PremiumFooterProps {
  lang: 'RU' | 'KG' | 'EN';
  setCurrentView: (view: any) => void;
  triggerToast: (msg: string) => void;
}

export function PremiumFooter({ lang, setCurrentView, triggerToast }: PremiumFooterProps) {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Translations
  const t = {
    desc: {
      RU: "AutoHub Kyrgyzstan — это автомобильная экосистема на базе искусственного интеллекта для покупки, продажи, импорта, проверки по VIN, управления дилерскими центрами и интеллектуальных бизнес-решений.",
      KG: "AutoHub Kyrgyzstan — бул унааларды сатып алуу, сатуу, импорттоо, VIN аркылуу текшерүү, дилердик борборлорду башкаруу жана интеллектуалдык бизнес чечимдер үчүн жасалма интеллектке негизделген автоунаа экосистемасы.",
      EN: "AutoHub Kyrgyzstan is an AI-powered automotive ecosystem for vehicle buying, selling, importing, verification, dealership management and intelligent business solutions."
    },
    rights: {
      RU: "Все права защищены.",
      KG: "Бардык укуктар корголгон.",
      EN: "All Rights Reserved."
    },
    newsletterHead: {
      RU: "Будьте в курсе событий с AutoHub",
      KG: "AutoHub жаңылыктарынан кабардар болуңуз",
      EN: "Stay Updated with AutoHub"
    },
    newsletterSub: {
      RU: "Подпишитесь на нашу премиум-рассылку, чтобы получать информацию о закрытых аукционах, снижении цен и аналитике импорта.",
      KG: "Жабык аукциондор, баалардын төмөндөшү жана импорттун аналитикасы тууралуу маалымат алуу үчүн премиум-каттоого жазылыңыз.",
      EN: "Subscribe to our luxury digest to receive exclusive live auction alerts, price drops, and import intelligence."
    },
    emailPlaceholder: {
      RU: "Ваш Email адрес",
      KG: "Сиздин электрондук дарегиңиз (Email)",
      EN: "Your Email Address"
    },
    subscribeBtn: {
      RU: "Подписаться",
      KG: "Катталуу",
      EN: "Subscribe"
    },
    subscribeSuccess: {
      RU: "Спасибо! Вы успешно подписаны на премиум-рассылку AutoHub.",
      KG: "Рахмат! Сиз AutoHub премиум-жаңылыктарына ийгиликтүү катталдыңыз.",
      EN: "Success! You are now subscribed to the AutoHub luxury digest."
    },
    // Col Headers
    quickLinks: {
      RU: "Быстрые ссылки",
      KG: "Тез шилтемелер",
      EN: "Quick Links"
    },
    autoServices: {
      RU: "Автоуслуги",
      KG: "Унаа кызматтары",
      EN: "Auto Services"
    },
    dealerPlatform: {
      RU: "Дилерская Платформа",
      KG: "Дилердик Платформа",
      EN: "Dealer Platform"
    },
    legal: {
      RU: "Юридическая информация",
      KG: "Юридикалык маалымат",
      EN: "Legal Documents"
    },
    support: {
      RU: "Служба поддержки",
      KG: "Колдоо кызматы",
      EN: "Support & Help"
    },
    contact: {
      RU: "Контакты",
      KG: "Байланыштар",
      EN: "Contact Details"
    },
    // Link names
    home: { RU: "Главная", KG: "Башкы бет", EN: "Home" },
    cars: { RU: "Каталог авто", KG: "Унаалар каталогу", EN: "Cars Catalog" },
    aboutUs: { RU: "О нас", KG: "Биз жөнүндө", EN: "About Us" },
    services: { RU: "Наши Услуги", KG: "Биздин Кызматтар", EN: "Services" },
    contactUs: { RU: "Связаться", KG: "Байланышуу", EN: "Contact Us" },
    
    orderCar: { RU: "Заказ автомобиля", KG: "Унаа заказ кылуу", EN: "Order Vehicle" },
    vinCheck: { RU: "Проверка VIN", KG: "VIN Текшерүү", EN: "VIN Check" },
    timeline: { RU: "Таймлайн доставки", KG: "Жеткирүү тарыхы", EN: "Vehicle Timeline" },
    aiDoctor: { RU: "ИИ Автодоктор", KG: "ЖИ Автодоктор", EN: "AI Auto Doctor" },
    trustScore: { RU: "Рейтинг доверия", KG: "Ишеним рейтинги", EN: "Trust Score" },
    auctions: { RU: "Аукционы", KG: "Аукциондор", EN: "Auction Services" },

    crm: { RU: "CRM система", KG: "CRM системасы", EN: "CRM Suite" },
    marketingAi: { RU: "Маркетинг ИИ", KG: "Маркетинг ЖИ", EN: "Marketing AI" },
    salesManager: { RU: "ИИ Менеджер продаж", KG: "ЖИ Сатуу менеджери", EN: "AI Sales Manager" },
    ceoDash: { RU: "Панель CEO", KG: "CEO панели", EN: "CEO Dashboard" },
    partnership: { RU: "Партнерство", KG: "Өнөктөштүк", EN: "Dealer Partnership" },
    analytics: { RU: "Бизнес-аналитика", KG: "Бизнес-аналитика", EN: "Business Analytics" },

    privacy: { RU: "Политика конфиденциальности", KG: "Купуялуулук саясаты", EN: "Privacy Policy" },
    terms: { RU: "Пользовательское соглашение", KG: "Колдонуу шарттары", EN: "Terms of Service" },
    cookies: { RU: "Файлы Cookie", KG: "Cookie саясаты", EN: "Cookie Policy" },
    refunds: { RU: "Политика возврата", KG: "Кайтарып берүү саясаты", EN: "Refund Policy" },
    disclaimer: { RU: "Отказ от ответственности", KG: "Жоопкерчиликтен баш тартуу", EN: "Disclaimer" },

    faq: { RU: "Вопросы и ответы (FAQ)", KG: "Суроо-жооптор (FAQ)", EN: "FAQ" },
    help: { RU: "Центр помощи", KG: "Жардам борбору", EN: "Help Center" },
    chat: { RU: "Живой чат 24/7", KG: "Түз баарлашуу 24/7", EN: "Live Chat Support" },
    
    office: { RU: "г. Бишкек, Пр. Ч. Айтматова 303/1", KG: "Бишкек ш., Ч. Айтматов проспектиси 303/1", EN: "303/1 Ch. Aitmatov Ave, Bishkek" },
    hours: { RU: "Пн-Пт: 09:00 - 19:00, Сб: 10:00 - 17:00", KG: "Дш-Жм: 09:00 - 19:00, Иш: 10:00 - 17:00", EN: "Mon-Fri: 09:00 - 19:00, Sat: 10:00 - 17:00" },

    newsletterError: {
      RU: "Пожалуйста, введите корректный адрес почты",
      KG: "Сураныч, туура электрондук даректи киргизиңиз",
      EN: "Please enter a valid email address"
    }
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    
    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) {
      setErrorMsg(t.newsletterError[lang]);
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubscribed(true);
      triggerToast(t.subscribeSuccess[lang]);
      setEmail('');
    }, 1200);
  };

  const handleLinkClick = (view: any, toastMsg: string) => {
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (toastMsg) {
      triggerToast(toastMsg);
    }
  };

  return (
    <footer className="bg-[#03050c] text-white pt-20 pb-8 border-t border-white/10 relative overflow-hidden font-sans">
      
      {/* Glow Effects */}
      <div className="absolute top-0 left-1/4 w-[400px] h-[400px] bg-blue-600/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* ==================== NEWSLETTER SECTION ==================== */}
        <div className="mb-20">
          <div className="bg-gradient-to-r from-[#070b1b] via-[#0b1535] to-[#040818] rounded-3xl p-8 md:p-12 border border-white/10 shadow-2xl relative overflow-hidden text-left flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
            
            <div className="max-w-xl space-y-3">
              <div className="inline-flex items-center space-x-2 bg-blue-500/15 border border-blue-500/30 px-3.5 py-1 rounded-full">
                <Sparkles className="w-3.5 h-3.5 text-blue-400" />
                <span className="text-[10px] font-black uppercase tracking-widest text-blue-400">
                  {lang === 'RU' ? 'ЭКСКЛЮЗИВНЫЕ ОБНОВЛЕНИЯ' : lang === 'KG' ? 'ЭКСКЛЮЗИВДҮҮ ЖАҢЫЛЫКТАР' : 'VIP AUTO INSIGHTS'}
                </span>
              </div>
              <h3 className="text-2xl md:text-3xl font-black tracking-tight text-white font-display">
                {t.newsletterHead[lang]}
              </h3>
              <p className="text-xs md:text-sm text-gray-400 leading-relaxed font-light">
                {t.newsletterSub[lang]}
              </p>
            </div>

            <div className="w-full lg:max-w-md">
              <AnimatePresence mode="wait">
                {!isSubscribed ? (
                  <motion.form 
                    key="newsletter-form"
                    onSubmit={handleSubscribe} 
                    className="space-y-3"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <div className="flex flex-col sm:flex-row gap-2.5">
                      <div className="relative flex-grow">
                        <Mail className="absolute left-4.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-gray-400" />
                        <input
                          type="email"
                          placeholder={t.emailPlaceholder[lang]}
                          value={email}
                          onChange={(e) => {
                            setEmail(e.target.value);
                            setErrorMsg('');
                          }}
                          className="w-full bg-black/40 border border-white/10 hover:border-white/25 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 rounded-xl py-3.5 pl-12 pr-4 text-xs font-semibold placeholder:text-gray-500 transition-all text-white outline-none"
                        />
                      </div>
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 text-white font-bold px-8 py-3.5 rounded-xl text-xs tracking-wider uppercase transition-all shadow-lg hover:shadow-blue-600/20 flex items-center justify-center space-x-2 shrink-0"
                      >
                        {isSubmitting ? (
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        ) : (
                          <>
                            <span>{t.subscribeBtn[lang]}</span>
                            <ArrowUpRight className="w-4 h-4" />
                          </>
                        )}
                      </button>
                    </div>
                    {errorMsg && (
                      <p className="text-[11px] text-red-400 font-semibold font-mono text-left pl-1">
                        ⚠️ {errorMsg}
                      </p>
                    )}
                  </motion.form>
                ) : (
                  <motion.div 
                    key="success-message"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4.5 flex items-start space-x-3 text-left"
                  >
                    <CheckCircle2 className="w-5.5 h-5.5 text-blue-400 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-bold text-sm text-white">{lang === 'RU' ? 'Подписка оформлена!' : lang === 'KG' ? 'Катталуу аяктады!' : 'Subscription Activated!'}</h4>
                      <p className="text-xs text-gray-400 font-light mt-0.5">{t.subscribeSuccess[lang]}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

          </div>
        </div>


        {/* ==================== MAIN FOOTER GRID ==================== */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 text-left pb-16 border-b border-white/5">
          
          {/* Column 1: Brand Info (4 Columns span) */}
          <div className="lg:col-span-4 space-y-6">
            <Logo theme="dark" showSubtitle={true} iconSize={44} />
            <p className="text-xs text-gray-400 leading-relaxed font-light max-w-sm">
              {t.desc[lang]}
            </p>
            
            {/* National Miniature Indicator */}
            <div className="flex items-center space-x-2 bg-white/3 border border-white/5 py-1.5 px-3 rounded-lg w-fit">
              <div className="w-6 h-4 bg-red-600 relative rounded-sm overflow-hidden flex items-center justify-center">
                <div className="w-2 h-2 bg-yellow-400 rounded-full flex items-center justify-center">
                  <span className="text-[4px] text-red-600 font-bold">☀️</span>
                </div>
              </div>
              <span className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider font-mono">
                KG / Premium Digital System
              </span>
            </div>

            {/* Social Icons Container */}
            <div className="space-y-2.5">
              <div className="text-[10px] font-mono uppercase tracking-widest text-blue-400 font-black">
                {lang === 'RU' ? 'МЫ В СОЦИАЛЬНЫХ СЕТЯХ' : lang === 'KG' ? 'БИЗ СОЦИАЛДЫК ТАРМАКТАРДА' : 'CONNECT WITH US'}
              </div>
              <div className="flex items-center gap-3">
                
                {/* Instagram */}
                <motion.a 
                  whileHover={{ y: -3, scale: 1.1 }}
                  href="https://instagram.com/autohubkg"
                  target="_blank"
                  rel="noreferrer"
                  title="Instagram"
                  className="w-10 h-10 bg-white/5 hover:bg-[#E1306C]/10 border border-white/5 hover:border-[#E1306C]/30 rounded-xl flex items-center justify-center text-gray-400 hover:text-[#E1306C] transition-colors"
                >
                  <Instagram className="w-4.5 h-4.5" />
                </motion.a>

                {/* Telegram */}
                <motion.a 
                  whileHover={{ y: -3, scale: 1.1 }}
                  href="https://t.me/autohubkg"
                  target="_blank"
                  rel="noreferrer"
                  title="Telegram"
                  className="w-10 h-10 bg-white/5 hover:bg-[#0088cc]/10 border border-white/5 hover:border-[#0088cc]/30 rounded-xl flex items-center justify-center text-gray-400 hover:text-[#0088cc] transition-colors"
                >
                  <Send className="w-4.5 h-4.5 -rotate-12" />
                </motion.a>

                {/* WhatsApp */}
                <motion.a 
                  whileHover={{ y: -3, scale: 1.1 }}
                  href="https://wa.me/996555123456"
                  target="_blank"
                  rel="noreferrer"
                  title="WhatsApp"
                  className="w-10 h-10 bg-white/5 hover:bg-[#25D366]/10 border border-white/5 hover:border-[#25D366]/30 rounded-xl flex items-center justify-center text-gray-400 hover:text-[#25D366] transition-colors"
                >
                  <MessageCircle className="w-4.5 h-4.5" />
                </motion.a>

                {/* Facebook */}
                <motion.a 
                  whileHover={{ y: -3, scale: 1.1 }}
                  href="https://facebook.com/autohubkg"
                  target="_blank"
                  rel="noreferrer"
                  title="Facebook"
                  className="w-10 h-10 bg-white/5 hover:bg-[#1877F2]/10 border border-white/5 hover:border-[#1877F2]/30 rounded-xl flex items-center justify-center text-gray-400 hover:text-[#1877F2] transition-colors"
                >
                  <Facebook className="w-4.5 h-4.5" />
                </motion.a>

                {/* YouTube */}
                <motion.a 
                  whileHover={{ y: -3, scale: 1.1 }}
                  href="https://youtube.com/autohubkg"
                  target="_blank"
                  rel="noreferrer"
                  title="YouTube"
                  className="w-10 h-10 bg-white/5 hover:bg-[#FF0000]/10 border border-white/5 hover:border-[#FF0000]/30 rounded-xl flex items-center justify-center text-gray-400 hover:text-[#FF0000] transition-colors"
                >
                  <Youtube className="w-4.5 h-4.5" />
                </motion.a>

                {/* LinkedIn */}
                <motion.a 
                  whileHover={{ y: -3, scale: 1.1 }}
                  href="https://linkedin.com/company/autohubkg"
                  target="_blank"
                  rel="noreferrer"
                  title="LinkedIn"
                  className="w-10 h-10 bg-white/5 hover:bg-[#0a66c2]/10 border border-white/5 hover:border-[#0a66c2]/30 rounded-xl flex items-center justify-center text-gray-400 hover:text-[#0a66c2] transition-colors"
                >
                  <Linkedin className="w-4.5 h-4.5" />
                </motion.a>

              </div>
            </div>
          </div>

          {/* Column 2: Quick Links (2 Columns span) */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-[11px] font-black uppercase tracking-[0.2em] text-blue-400">
              {t.quickLinks[lang]}
            </h4>
            <ul className="space-y-2.5 text-xs text-gray-400 font-light">
              <li>
                <button 
                  onClick={() => handleLinkClick('catalog', lang === 'RU' ? 'Переход на Главную...' : 'Башкы бетке өтүү...')}
                  className="hover:text-white hover:underline transition-all flex items-center space-x-1"
                >
                  <span>{t.home[lang]}</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleLinkClick('catalog', lang === 'RU' ? 'Переход в каталог автомобилей...' : 'Каталогго өтүү...')}
                  className="hover:text-white hover:underline transition-all"
                >
                  {t.cars[lang]}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleLinkClick('about-us', lang === 'RU' ? 'Переход к странице О нас...' : 'Биз жөнүндө баракчага өтүү...')}
                  className="hover:text-white hover:underline transition-all"
                >
                  {t.aboutUs[lang]}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleLinkClick('services', lang === 'RU' ? 'Переход к списку услуг...' : 'Кызматтарга өтүү...')}
                  className="hover:text-white hover:underline transition-all"
                >
                  {t.services[lang]}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleLinkClick('contact-us', lang === 'RU' ? 'Переход к контактам...' : 'Байланыштарга өтүү...')}
                  className="hover:text-white hover:underline transition-all font-semibold text-blue-400"
                >
                  {t.contactUs[lang]}
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Auto Services (2 Columns span) */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-[11px] font-black uppercase tracking-[0.2em] text-blue-400">
              {t.autoServices[lang]}
            </h4>
            <ul className="space-y-2.5 text-xs text-gray-400 font-light">
              <li>
                <button 
                  onClick={() => handleLinkClick('order-car', lang === 'RU' ? 'Заказ унаа...' : 'Унаа заказ кылуу...')}
                  className="hover:text-white hover:underline transition-all"
                >
                  {t.orderCar[lang]}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleLinkClick('vin-check', lang === 'RU' ? 'Проверка истории автомобиля...' : 'VIN Текшерүү...')}
                  className="hover:text-white hover:underline transition-all"
                >
                  {t.vinCheck[lang]}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleLinkClick('vehicle_timeline', lang === 'RU' ? 'Просмотр таймлайна доставки автомобиля...' : 'Жеткирүү тарыхын көрүү...')}
                  className="hover:text-white hover:underline transition-all"
                >
                  {t.timeline[lang]}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleLinkClick('ai-advisor', lang === 'RU' ? 'Консультация с умным ИИ-Автодоктором...' : 'ЖИ Автодоктор менен байланышуу...')}
                  className="hover:text-white hover:underline transition-all flex items-center space-x-1"
                >
                  <Sparkles className="w-3 h-3 text-blue-400 shrink-0" />
                  <span>{t.aiDoctor[lang]}</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => {
                    handleLinkClick('catalog', '');
                    triggerToast(lang === 'RU' ? 'Оценка рейтинга доверия (Trust Score) основана на инспекциях в порту.' : 'Ишеним рейтинги порттогу текшерүүгө негизделген.');
                  }}
                  className="hover:text-white hover:underline transition-all"
                >
                  {t.trustScore[lang]}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleLinkClick('auctions', lang === 'RU' ? 'Переход на международные аукционы...' : 'Аукциондорго өтүү...')}
                  className="hover:text-white hover:underline transition-all"
                >
                  {t.auctions[lang]}
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Dealer Platform (2 Columns span) */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-[11px] font-black uppercase tracking-[0.2em] text-blue-400">
              {t.dealerPlatform[lang]}
            </h4>
            <ul className="space-y-2.5 text-xs text-gray-400 font-light">
              <li>
                <button 
                  onClick={() => handleLinkClick('crm', 'Opening Dealer CRM...')}
                  className="hover:text-white hover:underline transition-all"
                >
                  {t.crm[lang]}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleLinkClick('marketing_ai', 'Opening Marketing AI Engine...')}
                  className="hover:text-white hover:underline transition-all"
                >
                  {t.marketingAi[lang]}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleLinkClick('sales_manager', 'Opening AI Sales Manager Page...')}
                  className="hover:text-white hover:underline transition-all"
                >
                  {t.salesManager[lang]}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleLinkClick('ceo_dashboard', 'Opening CEO Dashboard...')}
                  className="hover:text-white hover:underline transition-all"
                >
                  {t.ceoDash[lang]}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleLinkClick('dealers', 'Opening Dealer Portal...')}
                  className="hover:text-white hover:underline transition-all"
                >
                  {t.partnership[lang]}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => {
                    handleLinkClick('ceo_dashboard', '');
                    triggerToast(lang === 'RU' ? 'Загрузка аналитики бизнес-процессов...' : 'Бизнес-аналитика жүктөлүүдө...');
                  }}
                  className="hover:text-white hover:underline transition-all"
                >
                  {t.analytics[lang]}
                </button>
              </li>
            </ul>
          </div>

          {/* Column 5: Legal & Support (2 Columns span) */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-[11px] font-black uppercase tracking-[0.2em] text-blue-400">
              {t.support[lang]} / {lang === 'RU' ? 'Инфо' : 'Юридикалык'}
            </h4>
            <ul className="space-y-2.5 text-xs text-gray-400 font-light">
              <li>
                <button 
                  onClick={() => triggerToast(lang === 'RU' ? 'Загрузка часто задаваемых вопросов (FAQ)...' : 'Суроо-жооптор жүктөлүүдө (FAQ)...')}
                  className="hover:text-white hover:underline transition-all"
                >
                  {t.faq[lang]}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => triggerToast(lang === 'RU' ? 'Открытие Центра помощи...' : 'Жардам борбору ачылууда...')}
                  className="hover:text-white hover:underline transition-all"
                >
                  {t.help[lang]}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleLinkClick('contact-us', '')}
                  className="hover:text-white hover:underline transition-all text-blue-400 font-semibold"
                >
                  {lang === 'RU' ? 'Служба поддержки' : 'Колдоо кызматы'}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => triggerToast(lang === 'RU' ? 'Запуск Живого чата поддержки 24/7...' : 'Түз колдоо баарлашуусу башталды...')}
                  className="hover:text-white hover:underline transition-all flex items-center space-x-1"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping shrink-0" />
                  <span>{t.chat[lang]}</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleLinkClick('dealers', 'Opening Dealer Partnership Program...')}
                  className="hover:text-white hover:underline transition-all"
                >
                  {lang === 'RU' ? 'Стать партнером (B2B)' : lang === 'KG' ? 'Өнөктөш болуу (B2B)' : 'Become Partner'}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => triggerToast(t.privacy[lang])}
                  className="hover:text-white hover:underline transition-all text-[10px] text-gray-500 mt-2 block"
                >
                  {t.privacy[lang]}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => triggerToast(t.terms[lang])}
                  className="hover:text-white hover:underline transition-all text-[10px] text-gray-500 block"
                >
                  {t.terms[lang]}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => triggerToast(t.cookies[lang])}
                  className="hover:text-white hover:underline transition-all text-[10px] text-gray-500 block"
                >
                  {t.cookies[lang]}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => triggerToast(t.refunds[lang])}
                  className="hover:text-white hover:underline transition-all text-[10px] text-gray-500 block"
                >
                  {t.refunds[lang]}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => triggerToast(t.disclaimer[lang])}
                  className="hover:text-white hover:underline transition-all text-[10px] text-gray-500 block"
                >
                  {t.disclaimer[lang]}
                </button>
              </li>
            </ul>
          </div>

        </div>

        {/* ==================== CONTACT INFO BOTTOM DETAIL ROW ==================== */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 py-10 border-b border-white/5 text-xs text-gray-400">
          
          {/* Item 1: Office Address */}
          <div className="flex items-start space-x-3 text-left">
            <div className="w-9 h-9 bg-white/3 rounded-lg flex items-center justify-center text-blue-400 border border-white/5 shrink-0">
              <MapPin className="w-4 h-4" />
            </div>
            <div>
              <h5 className="font-bold text-white uppercase tracking-wider text-[10px] mb-0.5">
                {lang === 'RU' ? 'Адрес Главного Офиса' : lang === 'KG' ? 'Башкы Офистин Дареги' : 'Headquarters Address'}
              </h5>
              <p className="font-light leading-relaxed">{t.office[lang]}</p>
              <button 
                onClick={() => handleLinkClick('contact-us', '')}
                className="text-[10px] font-bold text-blue-400 hover:underline mt-1 block"
              >
                {lang === 'RU' ? 'Посмотреть карту' : lang === 'KG' ? 'Картаны көрүү' : 'Show Interactive Map'} &rarr;
              </button>
            </div>
          </div>

          {/* Item 2: Business Hours */}
          <div className="flex items-start space-x-3 text-left">
            <div className="w-9 h-9 bg-white/3 rounded-lg flex items-center justify-center text-blue-400 border border-white/5 shrink-0">
              <Clock className="w-4 h-4" />
            </div>
            <div>
              <h5 className="font-bold text-white uppercase tracking-wider text-[10px] mb-0.5">
                {lang === 'RU' ? 'Часы Работы Офиса' : lang === 'KG' ? 'Офистин Иштөө Сааттары' : 'Business Hours'}
              </h5>
              <p className="font-light leading-relaxed">{t.hours[lang]}</p>
              <span className="text-[10px] text-gray-500 mt-1 block">
                {lang === 'RU' ? 'Поддержка клиентов онлайн 24/7' : lang === 'KG' ? 'Колдоо кызматы онлайн 24/7' : 'Customer care online 24/7'}
              </span>
            </div>
          </div>

          {/* Item 3: Quick Direct Call */}
          <div className="flex items-start space-x-3 text-left">
            <div className="w-9 h-9 bg-white/3 rounded-lg flex items-center justify-center text-blue-400 border border-white/5 shrink-0">
              <Phone className="w-4 h-4" />
            </div>
            <div>
              <h5 className="font-bold text-white uppercase tracking-wider text-[10px] mb-0.5">
                {lang === 'RU' ? 'Многоканальная Линия' : lang === 'KG' ? 'Көп каналдуу байланыш' : 'Direct Support Hotline'}
              </h5>
              <a href="tel:+996555001999" className="font-mono font-bold text-white text-sm hover:text-blue-400 transition-colors block">
                +996 (555) 001-999
              </a>
              <span className="text-[10px] text-gray-500 mt-0.5 block">
                sales@autohub.kg
              </span>
            </div>
          </div>

        </div>


        {/* ==================== BOTTOM FOOTER BAR ==================== */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <p className="font-mono text-[10px] tracking-wider text-left">
            © 2026 AutoHub Kyrgyzstan. {t.rights[lang]}
          </p>
          
          <div className="flex items-center space-x-1.5 font-mono text-[10px] tracking-wider">
            <span>Made with ❤️ in Kyrgyzstan / Central Asia</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
